import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import WelcomePage from '@/components/WelcomePage';
import Envelope from '@/components/Envelope';
import BirthdayMessage from '@/components/BirthdayMessage';
import { motion } from 'framer-motion';
import { RefreshCcw, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  useEffect(() => {
    // Immediate confetti animation when the page loads
    if (!showEnvelope) {
      // Initial confetti burst
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { x: 0.3, y: 0.6 }, // Moved to the left side
        colors: ['#ff69b4', '#ff1493', '#ff0000', '#ffc0cb']
      });
      
      // Continuous confetti animation every 3 seconds
      const interval = setInterval(() => {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { x: 0.3, y: 0.6 }, // Moved to the left side
          colors: ['#ff69b4', '#ff1493', '#ff0000', '#ffc0cb']
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [showEnvelope]);

  const handleStart = () => {
    setShowEnvelope(true);
  };

  const handleEnvelopeOpen = () => {
    if (!isEnvelopeOpen) {
      setIsEnvelopeOpen(true);
      // Heart burst effect with multiple colors
      const colors = ['#FFB7C5', '#89CFF0', '#FFD700', '#9B59B6'];
      confetti({
        particleCount: 60,
        angle: 90,
        spread: 360,
        origin: { x: 0.5, y: 0.5 },
        colors: colors,
        shapes: ['heart'],
      });
    }
  };

  const handleStartOver = () => {
    setShowEnvelope(false);
    setIsEnvelopeOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 birthday-cursor relative overflow-hidden">
      {/* Background decoration */}
      {showEnvelope && [...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0
          }}
          animate={{
            y: [null, -30, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.4
          }}
        >
          <Sparkles className={`w-8 h-8 ${i % 2 === 0 ? 'text-pink-300' : 'text-purple-300'}`} />
        </motion.div>
      ))}

      {/* Floating hearts background */}
      {showEnvelope && [...Array(6)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute text-pink-200/30 text-6xl"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100
          }}
          animate={{
            y: -100,
            x: Math.sin(i) * 50 + (Math.random() * window.innerWidth)
          }}
          transition={{
            duration: 7 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.8
          }}
        >
          ❤
        </motion.div>
      ))}

      {/* Navigation buttons with updated positioning */}
      {isEnvelopeOpen && (
        <div className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              onClick={handleStartOver}
              className="bg-gradient-to-r from-violet-400 to-indigo-400 hover:from-violet-500 hover:to-indigo-500 text-white"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Start Over
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/photo-album">
              <Button 
                className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-500 hover:to-pink-500 text-white"
              >
                Memory Lane
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      )}
      
      {/* Start Over Button for envelope only (not letter) */}
      {(showEnvelope && !isEnvelopeOpen) && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 left-4 z-50"
        >
          <Button
            onClick={handleStartOver}
            className="bg-gradient-to-r from-violet-400 to-indigo-400 hover:from-violet-500 hover:to-indigo-500 text-white"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Start Over
          </Button>
        </motion.div>
      )}

      {!showEnvelope ? (
        <WelcomePage onStart={handleStart} />
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen flex flex-col items-center justify-center p-4 relative"
        >
          {!isEnvelopeOpen && <Envelope onOpen={handleEnvelopeOpen} isOpen={isEnvelopeOpen} />}
          {isEnvelopeOpen && (
            <motion.div
              initial={{ scale: 0.5, y: 0 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="fixed inset-0 flex items-center justify-center"
            >
              <BirthdayMessage />
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Index;