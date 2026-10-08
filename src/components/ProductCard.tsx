import Link from "next/link";
import { Product } from "@/lib/api";
import { formatPrice, formatChange, getUnitLabel } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const changeClass =
    product.change.dir === "up"
      ? "bg-green-100 text-green-700"
      : product.change.dir === "down"
      ? "bg-red-100 text-red-700"
      : "bg-slate-100 text-slate-600";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-green-200 transition overflow-hidden"
    >
      <div className="p-4 flex flex-col h-full">
        {/* Emoji */}
        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
          {product.image || product.categoryIcon || "📦"}
        </div>

        {/* Name */}
        <h3 className="font-semibold text-slate-900 text-base leading-snug mb-1 line-clamp-2">
          {product.nameBn}
        </h3>

        {/* Unit */}
        <p className="text-xs text-slate-500 mb-3">{getUnitLabel(product.unit)}</p>

        {/* Price row */}
        <div className="mt-auto flex items-end justify-between gap-2">
          <div>
            <p className="text-[11px] text-slate-400 uppercase tracking-wide">
              আজকের দাম
            </p>
            <p className="text-lg font-bold text-slate-900">
              {formatPrice(product.today)}
            </p>
          </div>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${changeClass}`}
          >
            {formatChange(product.change.pct, product.change.dir)}
          </span>
        </div>
      </div>
    </Link>
  );
}
