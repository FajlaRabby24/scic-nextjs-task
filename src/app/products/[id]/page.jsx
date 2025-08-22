import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function ProductDetails({ params }) {
  const client = await clientPromise;
  const db = client.db("SCIC-NextJS-Task");
  const item = await db
    .collection("products")
    .findOne({ _id: new ObjectId(params.id) });

  if (!item) return <div className="p-6">Not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className="w-full md:w-1/2 rounded shadow object-contain"
          />
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
          <p className="text-gray-700 mb-2">{item.category}</p>
          <p className="text-2xl font-semibold mb-4">
            ${Number(item.price).toFixed(2)}
          </p>
          <p className="text-gray-800">{item.description}</p>
          <div className="pt-4">
            <button className="btn btn-primary">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
