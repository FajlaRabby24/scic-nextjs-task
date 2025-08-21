// app/api/products/[id]/route.js

import { products } from "@/app/data/products";

export async function GET(_, { params }) {
  const product = products.find((p) => p.id === parseInt(params.id));
  if (!product) {
    return new Response(JSON.stringify({ error: "Product not found" }), {
      status: 404,
    });
  }
  return Response.json(product);
}
