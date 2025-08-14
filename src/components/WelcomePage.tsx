import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface WelcomePageProps {
  onStart: () => void;
}

const WelcomePage = ({ onStart }: WelcomePageProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-red-50 relative overflow-hidden">
      {/* Floating sparkles decoration */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0
          }}
          animate={{
            y: [null, -20, 0],
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3
          }}
        >
          <Sparkles className="w-6 h-6 text-pink-400/60" />
        </motion.div>
      ))}

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: [0, 0.71, 0.2, 1.01]
        }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-serif text-pink-600 mb-8 text-center relative"
          style={{
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          Happy Birthday Bestie
          <motion.div
            className="absolute -top-4 -right-4 text-pink-400"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            <Sparkles className="w-8 h-8" />
          </motion.div>
        </motion.h1>
        
        <Button 
          onClick={onStart}
          className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-4 rounded-full text-lg transition-all hover:scale-105 shadow-lg relative overflow-hidden mx-auto"
        >
          <span className="relative z-10">Let's get started</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 opacity-0"
            animate={{
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
        </Button>
      </motion.div>
    </div>
  );
};

export default WelcomePage;