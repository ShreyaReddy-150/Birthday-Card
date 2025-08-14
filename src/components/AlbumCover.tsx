import React from "react";

// Make sure the image is in the correct place; change the filename as needed!
const COVER_IMG = "/src/gallery/cover_img.PNG"; // Replace with your uploaded image filename if needed

const AlbumCover = () => <div className="relative flex flex-col items-center justify-end bg-gradient-to-br from-purple-500 via-purple-400 to-purple-600 border-4 border-yellow-300 rounded-r-2xl rounded-l-lg shadow-xl" style={{
  width: "100%",
  minWidth: 220,
  maxWidth: 260,
  minHeight: 360,
  maxHeight: 420,
  aspectRatio: "3/4",
  boxShadow: "0 4px 28px 0 #e9d96e60"
}}>
    {/* Engraved border */}
    <div className="absolute inset-2 rounded-2xl border-4 border-yellow-200 pointer-events-none z-10" style={{
    boxShadow: "0 0 0 8px #fde68a44, 0 0 0 12px #e8c95744 inset"
  }} />
    {/* Cover "postcard" image - centered, slightly to the left and above the text */}
    <div className="mt-14 mb-3 relative z-20 flex flex-col items-center" style={{
    left: "-10px"
  }}>
      <div className="bg-white/80 border-2 border-yellow-200 shadow-lg rounded-xl w-28 h-20 flex items-center justify-center overflow-hidden mt-[76px] mb-[55px] ml-[19px]">
        <img src={COVER_IMG} alt="Cute cover" className="w-full h-full object-cover object-center rounded-xl" draggable={false} />
      </div>
    </div>
    {/* Cover title text - handwritten style */}
    <h1 className="z-20 text-white text-2xl font-bold text-center drop-shadow-lg font-serif tracking-wide mb-20 px-3" style={{
    fontFamily: "'Dancing Script', cursive",
    letterSpacing: "0.5px",
    textShadow: "0 2px 10px #9a73e6, 0 1px 1px #fff8"
  }}>
      {"let's see some"} <br/> {"cute pics"}
    </h1>
  </div>;
export default AlbumCover;