import { useEffect, useState } from "react";

export default function FeelingsModal() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 20 ? 0 : prev + 1));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full px-4 flex justify-center">
      <div className="bg-[#FFF2E3] border border-black w-full max-w-sm sm:max-w-md rounded-sm shadow-2xl mt-12 sm:mt-16">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-2 bg-gradient-to-r from-[#B0003A] to-[#061956] text-white">
          <div className="text-xs sm:text-sm font-bold">🖤</div>
          <button
            disabled
            className="text-white font-bold text-base sm:text-lg leading-none">
            X
          </button>
        </div>

        {/* Body */}
        <div className="text-black px-4 py-6 text-center">
          <p className="text-sm sm:text-md font-semibold mb-4">
            Feelings are loading....
          </p>

          {/* Animated progress bar */}
          <div className="relative bg-white rounded-md border border-pink-500 inline-block p-1 shadow-md">
            <div className="flex gap-[2px]">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 sm:w-3 h-5 sm:h-6 rounded-sm transition-colors duration-150 ${
                    i <= progress ? "bg-pink-600" : "bg-pink-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="mt-6 text-xs sm:text-sm font-medium">Please Wait...</p>
        </div>
      </div>
    </div>
  );
}
