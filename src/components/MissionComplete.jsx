import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Crown, Heart, CheckCircle2, RotateCcw } from 'lucide-react';
import { triggerGrandFinaleConfetti } from '../utils/confetti';

export const MissionComplete = ({ steps, onReset }) => {
  React.useEffect(() => {
    triggerGrandFinaleConfetti();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-3xl mx-auto px-4 my-8"
    >
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-2 border-amber-400/80 p-6 sm:p-10 text-center shadow-[0_0_50px_rgba(212,175,55,0.3)]">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-40 bg-amber-500/10 blur-3xl pointer-events-none" />

        {/* Crown Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-400 text-amber-300 shadow-xl mb-4 animate-bounce">
          <Crown className="w-10 h-10 text-amber-300" />
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100">
          MISSION ACCOMPLISHED! 🥂
        </h2>

        <p className="text-amber-200/90 text-sm sm:text-base font-serif italic max-w-lg mx-auto mt-2">
          "All 7 secret objectives successfully unlocked and executed. You survived Operation: Secret SF Day Trip!"
        </p>

        {/* Final Mission Briefing Recap */}
        <div className="mt-8 text-left bg-slate-950/80 border border-amber-500/30 rounded-2xl p-5 space-y-4">
          <h3 className="text-xs font-mono font-bold text-amber-400 tracking-wider uppercase border-b border-amber-500/20 pb-2 flex items-center justify-between">
            <span>Completed Expedition Itinerary</span>
            <span className="text-slate-400">7 / 7 Stops</span>
          </h3>

          <div className="space-y-3">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-serif text-slate-200 font-semibold">{step.title}</span>
                </div>
                <span className="font-mono text-slate-400 text-xs shrink-0">{step.place}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Toast Quote */}
        <div className="mt-6 p-4 rounded-2xl bg-rose-950/40 border border-rose-600/40 text-rose-200 text-sm italic">
          <Heart className="w-5 h-5 text-rose-400 mx-auto mb-1 animate-pulse" />
          "Here's to unforgettable memories, delicious piroshki, ocean sunsets, and liquid gold cocktails."
        </div>

        {/* Reset Button */}
        <button
          onClick={onReset}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          Restart Expedition Briefing
        </button>
      </div>
    </motion.div>
  );
};
