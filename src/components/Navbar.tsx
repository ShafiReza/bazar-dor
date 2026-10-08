"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { getBanglaDate } from "@/lib/utils";
import { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";

const categories = [
  { slug: "chal", name: "চাল", icon: "🍚" },
  { slug: "dal", name: "ডাল", icon: "🫘" },
  { slug: "tel", name: "তেল", icon: "🛢️" },
  { slug: "sobji", name: "সবজি", icon: "🥬" },
  { slug: "mach", name: "মাছ", icon: "🐟" },
  { slug: "mangsho", name: "মাংস", icon: "🍗" },
  { slug: "dim-dui", name: "ডিম-দুধ", icon: "🥛" },
  { slug: "mosla", name: "মসলা", icon: "🌶️" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const banglaDate = getBanglaDate();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* Top bar */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col">
          <span className="text-xl md:text-2xl font-bold text-green-700 flex items-center gap-1">
            🛒 বাজার দর
          </span>
          <span className="text-xs text-slate-500">{banglaDate}</span>
        </Link>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {isPending ? (
            <div className="h-9 w-24 skeleton" />
          ) : session ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-50 text-green-800 hover:bg-green-100 text-sm font-medium"
              >
                <User size={16} />
                {session.user.name || "প্রোফাইল"}
              </Link>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-sm"
              >
                <LogOut size={16} />
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="px-4 py-1.5 rounded-lg border border-green-600 text-green-700 hover:bg-green-50 text-sm font-medium"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="px-4 py-1.5 rounded-lg bg-green-600 text-white hover:bg-green-700 text-sm font-medium"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-slate-100"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Category nav */}
      <nav className="border-t border-slate-100 bg-slate-50">
        <div className="max-w-6xl mx-auto px-2 overflow-x-auto">
          <ul className="flex items-center gap-1 py-2 min-w-max">
            <li>
              <Link
                href="/"
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  pathname === "/"
                    ? "bg-green-600 text-white"
                    : "text-slate-600 hover:bg-green-100 hover:text-green-800"
                }`}
              >
                সব
              </Link>
            </li>
            {categories.map((cat) => {
              const active = pathname === `/category/${cat.slug}`;
              return (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition flex items-center gap-1 ${
                      active
                        ? "bg-green-600 text-white"
                        : "text-slate-600 hover:bg-green-100 hover:text-green-800"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    {cat.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          {session ? (
            <>
              <Link
                href="/profile"
                className="block px-3 py-2 rounded-lg bg-green-50 text-green-800 font-medium"
                onClick={() => setMobileOpen(false)}
              >
                👤 {session.user.name || "প্রোফাইল"}
              </Link>
              <button
                onClick={() => {
                  signOut();
                  setMobileOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50"
              >
                সাইন আউট
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="block px-3 py-2 rounded-lg border border-green-600 text-green-700 text-center font-medium"
                onClick={() => setMobileOpen(false)}
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="block px-3 py-2 rounded-lg bg-green-600 text-white text-center font-medium"
                onClick={() => setMobileOpen(false)}
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
