import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CompletedList } from './components/CompletedList';
import { QuestCard } from './components/QuestCard';
import { EmergencyModal } from './components/EmergencyModal';
import { MissionComplete } from './components/MissionComplete';
import { SCHEDULE_DATA } from './data/schedule';
import { triggerUnlockConfetti } from './utils/confetti';
import { ShieldAlert, Heart } from 'lucide-react';

const STORAGE_KEY = 'secret_sf_unlocked_step_v1';

export function App() {
  const [unlockedStep, setUnlockedStep] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? parseInt(saved, 10) : 1;
    } catch (e) {
      return 1;
    }
  });

  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, unlockedStep.toString());
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  }, [unlockedStep]);

  const handleUnlockStep = (stepId) => {
    const nextStep = Math.max(unlockedStep, stepId);
    setUnlockedStep(nextStep);
    triggerUnlockConfetti();

    setTimeout(() => {
      const cardEl = document.getElementById(`step-card-${stepId}`);
      if (cardEl) {
        cardEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  const handleRelockStep = (stepId) => {
    // Re-locking stepId sets the current unlocked stage to stepId - 1
    const newUnlocked = Math.max(1, stepId - 1);
    setUnlockedStep(newUnlocked);
    try {
      localStorage.setItem(STORAGE_KEY, newUnlocked.toString());
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetProgress = () => {
    setUnlockedStep(1);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch (e) {
      console.error(e);
    }
    setIsEmergencyOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const completedSteps = SCHEDULE_DATA.filter((s) => s.id < unlockedStep);
  const isAllUnlocked = unlockedStep >= SCHEDULE_DATA.length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 pb-24 relative overflow-x-hidden">
      {/* Background Ornate Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-amber-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-rose-700/5 blur-[120px] rounded-full" />
      </div>

      {/* App Header */}
      <Header
        currentStep={Math.min(unlockedStep, SCHEDULE_DATA.length)}
        totalSteps={SCHEDULE_DATA.length}
        completedCount={completedSteps.length}
      />

      {/* Main Content Area */}
      <main className="relative z-10 space-y-4">
        {/* Completed Steps Checklist Drawer */}
        <CompletedList
          completedSteps={completedSteps}
          onSelectStep={(stepId) => {
            const el = document.getElementById(`step-card-${stepId}`);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Schedule Quest Cards */}
        <div className="space-y-4 pt-2">
          {SCHEDULE_DATA.map((step) => {
            const isUnlocked = step.id <= unlockedStep;
            const isCurrent = step.id === unlockedStep;
            const isCompleted = step.id < unlockedStep;

            return (
              <QuestCard
                key={step.id}
                step={step}
                isUnlocked={isUnlocked}
                isCurrent={isCurrent}
                isCompleted={isCompleted}
                onUnlock={() => handleUnlockStep(step.id + 1)}
                onRelock={handleRelockStep}
              />
            );
          })}
        </div>

        {/* All Steps Completed Screen */}
        {isAllUnlocked && (
          <MissionComplete
            steps={SCHEDULE_DATA}
            onReset={handleResetProgress}
          />
        )}
      </main>

      {/* Footer Branding */}
      <footer className="relative z-10 text-center py-8 text-slate-500 text-xs font-mono border-t border-slate-900 mt-12 space-y-2">
        <div className="flex items-center justify-center gap-1.5 text-amber-400/80">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>Curated with love for an unforgettable San Francisco day</span>
        </div>
        <p>© Operation: Secret SF Day Trip • Strictly Classified</p>
      </footer>

      {/* Floating Emergency SOS Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsEmergencyOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-slate-900/90 border border-rose-500/50 text-rose-300 text-xs font-mono font-bold shadow-2xl backdrop-blur-md hover:bg-rose-950 hover:border-rose-400 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
        >
          <ShieldAlert className="w-4 h-4 text-rose-400 group-hover:animate-spin" />
          <span>Back to Hotel / SOS 🚨</span>
        </button>
      </div>

      {/* Emergency Modal */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        onResetProgress={handleResetProgress}
      />
    </div>
  );
}

export default App;
