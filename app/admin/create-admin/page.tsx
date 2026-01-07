"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  async function submit() {
    setMsg("");

    const res = await fetch("/api/admin/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMsg(data.error);
      return;
    }

    setMsg("Admin created successfully");
    setEmail("");
    setPassword("");
  }

  return (
    <div className="bg-white p-6 rounded shadow max-w-md">
      <h1 className="text-xl font-bold mb-4">Create New Admin</h1>

      {msg && <p className="mb-3 text-sm">{msg}</p>}

      <label className="block text-sm font-medium mb-1">
        Admin Email
      </label>
      <input
        className="w-full border p-2 rounded mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="block text-sm font-medium mb-1">
        Password
      </label>
      <input
        type="password"
        className="w-full border p-2 rounded mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={submit}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Create Admin
      </button>
    </div>
  );
}
