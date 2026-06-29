import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FaHeart } from 'react-icons/fa';

const Finale = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Fireworks effect
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

    // Sequence texts
    const seq1 = setTimeout(() => setStep(1), 3000);
    const seq2 = setTimeout(() => setStep(2), 6000);
    const seq3 = setTimeout(() => setStep(3), 9000);

    return () => {
      clearInterval(interval);
      clearTimeout(seq1);
      clearTimeout(seq2);
      clearTimeout(seq3);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center z-10 w-full overflow-hidden absolute inset-0 bg-gradient-to-br from-pink-100 to-rose-200">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="imissyou"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
            transition={{ duration: 1.5 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-6xl md:text-8xl font-great-vibes text-pink-600 mb-4 text-glow">
              I miss you ✨
            </h1>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="hbd"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(10px)' }}
            transition={{ duration: 1.5 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-6xl md:text-8xl font-great-vibes text-rose-500 mb-4 text-glow leading-tight">
              Happy Birthday <br/> Kamali
            </h1>
          </motion.div>
        )}

        {step >= 2 && (
          <motion.div
            key="beautiful"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            className="flex flex-col items-center glass p-10 rounded-3xl box-glow max-w-xl w-full relative z-20"
          >
            <h1 className="text-4xl md:text-6xl font-playfair text-gray-800 mb-6 italic">
              You make every day beautiful.
            </h1>
            <div className="flex gap-4 mt-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                >
                  <FaHeart className="text-pink-500 text-3xl drop-shadow-md" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Finale;
