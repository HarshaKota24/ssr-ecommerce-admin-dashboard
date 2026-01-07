import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import { connectDB } from "@/lib/db";
import Admin from "@/models/admin";

export async function POST(req: Request) {
  await connectDB();

  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password required" },
      { status: 400 }
    );
  }

  const exists = await Admin.findOne({ email });
  if (exists) {
    return NextResponse.json(
      { error: "Admin already exists" },
      { status: 400 }
    );
  }

  const hashed = await bcrypt.hash(password, 10);

  await Admin.create({
    email,
    password: hashed,
  });

  return NextResponse.json({ success: true });
}
