
import React, { useState, useEffect } from 'react';
import { generateRomanticPoem } from '../services/geminiService';
import { Poem } from '../types';
import { Loader2, Music, Feather } from 'lucide-react';

const PoemDisplay: React.FC = () => {
  const [poem, setPoem] = useState<Poem | null>(null);
  const [loading, setLoading] = useState(false);
  const [mood, setMood] = useState('mysterious');

  const fetchPoem = async (selectedMood: string) => {
    setLoading(true);
    const newPoem = await generateRomanticPoem(selectedMood);
    setPoem(newPoem);
    setLoading(false);
  };

  useEffect(() => {
    fetchPoem('mysterious');
  }, []);

  return (
    <div className="bg-white/60 backdrop-blur-md border border-rose-100 rounded-3xl p-8 shadow-xl max-w-2xl mx-auto my-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Feather className="w-24 h-24" />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <h3 className="text-2xl font-serif-elegant text-rose-900 border-b-2 border-rose-200 pb-1">
          A Secret Poem for You
        </h3>
        <div className="flex gap-2">
          {['passionate', 'sweet', 'mysterious'].map((m) => (
            <button
              key={m}
              onClick={() => { setMood(m); fetchPoem(m); }}
              disabled={loading}
              className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                mood === m ? 'bg-rose-500 text-white' : 'bg-rose-100 text-rose-600 hover:bg-rose-200'
              }`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[250px] flex flex-col items-center justify-center text-center">
        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
            <p className="text-rose-400 italic font-romantic">Dubem is writing your poem...</p>
          </div>
        ) : poem ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h4 className="text-xl font-semibold text-rose-800 mb-6 italic">"{poem.title}"</h4>
            <div className="text-lg leading-relaxed text-gray-700 whitespace-pre-wrap font-serif-elegant">
              {poem.content}
            </div>
            <p className="mt-8 font-romantic text-2xl text-rose-500">— Yours forever, Dubem</p>
          </div>
        ) : (
          <p className="text-gray-400 italic">Something went wrong. Let me try writing it again.</p>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => fetchPoem(mood)}
          disabled={loading}
          className="text-rose-600 hover:text-rose-800 flex items-center gap-2 text-sm font-semibold transition"
        >
          <Music className="w-4 h-4" />
          Request another melody
        </button>
      </div>
    </div>
  );
};

export default PoemDisplay;
