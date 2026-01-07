import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/product";

// GET (list or single)
export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const product = await Product.findById(id);
    return NextResponse.json(product);
  }

  const products = await Product.find();
  return NextResponse.json(products);
}

// POST (create)
export async function POST(req: Request) {
  await connectDB();

  const body = await req.json();
  const product = await Product.create(body);

  return NextResponse.json(product);
}

// PUT (update)
export async function PUT(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Product ID missing" },
      { status: 400 }
    );
  }

  const body = await req.json();

  const updated = await Product.findByIdAndUpdate(
    id,
    body,
    { new: true }
  );

  if (!updated) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(updated);
}

// DELETE
export async function DELETE(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Product ID missing" },
      { status: 400 }
    );
  }

  await Product.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
