import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const lines = [
  { words: ["She", "is", "Incredible."], targetWord: 2 },
  { words: ["She", "is", "Lovely."], targetWord: 2 },
  { words: ["She", "is", "Outstanding."], targetWord: 2 },
  { words: ["She", "is", "Very", "beautiful."], targetWord: 2 },
  { words: ["She", "is", "Elegant."], targetWord: 2 },
  { spacer: true },
  { words: ["She", "is", "Kind."], targetWord: 2 },
  { words: ["She", "is", "Attractive."], targetWord: 2 },
  { words: ["She", "is", "Mesmerizing."], targetWord: 2 },
  { words: ["She", "is", "Amazing."], targetWord: 2 },
  { words: ["She", "is", "Lovely."], targetWord: 2 },
  { words: ["She", "is", "Irresistible."], targetWord: 2 },
];

const Finale = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [isHighlighting, setIsHighlighting] = useState(false);
  const [showFinale, setShowFinale] = useState(false);

  useEffect(() => {
    // Reveal lines one by one
    if (visibleLines < lines.length) {
      const timer = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
      }, 700); // 0.7s per line
      return () => clearTimeout(timer);
    } else if (!isHighlighting) {
      // Start highlighting phase shortly after last line
      const timer = setTimeout(() => {
        setIsHighlighting(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else if (!showFinale) {
      // Show finale text after highlighting and trigger fireworks
      const timer = setTimeout(() => {
        setShowFinale(true);
        triggerFireworks();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [visibleLines, isHighlighting, showFinale]);

  const triggerFireworks = () => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#ffb6c1', '#f4c2c2', '#ffffff', '#ff6b81', '#ff1493']
      });
    }, 250);
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[100dvh] p-4 z-10 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div className="glass max-w-md w-full rounded-3xl p-6 md:p-8 flex flex-col items-center box-glow relative">
        <div className="flex flex-col items-start w-full max-w-[250px] mx-auto text-left gap-1">
          {lines.map((line, lineIdx) => {
            if (line.spacer) {
              return <div key={`spacer-${lineIdx}`} className="h-4" />;
            }
            
            const isVisible = lineIdx < visibleLines;
            
            return (
              <motion.div 
                key={lineIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: isVisible ? (isHighlighting ? 0.3 : 1) : 0, 
                  y: isVisible ? 0 : 10 
                }}
                transition={{ duration: 0.5 }}
                className="text-lg md:text-xl font-playfair italic text-gray-800 flex flex-wrap"
              >
                {line.words.map((word, wordIdx) => {
                  const isTarget = wordIdx === line.targetWord;
                  
                  return (
                    <span key={wordIdx} className="mr-1 flex relative">
                      {isTarget ? (
                        <>
                          <motion.span
                            animate={{
                              color: isHighlighting ? "#ec4899" : "#1f2937", // pink-500
                              scale: isHighlighting ? 1.4 : 1,
                              fontWeight: isHighlighting ? 700 : 400,
                              textShadow: isHighlighting ? "0px 0px 8px rgba(236,72,153,0.8)" : "none",
                              opacity: 1,
                              y: isHighlighting ? -2 : 0,
                            }}
                            className="inline-block relative z-10 font-outfit not-italic"
                            style={{ transformOrigin: "bottom left" }}
                          >
                            {word.charAt(0)}
                          </motion.span>
                          <motion.span
                            animate={{
                              opacity: isHighlighting ? 0 : 1,
                            }}
                          >
                            {word.slice(1)}
                          </motion.span>
                        </>
                      ) : (
                        <span>{word}</span>
                      )}
                    </span>
                  );
                })}
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence>
          {showFinale && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, type: "spring" }}
              className="mt-10 flex flex-col items-center text-center w-full"
            >
              <h3 className="text-4xl font-great-vibes text-pink-600 font-bold drop-shadow-sm mb-6">
                She is You. ❤️✨
              </h3>
              
              <motion.button
                onClick={onComplete}
                className="glass-dark px-8 py-3 rounded-full text-lg font-outfit text-gray-800 shadow-md hover:bg-white/60 transition-all box-glow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                One more thing... 🎂
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Finale;
