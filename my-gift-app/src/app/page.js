"use client";
import { useState } from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a237e] via-[#4a148c] to-[#880e4f] relative overflow-hidden">
      {/* Browser-like frame with rounded corners - Hidden on mobile */}
      <div className="absolute inset-2 sm:inset-8 border-2 border-white/30 rounded-xl sm:rounded-3xl backdrop-blur-sm bg-white/5 hidden sm:block"></div>

      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}></div>

      {/* Scattered Stars and Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-16 left-20 text-white text-lg">✦</div>
        <div className="absolute top-32 right-32 text-white text-sm">+</div>
        <div className="absolute top-48 left-1/4 text-white text-lg">✦</div>
        <div className="absolute top-64 right-1/4 text-white text-sm">+</div>
        <div className="absolute bottom-32 left-16 text-white text-lg">✦</div>
        <div className="absolute bottom-48 right-20 text-white text-sm">+</div>
        <div className="absolute top-1/3 right-1/3 text-white text-lg">✦</div>
        <div className="absolute bottom-1/3 left-1/3 text-white text-sm">+</div>

        {/* 3D cube shapes */}
        <div className="absolute top-40 right-16 w-8 h-8 bg-gradient-to-br from-pink-400/40 to-purple-600/40 transform rotate-45 rounded-sm"></div>
        <div className="absolute bottom-40 left-32 w-6 h-6 bg-gradient-to-br from-blue-400/40 to-purple-600/40 transform rotate-12 rounded-sm"></div>
      </div>

      {/* Header - Browser-like */}
      <header className="relative z-20 p-4 sm:p-12 lg:p-12">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Browser Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-white text-base sm:text-lg font-semibold ml-2 sm:ml-4">
              ELEVEN
            </div>
          </div>

          {/* Navigation - Tablet and Desktop */}
          <nav className="hidden sm:flex items-center gap-8 text-white text-sm font-medium">
            <a href="#" className="hover:text-gray-300 transition-colors">
              Home
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              About Us
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              Contact Us
            </a>
          </nav>

          {/* Burger Menu - Mobile Only */}
          <button className="sm:hidden flex flex-col gap-1 p-2">
            <div className="w-5 h-0.5 bg-white rounded"></div>
            <div className="w-5 h-0.5 bg-white rounded"></div>
            <div className="w-5 h-0.5 bg-white rounded"></div>
          </button>

          {/* Empty space for balance - Tablet and Desktop */}
          <div className="hidden sm:block w-32"></div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-2 sm:py-4 lg:py-8 pb-16 sm:pb-8">
        {/* Logo in rounded rectangle */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 sm:px-8 py-3 sm:py-4 mb-4 sm:mb-6 lg:mb-8">
          <div className="text-white font-bold text-3xl sm:text-4xl tracking-wider">
            11:11
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-white/20 mb-6 sm:mb-8 lg:mb-12 w-full max-w-xs sm:max-w-md">
          <span className="text-white/70 text-xs sm:text-sm flex-1 truncate">
            Make it count++
          </span>
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-white/70 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Folder Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto mb-8 sm:mb-4">
          {[
            {
              title: "Friendship Diary",
              gradient: "from-pink-400 to-red-500",
              shadowColor: "shadow-pink-500/20",
            },
            {
              title: "Birthday wishes",
              gradient: "from-cyan-400 to-blue-500",
              shadowColor: "shadow-blue-500/20",
            },
            {
              title: "Wedding",
              gradient: "from-orange-400 to-yellow-500",
              shadowColor: "shadow-orange-500/20",
            },
            {
              title: "Corporate Party",
              gradient: "from-purple-400 to-indigo-500",
              shadowColor: "shadow-purple-500/20",
            },
            {
              title: "Love at First Sight",
              gradient: "from-red-400 to-pink-500",
              shadowColor: "shadow-red-500/20",
            },
            {
              title: "Memories In Notes",
              gradient: "from-green-400 to-teal-500",
              shadowColor: "shadow-green-500/20",
            },
            {
              title: "Photo Album of Memories",
              gradient: "from-pink-500 to-purple-500",
              shadowColor: "shadow-pink-500/20",
            },
            {
              title: "Custom",
              gradient: "from-yellow-400 to-orange-500",
              shadowColor: "shadow-yellow-500/20",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center group cursor-pointer hover:scale-105 transition-all duration-300">
              {/* 3D Folder Icon */}
              <div className="relative mb-2 sm:mb-3">
                {/* Main folder body */}
                <div
                  className={`w-16 sm:w-20 h-12 sm:h-16 bg-gradient-to-br ${item.gradient} rounded-lg ${item.shadowColor} shadow-xl relative overflow-hidden`}>
                  {/* Folder tab */}
                  <div
                    className={`absolute -top-1.5 sm:-top-2 left-1.5 sm:left-2 w-6 sm:w-8 h-3 sm:h-4 bg-gradient-to-br ${item.gradient} rounded-t-lg`}></div>

                  {/* Document lines inside folder */}
                  <div className="absolute inset-0 p-1.5 sm:p-2 flex flex-col justify-center gap-0.5 sm:gap-1">
                    <div className="w-3/4 h-0.5 bg-white/40 rounded"></div>
                    <div className="w-full h-0.5 bg-white/40 rounded"></div>
                    <div className="w-2/3 h-0.5 bg-white/40 rounded"></div>
                  </div>

                  {/* Glossy effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-lg"></div>
                </div>

                {/* 3D depth effect */}
                <div
                  className={`absolute top-0.5 sm:top-1 left-0.5 sm:left-1 w-16 sm:w-20 h-12 sm:h-16 bg-gradient-to-br ${item.gradient} opacity-30 rounded-lg -z-10`}></div>
              </div>

              {/* Label */}
              <span className="text-white text-xs sm:text-sm font-medium text-center leading-tight max-w-16 sm:max-w-20">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Background mountain silhouette */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <div
          className="w-64 h-32 bg-gradient-to-t from-purple-600/20 to-transparent"
          style={{
            clipPath:
              "polygon(20% 100%, 40% 60%, 60% 80%, 80% 40%, 100% 100%, 0% 100%)",
          }}></div>
      </div>
    </div>
  );
}
