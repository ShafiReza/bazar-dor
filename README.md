# 🛒 বাজার দর (Bazar Dor)

প্রয়োজনীয় পণ্যের দাম এক নজরে — বাংলাদেশের বিভিন্ন বাজারের তুলনামূলক নিত্যপণ্যের মূল্য তথ্য।

## Short Description

বাজার দর একটি আধুনিক ওয়েব অ্যাপ্লিকেশন যা চাল, ডাল, তেল, সবজি, মাছ, মাংসসহ সকল নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজার দর দেখায়। বিভিন্ন বাজারের মিনিমাম-ম্যাক্সিমাম দাম, দামের পরিবর্তন (▲/▼) এবং ক্যাটাগরি অনুযায়ী ফিল্টারিং সুবিধা রয়েছে। **Better Auth + MongoDB** দিয়ে সুরক্ষিত অথেন্টিকেশন সিস্টেম যুক্ত।

## Technologies Used (Latest)

| Technology          | Version / Notes                  |
|---------------------|----------------------------------|
| **Next.js**         | ^16.4.0 (App Router)            |
| **React**           | ^19.2.0                         |
| **TypeScript**      | ^5.9                            |
| **Tailwind CSS**    | ^4 + **DaisyUI** ^5.7.47        |
| **Better Auth**     | ^1.7.7                          |
| **MongoDB**         | official driver ^6.20 + adapter |
| **react-hot-toast** | ^2.6.0                          |
| **Lucide React**    | icons                           |

## Key Features

1. **Responsive Navbar + Price Ticker** — লোগো, বাংলা তারিখ, ক্যাটাগরি লিংক, অথ বাটন এবং ইনফিনিট মারকুই প্রাইস টিকার।
2. **Hero Banner** — আকর্ষণীয় হিরো সেকশন CTA বাটনসহ যা `#সব-পণ্য` সেকশনে স্ক্রল করে।
3. **Product Cards & Sections** — দাম বেড়েছে / কমেছে টপ ৬ + সব পণ্যের রেসপন্সিভ গ্রিড। বাংলা ডিজিট, ইউনিট, চেঞ্জ ব্যাজ।
4. **Product Detail (Protected)** — লগইন প্রয়োজন। মিনি/ম্যাক্স/অ্যাভারেজ প্রাইস + বাজারভিত্তিক দাম।
5. **Category Page + Sort** — সাজান ড্রপডাউন (ডিফল্ট / কম→বেশি / বেশি→কম), স্কেলেটন লোডিং, এম্পটি স্টেট।
6. **Authentication** — Sign In / Sign Up (ইমেইল+পাসওয়ার্ড + Google/GitHub), Toast, প্রোফাইল আপডেট (MongoDB backed).
7. **404 + Loading States** — ফ্রেন্ডলি ৪০৪ পেজ এবং স্কেলেটন লোডার।

## Getting Started

```bash
# 1. Install
npm install

# 2. Setup env
cp .env.example .env
# Edit MONGODB_URI if needed (local or Atlas)

# 3. Make sure MongoDB is running
# Local: mongod
# Or use MongoDB Atlas free cluster

# 4. Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL=https://api.api-store.workers.dev/api/bazardor
BETTER_AUTH_SECRET=your-32+-char-secret
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=mongodb://127.0.0.1:27017/bazardor
# or Atlas: mongodb+srv://user:pass@cluster.mongodb.net/bazardor

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

## MongoDB Notes

- Better Auth automatically creates the required collections (`user`, `session`, `account`, `verification`).
- No manual schema migration needed.
- For production use MongoDB Atlas (free tier works great with Vercel).

## Deployment (Vercel)

1. Push to GitHub
2. Import on Vercel
3. Add all environment variables
4. Set `MONGODB_URI` to your Atlas connection string
5. Add OAuth redirect URIs:
   - `https://your-domain.com/api/auth/callback/google`
   - `https://your-domain.com/api/auth/callback/github`

## API

Base: `https://api.api-store.workers.dev/api/bazardor`

- `GET /products`
- `GET /products?category=chal`
- `GET /products/:id`
- `GET /categories`
- `GET /categories/:slug`

## License

MIT · Assignment Project
