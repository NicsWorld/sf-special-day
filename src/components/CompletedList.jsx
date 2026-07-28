import React, { useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronUp, MapPin, Clock, Eye } from 'lucide-react';

export const CompletedList = ({ completedSteps, onSelectStep }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!completedSteps || completedSteps.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 mt-6">
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl overflow-hidden shadow-xl backdrop-blur-md">
        {/* Toggle Bar */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 text-left hover:bg-slate-800/80 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-semibold text-amber-200 text-sm sm:text-base">
                Completed Objectives ({completedSteps.length})
              </h3>
              <p className="text-slate-400 text-xs font-mono">
                Click to expand mission log
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono">
            <span>{isOpen ? 'COLLAPSE' : 'EXPAND'}</span>
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {/* Collapsible Content */}
        {isOpen && (
          <div className="border-t border-slate-800 p-4 space-y-3 bg-slate-950/60 divide-y divide-slate-800/60">
            {completedSteps.map((step) => (
              <div
                key={step.id}
                className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs font-bold font-mono mt-0.5 shrink-0">
                    ✓
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 font-mono text-xs font-bold">
                        Step {step.id}
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-300 text-xs font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {step.time}
                      </span>
                    </div>
                    <h4 className="font-serif font-semibold text-slate-100 text-sm sm:text-base group-hover:text-amber-300 transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-rose-400" />
                      {step.place} — {step.address}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onSelectStep(step.id)}
                  className="self-start sm:self-center px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono hover:bg-amber-500/20 transition-all flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Review Card
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
