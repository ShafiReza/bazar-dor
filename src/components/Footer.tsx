
export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <p className="text-center sm:text-left">
          <span className="font-semibold text-white">বাজার দর</span> — প্রয়োজনীয়
          পণ্যের দাম এক নজরে।
        </p>
        <p className="text-center sm:text-right text-slate-400 text-xs max-w-md">
          “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
        </p>
      </div>
      <div className="border-t border-slate-800 py-3 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} বাজার দর · All rights reserved
      </div>
    </footer>
  );
}
