"use client";

import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function TeklasBirthdayGift({ data }) {
  const [wish, setWish] = useState("");
  const [wishes, setWishes] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!data || !data.id) return;

    const wishesCollection = collection(db, "gifts", data.id, "wishes");
    const q = query(wishesCollection, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const wishesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWishes(wishesData);
    });

    return () => unsubscribe();
  }, [data]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (wish.trim() === "") return;

    try {
      const wishesCollection = collection(db, "gifts", data.id, "wishes");
      await addDoc(wishesCollection, {
        text: wish.trim(),
        createdAt: serverTimestamp(),
      });

      setWish("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Error adding wish:", error);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-tr from-pink-300 via-purple-300 to-yellow-300 rounded-xl shadow-2xl text-gray-900 font-bold tracking-wide select-none">
      <h1 className="text-4xl text-center mb-4 drop-shadow-lg">
        🎉 Happy Birthday, <span className="text-indigo-800">{data.name}</span>!
        🎉
      </h1>
      <p className="text-lg text-center italic mb-8 drop-shadow-sm">
        {data.message}
      </p>

      <hr className="border-pink-500 mb-6" />

      <h2 className="text-2xl mb-4 text-center text-purple-900 drop-shadow-md">
        Leave your birthday wish for{" "}
        <span className="underline">{data.name}</span>:
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={wish}
          onChange={(e) => setWish(e.target.value)}
          placeholder="Write your wish here..."
          rows={4}
          className="resize-none rounded-lg p-3 text-gray-900 font-semibold shadow-inner shadow-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
        />
        <button
          type="submit"
          className="bg-indigo-800 hover:bg-indigo-900 text-white font-extrabold py-3 rounded-lg shadow-lg transition duration-300">
          Send Wish
        </button>
      </form>

      {submitted && (
        <p className="text-green-700 font-semibold mt-3 text-center drop-shadow-md">
          Thank you for your wish!
        </p>
      )}

      <hr className="border-purple-600 mt-8 mb-6" />

      <h3 className="text-2xl mb-4 text-center text-indigo-900 drop-shadow-md">
        All Wishes:
      </h3>
      {wishes.length === 0 && (
        <p className="text-center italic text-gray-700 select-text">
          No wishes yet.
        </p>
      )}
      <ul className="space-y-3 max-h-64 overflow-auto scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-purple-100">
        {wishes.map(({ id, text }) => (
          <li
            key={id}
            className="bg-purple-200 rounded-lg p-4 font-semibold shadow-md text-indigo-900 select-text">
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}
