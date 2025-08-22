"use client";

import { useEffect, useState } from "react";

export default function RecentProducts() {
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await fetch("/api/products/recent");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setRecentProducts(data);
      } catch (err) {
        console.error(err);
        setRecentProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecent();
  }, []);

  if (loading) return <p>Loading recent products...</p>;

  return (
    <div className="container mx-auto px-4 py-8 mb-28">
      {/* Recent Added Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Recent Added</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recentProducts.length > 0 ? (
            recentProducts.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-40 w-full object-contain rounded mb-3"
                />
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-gray-600 font-semibold">${product.price}</p>
              </div>
            ))
          ) : (
            <p>No products added yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
