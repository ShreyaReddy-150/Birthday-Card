import React from "react";

const AlbumBackCover = () => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-pink-100 via-amber-50 to-purple-100 rounded-lg shadow-2xl relative overflow-hidden">
    {/* Closed book back */}
    <div className="absolute inset-10 border-8 border-amber-200 rounded-2xl pointer-events-none" style={{ boxShadow: "0 0 0 10px #ffe1fa, 0 0 0 16px #FDE1D3 inset" }}>
      {/* Decorative flourish */}
      <svg className="absolute left-4 top-4 w-14 h-14 text-amber-200 opacity-20" viewBox="0 0 24 24">
        <ellipse cx="12" cy="12" rx="10" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      </svg>
      <svg className="absolute right-4 bottom-4 w-14 h-14 text-amber-200 opacity-20" viewBox="0 0 24 24">
        <ellipse cx="12" cy="12" rx="10" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
      </svg>
    </div>
    {/* Message - keep within the yellow box */}
    <div className="relative z-10 flex flex-col items-center px-2 w-full">
      <div className="w-full h-full min-h-[180px] max-w-[410px] mx-auto px-4 py-7 flex flex-col items-center justify-center"
        style={{
          background: "rgba(255,255,255,0.77)",
          borderRadius: "1.25rem",
          border: "3.5px solid #fde68a",
          boxShadow: "0 2px 18px #fde68a40",
        }}
      >
        <p className="text-base md:text-lg text-pink-800 text-center font-serif leading-7 md:leading-8" style={{ fontFamily: "'Dancing Script', cursive" }}>
          This is just a glimpse of goodness and light that you have in and around you.
          <br /><br />
          There is so much more you need to experience and I hope you enjoy your life to the fullest!.
        </p>
        <div className="mt-5 text-pink-400/60 text-sm italic">Happy Birthday</div>
      </div>
    </div>
    {/* Extra elegant sparkles and fun */}
    <div className="absolute left-24 bottom-24 animate-pulse text-pink-200/50 text-2xl rotate-6">✦</div>
    <div className="absolute right-24 top-24 animate-bounce text-amber-400/50 text-3xl">✧</div>
    <div className="absolute right-12 bottom-8 animate-pulse text-purple-300/50 text-xl">★</div>
    <div className="absolute left-10 top-0 animate-bounce text-yellow-100/40 text-xl">✶</div>
    <div className="absolute inset-0 pointer-events-none z-0">
      {/* Shimmer overlay */}
      <div className="w-full h-full bg-gradient-to-tl from-purple-100/20 via-transparent to-amber-100/20" />
    </div>
  </div>
);

export default AlbumBackCover;