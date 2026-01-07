"use client";

import { useState } from "react";
import { productSchema } from "@/lib/schema";

export default function NewProduct() {
  const [step, setStep] = useState(1);
  const [err, setErr] = useState("");
  const [uploading, setUploading] = useState(false);


  const [p, setP] = useState({
    name: "",
    description: "",
    price: 0,
    rating: 0,
    stock: 0,
    image: "",
  });

  function next() {
    setErr("");
    if (step === 1 && !p.name.trim()) {
      setErr("Product name is required");
      return;
    }
    setStep(step + 1);
  }

  function back() {
    setStep(step - 1);
  }

  async function submit() {
    const res = productSchema.safeParse(p);
    if (!res.success) {
      setErr(res.error.issues[0].message);
      return;
    }

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p),
    });

    window.location.href = "/products";
  }

  return (
    <div className="bg-white p-6 rounded shadow max-w-lg">
      <h1 className="text-xl font-bold mb-4">
        Add Product (Step {step}/4)
      </h1>

      {err && <p className="text-red-600 mb-3">{err}</p>}

      {/* STEP 1 */}
      {step === 1 && (
        <>
          <label className="block text-sm font-medium mb-1">
            Product Name
          </label>
          <input
            className="w-full border p-2 rounded mb-4"
            value={p.name}
            onChange={(e) =>
              setP({ ...p, name: e.target.value })
            }
          />

          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            className="w-full border p-2 rounded"
            rows={4}
            value={p.description}
            onChange={(e) =>
              setP({ ...p, description: e.target.value })
            }
          />
        </>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <>
          <label className="block text-sm font-medium mb-1">
            Price
          </label>
          <input
            className="w-full border p-2 rounded mb-4"
            value={p.price}
            onChange={(e) =>
              setP({ ...p, price: +e.target.value })
            }
          />

          <label className="block text-sm font-medium mb-1">
            Rating (0–5)
          </label>
          <input
            className="w-full border p-2 rounded"
            min={0}
            max={5}
            value={p.rating}
            onChange={(e) =>
              setP({ ...p, rating: +e.target.value })
            }
          />
        </>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <>
          <label className="block text-sm font-medium mb-1">
            Stock Quantity
          </label>
          <input
            className="w-full border p-2 rounded mb-4"
            value={p.stock}
            onChange={(e) =>
              setP({ ...p, stock: +e.target.value })
            }
          />

          <label className="block text-sm font-medium mb-1">
            Product Image
          </label>
          <input
            type="file"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;

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
            }}
      />

          {p.image && (
            <img src={p.image} className="mt-3 h-24" />
          )}
        </>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <div className="text-sm space-y-1">
          <p><b>Name:</b> {p.name}</p>
          <p><b>Description:</b> {p.description || "—"}</p>
          <p><b>Price:</b> {p.price}</p>
          <p><b>Rating:</b> {p.rating}</p>
          <p><b>Stock:</b> {p.stock}</p>
          {p.image && <img src={p.image} className="h-24" />}
        </div>
      )}

      <div className="flex gap-3 mt-6">
        {step > 1 && (
          <button
            onClick={back}
            className="px-4 py-2 bg-gray-200 rounded"
          >
            Back
          </button>
        )}
        {step < 4 && (
          <button
            onClick={next}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Next
          </button>
        )}
        {step === 4 && (
          <button
            onClick={submit}
            disabled={uploading}
            className={`px-4 py-2 rounded text-white ${
              uploading ? "bg-gray-400" : "bg-green-600"
            }`}
          >
            {uploading ? "Uploading..." : "Submit"}
          </button>

        )}
      </div>
    </div>
  );
}
