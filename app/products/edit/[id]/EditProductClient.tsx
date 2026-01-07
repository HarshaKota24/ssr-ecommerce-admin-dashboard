"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { productSchema } from "@/lib/schema";

export default function EditProductClient({ product }: any) {
  const [p, setP] = useState(product);
  const [err, setErr] = useState("");
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  async function uploadImage(file: File) {
    setUploading(true);

    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    setP({ ...p, image: data.url });
    setUploading(false);
  }

  async function save() {
    setErr("");

    const parsed = productSchema.safeParse(p);
    if (!parsed.success) {
      setErr(parsed.error.issues[0].message);
      return;
    }

    const res = await fetch(`/api/products?id=${p._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p),
    });

    // if (!res.ok) {
    //   setErr("Failed to update product");
    //   return;
    // }

    router.push("/products");
  }

  return (
    <div className="max-w-2xl bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">
        Edit Product
      </h1>

      {err && (
        <p className="text-red-600 mb-4">{err}</p>
      )}

      {/* NAME */}
      <label className="block mb-2 font-medium">
        Product Name
      </label>
      <input
        className="w-full border p-2 rounded mb-4"
        value={p.name}
        onChange={(e) =>
          setP({ ...p, name: e.target.value })
        }
      />

      {/* DESCRIPTION */}
      <label className="block mb-2 font-medium">
        Description
      </label>
      <textarea
        className="w-full border p-2 rounded mb-4"
        rows={3}
        value={p.description}
        onChange={(e) =>
          setP({ ...p, description: e.target.value })
        }
      />

      {/* PRICE + STOCK */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium">
            Price
          </label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={p.price}
            onChange={(e) =>
              setP({
                ...p,
                price: Number(e.target.value),
              })
            }
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Stock
          </label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={p.stock}
            onChange={(e) =>
              setP({
                ...p,
                stock: Number(e.target.value),
              })
            }
          />
        </div>
      </div>

      {/* RATING */}
      <label className="block mt-4 mb-2 font-medium">
        Rating (0–5)
      </label>
      <input
        type="number"
        step="0.1"
        className="w-full border p-2 rounded mb-4"
        value={p.rating}
        onChange={(e) =>
          setP({
            ...p,
            rating: Number(e.target.value),
          })
        }
      />

      {/* IMAGE */}
      <label className="block mb-2 font-medium">
        Product Image
      </label>

      {p.image && (
        <img
          src={p.image}
          className="h-28 mb-3 rounded border"
        />
      )}

      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadImage(file);
        }}
        className="mb-6"
      />

      {/* ACTIONS */}
      <div className="flex gap-4">
        <button
          onClick={save}
          disabled={uploading}
          className={`px-4 py-2 rounded text-white ${
            uploading
              ? "bg-gray-400"
              : "bg-blue-600"
          }`}
        >
          {uploading ? "Uploading..." : "Update Product"}
        </button>

        <button
          onClick={() => router.push("/products")}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
