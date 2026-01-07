"use client";

import { signOut } from "next-auth/react";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col fixed left-0 top-0">
      {/* Top section */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

        <nav className="space-y-4">
          <a href="/dashboard" className="block hover:text-gray-300">
            Dashboard
          </a>
          <a href="/products" className="block hover:text-gray-300">
            Products
          </a>
          <a href="/products/new" className="block hover:text-gray-300">
            Add Product
          </a>
          <a href="/admin/create-admin" className="block hover:text-gray-300">
            Create Admin
          </a>

        </nav>
      </div>

      {/* Bottom section */}
      <div className="mt-auto p-6">
        <button
          className="text-red-400 hover:text-red-300"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
