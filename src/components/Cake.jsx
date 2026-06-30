import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const Cake = () => {
  const [blownOut, setBlownOut] = useState(false);

  const handleBlowOut = () => {
    if (blownOut) return;
    setBlownOut(true);
    
    // Trigger balloon/confetti animation
    const duration = 5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ffb6c1', '#f4c2c2', '#ffffff', '#ff6b81', '#ff1493']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ffb6c1', '#f4c2c2', '#ffffff', '#ff6b81', '#ff1493']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  // Generate some balloons to float up when blown out
  const balloons = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    left: Math.random() * 90 + 5, // 5% to 95%
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 4 // 4s to 7s
  }));

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[100dvh] p-4 z-10 w-full relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {blownOut && balloons.map((b) => (
        <motion.div
          key={b.id}
          className="absolute text-5xl md:text-7xl drop-shadow-lg z-0"
          style={{ left: `${b.left}vw`, bottom: '-20vh' }}
          animate={{ y: '-130vh', x: `${(Math.random() - 0.5) * 20}vw` }}
          transition={{ duration: b.duration, delay: b.delay, ease: "easeOut" }}
        >
          🎈
        </motion.div>
      ))}

      <div className="glass max-w-lg w-full rounded-3xl p-10 flex flex-col items-center box-glow relative z-20">
        {!blownOut && (
          <motion.h2 
            className="text-2xl md:text-3xl font-playfair mb-12 text-gray-800 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Make a wish and click the flame... ✨
          </motion.h2>
        )}

        <div className="relative mt-8 mb-16 cursor-pointer" onClick={handleBlowOut}>
          {/* Flame */}
          <AnimatePresence>
            {!blownOut && (
              <motion.div
                className="absolute left-1/2 -top-12 -translate-x-1/2 w-6 h-8 bg-yellow-400 rounded-full"
                style={{ 
                  borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                  boxShadow: '0 0 20px 5px rgba(250, 204, 21, 0.6), 0 0 40px 10px rgba(234, 88, 12, 0.4)'
                }}
                animate={{
                  scale: [1, 1.1, 0.9, 1.05, 1],
                  rotate: [0, -2, 3, -1, 0],
                }}
                transition={{ duration: 0.5, repeat: Infinity }}
                exit={{ opacity: 0, scale: 0, y: -20, transition: { duration: 0.3 } }}
              />
            )}
          </AnimatePresence>

          {/* Candle */}
          <div className="w-4 h-14 bg-red-400 mx-auto rounded-sm shadow-inner relative z-10">
            {/* Candle stripes */}
            <div className="w-full h-2 bg-red-300 mt-2 rotate-12"></div>
            <div className="w-full h-2 bg-red-300 mt-3 rotate-12"></div>
            <div className="w-full h-2 bg-red-300 mt-3 rotate-12"></div>
          </div>

          {/* Cake Top Tier */}
          <div className="w-32 h-16 bg-pink-200 mx-auto rounded-t-lg border-b-4 border-pink-300 relative z-20 shadow-lg flex justify-around items-center px-4">
             <div className="w-3 h-3 bg-red-400 rounded-full"></div>
             <div className="w-3 h-3 bg-red-400 rounded-full"></div>
             <div className="w-3 h-3 bg-red-400 rounded-full"></div>
          </div>
          
          {/* Cake Bottom Tier */}
          <div className="w-48 h-20 bg-pink-300 mx-auto rounded-b-xl relative z-10 shadow-xl flex justify-around items-center px-4">
            <div className="w-4 h-4 bg-white rounded-full opacity-50"></div>
            <div className="w-4 h-4 bg-white rounded-full opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-white text-3xl font-extrabold font-playfair tracking-wider drop-shadow-md select-none opacity-90">
                26
              </span>
            </div>
            <div className="w-4 h-4 bg-white rounded-full opacity-50"></div>
            <div className="w-4 h-4 bg-white rounded-full opacity-50"></div>
          </div>
          
          {/* Plate */}
          <div className="w-56 h-4 bg-gray-200 mx-auto rounded-full mt-1 shadow-md"></div>
        </div>

        <AnimatePresence>
          {blownOut && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, type: "spring" }}
              className="text-center w-full"
            >
              <h1 className="text-4xl md:text-5xl font-great-vibes text-pink-600 font-bold mb-4 drop-shadow-sm leading-relaxed">
                Happy Birthday Kamali❤️
              </h1>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Cake;
