import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TravelPromise = ({ onComplete }) => {
  const [clicked, setClicked] = useState(false);

  // Background travel emojis
  const travelIcons = [
    { icon: "🌍", x: 10, y: 15, scale: 1.5, rotate: 10 },
    { icon: "✈️", x: 80, y: 20, scale: 1.8, rotate: -15 },
    { icon: "🌴", x: 15, y: 80, scale: 1.6, rotate: -5 },
    { icon: "🌲", x: 85, y: 75, scale: 1.4, rotate: 5 },
    { icon: "✈️", x: 25, y: 10, scale: 1.2, rotate: 45 },
    { icon: "🌍", x: 75, y: 85, scale: 1.5, rotate: -20 },
  ];

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center z-10 w-full relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 1 }}
    >
      {/* Background elements specific to this page */}
      {travelIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute drop-shadow-md text-3xl md:text-5xl pointer-events-none opacity-40"
          style={{
            left: `${item.x}vw`,
            top: `${item.y}vh`,
            transform: `scale(${item.scale}) rotate(${item.rotate}deg)`,
          }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.icon}
        </motion.div>
      ))}

      <div className="glass max-w-lg w-full rounded-3xl p-8 relative box-glow z-20">
        <AnimatePresence mode="wait">
          {!clicked ? (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center"
            >
              <h2 className="text-3xl md:text-4xl font-playfair mb-8 text-gray-800 leading-snug">
                Promise me that we will travel Together! ✈️🌍
              </h2>
              
              <motion.button
                onClick={() => setClicked(true)}
                className="bg-blue-400 text-white px-10 py-4 rounded-full text-xl font-outfit shadow-lg hover:bg-blue-500 box-glow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Yes! ❤️
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="response"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              <h2 className="text-2xl font-playfair text-pink-600 font-bold mb-6 leading-relaxed">
                Sorry... I will follow you even if you don't promise me! 😂
              </h2>
              
              <motion.button
                onClick={onComplete}
                className="glass-dark px-6 py-3 mt-4 rounded-full text-lg font-outfit text-gray-800 shadow-md hover:bg-white/60 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue ✨
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TravelPromise;
