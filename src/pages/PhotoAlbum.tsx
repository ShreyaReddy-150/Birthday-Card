import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home, Repeat, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import firstPic from "../gallery/pic_1.png";
import secondPic from "../gallery/pic_2.png";
import thirdPic from "../gallery/pic_3.png";
import fourthPic from "../gallery/pic_4.png";
import fifthPic from "../gallery/pic_5.png";

// Define page content structure
interface AlbumPage {
  id: number;
  image: string;
  caption: string;
}

import AlbumCover from "@/components/AlbumCover";
import AlbumBackCover from "@/components/AlbumBackCover";

const PhotoAlbum = () => {
  // Sample album pages data
  const pages: AlbumPage[] = [
    { 
      id: 1, 
      image: firstPic,
      caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud "
    },
    { 
      id: 2, 
      image: secondPic,
      caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud "
    },
    { 
      id: 3, 
      image: thirdPic, 
      caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud"
    },
    { 
      id: 4, 
      image: fourthPic, 
      caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud "
    },
    { 
      id: 5, 
      image: fifthPic, 
      caption: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud "
    }
  ];

  // Total pages = 1 cover + album pages + 1 back cover
  const albumFlowTotalPages = pages.length + 2;

  // currentPageIndex: 0 (cover), 1-5 (album), 6 (back cover)
  const [currentPage, setCurrentPage] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('next');
  const [autoFlip, setAutoFlip] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoFlip) {
      interval = setInterval(() => {
        if (currentPage < albumFlowTotalPages - 1) {
          flipToNextPage();
        } else {
          setCurrentPage(0);
        }
      }, 5000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoFlip, currentPage, albumFlowTotalPages]);

  // Navigation adjusts for cover/back pages
  const flipToNextPage = () => {
    if (currentPage < albumFlowTotalPages - 1 && !flipping) {
      setFlipDirection('next');
      setFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev + 1);
        setFlipping(false);
      }, 600);
    }
  };

  const flipToPreviousPage = () => {
    if (currentPage > 0 && !flipping) {
      setFlipDirection('prev');
      setFlipping(true);
      setTimeout(() => {
        setCurrentPage((prev) => prev - 1);
        setFlipping(false);
      }, 600);
    }
  };

  const toggleAutoFlip = () => setAutoFlip((val) => !val);
  
  // New function to reset to cover page
  const goToCoverPage = () => {
    if (currentPage !== 0 && !flipping) {
      setFlipping(true);
      setTimeout(() => {
        setCurrentPage(0);
        setFlipping(false);
      }, 300);
    }
  };

  // Render by page index
  let leftPageContent: React.ReactNode = null;
  let rightPageContent: React.ReactNode = null;
  let showBookInside = false;

  if (currentPage === 0) {
    // COVER
    // Only render the cover as a single closed-book sized page, no background book
    leftPageContent = (
      <div className="flex-1 flex items-center justify-center h-full">
        <AlbumCover />
      </div>
    );
    rightPageContent = null;
    showBookInside = false;
  } else if (currentPage === albumFlowTotalPages - 1) {
    // BACK COVER
    leftPageContent = null;
    rightPageContent = (
      <div className="flex-1 flex items-center justify-center h-full">
        <AlbumBackCover />
      </div>
    );
    showBookInside = false;
  } else {
    // INSIDE Album
    showBookInside = true;
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-4 px-4 overflow-hidden">
      {/* Fixed-size decorative elements to prevent layout shifts */}
      <div className="relative">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`deco-${i}`}
            className="absolute pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}vh`,
              width: '24px',
              height: '24px',
              opacity: 0.3,
              zIndex: 1
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.4,
              repeatType: "loop"
            }}
          >
            {i % 2 === 0 ? (
              <div className="text-pink-300/30 text-2xl">❤</div>
            ) : (
              <Sparkles className="w-6 h-6 text-purple-300/40" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Decorative corners with fixed size */}
      <div className="fixed top-0 left-0 w-32 h-32 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full border-t-4 border-l-4 border-pink-400 rounded-tl-3xl" />
      </div>
      <div className="fixed top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full border-t-4 border-r-4 border-pink-400 rounded-tr-3xl" />
      </div>

      {/* Navigation header remains visible on all pages */}
      <div className="flex justify-between items-center mb-4 z-10">
        <Link to="/" className="z-10">
          <Button variant="outline" className="flex items-center gap-2 bg-white/80">
            <Home size={16} />
            Back Home
          </Button>
        </Link>
        
        {/* Make the title clickable to go to cover page */}
        <h1 
          className="text-3xl md:text-4xl text-center font-serif text-purple-700 cursor-pointer hover:text-purple-500 transition-colors"
          onClick={goToCoverPage}
        >
          Memory Book
        </h1>
        
        <Button 
          onClick={toggleAutoFlip} 
          variant={autoFlip ? "default" : "outline"}
          className={`z-10 ${autoFlip ? "bg-purple-500" : "bg-white/80"} flex items-center gap-2`}
        >
          <Repeat className={autoFlip ? "animate-spin" : ""} size={16} />
          {autoFlip ? "Stop Auto-Flip" : "Auto-Flip"}
        </Button>
      </div>

      {/* Book Navigation */}
      <div className="flex-1 relative flex items-center justify-center select-none">
        {/* Previous Button (always available except cover) */}
        <Button
          onClick={flipToPreviousPage}
          disabled={currentPage === 0 || flipping}
          variant="outline"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 h-12 w-12 rounded-full p-0"
          size="icon"
        >
          <ChevronLeft size={24} />
        </Button>

        {/* Next Button (always available except back cover) */}
        <Button
          onClick={flipToNextPage}
          disabled={currentPage === albumFlowTotalPages - 1 || flipping}
          variant="outline"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 h-12 w-12 rounded-full p-0"
          size="icon"
        >
          <ChevronRight size={24} />
        </Button>

        {/* Book with fixed dimensions */}
        <div className="relative w-full max-w-4xl h-[70vh] md:h-[80vh] max-h-[500px] perspective-1000">
          {/* Show no book background for the cover page */}
          {currentPage === 0 ? (
            <div className="flex items-center justify-center w-full h-full">
              <AlbumCover />
            </div>
          ) : currentPage === albumFlowTotalPages - 1 ? (
            <div className="flex items-center justify-center w-full h-full">
              <AlbumBackCover />
            </div>
          ) : (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[95%] h-full">
              {/* Book shadow */}
              <div className="absolute w-full h-full bg-black/20 rounded-lg blur-xl transform translate-y-5 scale-[0.9]"></div>
              {/* Book cover & inside */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-purple-700 rounded-lg shadow-2xl overflow-hidden">
                {/* Book spine */}
                <div className="absolute left-1/2 top-0 bottom-0 w-4 bg-gradient-to-b from-purple-800 via-purple-900 to-purple-800 shadow-inner transform -translate-x-1/2"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 top-[20%] w-2 h-20 bg-amber-300 rounded-full blur-[1px]"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 top-[60%] w-2 h-20 bg-amber-300 rounded-full blur-[1px]"></div>
                {/* Page area and inside pages */}
                <div className="absolute inset-8 rounded-lg overflow-hidden transform-style-3d">
                  {(showBookInside && currentPage > 0 && currentPage < albumFlowTotalPages - 1) && (
                    <>
                    {/* Left: photo */}
                    <div className="absolute left-0 w-[49%] h-full p-2 bg-amber-50 shadow-inner flex flex-col justify-center items-center rounded-l-lg border-r border-amber-200">
                      <div className="relative w-full h-full rounded-lg overflow-hidden border-8 border-amber-100/80">
                        <AnimatePresence mode="wait">
                          <motion.img 
                            key={`image-${currentPage}`}
                            src={pages[currentPage - 1]?.image} 
                            alt={`Memory ${currentPage}`}
                            className="w-full h-full object-cover"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                          />
                        </AnimatePresence>
                        {/* Corners */}
                        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-800/30"></div>
                        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-800/30"></div>
                        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-800/30"></div>
                        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-800/30"></div>
                      </div>
                    </div>
                    {/* Right: caption */}
                    <div className="absolute right-0 w-[49%] h-full p-4 bg-amber-50 shadow-inner flex flex-col justify-center items-center rounded-r-lg">
                      <div 
                        className="relative w-full h-full rounded-lg flex flex-col items-center justify-center p-6"
                        style={{
                          backgroundImage: `
                            repeating-linear-gradient(
                              transparent, 
                              transparent 30px, 
                              #e5e7eb 31px
                            )
                          `
                        }}  
                      >
                        {/* Page number */}
                        <div className="absolute top-0 right-0 text-right mb-2 text-gray-500 font-serif italic">
                          Page {currentPage} of {pages.length}
                        </div>
                        
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`caption-${currentPage}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-center my-auto"
                          >
                            <p 
                              className="text-xl md:text-2xl text-indigo-900 leading-relaxed md:leading-10"
                              style={{ fontFamily: "'Dancing Script', cursive", whiteSpace: 'pre-line' }}
                            >
                              {pages[currentPage - 1]?.caption}
                            </p>
                          </motion.div>
                        </AnimatePresence>
                        {/* Decorative element */}
                        <div className="absolute bottom-8 right-8 w-12 h-12 opacity-10 rotate-12">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    {/* Flipping page animation */}
                    {flipping && (
                      <div 
                        className={`absolute w-[49%] h-full bg-amber-50 origin-${flipDirection === 'next' ? 'left' : 'right'} shadow-lg rounded-${flipDirection === 'next' ? 'r' : 'l'}-lg z-10`}
                        style={{
                          right: flipDirection === 'next' ? 0 : 'auto',
                          left: flipDirection === 'next' ? 'auto' : 0,
                          animation: `flipPage${flipDirection === 'next' ? 'Forward' : 'Backward'} 0.6s ease-in-out`,
                          transformStyle: 'preserve-3d',
                          backfaceVisibility: 'hidden',
                          backgroundImage: `
                            repeating-linear-gradient(
                              transparent, 
                              transparent 30px, 
                              #e5e7eb 31px
                            )
                          `
                        }}
                      >
                        {/* Page fold shadow */}
                        <div 
                          className={`absolute top-0 ${flipDirection === 'next' ? 'left-0' : 'right-0'} h-full w-1/5 opacity-20`}
                          style={{
                            background: `linear-gradient(${flipDirection === 'next' ? 'to right' : 'to left'}, rgba(0,0,0,0.4), transparent)`,
                            boxShadow: `${flipDirection === 'next' ? '-' : ''}8px 0 10px rgba(0,0,0,0.05) inset`
                          }}
                        ></div>
                        {/* Page content - previous/next page content during animation */}
                        <div className="absolute inset-0 p-6 flex flex-col items-center justify-center">
                          {flipDirection === 'next' ? (
                            <p className="text-xl md:text-2xl text-indigo-900 text-center" style={{ fontFamily: "'Dancing Script', cursive", whiteSpace: 'pre-line' }}>
                              {pages[currentPage - 1]?.caption}
                            </p>
                          ) : (
                            <div className="w-[90%] h-[80%] border-8 border-amber-100/80 overflow-hidden">
                              <img 
                                src={pages[currentPage - 1]?.image} 
                                alt={`Memory ${currentPage}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    {/* Corner flip area */}
                    <div 
                      className="absolute bottom-0 right-0 w-16 h-16 cursor-pointer z-20"
                      onClick={flipToNextPage}
                      style={{
                        background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.1) 55%)'
                      }}
                    >
                      <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-br from-transparent to-amber-200 rounded-tl-lg shadow-inner"></div>
                    </div>
                  </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed-size decorative elements at bottom */}
      <div className="fixed bottom-4 left-4 text-purple-300/20 text-6xl pointer-events-none">
        ✨
      </div>
      <div className="fixed bottom-4 right-4 text-pink-300/20 text-6xl pointer-events-none">
        ❤
      </div>
    </div>
  );
};

export default PhotoAlbum;