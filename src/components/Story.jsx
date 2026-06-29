import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaChevronRight } from 'react-icons/fa';

const chapters = [
  {
    id: 1,
    text: "The day I met you...",
    icon: "🌸"
  },
  {
    id: 2,
    text: "You unknowingly became my favorite notification...",
    icon: "📱"
  },
  {
    id: 3,
    text: "You became my peace...",
    icon: "🕊️"
  },
  {
    id: 4,
    text: "You became my happiness...",
    icon: "✨"
  }
];

const Story = ({ onComplete }) => {
  const [currentChapter, setCurrentChapter] = useState(0);

  const handleNext = () => {
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter(currentChapter + 1);
    } else {
      onComplete();
    }
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center z-10 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-md w-full glass rounded-3xl p-8 relative overflow-hidden box-glow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChapter}
            initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, type: "spring" }}
            className="flex flex-col items-center"
          >
            <span className="text-6xl mb-6 block drop-shadow-md">
              {chapters[currentChapter].icon}
            </span>
            <p className="text-2xl md:text-3xl font-playfair text-gray-800 leading-relaxed italic mb-8">
              "{chapters[currentChapter].text}"
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-4">
          <motion.button
            onClick={handleNext}
            className="glass-dark px-6 py-3 rounded-full text-lg font-outfit text-gray-800 shadow-md flex items-center gap-2 hover:bg-white/60 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentChapter < chapters.length - 1 ? 'Next' : 'Continue'} 
            <FaChevronRight className="text-sm text-pink-500" />
          </motion.button>
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {chapters.map((_, idx) => (
            <motion.div
              key={idx}
              className={`h-2 rounded-full transition-all duration-500 ${idx === currentChapter ? 'w-6 bg-pink-400' : 'w-2 bg-pink-200'}`}
              initial={false}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Story;
