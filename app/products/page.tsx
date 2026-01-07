import { connectDB } from "@/lib/db";
import Product from "@/models/product";
import ProductCard from "./ProductCard";
export default async function ProductsPage() {
  await connectDB();
  const products = await Product.find();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((p: any) => (
          <ProductCard key={p._id} p={JSON.parse(JSON.stringify(p))} />
        ))}
      </div>
    </div>
  );
}
