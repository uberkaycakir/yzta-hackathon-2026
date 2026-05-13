import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

const WelcomeScreen = ({ name, onDone }) => {
  const [phase, setPhase] = useState('in'); // 'in' → 'hold' → 'out'

  useEffect(() => {
    const holdTimer = setTimeout(() => setPhase('out'), 2800);
    const doneTimer = setTimeout(() => onDone(), 3500);
    return () => { clearTimeout(holdTimer); clearTimeout(doneTimer); };
  }, []);

  return (
    <div className={`welcome-screen ${phase}`}>
      <div className="welcome-content">
        <div className="welcome-logo">
          <Sparkles size={18} />
        </div>
        <div className="welcome-text">
          <p className="welcome-sub">TradeMate AI</p>
          <h1 className="welcome-title">
            Hoş Geldiniz, <span>{name} Bey</span>
          </h1>
        </div>
        <div className="welcome-bar">
          <div className="welcome-bar-fill" />
        </div>
      </div>

      <style jsx>{`
        .welcome-screen {
          position: fixed; top: 2rem; left: 50%; transform: translateX(-50%);
          z-index: 9999; pointer-events: none;
          animation: toastIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .welcome-screen.out { animation: toastOut 0.5s forwards; }

        @keyframes toastIn  { from { opacity: 0; transform: translateX(-50%) translateY(-20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        @keyframes toastOut { from { opacity: 1; transform: translateX(-50%) translateY(0); } to { opacity: 0; transform: translateX(-50%) translateY(-20px); } }

        .welcome-content {
          display: flex; align-items: center; gap: 1rem;
          background: rgba(15, 23, 42, 0.55);
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 999px; padding: 0.75rem 1.5rem;
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
          color: white; white-space: nowrap;
        }

        .welcome-logo {
          width: 36px; height: 36px; border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #7c3aed);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .welcome-text { display: flex; flex-direction: column; gap: 0.1rem; }
        .welcome-sub { font-size: 0.7rem; opacity: 0.6; letter-spacing: 0.08em; text-transform: uppercase; }
        .welcome-title { font-size: 1rem; font-weight: 700; }
        .welcome-title span { color: #93c5fd; }

        .welcome-bar {
          width: 60px; height: 3px; background: rgba(255,255,255,0.15);
          border-radius: 999px; overflow: hidden; flex-shrink: 0;
        }
        .welcome-bar-fill {
          height: 100%; background: rgba(255,255,255,0.6); border-radius: 999px;
          animation: fill 2.6s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        @keyframes fill { from { width: 0; } to { width: 100%; } }
      `}</style>
    </div>
  );
};

export default WelcomeScreen;
