import Head from "next/head";
import clientPromise from "../lib/mongodb";
import Container from "../components/Container";
import Products from "../components/Products";

import { useState } from "react";

import "tailwindcss/tailwind.css";

export default function Home({ isConnected, products }) {
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const response = await fetch("/api/submit", {
      method: "POST",
    });
    const data = await response.json();
    setMessage(data.message || data.error);
  };

  return (
    <>
      {isConnected && (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <Head>
            <title>Browser Tab Name</title>
          </Head>
          <div className="bg-white w-full min-h-screen">
            
            <Container>
              
            <Products products={products} />

              <div className="my-4">
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Submit Now
                </button>
                {message && <p className="mt-2 text-green-600">{message}</p>}
              </div>

              
            </Container>
            
          </div>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const client = await clientPromise;
  const isConnected = await client.isConnected();
  const db = client.db("store");
  const collection = db.collection("products");
  const products = await collection.find({}).toArray();

  return {
    props: {
      isConnected,
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

