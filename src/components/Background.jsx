import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';

const Background = () => {
  // Fixed particle positions based on the user's requested spots
  const particles = [
    { id: 1, x: 25, y: 8, scale: 0.9, rotate: 15 },
    { id: 2, x: 45, y: 14, scale: 1.1, rotate: -10 },
    { id: 3, x: 80, y: 8, scale: 0.8, rotate: 45 },
    { id: 4, x: 20, y: 22, scale: 1.2, rotate: -25 },
    { id: 5, x: 68, y: 19, scale: 1.0, rotate: 5 },
    { id: 6, x: 88, y: 30, scale: 0.9, rotate: 20 },
    { id: 7, x: 15, y: 75, scale: 1.1, rotate: -15 },
    { id: 8, x: 50, y: 75, scale: 0.8, rotate: 10 },
    { id: 9, x: 82, y: 80, scale: 1.2, rotate: -5 },
    { id: 10, x: 25, y: 92, scale: 1.0, rotate: 30 },
    { id: 11, x: 70, y: 93, scale: 0.9, rotate: -20 },
  ];

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
      {/* Animated gradient layer */}
      <motion.div
        className="absolute inset-0 opacity-50"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,182,193,0.8) 0%, rgba(255,240,245,1) 100%)',
        }}
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(255,182,193,0.8) 0%, rgba(255,240,245,1) 100%)',
            'radial-gradient(circle at 80% 80%, rgba(255,182,193,0.8) 0%, rgba(255,240,245,1) 100%)',
            'radial-gradient(circle at 20% 80%, rgba(255,182,193,0.8) 0%, rgba(255,240,245,1) 100%)',
            'radial-gradient(circle at 80% 20%, rgba(255,182,193,0.8) 0%, rgba(255,240,245,1) 100%)',
            'radial-gradient(circle at 20% 20%, rgba(255,182,193,0.8) 0%, rgba(255,240,245,1) 100%)',
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Static Flower Decorations */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute drop-shadow-md text-3xl md:text-5xl"
          style={{
            left: `${p.x}vw`,
            top: `${p.y}vh`,
            opacity: 0.8,
            transform: `scale(${p.scale}) rotate(${p.rotate}deg)`,
          }}
        >
          🌸
        </div>
      ))}

      {/* Sparkles/Stars could be added here */}
    </div>
  );
};

export default Background;
