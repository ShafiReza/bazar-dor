import { getProduct } from "@/lib/api";
import { formatPrice, getUnitLabel, toBengaliDigits } from "@/lib/utils";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: Props) {
  // Protect route
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(`/signin?callbackUrl=/product/${(await params).slug}`);
  }

  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const mins = product.markets.map((m) => m.min);
  const maxs = product.markets.map((m) => m.max);
  const minPrice = Math.min(...mins);
  const maxPrice = Math.max(...maxs);
  const avgPrice = Math.round(
    product.markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) /
      product.markets.length
  );

  // Group markets by division
  const byDivision = product.markets.reduce(
    (acc, m) => {
      if (!acc[m.division]) acc[m.division] = [];
      acc[m.division].push(m);
      return acc;
    },
    {} as Record<string, typeof product.markets>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Summary */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="text-6xl">{product.image || product.categoryIcon}</div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              {product.nameBn}
            </h1>
            <p className="text-slate-500 mb-3">
              আজকের বাজার দর · বিভিন্ন বাজারের তুলনামূলক মূল্য
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                {product.categoryIcon} {product.categoryNameBn}
              </span>
              <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                {getUnitLabel(product.unit)}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-slate-900">
                {formatPrice(product.today)}
              </span>
              <span
                className={`px-2.5 py-1 rounded-full text-sm font-semibold ${
                  product.change.dir === "up"
                    ? "bg-green-100 text-green-700"
                    : product.change.dir === "down"
                    ? "bg-red-100 text-red-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {product.change.dir === "up" ? "▲" : product.change.dir === "down" ? "▼" : "—"}{" "}
                {toBengaliDigits(Math.abs(product.change.pct).toFixed(1))}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Price summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-slate-200 p-5 text-center">
          <p className="text-sm text-slate-500 mb-1">সর্বনিম্ন দাম</p>
          <p className="text-xl font-bold text-green-700">
            {formatPrice(minPrice)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5 text-center">
          <p className="text-sm text-slate-500 mb-1">সর্বোচ্চ দাম</p>
          <p className="text-xl font-bold text-red-600">
            {formatPrice(maxPrice)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5 text-center">
          <p className="text-sm text-slate-500 mb-1">গড় দাম</p>
          <p className="text-xl font-bold text-slate-800">
            {formatPrice(avgPrice)}
          </p>
        </div>
      </div>

      {/* Markets by division */}
      <h2 className="text-xl font-bold text-slate-900 mb-4">
        বাজারভিত্তিক আজকের দাম
      </h2>
      <div className="space-y-6">
        {Object.entries(byDivision).map(([division, markets]) => (
          <div key={division}>
            <h3 className="text-sm font-semibold text-green-700 mb-2 uppercase tracking-wide">
              {division}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {markets.map((m) => (
                <div
                  key={m.market}
                  className="bg-white rounded-xl border border-slate-200 p-4 flex justify-between items-center"
                >
                  <span className="font-medium text-slate-800 text-sm">
                    {m.market}
                  </span>
                  <span className="text-sm text-slate-600">
                    {toBengaliDigits(m.min)} – {toBengaliDigits(m.max)} ৳
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Link
          href="/"
          className="inline-flex px-5 py-2.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-sm"
        >
          ← হোমে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
