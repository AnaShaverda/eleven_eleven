"use client";
import { useState } from "react";

export default function BirthdayLanding() {
  const [selectedGift, setSelectedGift] = useState(null);
  const [showCode, setShowCode] = useState(false);

  const gifts = [
    {
      id: 1,
      title: "💖 FRIENDSHIP DIARY",
      description:
        "A digital vault where your friends can leave their favorite memories and heartfelt wishes",
      color: "from-pink-500 to-purple-600",
      icon: "📚",
      features: [
        "Memory Bank",
        "Wish Portal",
        "Secret Vault",
        "Real-time Updates",
      ],
    },
    {
      id: 2,
      title: "🎉 PARTY MEMORIES",
      description:
        "Collect photos, videos, and messages from your special celebration",
      color: "from-cyan-500 to-blue-600",
      icon: "🎊",
      features: [
        "Photo Gallery",
        "Video Messages",
        "Party Timeline",
        "Guest Book",
      ],
    },
    {
      id: 3,
      title: "🌟 BIRTHDAY WISHES",
      description:
        "A cosmic collection of birthday wishes from everyone who loves you",
      color: "from-green-500 to-teal-600",
      icon: "⭐",
      features: [
        "Wish Collection",
        "Star Ratings",
        "Surprise Reveals",
        "Magic Moments",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-40 h-40 bg-pink-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-60 right-32 w-32 h-32 bg-cyan-400 rounded-full blur-2xl opacity-30 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/3 w-48 h-48 bg-purple-500 rounded-full blur-3xl opacity-25 animate-pulse"></div>
        <div className="absolute bottom-60 right-1/4 w-36 h-36 bg-green-400 rounded-full blur-2xl opacity-20 animate-bounce"></div>

        {/* Cosmic Grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 grid-rows-12 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="border border-cyan-300"></div>
            ))}
          </div>
        </div>

        {/* Shooting Stars */}
        <div className="absolute top-1/4 left-0 w-2 h-2 bg-white rounded-full animate-ping opacity-60"></div>
        <div
          className="absolute top-3/4 right-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-80"
          style={{ animationDelay: "1s" }}></div>
        <div
          className="absolute top-1/2 left-1/4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping opacity-70"
          style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <h1 className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4 tracking-wider animate-pulse">
              BIRTHDAY
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-green-400 to-pink-400 bg-clip-text text-transparent mb-6 tracking-widest">
              PRESENTS
            </h2>
          </div>

          <div className="backdrop-blur-xl bg-black/20 rounded-3xl border border-cyan-400/30 shadow-2xl shadow-cyan-400/20 p-8 max-w-4xl mx-auto mb-12">
            <p className="text-2xl text-white mb-6 leading-relaxed">
              Welcome to the{" "}
              <span className="text-cyan-300 font-bold">
                DIGITAL CELEBRATION ZONE
              </span>
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Your friends have prepared something special in this
              retro-futuristic universe. Choose your adventure and discover the
              memories, wishes, and surprises waiting for you!
            </p>
          </div>

          {/* Pulsing Indicators */}
          <div className="flex justify-center space-x-4 mb-8">
            <div className="w-4 h-4 bg-pink-400 rounded-full animate-ping"></div>
            <div
              className="w-4 h-4 bg-cyan-400 rounded-full animate-ping"
              style={{ animationDelay: "0.3s" }}></div>
            <div
              className="w-4 h-4 bg-green-400 rounded-full animate-ping"
              style={{ animationDelay: "0.6s" }}></div>
            <div
              className="w-4 h-4 bg-purple-400 rounded-full animate-ping"
              style={{ animationDelay: "0.9s" }}></div>
          </div>
        </div>

        {/* Gift Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {gifts.map((gift) => (
            <div
              key={gift.id}
              className={`group backdrop-blur-xl bg-black/20 rounded-3xl border border-cyan-400/30 shadow-2xl shadow-cyan-400/10 p-8 hover:shadow-cyan-400/30 hover:scale-105 transition-all duration-500 cursor-pointer ${
                selectedGift?.id === gift.id
                  ? "ring-4 ring-cyan-400/50 scale-105"
                  : ""
              }`}
              onClick={() => setSelectedGift(gift)}>
              <div className="text-center mb-6">
                <div className="text-6xl mb-4 group-hover:animate-bounce">
                  {gift.icon}
                </div>
                <h3
                  className={`text-2xl font-bold bg-gradient-to-r ${gift.color} bg-clip-text text-transparent mb-3 tracking-wide`}>
                  {gift.title}
                </h3>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6 text-center">
                {gift.description}
              </p>

              <div className="space-y-2">
                {gift.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-cyan-300 text-sm font-medium tracking-wide">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-cyan-400/20">
                <button
                  className={`w-full bg-gradient-to-r ${gift.color} hover:opacity-90 text-white font-bold py-3 px-6 rounded-2xl shadow-lg transform group-hover:scale-105 transition-all duration-300 tracking-wide`}>
                  ENTER {gift.icon}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Gift Details */}
        {selectedGift && (
          <div className="max-w-4xl mx-auto backdrop-blur-xl bg-black/30 rounded-3xl border border-cyan-400/40 shadow-2xl shadow-cyan-400/20 p-8 mb-12">
            <div className="text-center mb-8">
              <h3
                className={`text-4xl font-bold bg-gradient-to-r ${selectedGift.color} bg-clip-text text-transparent mb-4 tracking-wide`}>
                {selectedGift.title} ACTIVATED
              </h3>
              <p className="text-xl text-gray-300 leading-relaxed">
                {selectedGift.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-cyan-300 font-bold text-lg tracking-wide">
                  → FEATURES UNLOCKED
                </h4>
                {selectedGift.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 bg-black/20 p-3 rounded-xl border border-cyan-400/20">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="text-pink-300 font-bold text-lg tracking-wide">
                  → ACCESS PORTAL
                </h4>
                <div className="bg-black/20 p-6 rounded-xl border border-pink-400/20">
                  <p className="text-gray-300 mb-4">
                    Ready to enter the digital celebration zone?
                  </p>
                  <button
                    onClick={() => setShowCode(!showCode)}
                    className={`w-full bg-gradient-to-r ${selectedGift.color} hover:opacity-90 text-white font-bold py-4 px-6 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 tracking-wide`}>
                    {showCode ? "HIDE ACCESS CODE" : "REVEAL ACCESS CODE"}
                  </button>

                  {showCode && (
                    <div className="mt-4 p-4 bg-green-400/20 border border-green-400/50 rounded-xl backdrop-blur-sm">
                      <p className="text-green-300 font-bold text-center text-2xl tracking-widest animate-pulse">
                        1293
                      </p>
                      <p className="text-green-200 text-sm text-center mt-2">
                        Use this code to unlock your memories
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center backdrop-blur-xl bg-black/20 rounded-3xl border border-purple-400/30 shadow-2xl shadow-purple-400/20 p-8 max-w-2xl mx-auto">
          <h4 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 tracking-wide">
            🎂 HAPPY BIRTHDAY 🎂
          </h4>
          <p className="text-gray-300 leading-relaxed">
            Your friends have created something magical in this digital space.
            Each gift contains real memories, heartfelt wishes, and surprises
            crafted just for you.
          </p>
          <div className="flex justify-center space-x-2 mt-6">
            <div className="w-3 h-3 bg-pink-400 rounded-full animate-ping"></div>
            <div
              className="w-3 h-3 bg-cyan-400 rounded-full animate-ping"
              style={{ animationDelay: "0.2s" }}></div>
            <div
              className="w-3 h-3 bg-green-400 rounded-full animate-ping"
              style={{ animationDelay: "0.4s" }}></div>
            <div
              className="w-3 h-3 bg-purple-400 rounded-full animate-ping"
              style={{ animationDelay: "0.6s" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
