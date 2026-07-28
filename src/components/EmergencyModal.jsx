import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  X,
  Hotel,
  Car,
  Phone,
  RotateCcw,
  Navigation,
  Compass,
  HeartHandshake
} from 'lucide-react';
import { HOTEL_INFO } from '../data/schedule';

export const EmergencyModal = ({ isOpen, onClose, onResetProgress }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-slate-900 border border-rose-600/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        >
          {/* Header Banner */}
          <div className="flex items-center justify-between border-b border-rose-900/40 pb-4 mb-5">
            <div className="flex items-center gap-3 text-rose-400 font-mono text-sm font-bold uppercase tracking-wider">
              <div className="w-8 h-8 rounded-full bg-rose-950 border border-rose-600/60 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-rose-400 animate-bounce" />
              </div>
              <span>MISSION CONTINGENCY // EMERGENCY HELP</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Hotel Base Information */}
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-amber-500/20 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-serif font-bold text-lg">
                <Hotel className="w-5 h-5 text-amber-400" />
                <span>Base Headquarters: {HOTEL_INFO.name}</span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm font-mono">
                📍 {HOTEL_INFO.address}
              </p>
              <p className="text-slate-400 text-xs italic">
                {HOTEL_INFO.transitSummary}
              </p>
            </div>

            {/* Emergency Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={HOTEL_INFO.uberDeepLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 text-xs font-mono font-bold transition-all"
              >
                <Car className="w-4 h-4 text-rose-400" />
                <span>Call Uber to Hotel</span>
              </a>

              <a
                href={HOTEL_INFO.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 text-xs font-mono font-bold transition-all"
              >
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>Google Maps to Base</span>
              </a>
            </div>

            {/* Reassurance Banner */}
            <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-800/40 text-rose-200 text-xs space-y-1">
              <div className="flex items-center gap-2 font-bold font-mono text-rose-300">
                <HeartHandshake className="w-4 h-4" />
                <span>Need a break or got lost?</span>
              </div>
              <p className="leading-relaxed">
                No stress! The mission is meant to be romantic and fun. If tired, grab a cab straight back to Hotel Garrett or skip to dinner!
              </p>
            </div>

            {/* Reset Mission Progress */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">Testing / Start Over:</span>
              <button
                onClick={onResetProgress}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-300 text-xs font-mono transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Mission Progress
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
