"use client";

export default function Toast({
  message,
  type = "error",
  onClose,
}: {
  message: string;
  type?: "error" | "success";
  onClose: () => void;
}) {
  if (!message) return null;

  return (
    <div className="fixed top-6 right-6 z-50">
      <div
        className={`px-4 py-3 rounded shadow text-white ${
          type === "error" ? "bg-red-600" : "bg-green-600"
        }`}
      >
        <div className="flex items-center gap-4">
          <span>{message}</span>
          <button onClick={onClose} className="font-bold">
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
