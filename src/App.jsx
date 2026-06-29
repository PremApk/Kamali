import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Background from './components/Background';
import Landing from './components/Landing';
import CountdownScreen from './components/CountdownScreen';
import Story from './components/Story';
import LoveMeter from './components/LoveMeter';
import FunnySection from './components/FunnySection';
import TravelPromise from './components/TravelPromise';
import Proposal from './components/Proposal';
import Finale from './components/Finale';

function App() {
  const [phase, setPhase] = useState(0);

  const renderPhase = () => {
    switch (phase) {
      case 0:
        return <Landing key="landing" onStart={() => setPhase(1)} />;
      case 1:
        return <CountdownScreen key="countdown" onComplete={() => setPhase(2)} />;
      case 2:
        return <Story key="story" onComplete={() => setPhase(3)} />;
      case 3:
        return <LoveMeter key="meter" onComplete={() => setPhase(4)} />;
      case 4:
        return <FunnySection key="funny" onComplete={() => setPhase(5)} />;
      case 5:
        return <TravelPromise key="travel" onComplete={() => setPhase(6)} />;
      case 6:
        return <Proposal key="proposal" onComplete={() => setPhase(7)} />;
      case 7:
        return <Finale key="finale" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen w-full font-outfit text-gray-800 flex justify-center overflow-hidden">
      <Background />
      <AnimatePresence mode="wait">
        {renderPhase()}
      </AnimatePresence>
    </div>
  );
}

export default App;
