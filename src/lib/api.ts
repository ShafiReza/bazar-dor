const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.api-store.workers.dev/api/bazardor";

export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Change {
  dir: "up" | "down" | "flat";
  pct: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: Change;
  markets: Market[];
}

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export async function getProducts(category?: string): Promise<Product[]> {
  const url = category
    ? `${BASE}/products?category=${category}`
    : `${BASE}/products`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProduct(idOrSlug: string | number): Promise<Product | null> {
  // Try by id first, then by slug via list
  try {
    const res = await fetch(`${BASE}/products/${idOrSlug}`, {
      next: { revalidate: 300 },
    });
    if (res.ok) return res.json();
  } catch {}
  // Fallback: fetch all and find by slug
  const all = await getProducts();
  return all.find((p) => p.slug === idOrSlug || String(p.id) === String(idOrSlug)) || null;
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE}/categories`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getCategory(slug: string): Promise<Category | null> {
  try {
    const res = await fetch(`${BASE}/categories/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) return res.json();
  } catch {}
  const cats = await getCategories();
  return cats.find((c) => c.slug === slug) || null;
}
