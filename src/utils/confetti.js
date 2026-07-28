import confetti from 'canvas-confetti';

export const triggerUnlockConfetti = () => {
  // Burst 1: Imperial Gold & Crimson fireworks
  confetti({
    particleCount: 60,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#d4af37', '#f4d068', '#9e1b32', '#e63946', '#ffffff'],
    shapes: ['star', 'circle'],
    scalar: 1.2
  });

  // Burst 2: Side cannons
  setTimeout(() => {
    confetti({
      particleCount: 35,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#ffd700', '#c0c0c0', '#d90429']
    });
    confetti({
      particleCount: 35,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#ffd700', '#c0c0c0', '#d90429']
    });
  }, 180);
};

export const triggerGrandFinaleConfetti = () => {
  const duration = 3.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#d4af37', '#f4d068', '#9e1b32', '#ffffff']
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#ffd700', '#e63946', '#c0c0c0']
    });
  }, 250);
};

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}
