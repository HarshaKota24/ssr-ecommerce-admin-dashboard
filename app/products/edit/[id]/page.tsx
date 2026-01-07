import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import Product from "@/models/product";
import EditProductClient from "./EditProductClient";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // IMPORTANT FIX
  const { id } = await params;

  const session = await getServerSession();
  if (!session) redirect("/login");

  await connectDB();
  const product = await Product.findById(id);

  if (!product) {
    redirect("/products");
  }

  return (
    <EditProductClient
      product={JSON.parse(JSON.stringify(product))}
    />
  );
}
