import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FaHeart } from 'react-icons/fa';

// Target date: July 2, 2026 00:00:00
const TARGET_DATE = new Date('2026-07-02T00:00:00').getTime();

const CountdownScreen = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isFinished, setIsFinished] = useState(false);

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = TARGET_DATE - now;
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    // Initial check
    if (TARGET_DATE - new Date().getTime() <= 0) {
      triggerCelebration();
      return;
    }

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      if (
        remaining.days === 0 &&
        remaining.hours === 0 &&
        remaining.minutes === 0 &&
        remaining.seconds === 0
      ) {
        clearInterval(timer);
        triggerCelebration();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const triggerCelebration = () => {
    setIsFinished(true);
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const interval = setInterval(function() {
      const timeLeftConfetti = animationEnd - Date.now();

      if (timeLeftConfetti <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeftConfetti / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
        colors: ['#ffb6c1', '#f4c2c2', '#ffffff', '#ff6b81']
      });
    }, 250);
  };

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center glass p-4 rounded-xl w-20 md:w-24">
      <span className="text-3xl md:text-5xl font-outfit font-bold text-gray-800">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-xs md:text-sm text-gray-600 uppercase font-semibold mt-1">
        {label}
      </span>
    </div>
  );

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen p-4 text-center z-10 w-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
    >
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div
            key="countdown"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-2xl md:text-3xl text-gray-700 font-playfair italic mb-8">
              Waiting for a special day...
            </h2>
            <div className="flex gap-3 md:gap-6 mb-12">
              <TimeUnit value={timeLeft.days} label="Days" />
              <TimeUnit value={timeLeft.hours} label="Hours" />
              <TimeUnit value={timeLeft.minutes} label="Mins" />
              <TimeUnit value={timeLeft.seconds} label="Secs" />
            </div>
            
            {/* Developer / Tester skip button */}
            <button 
              onClick={triggerCelebration}
              className="text-xs text-gray-400 hover:text-pink-500 underline opacity-50 hover:opacity-100 transition-opacity mt-4"
            >
              Skip countdown (for testing)
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="celebration"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", bounce: 0.5, duration: 1 }}
            className="flex flex-col items-center"
          >
            <h1 className="text-5xl md:text-7xl font-great-vibes text-glow text-[#ff6b81] mb-6 leading-tight">
              🎉 Happy Birthday <br/> Kamali ❤️ 🎉
            </h1>
            <p className="text-lg md:text-xl text-gray-700 font-playfair mb-10">
              The wait is over. The magic begins now.
            </p>
            <motion.button
              onClick={onComplete}
              className="glass-dark px-8 py-4 rounded-full text-xl font-outfit text-gray-800 shadow-lg flex items-center gap-3 hover:scale-105 active:scale-95 transition-all box-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Our Story <FaHeart className="text-red-500 animate-pulse" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CountdownScreen;
