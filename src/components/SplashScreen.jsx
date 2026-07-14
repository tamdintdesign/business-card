import { useEffect, useState } from 'react';

const HOLD_MS = 1400;
const FADE_MS = 500;

function getInitials(name) {
  if (!name?.trim()) return 'G4';

  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export function SplashScreen({ name, accentColor, onFinish }) {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = setTimeout(() => setIsLeaving(true), HOLD_MS);
    const finishTimer = setTimeout(() => onFinish(), HOLD_MS + FADE_MS);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`splash-screen fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-opacity duration-500 ease-out ${
        isLeaving ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      role="status"
      aria-live="polite"
      aria-label="Loading Growth4u Connect"
    >
      <div
        className="splash-mark mb-6 flex h-24 w-24 items-center justify-center rounded-3xl text-3xl font-bold tracking-tight text-white"
        style={{
          background: `linear-gradient(145deg, ${accentColor} 0%, ${accentColor}cc 100%)`,
        }}
      >
        {getInitials(name)}
      </div>

      <p className="splash-brand text-lg font-semibold tracking-tight text-gray-900">
        Growth4u Connect
      </p>
      {name?.trim() ? (
        <p className="splash-name mt-2 text-sm font-medium text-gray-400">
          {name}
        </p>
      ) : (
        <p className="splash-name mt-2 text-sm font-medium text-gray-400">
          Digital business card
        </p>
      )}

      <div
        className="splash-bar mt-10 h-1 w-16 overflow-hidden rounded-full bg-gray-100"
        aria-hidden="true"
      >
        <div
          className="h-full w-full origin-left rounded-full"
          style={{
            backgroundColor: accentColor,
            animation: `splash-progress ${HOLD_MS}ms ease-out forwards`,
          }}
        />
      </div>
    </div>
  );
}
