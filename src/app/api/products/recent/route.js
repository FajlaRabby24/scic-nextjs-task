import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("SCIC-NextJS-Task");
    const COLLECTION = "products";

    const products = await db
      .collection(COLLECTION)
      .find()
      .sort({ _id: -1 }) // newest first
      .limit(8)
      .toArray();

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify([]), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
