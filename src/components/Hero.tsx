import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-orange-50 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-10 md:py-16 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <p className="text-sm font-semibold text-green-700 tracking-wide uppercase">
            প্রতিদিনের বাজার দর
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            প্রয়োজনীয় পণ্যের{" "}
            <span className="text-green-600">দাম এক নজরে</span>
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-md">
            চাল, ডাল, তেল, সবজি, মাছ, মাংসসহ সব ধরনের নিত্যপণ্যের আজকের বাজার
            দর জানুন — বিভিন্ন বাজারের তুলনামূলক মূল্যসহ।
          </p>
          <div className="pt-2">
            <a
              href="#সব-পণ্য"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl shadow-md transition text-sm sm:text-base"
            >
              সব পণ্য দেখুন
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <div className="absolute inset-0 bg-green-100 rounded-full blur-3xl opacity-60" />
            <Image
              src="/bazar-hero.png"
              alt="বাজারের ঝুড়ি"
              width={320}
              height={320}
              className="relative z-10 drop-shadow-xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
