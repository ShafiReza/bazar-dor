
import { getProducts, getCategory } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import { Suspense } from "react";
import Link from "next/link";
import CategoryClient from "./CategoryClient";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
}

async function CategoryContent({
  slug,
  sort,
}: {
  slug: string;
  sort?: string;
}) {
  const [category, products] = await Promise.all([
    getCategory(slug),
    getProducts(slug),
  ]);

  if (!category && products.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          ক্যাটাগরি পাওয়া যায়নি
        </h1>
        <p className="text-slate-500 mb-6">
          এই ক্যাটাগরিতে কোনো পণ্য নেই অথবা স্লাগটি অবৈধ।
        </p>
        <Link
          href="/"
          className="inline-flex px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  let sorted = [...products];
  if (sort === "price-asc") {
    sorted.sort((a, b) => a.today - b.today);
  } else if (sort === "price-desc") {
    sorted.sort((a, b) => b.today - a.today);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-3xl">{category?.icon || "📦"}</span>
            {category?.nameBn || slug}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {sorted.length} টি পণ্য পাওয়া গেছে
          </p>
        </div>
        <CategoryClient currentSort={sort || "default"} slug={slug} />
      </div>

      {sorted.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-slate-500 mb-4">এই ক্যাটাগরিতে কোনো পণ্য নেই</p>
          <Link
            href="/"
            className="inline-flex px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sorted.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { sort } = await searchParams;

  return (
    <Suspense
      fallback={
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="skeleton h-10 w-48 mb-6" />
          <ProductSkeleton count={8} />
        </div>
      }
    >
      <CategoryContent slug={slug} sort={sort} />
    </Suspense>
  );
}
