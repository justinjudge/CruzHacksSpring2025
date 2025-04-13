// pages/api/submit.js

import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const client = await clientPromise;
            const db = client.db("store");
            const collection = db.collection("products");

            const newProduct = {
                id: 17,
                name: "Vue T-Shirt inserted",
                price: 39,
                category: "T-Shirt",
                image: "/images/vue.jpg",
            };

            await collection.insertOne(newProduct);
            res.status(200).json({ message: "Product added successfully" });
        } catch (error) {
            res.status(500).json({ error: "Error inserting product" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
