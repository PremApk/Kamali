import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaEnvelope, FaEnvelopeOpenText } from 'react-icons/fa';

const Proposal = ({ onComplete }) => {
  const [phase, setPhase] = useState(0); // 0: Question, 1: Envelope, 2: Letter
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noScale, setNoScale] = useState(1);

  const moveNo = () => {
    setNoPos({
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
    });
    setNoScale(prev => Math.max(prev - 0.1, 0));
  };

  const handleYes = () => {
    setPhase(1);
  };

  const openLetter = () => {
    setPhase(2);
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center z-10 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <AnimatePresence mode="wait">
        {phase === 0 && (
          <motion.div
            key="proposal-question"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -50 }}
            className="glass max-w-lg w-full rounded-3xl p-10 box-glow relative"
          >
            <h2 className="text-3xl md:text-4xl font-playfair mb-10 text-gray-800 leading-relaxed">
              Can I continue making you smile forever? ✨
            </h2>
            <div className="flex justify-center items-center gap-8 relative h-20">
              <motion.button
                onClick={handleYes}
                className="bg-pink-500 text-white px-8 py-3 rounded-full text-xl font-outfit shadow-lg hover:bg-pink-600 z-20 box-glow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                YES ❤️
              </motion.button>

              {noScale > 0 && (
                <motion.button
                  onMouseEnter={moveNo}
                  onClick={moveNo}
                  animate={{ x: noPos.x, y: noPos.y, scale: noScale }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-gray-200 text-gray-700 px-8 py-3 rounded-full text-xl font-outfit shadow-md absolute z-10"
                  style={{ right: '15%' }}
                >
                  NO 🙈
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {phase === 1 && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 2 }}
            transition={{ type: "spring", duration: 1 }}
            className="flex flex-col items-center cursor-pointer"
            onClick={openLetter}
          >
            <div className="text-8xl text-pink-500 hover:scale-110 transition-transform drop-shadow-lg mb-6">
              <FaEnvelope />
            </div>
            <p className="text-xl font-playfair text-gray-700 italic animate-pulse">
              Tap to open your letter...
            </p>
          </motion.div>
        )}

        {phase === 2 && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 100, rotateX: 90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
            className="glass-dark max-w-xl w-full rounded-lg p-8 md:p-12 text-left relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <FaEnvelopeOpenText size={60} />
            </div>
            <h3 className="text-3xl font-great-vibes text-pink-600 mb-6 border-b border-pink-200 pb-4">
              My Dearest Kamali,
            </h3>
            <div className="font-playfair text-gray-800 space-y-4 text-lg md:text-xl leading-relaxed">
              <p>
                From the moment you entered my life, everything became brighter, warmer, and simply beautiful.
              </p>
              <p>
                Your smile is my favorite view, and your happiness is my biggest priority. I am incredibly grateful for every moment we share.
              </p>
              <p>
                I hope we will travel the world together, discover beautiful places, and make endless memories. I miss you so much.
              </p>
              <p className="font-great-vibes text-2xl text-pink-600 mt-6 pt-4 text-right">
                Happy Birthday My Kamali ✨
              </p>
            </div>
            <div className="mt-10 flex justify-center">
              <motion.button
                onClick={onComplete}
                className="bg-white text-pink-500 px-8 py-3 rounded-full text-lg font-outfit shadow-md flex items-center gap-2 hover:bg-pink-50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close Letter ✨
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Proposal;
