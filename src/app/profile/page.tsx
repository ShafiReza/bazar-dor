
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin?callbackUrl=/profile");
  }

  const user = session.user;

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">আমার প্রোফাইল</h1>

        <div className="space-y-4 mb-8">
          <div>
            <p className="text-sm text-slate-500">নাম</p>
            <p className="text-lg font-medium text-slate-900">{user.name}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">ইমেইল</p>
            <p className="text-lg font-medium text-slate-900">{user.email}</p>
          </div>
          {user.image && (
            <div>
              <img
                src={user.image}
                alt={user.name}
                className="w-16 h-16 rounded-full"
              />
            </div>
          )}
        </div>

        <Link
          href="/update-profile"
          className="inline-flex px-5 py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700"
        >
          তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}
