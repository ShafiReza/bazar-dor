import { getProducts } from "@/lib/api";
import Hero from "@/components/Hero";
import PriceTicker from "@/components/PriceTicker";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import { Suspense } from "react";

async function ProductSections() {
  const products = await getProducts();

  const risers = [...products]
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = [...products]
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <>
      <PriceTicker products={products} />

      {/* Risers */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          আজ দাম বেড়েছে <span className="text-green-600">▲</span>
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          সর্বোচ্চ দাম বৃদ্ধির শীর্ষ ৬টি পণ্য
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {risers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Fallers */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          আজ দাম কমেছে <span className="text-red-600">▼</span>
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          সর্বোচ্চ দাম হ্রাসের শীর্ষ ৬টি পণ্য
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fallers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* All products */}
      <section id="সব-পণ্য" className="max-w-6xl mx-auto px-4 py-10 scroll-mt-24">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
          সব পণ্য
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          সকল নিত্যপণ্যের আজকের বাজার দর
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Suspense
        fallback={
          <div className="max-w-6xl mx-auto px-4 py-10">
            <ProductSkeleton count={8} />
          </div>
        }
      >
        <ProductSections />
      </Suspense>
    </>
  );
}
