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

const SECRET_CODE = "1293";

export default function NikasBirthdayGift({ data }) {
  const [bestMoment, setBestMoment] = useState("");
  const [wish, setWish] = useState("");
  const [entries, setEntries] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const [code, setCode] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isUnlocked || !data?.id) {
      setEntries([]);
      return;
    }

    const colRef = collection(db, "gifts", data.id, "friendshipEntries");
    const q = query(colRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedEntries = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEntries(loadedEntries);
    });

    return () => unsubscribe();
  }, [isUnlocked, data]);

  async function handleSubmit() {
    if (!bestMoment.trim() || !wish.trim()) return;

    try {
      const colRef = collection(db, "gifts", data.id, "friendshipEntries");
      await addDoc(colRef, {
        bestMoment: bestMoment.trim(),
        wish: wish.trim(),
        createdAt: serverTimestamp(),
      });

      setBestMoment("");
      setWish("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3500);
    } catch (err) {
      console.error("Error adding diary entry:", err);
    }
  }

  function handleUnlock() {
    if (code.trim() === SECRET_CODE) {
      setIsUnlocked(true);
      setError("");
    } else {
      setError("ACCESS DENIED! Try again.");
      setIsUnlocked(false);
    }
    setCode("");
  }

  function handleBackToForm() {
    setIsUnlocked(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-cyan-400 rounded-full blur-2xl opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-25 animate-pulse"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-green-400 rounded-full blur-2xl opacity-20 animate-bounce"></div>

        {/* Grid Lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 grid-rows-8 h-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-cyan-300"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto p-8 min-h-screen flex items-center justify-center">
        <div className="w-full backdrop-blur-xl bg-black/20 rounded-3xl border border-cyan-400/30 shadow-2xl shadow-cyan-400/20 p-8">
          {/* Glowing Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2 tracking-wider">
              FRIENDSHIP
            </h1>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-green-400 to-pink-400 bg-clip-text text-transparent mb-4 tracking-widest">
              DIARY
            </h2>
            <div className="flex justify-center space-x-2 mb-4">
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-ping"></div>
              <div
                className="w-3 h-3 bg-cyan-400 rounded-full animate-ping"
                style={{ animationDelay: "0.2s" }}></div>
              <div
                className="w-3 h-3 bg-green-400 rounded-full animate-ping"
                style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>

          {!isUnlocked ? (
            <>
              {/* Entry Form */}
              <div className="space-y-6 mb-8">
                <div className="space-y-2">
                  <label className="block text-cyan-300 font-bold text-lg tracking-wide">
                    → BEST MOMENT MEMORY BANK
                  </label>
                  <textarea
                    rows={4}
                    maxLength={250}
                    placeholder="Upload your favorite memory to the mainframe..."
                    value={bestMoment}
                    onChange={(e) => setBestMoment(e.target.value)}
                    className="w-full bg-black/40 backdrop-blur-sm border-2 border-purple-400/50 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 resize-none"
                    required
                  />
                  <div className="text-right text-xs text-gray-400">
                    {bestMoment.length}/250 characters
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-pink-300 font-bold text-lg tracking-wide">
                    → WISH TRANSMISSION PORTAL
                  </label>
                  <textarea
                    rows={4}
                    maxLength={250}
                    placeholder="Transmit your heartfelt wish across the digital cosmos..."
                    value={wish}
                    onChange={(e) => setWish(e.target.value)}
                    className="w-full bg-black/40 backdrop-blur-sm border-2 border-purple-400/50 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400/50 transition-all duration-300 resize-none"
                    required
                  />
                  <div className="text-right text-xs text-gray-400">
                    {wish.length}/250 characters
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-purple-500/30 transform hover:scale-105 transition-all duration-300 border border-purple-400/50 tracking-wide">
                  <span className="flex items-center justify-center space-x-2">
                    <span>TRANSMIT DATA</span>
                    <span className="text-xl">⚡</span>
                  </span>
                </button>

                {submitted && (
                  <div className="text-center p-4 bg-green-400/20 border border-green-400/50 rounded-2xl backdrop-blur-sm">
                    <p className="text-green-300 font-bold text-lg animate-pulse">
                      ✓ DATA SUCCESSFULLY TRANSMITTED ✓
                    </p>
                  </div>
                )}
              </div>

              {/* Unlock Section */}
              <div className="border-t border-cyan-400/30 pt-8">
                <div className="space-y-4">
                  <div className="text-center mb-4">
                    <p className="text-cyan-300 font-bold text-lg tracking-wide">
                      → ACCESS MEMORY VAULT
                    </p>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="password"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Enter access code..."
                      className="w-full bg-black/40 backdrop-blur-sm border-2 border-cyan-400/50 rounded-2xl px-4 py-3 text-center text-white placeholder-gray-400 focus:border-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 tracking-widest text-lg"
                      required
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleUnlock}
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-2xl shadow-lg shadow-cyan-500/30 transform hover:scale-105 transition-all duration-300 border border-cyan-400/50 tracking-wide">
                    <span className="flex items-center justify-center space-x-2">
                      <span>UNLOCK VAULT</span>
                      <span className="text-xl">🔓</span>
                    </span>
                  </button>

                  {error && (
                    <div className="text-center p-3 bg-red-500/20 border border-red-500/50 rounded-2xl backdrop-blur-sm">
                      <p className="text-red-300 font-bold animate-pulse">
                        ⚠️ {error} ⚠️
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={handleBackToForm}
                  className="bg-gradient-to-r from-purple-600/50 to-pink-600/50 hover:from-purple-500/50 hover:to-pink-500/50 text-white font-bold py-2 px-6 rounded-xl backdrop-blur-sm border border-purple-400/50 transition-all duration-300">
                  ← BACK TO TERMINAL
                </button>
                <div className="text-green-400 font-bold text-sm tracking-wide">
                  ● VAULT UNLOCKED ●
                </div>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent tracking-wide">
                  → MEMORY ARCHIVES ←
                </h3>
              </div>

              {entries.length === 0 ? (
                <div className="text-center p-8 bg-purple-500/20 border border-purple-400/50 rounded-2xl backdrop-blur-sm">
                  <p className="text-purple-300 text-lg">◊ NO DATA FOUND ◊</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Be the first to upload memories to the archive
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {entries.map(({ id, bestMoment, wish, createdAt }) => (
                    <div
                      key={id}
                      className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg border border-cyan-400/30 rounded-2xl p-6 shadow-lg shadow-cyan-400/10 hover:shadow-cyan-400/20 transition-all duration-300 hover:scale-[1.02]">
                      <div className="mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                          <span className="text-cyan-300 font-bold text-sm tracking-wide">
                            MEMORY DATA
                          </span>
                        </div>
                        <p className="text-white leading-relaxed bg-black/20 p-3 rounded-xl border border-cyan-400/20">
                          {bestMoment}
                        </p>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                          <span className="text-pink-300 font-bold text-sm tracking-wide">
                            WISH TRANSMISSION
                          </span>
                        </div>
                        <p className="text-white leading-relaxed bg-black/20 p-3 rounded-xl border border-pink-400/20">
                          {wish}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="text-xs text-gray-400 bg-black/30 px-3 py-1 rounded-full border border-gray-600/30">
                          {createdAt?.toDate
                            ? createdAt.toDate().toLocaleString()
                            : "TIMESTAMP_ERROR"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #06b6d4, #8b5cf6);
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0891b2, #7c3aed);
        }
      `}</style>
    </div>
  );
}
