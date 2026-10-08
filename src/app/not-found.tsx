import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="text-7xl mb-4">🧐</div>
      <h1 className="text-3xl font-bold text-slate-900 mb-2">পেজ পাওয়া যায়নি</h1>
      <p className="text-slate-500 mb-8 max-w-md">
        আপনি যে পেজটি খুঁজছেন তা নেই অথবা সরানো হয়েছে।
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
