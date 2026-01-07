import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";
import Product from "@/models/product";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await getServerSession();
  if (!session) redirect("/login");

  await connectDB();
  const products = await Product.find();

  const totalProducts = products.length;
  const totalStock = products.reduce(
    (sum, p) => sum + p.stock,
    0
  );
  const lowStockCount = products.filter(
    (p) => p.stock < 5
  ).length;

  const ratingBuckets = {
    high: products.filter((p) => p.rating >= 4).length,
    mid: products.filter(
      (p) => p.rating >= 3 && p.rating < 4
    ).length,
    low: products.filter((p) => p.rating < 3).length,
  };

   const inventoryValueData = products.map((p) => ({
    name: p.name,
    value: p.price * p.stock,
  }));

  return (
    <DashboardClient
      products={JSON.parse(JSON.stringify(products))}
      stats={{
        totalProducts,
        totalStock,
        lowStockCount,
        ratingBuckets,
        inventoryValueData,
      }}
    />
  );
}
