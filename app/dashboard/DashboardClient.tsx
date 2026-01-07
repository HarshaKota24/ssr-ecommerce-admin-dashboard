"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function DashboardClient({
  products,
  stats,
}: {
  products: any[];
  stats: any;
}) {
  if (!products || products.length === 0) {
    return (
      <p className="text-gray-600">
        No data available for dashboard
      </p>
    );
  }

  const ratingData = [
    { name: "4+ Stars", value: stats.ratingBuckets.high },
    { name: "3–4 Stars", value: stats.ratingBuckets.mid },
    { name: "< 3 Stars", value: stats.ratingBuckets.low },
  ];

  const colors = ["#22c55e", "#facc15", "#ef4444"];

  return (
    <div className="space-y-8">
      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Total Products</p>
          <p className="text-2xl font-bold">
            {stats.totalProducts}
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">Total Stock</p>
          <p className="text-2xl font-bold">
            {stats.totalStock}
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-sm text-gray-500">
            Low Stock Products
          </p>
          <p className="text-2xl font-bold text-red-600">
            {stats.lowStockCount}
          </p>
        </div>
      </div>

      {/* STOCK BAR CHART */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">
          Stock by Product
        </h2>

        <BarChart width={600} height={300} data={products}>
          <CartesianGrid />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="stock" />
        </BarChart>
      </div>
          {/* INVENTORY VALUE CHART */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">
          Inventory Value by Product
        </h2>

        <BarChart width={600} height={300} data={stats.inventoryValueData}>
          <CartesianGrid />
          <XAxis dataKey="name" />
          <YAxis
            width={100}
          />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>

      </div>

      {/* RATING PIE CHART */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">
          Product Rating Distribution
        </h2>

        <PieChart width={400} height={300}>
          <Pie
            data={ratingData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {ratingData.map((_, i) => (
              <Cell key={i} fill={colors[i]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}
