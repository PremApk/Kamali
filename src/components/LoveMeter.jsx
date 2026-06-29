import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const LoveMeter = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  useEffect(() => {
    let interval;
    if (percent < 100) {
      interval = setInterval(() => {
        setPercent(prev => {
          const increment = Math.random() * 5 + 2;
          const next = prev + increment;
          if (next >= 100) {
            clearInterval(interval);
            setTimeout(() => setShowGallery(true), 1000);
            return 100;
          }
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [percent]);

  const placeholderImages = [
    'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1520623253272-358ccfc6cb03?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=400&q=80',
  ];

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center z-10 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1 }}
    >
      <motion.div 
        className="flex flex-col items-center glass p-10 rounded-3xl box-glow max-w-sm w-full"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        <h2 className="text-2xl font-playfair mb-6 text-gray-800">Calculating my love for you...</h2>
        
        <div className="relative w-40 h-40 flex items-center justify-center mb-6">
          <FaHeart className="text-gray-200 absolute w-full h-full drop-shadow-md" />
          <motion.div 
            className="absolute bottom-0 w-full overflow-hidden flex justify-center items-end"
            style={{ height: `${percent}%` }}
            transition={{ ease: "linear" }}
          >
            <FaHeart className="text-pink-500 w-40 h-40 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" style={{ position: 'absolute', bottom: 0 }} />
          </motion.div>
          
          <div className="z-10 text-xl font-bold text-white drop-shadow-md">
            {Math.floor(percent)}%
          </div>
        </div>
        
        {percent === 100 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="text-4xl font-great-vibes text-pink-600 font-bold">
              Infinity ❤️
            </div>
            <motion.button
              onClick={onComplete}
              className="glass-dark px-6 py-3 mt-4 rounded-full text-lg font-outfit text-gray-800 shadow-md flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all box-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              And guess what? <FaHeart className="text-red-500 animate-pulse text-sm" />
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default LoveMeter;
