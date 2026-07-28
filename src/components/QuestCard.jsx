import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Lock,
  Unlock,
  MapPin,
  Clock,
  Navigation,
  Copy,
  Check,
  Compass,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const QuestCard = ({
  step,
  isUnlocked,
  isCurrent,
  isCompleted,
  onUnlock,
  onRelock
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(step.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // LOCKED CARD VIEW
  if (!isUnlocked) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl mx-auto px-4 my-6"
      >
        <div className="relative rounded-3xl overflow-hidden border border-amber-500/20 bg-slate-900/40 backdrop-blur-md p-6 sm:p-8 text-center shadow-2xl group hover:border-amber-500/40 transition-all duration-300">
          {/* Subtle ornate gold corner accents */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-500/30" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-500/30" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-500/30" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-500/30" />

          {/* Frosted Glass Lock Graphic */}
          <div className="flex flex-col items-center justify-center space-y-4 py-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/10 to-rose-950/40 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Lock className="w-8 h-8 text-amber-400 animate-pulse" />
              </div>
              <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-slate-950 border border-amber-500/40 text-[10px] font-mono text-amber-300 font-bold">
                LOCKED
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-amber-400/80 font-mono text-xs tracking-wider uppercase font-semibold">
                Objective #{step.id} • Classified Destination
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-300">
                {step.time}
              </h3>
            </div>

            {/* Playful Teaser Box */}
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-slate-300 italic text-sm sm:text-base leading-relaxed">
              "{step.teaser}"
            </div>

            {/* Unlock Button */}
            <button
              onClick={() => onUnlock(step.id)}
              className="mt-2 relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-rose-600 text-slate-950 font-bold text-sm sm:text-base shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 group/btn overflow-hidden cursor-pointer"
            >
              <Unlock className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
              <span>Unlock Next Stop 🔓</span>
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // UNLOCKED CARD VIEW
  return (
    <motion.div
      id={`step-card-${step.id}`}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-3xl mx-auto px-4 my-6"
    >
      <div className={`relative rounded-3xl overflow-hidden bg-slate-900/90 backdrop-blur-xl border transition-all duration-500 shadow-2xl ${
        isCurrent
          ? 'border-amber-400 ring-2 ring-amber-500/40 shadow-amber-500/20'
          : 'border-amber-500/20'
      }`}>
        {/* Status Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-6 py-3 bg-gradient-to-r from-amber-950/60 via-slate-950 to-slate-950 border-b border-amber-500/20 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-amber-300 font-bold uppercase tracking-wider">
              Objective #{step.id} UNLOCKED
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300">
              {step.tag}
            </span>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="relative h-56 sm:h-72 w-full overflow-hidden group">
          <img
            src={step.image}
            alt={step.place}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          {/* Time Badge Overlay */}
          <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/30 text-amber-300 font-mono text-xs sm:text-sm font-semibold shadow-lg">
            <Clock className="w-4 h-4 text-amber-400" />
            {step.time}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Title & Place */}
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100">
              {step.title}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-rose-300 font-medium text-base sm:text-lg">
              <MapPin className="w-5 h-5 text-rose-400 shrink-0" />
              <span>{step.place}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm font-mono">
              <span>{step.address}</span>
              <button
                onClick={handleCopyAddress}
                className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 transition-colors"
                title="Copy Address"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              {copied && <span className="text-[10px] text-emerald-400 font-sans">Copied!</span>}
            </div>
          </div>

          {/* Mission Description */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-200 leading-relaxed text-sm sm:text-base">
            <p className="font-sans">{step.description}</p>
          </div>

          {/* Secret Intel Tip */}
          {step.secretIntel && (
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-amber-200 text-xs sm:text-sm">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-mono font-bold text-amber-300 block mb-0.5">SECRET INTEL</span>
                {step.secretIntel}
              </div>
            </div>
          )}

          {/* Transit Briefing Section */}
          {(step.transitFromHotel || step.transit) && (
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-indigo-500/30 space-y-2">
              <div className="flex items-center gap-2 text-indigo-300 font-mono text-xs font-bold uppercase tracking-wider">
                <Compass className="w-4 h-4 text-indigo-400" />
                <span>Transit Reconnaissance</span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-normal">
                {step.transitFromHotel || step.transit}
              </p>
            </div>
          )}

          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <a
              href={step.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-200 cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>Launch Navigation (Google Maps)</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </a>

            {/* Next Step unlock button if current */}
            {isCurrent && onUnlock && (
              <button
                onClick={onUnlock}
                className="px-6 py-3 rounded-xl bg-rose-900/60 hover:bg-rose-800 border border-rose-600/40 text-rose-200 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Unlock className="w-4 h-4 text-amber-400" />
                <span>Unlock Next Destination 🔓</span>
              </button>
            )}

            {/* Re-lock Button on unlocked cards */}
            {onRelock && (
              <button
                onClick={() => onRelock(step.id)}
                className="px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-rose-950 border border-slate-700 hover:border-rose-600/60 text-slate-300 hover:text-rose-300 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:scale-102 active:scale-95"
                title="Re-lock this stop"
              >
                <Lock className="w-4 h-4 text-rose-400" />
                <span>Re-lock Stop 🔒</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
