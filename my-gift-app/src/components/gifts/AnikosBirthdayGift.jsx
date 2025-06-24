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
import FavoriteIcon from "@mui/icons-material/Favorite";
import SendIcon from "@mui/icons-material/Send";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import StarIcon from "@mui/icons-material/Star";
import MessageIcon from "@mui/icons-material/Message";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

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
  const [showUnlockModal, setShowUnlockModal] = useState(false);

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
      setShowUnlockModal(false);
      setIsUnlocked(true);
      setError("");
    } else {
      setError("ACCESS DENIED! Try again.");
      setIsUnlocked(false);
    }
    setCode("");
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[repeating-linear-gradient(45deg,#ffb6c1_0px,#ffb6c1_8px,#fff_8px,#fff_16px,#ffb6c1_16px,#ffb6c1_24px,#fff_24px,#fff_32px)]">
      {/* Stars */}
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

      {/* FORM CONTAINER */}
      {!isUnlocked ? (
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
          <div className="bg-pink-200 border-4 border-black shadow-[6px_6px_0_#000] px-8 py-10 max-w-md w-full text-center">
            {/* Title */}
            <h1 className="text-4xl font-extrabold text-black mb-4 drop-shadow-md uppercase tracking-tight font-mono">
              Friendship Diary for Dealulu
            </h1>

            <p className="text-black mb-6 font-bold uppercase tracking-wide text-sm">
              Share a special memory with me!
            </p>

            {/* Confirmation Message */}
            {submitted ? (
              <div className="flex flex-col items-center justify-center space-y-4">
                <FavoriteIcon className="text-red-500 text-6xl animate-bounce" />
                <p className="text-black font-bold text-lg">
                  Thank you for sharing your memory!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-black text-pink-200 font-mono font-bold uppercase tracking-wide shadow-[3px_3px_0_#000] hover:bg-pink-200 hover:text-black transition">
                  Share Another
                </button>
              </div>
            ) : (
              <>
                {/* Input Fields */}
                <input
                  type="text"
                  placeholder="Enter your name..."
                  className="w-full mb-4 bg-white border-2 border-black text-black p-3 font-mono font-bold placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <textarea
                  rows={4}
                  placeholder="Tell me about your favorite memory..."
                  className="w-full mb-4 bg-white border-2 border-black text-black p-3 font-mono font-bold placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black resize-none"
                  value={memory}
                  onChange={(e) => setMemory(e.target.value)}
                />

                <textarea
                  rows={3}
                  placeholder="Write me a message..."
                  className="w-full mb-4 bg-white border-2 border-black text-black p-3 font-mono font-bold placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black resize-none"
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
                  className="w-full py-3 bg-black text-white border-2 border-white font-mono text-lg uppercase tracking-wider hover:bg-white hover:text-black transition-all shadow-[4px_4px_0_#000] disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <SendIcon className="animate-pulse" />
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <SendIcon />
                      Submit
                    </span>
                  )}
                </button>
              </>
            )}

            {/* Unlock Entries Button */}
            <div className="mt-10 pt-6 border-t-4 border-black">
              <button
                onClick={() => setShowUnlockModal(true)}
                className="w-full py-3 bg-black text-pink-200 border-2 border-white font-mono font-bold uppercase tracking-wide hover:bg-pink-200 hover:text-black transition-all shadow-[4px_4px_0_#000]">
                <span className="flex items-center justify-center gap-2">
                  <LockOpenIcon /> Unlock Entries
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-10">
          <div className="mb-6 bg-pink-100 border-2 border-black px-6 py-4 shadow-[5px_5px_0_#000] flex justify-between items-center">
            <p className="text-black font-extrabold uppercase tracking-wide text-lg">
              {wishes.length} {wishes.length === 1 ? "memory" : "memories"}{" "}
              shared
            </p>
            <button
              onClick={() => setIsUnlocked(false)}
              className="bg-black text-pink-200 px-4 py-2 font-bold uppercase tracking-wide shadow-[3px_3px_0_#000] hover:bg-pink-200 hover:text-black transition">
              <span className="flex items-center gap-2">
                <LockIcon /> Back to form
              </span>
            </button>
          </div>

          {loadingWishes ? (
            <div className="flex justify-center items-center h-20">
              <div className="w-10 h-10 border-t-4 border-black border-solid animate-spin" />
            </div>
          ) : wishes.length === 0 ? (
            <div className="text-black text-center font-bold flex items-center justify-center gap-2">
              <NoteAltIcon /> Be the first to share a memory!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {wishes.map(({ id, name, wish, memory, createdAt }) => (
                <div
                  key={id}
                  className="bg-pink-100 border-2 border-black shadow-[4px_4px_0_#000] p-4 text-left">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-black font-bold uppercase tracking-wide">
                      {name}
                    </p>
                    <span className="text-gray-500 text-sm">
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
                    <p className="text-black font-bold text-sm mb-1 flex items-center gap-2">
                      <StarIcon fontSize="small" /> Favorite Memory
                    </p>
                    <p className="text-black bg-white border-2 border-black font-mono p-2">
                      {memory}
                    </p>
                  </div>
                  <div>
                    <p className="text-black font-bold text-sm mb-1 flex items-center gap-2">
                      <MessageIcon fontSize="small" /> Message
                    </p>
                    <p className="text-black bg-white border-2 border-black font-mono p-2">
                      {wish}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Unlock Modal */}
      {showUnlockModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-pink-50 border-4 border-black shadow-[6px_6px_0_#000] p-6 max-w-sm w-full">
            <button
              onClick={() => setShowUnlockModal(false)}
              className="absolute top-3 right-4 text-black text-2xl font-bold hover:text-pink-800">
              ×
            </button>
            <h3 className="text-black font-extrabold uppercase tracking-wider mb-4 text-center">
              Enter the Magic Code
            </h3>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
              className="w-full p-3 text-center text-black font-mono font-bold border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
            {error && (
              <p className="text-red-500 text-sm text-center mt-2 animate-pulse">
                {error}
              </p>
            )}
            <button
              onClick={handleUnlock}
              className="mt-6 w-full py-3 bg-black hover:bg-pink-200 hover:text-black text-white font-bold uppercase transition shadow-[4px_4px_0_#000]">
              Unlock
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
