export default function ElevenModal({ open, setOpen }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-[#FFF2E3] border border-black w-[340px] sm:w-[400px] rounded-sm shadow-2xl">
        {/* Modal Header */}
        <div className="flex justify-between items-center px-4 py-2 bg-gradient-to-r from-[#B0003A] to-[#061956] text-white">
          <div className="text-sm font-bold">⚠️</div>
          <button
            onClick={() => setOpen(false)}
            className="text-white font-bold text-lg leading-none">
            X
          </button>
        </div>

        {/* Modal Body */}
        <div className="text-black px-6 py-6 text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <div className="text-lg font-semibold mb-1">It’s 11:11!</div>
          <div className="text-sm">Make a wish to make it count++!</div>

          <div className="mt-6 flex justify-between gap-4">
            <button
              onClick={() => setOpen(false)}
              className="w-1/2 border border-black py-1 text-sm">
              OK
            </button>
            <button
              onClick={() => setOpen(false)}
              className="w-1/2 border border-black py-1 text-sm">
              LATER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
