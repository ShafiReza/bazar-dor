"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  if (isPending) {
    return (
      <div className="max-w-lg mx-auto px-4 py-12">
        <div className="skeleton h-64 rounded-2xl" />
      </div>
    );
  }

  if (!session) {
    router.push("/signin?callbackUrl=/update-profile");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম দিন");
      return;
    }
    setLoading(true);
    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });
      if (error) {
        toast.error(error.message || "আপডেট ব্যর্থ");
      } else {
        toast.success("তথ্য সফলভাবে আপডেট হয়েছে!");
        router.push("/profile");
        router.refresh();
      }
    } catch {
      toast.error("কিছু ভুল হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">
          তথ্য আপডেট করুন
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              নাম
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="আপনার নাম"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold rounded-xl"
          >
            {loading ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
          </button>
        </form>

        <Link
          href="/profile"
          className="mt-4 inline-block text-sm text-slate-500 hover:text-slate-700"
        >
          ← প্রোফাইলে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
