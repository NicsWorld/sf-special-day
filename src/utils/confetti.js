import confetti from 'canvas-confetti';

const getConfetti = () => {
  if (typeof confetti === 'function') return confetti;
  if (confetti && typeof confetti.default === 'function') return confetti.default;
  if (typeof window !== 'undefined' && typeof window.confetti === 'function') return window.confetti;
  return null;
};

export const triggerUnlockConfetti = () => {
  try {
    const fn = getConfetti();
    if (fn) {
      fn({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#f4d068', '#9e1b32', '#e63946', '#ffffff'],
        shapes: ['star', 'circle'],
        scalar: 1.2
      });

      setTimeout(() => {
        fn({
          particleCount: 35,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ['#ffd700', '#c0c0c0', '#d90429']
        });
        fn({
          particleCount: 35,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ['#ffd700', '#c0c0c0', '#d90429']
        });
      }, 180);
    }
  } catch (e) {
    console.error('Confetti trigger error:', e);
  }
};

export const triggerGrandFinaleConfetti = () => {
  try {
    const fn = getConfetti();
    if (!fn) return;
    const duration = 3.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      fn({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#d4af37', '#f4d068', '#9e1b32', '#ffffff']
      });
      fn({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ffd700', '#e63946', '#c0c0c0']
      });
    }, 250);
  } catch (e) {
    console.error('Grand finale confetti error:', e);
  }
};

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}
