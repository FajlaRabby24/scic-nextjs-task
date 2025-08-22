import clientPromise from "@/lib/mongodb";

const DB_NAME = "SCIC-NextJS-Task"; // <- change if needed
const COLLECTION = "products";

const toSerializable = (doc) => ({
  ...doc,
  _id: doc._id?.toString(),
});

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const items = await db
      .collection(COLLECTION)
      .find()
      .sort({ _id: -1 })
      .toArray();
    return Response.json(items.map(toSerializable), { status: 200 });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    // Basic validation
    const { title, price, description, category, image } = body;
    if (!title || !price || !description || !category) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const result = await db.collection(COLLECTION).insertOne({
      title,
      price: parseFloat(price),
      description,
      category,
      image: image || "", // URL or base64 (demo)
      createdAt: new Date(),
    });

    return Response.json(
      { ok: true, _id: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
