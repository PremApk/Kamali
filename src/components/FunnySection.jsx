import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FunnySection = ({ onComplete }) => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noClickCount, setNoClickCount] = useState(0);
  const [success, setSuccess] = useState(false);
  const containerRef = useRef(null);

  const moveNoButton = () => {
    if (success) return;
    
    setNoClickCount(prev => prev + 1);
    
    // Calculate random position within constraints
    const maxMove = 150;
    let newX = (Math.random() - 0.5) * maxMove * 2;
    let newY = (Math.random() - 0.5) * maxMove * 2;
    
    setNoButtonPos({ x: newX, y: newY });
  };

  const handleYes = () => {
    setSuccess(true);
    setTimeout(() => {
      onComplete();
    }, 2500);
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center z-10 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 1 }}
      ref={containerRef}
    >
      <div className="glass max-w-lg w-full rounded-3xl p-8 relative box-glow">
        <AnimatePresence mode="wait">
          {!success ? (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="text-3xl md:text-4xl font-playfair mb-8 text-gray-800 leading-snug">
                Do you know someone who loves you more than chocolates? 🍫
              </h2>
              
              <div className="flex justify-center items-center gap-6 h-32 relative">
                <motion.button
                  onClick={handleYes}
                  className="bg-pink-400 text-white px-8 py-3 rounded-full text-xl font-outfit shadow-lg hover:bg-pink-500 z-20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  YES ❤️
                </motion.button>

                {noClickCount < 10 && (
                  <motion.button
                    onMouseEnter={moveNoButton}
                    onClick={moveNoButton}
                    animate={{ 
                      x: noButtonPos.x, 
                      y: noButtonPos.y,
                      scale: Math.max(1 - (noClickCount * 0.1), 0)
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-gray-200 text-gray-700 px-8 py-3 rounded-full text-xl font-outfit shadow-md absolute z-10"
                    style={{ right: '10%' }}
                  >
                    NO 😅
                  </motion.button>
                )}
              </div>
              <p className="text-gray-500 text-sm mt-8 opacity-70">
                (Try clicking NO if you dare...)
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              <span className="text-7xl mb-6">🥰</span>
              <h2 className="text-3xl font-playfair text-pink-600 font-bold mb-4">
                I knew you'd choose correctly ❤️
              </h2>
              <p className="text-xl text-gray-700 font-outfit">
                (There is no other answer anyway!)
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default FunnySection;
