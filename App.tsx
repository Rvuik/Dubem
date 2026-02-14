
import React, { useState } from 'react';
import { Page } from './types';
import FloatingHearts from './components/FloatingHearts';
import ValentineGame from './components/ValentineGame';
import PoemDisplay from './components/PoemDisplay';
import { Heart, Stars, Gift, Mail, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Landing);

  const handleStart = () => {
    setCurrentPage(Page.Main);
  };

  const handleAccept = () => {
    setCurrentPage(Page.Success);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      <FloatingHearts />

      {/* Navigation / Header */}
      <header className="p-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <Heart className="text-rose-500 fill-rose-500 w-6 h-6" />
          <span className="font-serif-elegant text-xl font-bold text-rose-900">D & Secret</span>
        </div>
        {currentPage !== Page.Landing && (
            <div className="flex gap-4">
                <Stars className="text-yellow-500 w-5 h-5 animate-pulse" />
            </div>
        )}
      </header>

      <main className="flex-grow z-10 px-4">
        {currentPage === Page.Landing && (
          <div className="max-w-4xl mx-auto h-[80vh] flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in duration-700">
            <div className="relative">
                <div className="absolute -inset-4 bg-rose-200 rounded-full blur-2xl opacity-50 animate-pulse"></div>
                <Mail className="w-24 h-24 text-rose-600 relative" />
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-serif-elegant text-rose-950 font-bold">
                A Secret for You...
              </h1>
              <p className="text-xl md:text-2xl text-rose-700 font-romantic">
                You've received a private invitation to Dubem's heart.
              </p>
            </div>
            <button
              onClick={handleStart}
              className="group bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 px-10 rounded-full shadow-2xl transition transform hover:-translate-y-1 flex items-center gap-3 text-lg"
            >
              Open Your Letter
              <ArrowRight className="group-hover:translate-x-1 transition" />
            </button>
          </div>
        )}

        {currentPage === Page.Main && (
          <div className="max-w-5xl mx-auto py-12 space-y-16 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            {/* Intro Section */}
            <section className="text-center space-y-6">
                <div className="inline-block p-2 bg-rose-100 rounded-full px-6 text-rose-600 font-semibold text-sm mb-4">
                    SPECIAL VALENTINE MESSAGE
                </div>
                <h2 className="text-4xl md:text-6xl font-serif-elegant text-rose-900">
                  Every beat of my heart <br />
                  <span className="text-rose-600 italic">whispers your name.</span>
                </h2>
                <div className="flex justify-center gap-4">
                    <img src="https://picsum.photos/seed/love1/400/300" className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-2xl shadow-lg border-4 border-white transform -rotate-3" alt="Memory" />
                    <img src="https://picsum.photos/seed/love2/400/300" className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-2xl shadow-lg border-4 border-white transform rotate-6" alt="Memory" />
                </div>
            </section>

            {/* AI Poem Section */}
            <PoemDisplay />

            {/* Interactive "Will you be my Valentine?" */}
            <section className="bg-rose-50/80 rounded-[3rem] border border-rose-100 p-12">
              <ValentineGame onAccept={handleAccept} />
            </section>
          </div>
        )}

        {currentPage === Page.Success && (
          <div className="max-w-4xl mx-auto h-[80vh] flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in zoom-in duration-700">
            <div className="relative">
                <div className="absolute -inset-10 bg-rose-300 rounded-full blur-3xl opacity-30 animate-bounce"></div>
                <Gift className="w-24 h-24 text-rose-600 relative" />
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-serif-elegant text-rose-950 font-bold">
                It's a YES! 🌹
              </h1>
              <p className="text-2xl md:text-3xl text-rose-700 font-romantic">
                Dubem is the happiest man alive right now.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-8">
                  {Array.from({length: 12}).map((_, i) => (
                      <Heart key={i} className={`w-8 h-8 text-rose-500 fill-rose-500 animate-bounce delay-${i * 100}`} />
                  ))}
              </div>
            </div>
            <div className="bg-white/50 p-6 rounded-2xl border border-rose-100 italic text-gray-600 font-serif-elegant max-w-md">
                "Thank you for making this Valentine's day the best one yet. I can't wait to see your smile in person." — Dubem
            </div>
          </div>
        )}
      </main>

      <footer className="p-8 text-center text-rose-300 text-sm font-medium z-10">
        <p>© 2025 Handcrafted with love by Dubem for his secret one.</p>
      </footer>
    </div>
  );
};

export default App;
