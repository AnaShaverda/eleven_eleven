"use client";
import { useState } from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1847] via-[#2d1b69] to-[#8b3a62] relative overflow-hidden">
      {/* Browser-like frame */}
      <div className="absolute inset-4 border-2 border-white/20 rounded-lg"></div>
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}></div>

      {/* Scattered Stars */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 text-white text-xs">✦</div>
        <div className="absolute top-32 right-32 text-white text-sm">✦</div>
        <div className="absolute top-48 left-1/4 text-white text-xs">✦</div>
        <div className="absolute top-64 right-1/4 text-white text-sm">✦</div>
        <div className="absolute bottom-32 left-16 text-white text-xs">✦</div>
        <div className="absolute bottom-48 right-20 text-white text-sm">✦</div>
        <div className="absolute top-1/3 right-1/3 text-white text-xs">✦</div>
        <div className="absolute bottom-1/3 left-1/3 text-white text-sm">✦</div>
      </div>

      {/* Header */}
      <header className="relative z-20 p-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Menu Icon */}
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 flex flex-col justify-center gap-1">
              <div className="w-full h-0.5 bg-white"></div>
              <div className="w-full h-0.5 bg-white"></div>
              <div className="w-full h-0.5 bg-white"></div>
            </div>
            <div className="text-white text-2xl">✦</div>
          </div>

          {/* Navigation - Centered */}
          {/* Added 'hidden' and 'sm:flex' here */}
          <nav className="hidden sm:flex items-center gap-8 text-white text-sm">
            {/* <div className="text-white text-2xl">✦</div> */}

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

          {/* Search - Larger Width */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 border border-white/20 min-w-[200px]">
            <svg
              className="w-4 h-4 text-white"
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
            <span className="text-white text-sm">Search</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-12">
        {/* Logo */}
        <div
          className="text-white font-bold mb-16 tracking-wider sevillana-font
                text-6xl sm:text-7xl md:text-8xl">
          11:11
        </div>
        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mb-16">
          {[
            {
              title: "Website Creation",
              desc: "Custom responsive websites",
              color: "bg-yellow-200",
              tab: "bg-yellow-300",
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9a9 9 0 01-9-9m9 9c0 5-4 9-9 9s-9-4-9-9m9 9a9 9 0 019-9m-9 9a9 9 0 01-9-9m9-9a9 9 0 00-9 9m9-9c0-5 4-9 9-9s9 4 9 9"
                  />
                </svg>
              ),
            },
            {
              title: "Brand Design",
              desc: "Logo & identity kits",
              color: "bg-pink-200",
              tab: "bg-pink-300",
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 21h10a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v7z"
                  />
                </svg>
              ),
            },
            {
              title: "Digital Gifts",
              desc: "Interactive birthday & wedding gifts",
              color: "bg-blue-200",
              tab: "bg-blue-300",
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
              ),
            },
            {
              title: "Consultations",
              desc: "Talk through your ideas with us",
              color: "bg-green-200",
              tab: "bg-green-300",
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              ),
            },
            {
              title: "App Development",
              desc: "Mobile & web applications",
              color: "bg-purple-200",
              tab: "bg-purple-300",
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z"
                  />
                </svg>
              ),
            },
            {
              title: "SEO Services",
              desc: "Search engine optimization",
              color: "bg-orange-200",
              tab: "bg-orange-300",
              icon: (
                <svg
                  className="w-6 h-6"
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
              ),
            },
            {
              title: "Content Writing",
              desc: "Blog posts & copywriting",
              color: "bg-red-200",
              tab: "bg-red-300",
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              ),
            },
            {
              title: "Social Media",
              desc: "Strategy & management",
              color: "bg-cyan-200",
              tab: "bg-cyan-300",
              icon: (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              ),
            },
          ].map((item, index) => (
            <div
              key={index}
              className="relative cursor-pointer hover:scale-105 hover:-translate-y-2 transition-all duration-300 group w-60 mx-auto">
              {/* Folder Tab */}
              <div
                className={`absolute -top-3 left-4 w-20 h-6 ${item.tab} rounded-t-lg z-10 shadow-lg border-l border-r border-t border-black/10 flex items-center justify-center`}>
                <div className="w-3 h-1 bg-black/20 rounded-full"></div>
              </div>

              {/* Main Folder Body */}
              <div
                className={`${item.color} rounded-b-lg rounded-tr-lg border border-black/10 shadow-xl p-5 pt-8 relative overflow-hidden group-hover:shadow-2xl transition-shadow duration-300 h-40 flex flex-col`}>
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>

                {/* Content */}
                <div className="relative z-10 flex-1 flex flex-col">
                  <div className="text-3xl mb-3 flex items-center gap-2">
                    <span className="text-gray-700">{item.icon}</span>
                    <span className="font-bold text-gray-800">
                      {item.title.split(" ")[0]}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {item.title.split(" ").slice(1).join(" ")}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed flex-1">
                    {item.desc}
                  </p>
                </div>

                {/* Corner fold effect */}
                <div className="absolute top-0 right-0 w-6 h-6 bg-black/5 transform rotate-45 translate-x-3 -translate-y-3"></div>
              </div>

              {/* Shadow depth effect */}
              <div
                className={`absolute inset-0 ${item.color} rounded-b-lg rounded-tr-lg transform translate-x-1 translate-y-1 -z-10 opacity-30`}></div>
            </div>
          ))}
        </div>

        {/* Bottom Tagline */}
        <div className="text-white text-xl font-light tracking-wide">
          Make it count++
        </div>
      </div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-center">
        <div className="w-16 h-8 bg-gradient-to-t from-pink-400/30 to-transparent rounded-t-full"></div>
        <div className="w-12 h-6 bg-gradient-to-t from-pink-400/20 to-transparent rounded-t-full ml-2"></div>
      </div>
    </div>
  );
}
