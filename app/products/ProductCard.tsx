"use client";

export default function ProductCard({ p }: any) {
  return (
    <div className="bg-white rounded shadow p-4">
      {p.image && (
        <img
          src={p.image}
          className="h-40 w-full object-cover rounded"
        />
      )}

      <h2 className="text-lg font-semibold mt-3">{p.name}</h2>

      <p className="text-sm text-gray-600 min-h-[40px]">
        {p.description && p.description.trim() !== ""
          ? p.description
          : "No description provided"}
      </p>

      <div className="mt-2 text-sm">
        <p>₹ {p.price}</p>
        <p>Stock: {p.stock}</p>
        <p>⭐ {p.rating}</p>
      </div>

      <div className="flex gap-4 mt-4 text-sm">
        <a
          href={`/products/edit/${p._id}`}
          className="text-blue-600"
        >
          Edit
        </a>

        <button
          className="text-red-600"
          onClick={async () => {
            if (!confirm("Delete product?")) return;

            await fetch(`/api/products?id=${p._id}`, {
              method: "DELETE",
            });

            location.reload();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
