import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Stars, Music, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const BirthdayMessage = () => {
  useEffect(() => {
    // Continuous confetti animation
    const interval = setInterval(() => {
      confetti({
        particleCount: 30,
        spread: 100,
        origin: { y: 0.6, x: Math.random() },
        colors: ['#ff69b4', '#ff1493', '#8B5CF6', '#D946EF'],
        disableForReducedMotion: true
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.8,
        type: "spring",
        bounce: 0.4
      }}
      className="relative max-w-md mx-auto"
    >
      {/* Memory Lane Button moved to component level for positioning in parent */}
      
      {/* Decorative elements around the letter */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity }} className="absolute -top-8 -right-8 z-10">
        <Heart className="text-red-400 w-10 h-10" />
      </motion.div>
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 10, repeat: Infinity }} className="absolute -bottom-8 -left-8 z-10">
        <Stars className="text-yellow-400 w-10 h-10" />
      </motion.div>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity }} className="absolute -top-8 -left-8 z-10">
        <Music className="text-blue-400 w-10 h-10" />
      </motion.div>
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 9, repeat: Infinity }} className="absolute -bottom-8 -right-8 z-10">
        <Sparkles className="text-violet-500 w-10 h-10" />
      </motion.div>

      {/* Letter background with "coffee stain" effect */}
      <div className="relative">
        <motion.div
          className="absolute inset-4 rounded-md bg-amber-800/10 blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />
        
        {/* Paper texture with handwritten style */}
        <motion.div
          className="relative p-8 rounded-lg bg-amber-50 shadow-lg overflow-hidden z-20 transform rotate-1"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                transparent, 
                transparent 28px, 
                #e5e7eb 29px
              )
            `,
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
          }}
        >
          {/* Decorative pin */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-red-400 to-pink-500 rounded-full border-2 border-white shadow-md z-30"></div>
          
          {/* Decorative tape */}
          <div className="absolute top-0 right-8 w-16 h-6 bg-blue-200/50 rotate-6 rounded-sm transform -translate-y-1"></div>
          <div className="absolute bottom-0 left-12 w-12 h-6 bg-pink-200/50 -rotate-12 rounded-sm transform translate-y-1"></div>
          
          {/* Coffee stain */}
          <div className="absolute right-2 bottom-10 w-16 h-16 rounded-full bg-amber-800/10 blur-xl"></div>
          
          {/* Glitter spots */}
          <motion.div
            className="absolute left-10 top-20 w-2 h-2 bg-purple-300 rounded-full"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute right-20 bottom-10 w-1 h-1 bg-blue-300 rounded-full"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          />
          
          {/* Handwritten content */}
          <div className="font-handwriting text-indigo-900 leading-7 relative z-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl text-center mb-6 font-bold"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Happy Birthday!
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-4"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              Hey bestie,
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mb-4 text-xl"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              On this special day, I wanted to let you know how much you mean to me. Your smile lights up even the darkest rooms.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mb-4 text-xl"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              Wishing you all the love, laughter and happiness on your birthday!
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-right mt-6 text-xl"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              With all my love,
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="text-right text-2xl"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Me ❤️
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BirthdayMessage;