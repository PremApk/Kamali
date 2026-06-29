import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const Landing = ({ onStart }) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h2 className="text-2xl md:text-3xl text-gray-600 mb-2 font-outfit font-light">
          Happy Birthday
        </h2>
        <h1 className="text-6xl md:text-7xl font-great-vibes text-glow text-[#ff6b81] mb-8">
          Kamali <FaHeart className="inline text-4xl text-red-400 animate-pulse" />
        </h1>
      </motion.div>

      <motion.p 
        className="text-lg md:text-xl text-gray-700 font-playfair italic mb-12 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        "Someone has something special to tell you..."
      </motion.p>

      <motion.button
        onClick={onStart}
        className="glass-dark px-8 py-4 rounded-full text-xl font-outfit text-gray-800 shadow-lg flex items-center gap-3 hover:scale-105 active:scale-95 transition-all box-glow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 1, type: "spring" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Open My Heart <FaHeart className="text-red-500" />
      </motion.button>
    </motion.div>
  );
};

export default Landing;
