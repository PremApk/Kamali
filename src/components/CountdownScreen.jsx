import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { FaHeart, FaLock } from 'react-icons/fa';

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
        ...defaults,
        particleCount,
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
      <div className="flex flex-col items-center max-w-md w-full">
        <h2 className="text-2xl md:text-3xl text-gray-700 font-playfair italic mb-8">
          {!isFinished ? "Waiting for a special day..." : "The wait is over. Open my heart..."}
        </h2>
        
        <div className="flex gap-3 md:gap-6 mb-12">
          <TimeUnit value={timeLeft.days} label="Days" />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <TimeUnit value={timeLeft.minutes} label="Mins" />
          <TimeUnit value={timeLeft.seconds} label="Secs" />
        </div>

        <motion.button
          onClick={isFinished ? onComplete : undefined}
          disabled={!isFinished}
          className={`px-8 py-4 rounded-full text-xl font-outfit shadow-lg flex items-center gap-3 transition-all select-none ${
            isFinished
              ? 'glass-dark text-gray-800 cursor-pointer hover:scale-105 active:scale-95 box-glow'
              : 'bg-gray-300/40 text-gray-400 cursor-not-allowed opacity-50 border border-gray-400/10'
          }`}
          whileHover={isFinished ? { scale: 1.05 } : {}}
          whileTap={isFinished ? { scale: 0.95 } : {}}
        >
          <span>Open My Heart</span>
          {isFinished ? (
            <FaHeart className="text-red-500 animate-pulse" />
          ) : (
            <FaLock className="text-gray-400 text-lg" />
          )}
        </motion.button>

      </div>
    </motion.div>
  );
};

export default CountdownScreen;
