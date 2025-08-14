import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
interface EnvelopeProps {
  onOpen: () => void;
  isOpen: boolean;
}
const Envelope = ({
  onOpen,
  isOpen
}: EnvelopeProps) => {
  return <motion.div className="relative w-96 h-64 mx-auto cursor-pointer" onClick={onOpen} animate={{
    y: [0, -8, 0]
  }} transition={{
    y: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }} whileHover={{
    z: 20,
    rotateY: [-5, 5, -5],
    transition: {
      rotateY: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }}>
      <motion.div className="absolute inset-0 flex items-center justify-center" initial={false} animate={{
      scale: isOpen ? 0.8 : 1
    }} transition={{
      duration: 0.7,
      type: "spring",
      stiffness: 80
    }}>
        <div className="relative w-full h-full bg-[#FFE4E8] rounded-lg border-2 border-[#ea384c]/30 flex items-center justify-center shadow-lg">
          {/* Diagonal lines */}
          <div className="absolute top-0 left-0 w-[70.7%] h-[2px] bg-[#ea384c]/60 transform rotate-45 origin-top-left" />
          <div className="absolute top-0 right-0 w-[70.7%] h-[2px] bg-[#ea384c]/60 transform -rotate-45 origin-top-right" />
          
          {/* Heart */}
          <Heart className="w-16 h-16 text-[#ea384c]" fill="#ea384c" />
          
          {/* Handwritten "Open me" text */}
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.3
        }} style={{
          fontFamily: "'Dancing Script', cursive"
        }} className="absolute mt-48 font-[Dancing_Script] text-2xl text-[#ea384c]">
            Open me
          </motion.div>
        </div>
      </motion.div>
    </motion.div>;
};
export default Envelope;