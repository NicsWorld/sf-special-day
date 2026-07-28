import React from 'react';
import { Shield, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

export const Header = ({ currentStep, totalSteps, completedCount }) => {
  const percentage = Math.round((completedCount / totalSteps) * 100);

  return (
    <header className="relative w-full overflow-hidden bg-slate-950/80 backdrop-blur-xl border-b border-amber-500/20 pt-8 pb-6 px-4 sm:px-6 shadow-2xl">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-0 right-0 w-64 h-32 bg-rose-700/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-3xl mx-auto text-center relative z-10 space-y-4">
        {/* Top Secret Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-600/40 text-rose-300 text-xs font-mono tracking-widest uppercase shadow-lg shadow-rose-950/50">
          <Shield className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span>CLASSIFIED // EYES ONLY // ROMANTIC DISPATCH</span>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 tracking-tight drop-shadow-sm">
            Operation: Secret SF Day Trip
          </h1>
          <p className="text-slate-400 text-sm sm:text-base font-light italic max-w-lg mx-auto">
            "A high-stakes romantic mission across San Francisco. Strictly step-by-step."
          </p>
        </div>

        {/* Progress Bar & Status */}
        <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-4 shadow-inner max-w-md mx-auto space-y-2.5">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="font-mono text-amber-300/90 flex items-center gap-1.5 font-semibold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              {completedCount === totalSteps
                ? "MISSION FULLY UNLOCKED"
                : `Step ${currentStep} of ${totalSteps}: Current Quest`}
            </span>
            <span className="font-mono text-slate-400 font-bold bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700">
              {percentage}% Complete
            </span>
          </div>

          {/* Glowing Gold Progress Bar */}
          <div className="relative w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-amber-500/20 p-0.5">
            <div
              className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 rounded-full transition-all duration-700 ease-out shadow-[0_0_12px_rgba(212,175,55,0.6)]"
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-between items-center px-1 pt-1">
            {Array.from({ length: totalSteps }).map((_, idx) => {
              const stepNum = idx + 1;
              const isDone = stepNum <= completedCount;
              const isCurrent = stepNum === currentStep && completedCount < totalSteps;

              return (
                <div
                  key={stepNum}
                  className={`flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-mono transition-all duration-300 ${
                    isDone
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                      : isCurrent
                      ? 'bg-rose-600 text-white font-bold ring-2 ring-amber-400/80 animate-bounce'
                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}
                >
                  {isDone ? '✓' : stepNum}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
