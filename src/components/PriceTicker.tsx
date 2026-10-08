"use client";

import { Product } from "@/lib/api";
import { formatPrice, formatChange } from "@/lib/utils";

export default function PriceTicker({ products }: { products: Product[] }) {
  if (!products?.length) return null;

  // Duplicate for seamless loop
  const items = [...products, ...products];

  return (
    <div className="bg-slate-900 text-white overflow-hidden py-2 border-b border-slate-700">
      <div className="animate-marquee flex whitespace-nowrap">
        {items.map((p, i) => (
          <span
            key={`${p.id}-${i}`}
            className="inline-flex items-center gap-2 mx-6 text-sm"
          >
            <span className="text-lg">{p.image || p.categoryIcon}</span>
            <span className="font-medium">{p.nameBn}</span>
            <span className="text-slate-300">
              {formatPrice(p.today)}/{p.unit === "kg" ? "কেজি" : p.unit}
            </span>
            <span
              className={
                p.change.dir === "up"
                  ? "text-green-400"
                  : p.change.dir === "down"
                  ? "text-red-400"
                  : "text-slate-400"
              }
            >
              {formatChange(p.change.pct, p.change.dir)}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
