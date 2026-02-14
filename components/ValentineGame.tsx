
import React, { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface ValentineGameProps {
  onAccept: () => void;
}

const ValentineGame: React.FC<ValentineGameProps> = ({ onAccept }) => {
  const [noButtonPos, setNoButtonPos] = useState({ top: '0px', left: '0px' });
  const [hasMoved, setHasMoved] = useState(false);

  const moveButton = () => {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);
    setNoButtonPos({ top: `${y}px`, left: `${x}px` });
    setHasMoved(true);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12 px-4 relative min-h-[400px]">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-serif-elegant text-rose-800">
          Will you be my Valentine?
        </h2>
        <p className="text-rose-600 font-romantic text-2xl">
          From Dubem, with all his heart.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6">
        <button
          onClick={onAccept}
          className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 px-12 rounded-full shadow-lg transform transition hover:scale-110 active:scale-95 flex items-center gap-2"
        >
          <Heart fill="white" className="w-6 h-6" />
          YES!
        </button>

        <button
          onMouseEnter={moveButton}
          onClick={moveButton}
          style={hasMoved ? { position: 'fixed', ...noButtonPos, zIndex: 50 } : {}}
          className="bg-gray-200 text-gray-700 font-semibold py-4 px-12 rounded-full transition-all duration-100"
        >
          No
        </button>
      </div>

      {!hasMoved && (
        <div className="flex items-center gap-2 text-rose-400 animate-pulse mt-8">
          <Sparkles className="w-5 h-5" />
          <span className="italic">Waiting for your answer...</span>
        </div>
      )}
    </div>
  );
};

export default ValentineGame;
