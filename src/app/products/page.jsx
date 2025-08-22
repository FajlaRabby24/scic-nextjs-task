import clientPromise from "@/lib/mongodb";
import Link from "next/link";

const DB_NAME = "SCIC-NextJS-Task";
const COLLECTION = "products";

export default async function ProductsPage() {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const items = await db
    .collection(COLLECTION)
    .find()
    .sort({ _id: -1 })
    .toArray();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((p) => (
          <div key={p._id.toString()} className="card bg-base-100 shadow">
            {p.image ? (
              <figure className="p-4">
                <img
                  src={typeof p.image === "string" ? p.image : ""}
                  alt={p.title}
                  className="h-40 w-full object-contain"
                />
              </figure>
            ) : null}
            <div className="card-body">
              <h2 className="card-title">{p.title}</h2>

              <p className="font-semibold mt-1">
                ${Number(p.price).toFixed(2)}
              </p>

              <div className="flex justify-end">
                {" "}
                <Link href={`/products/${p._id}`}>
                  <button className="btn btn-primary btn-sm">Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
