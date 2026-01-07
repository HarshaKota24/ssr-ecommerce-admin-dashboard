import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function HomePage() {
  const session = await getServerSession();

  // If already logged in, go to dashboard
  if (session) {
    redirect("/dashboard");
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100">
        {/* Header */}
        <div className="border-b border-indigo-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-indigo-900">SSR Dashboard</h1>
        </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
          <h2 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-6 leading-tight">
            Server-Rendered E-commerce Admin Dashboard
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            A secure SSR-based administrative dashboard for managing products, inventory analytics, and media uploads.
          </p>
          <Link
            href="/login"
            className="inline-block px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold shadow-lg hover:shadow-xl"
          >
            Login as Admin
          </Link>
          </div>

          {/* Right Features Grid */}
          <div className="grid gap-4">
          {[
            {  title: "Server-side rendering", desc: "Next.js powered" },
            {  title: "Admin Authentication", desc: "Secure & authorized" },
            {  title: "Product CRUD", desc: "Complete management" },
            {  title: "Analytics", desc: "Inventory insights" },
            {  title: "Image Uploads", desc: "Cloudinary integration" },
          ].map((item, i) => (
            <div key={i} className="bg-white/70 backdrop-blur p-4 rounded-lg border border-indigo-100 hover:border-indigo-300 transition">
            <div className="text-2xl mb-2">{}</div>
            <p className="font-semibold text-gray-800">{item.title}</p>
            <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
          </div>
        </div>
        </div>
      </div>

    </>
  );
}
