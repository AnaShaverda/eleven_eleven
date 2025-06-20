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

const ACCESS_CODE = "1293";

export default function AnikosBirthdayGift({ data }) {
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const [memory, setMemory] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [code, setCode] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [wishes, setWishes] = useState([]);
  const [loadingWishes, setLoadingWishes] = useState(false);

  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 1 + Math.random() * 2,
  }));

  useEffect(() => {
    if (!isUnlocked || !data?.id) {
      setWishes([]);
      return;
    }
    setLoadingWishes(true);

    const colRef = collection(db, "gifts", data.id, "friendshipEntries");
    const q = query(colRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loaded = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWishes(
        loaded.sort(
          (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
        )
      );
      setLoadingWishes(false);
    });

    return () => unsubscribe();
  }, [isUnlocked, data]);

  useEffect(() => {
    if (submitted) {
      const timeout = setTimeout(() => setSubmitted(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [submitted]);

  async function handleSubmit() {
    if (
      !name.trim() ||
      !wish.trim() ||
      !memory.trim() ||
      cooldown ||
      submitting
    )
      return;

    try {
      setSubmitting(true);
      const colRef = collection(db, "gifts", data.id, "friendshipEntries");
      await addDoc(colRef, {
        name: name.trim(),
        wish: wish.trim(),
        memory: memory.trim(),
        createdAt: serverTimestamp(),
      });

      setName("");
      setWish("");
      setMemory("");
      setSubmitted(true);
      setCooldown(true);
      setTimeout(() => setCooldown(false), 5000);
    } catch (err) {
      console.error("Error adding wish:", err);
    } finally {
      setSubmitting(false);
    }
  }

  function normalizeCode(input) {
    return input.replace(/[^\d]/g, "");
  }

  function handleUnlock() {
    const normalized = normalizeCode(code);
    if (normalized === ACCESS_CODE) {
      setIsUnlocked(true);
      setError("");
    } else {
      setError("ACCESS DENIED! Try again.");
      setIsUnlocked(false);
    }
    setCode("");
  }

  function handleLock() {
    setIsUnlocked(false);
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[repeating-linear-gradient(45deg,#dc143c_0px,#dc143c_8px,#fff_8px,#fff_16px,#dc143c_16px,#dc143c_24px,#fff_24px,#fff_32px)]">
      <div className="absolute inset-0 z-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <div className="bg-pink-500/30 backdrop-blur-lg border-4 border-white shadow-[0_0_0_8px_#fff,0_0_0_16px_#dc143c,0_20px_40px_rgba(0,0,0,0.5)] px-8 py-10 max-w-md w-full text-center">
          {!isUnlocked ? (
            <>
              <h1 className="text-3xl font-extrabold text-white mb-2 drop-shadow-lg uppercase tracking-wider rotate-[-2deg]">
                Friendship Diary for Dealulu
              </h1>
              <p className="text-white/90 mb-6 font-bold uppercase tracking-wide text-sm">
                Share a special memory with me!
              </p>

              <input
                type="text"
                placeholder="Enter your name..."
                className="w-full mb-4 bg-white/90 border-4 border-white text-pink-700 p-3 font-bold placeholder-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-200"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <textarea
                rows={4}
                placeholder="Tell me about your favorite memory..."
                className="w-full mb-4 bg-white/90 border-4 border-white text-pink-700 p-3 font-bold placeholder-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-200 resize-none"
                value={memory}
                onChange={(e) => setMemory(e.target.value)}
              />

              <textarea
                rows={3}
                placeholder="Write me a message..."
                className="w-full mb-4 bg-white/90 border-4 border-white text-pink-700 p-3 font-bold placeholder-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-200 resize-none"
                value={wish}
                onChange={(e) => setWish(e.target.value)}
              />

              <button
                onClick={handleSubmit}
                disabled={
                  !name.trim() ||
                  !wish.trim() ||
                  !memory.trim() ||
                  cooldown ||
                  submitting
                }
                className="w-full py-3 bg-pink-600 text-white border-4 border-white font-extrabold text-lg uppercase tracking-wider hover:bg-pink-700 transition-all shadow-[0_8px_0_#8b0000] disabled:opacity-70 disabled:cursor-not-allowed">
                {submitting ? "📤 Submitting..." : "📤 Submit"}
              </button>

              {submitted && !submitting && (
                <div className="mt-4 p-4 border-4 border-white bg-white/90 text-pink-600 font-extrabold text-lg uppercase animate-pulse">
                  💖 Thank you for sharing!
                </div>
              )}

              <div className="mt-8 pt-6 border-t-4 border-white">
                <p className="text-white mb-3 uppercase font-bold tracking-wide">
                  Want to read what others wrote?
                </p>
                <input
                  type="text"
                  placeholder="Enter the magic code"
                  className="w-full mb-4 bg-white/90 border-4 border-white text-pink-700 p-3 font-bold text-center placeholder-pink-300 focus:outline-none focus:ring-4 focus:ring-pink-200"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleUnlock();
                  }}
                />
                <button
                  onClick={handleUnlock}
                  className="w-full py-3 bg-white text-pink-600 border-4 border-pink-500 font-extrabold uppercase tracking-wider hover:bg-pink-50 transition-all shadow-[0_8px_0_#ff1493]">
                  🔓 Unlock Entries
                </button>
                {error && (
                  <div className="mt-4 p-3 border-4 border-red-400 bg-red-500/20 text-white font-bold animate-pulse">
                    {error}
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-extrabold text-white drop-shadow-lg">
                  💝 Friendship Memories
                </h2>
                <button
                  onClick={handleLock}
                  className="text-white hover:text-pink-100 bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full border border-white">
                  🔒 Lock
                </button>
              </div>
              <p className="text-white/90 mb-4 text-sm font-bold uppercase">
                {wishes.length} {wishes.length === 1 ? "memory" : "memories"}{" "}
                shared
              </p>
              {loadingWishes ? (
                <div className="flex justify-center items-center h-20">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-white border-opacity-30" />
                </div>
              ) : wishes.length === 0 ? (
                <div className="text-white/90 text-center font-bold">
                  📝 Be the first to share a memory!
                </div>
              ) : (
                <div className="space-y-6 max-h-96 overflow-y-auto custom-scrollbar">
                  {wishes.map(({ id, name, wish, memory, createdAt }) => (
                    <div
                      key={id}
                      className="bg-pink-500/30 backdrop-blur border-4 border-white shadow-[0_0_0_6px_#fff,0_0_0_12px_#dc143c,0_15px_30px_rgba(0,0,0,0.4)] p-4 text-left">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-white font-bold uppercase tracking-wide">
                          {name}
                        </p>
                        <span className="text-white/70 text-sm">
                          {createdAt?.toDate
                            ? createdAt.toDate().toLocaleString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "Just now"}
                        </span>
                      </div>
                      <div className="mb-2">
                        <p className="text-pink-100 font-bold text-sm mb-1">
                          🌟 Favorite Memory
                        </p>
                        <p className="text-white bg-white/90 text-pink-700 font-bold border-4 border-white p-2">
                          {memory}
                        </p>
                      </div>
                      <div>
                        <p className="text-pink-100 font-bold text-sm mb-1">
                          💌 Message
                        </p>
                        <p className="text-white bg-white/90 text-pink-700 font-bold border-4 border-white p-2">
                          {wish}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
