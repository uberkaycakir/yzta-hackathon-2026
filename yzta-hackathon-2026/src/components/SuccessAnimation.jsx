import React, { useEffect, useState } from 'react';
import { 
  CheckCircle2, 
  Milk, 
  ShoppingBasket, 
  Apple, 
  Croissant, 
  UtensilsCrossed 
} from 'lucide-react';

const SuccessAnimation = ({ type, onClose }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 100),
      setTimeout(() => setStep(2), 800),
      setTimeout(() => setStep(3), 3200),
      setTimeout(() => onClose(), 5500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, [onClose]);

  return (
    <div className="animation-overlay">
      <div className="animation-container glass">
        {step < 3 && (
          <div className="bag-animation">
            <div className={`realistic-bag ${step >= 2 ? 'active' : ''}`}>
              <div className="bag-body">
                <div className="bag-fold"></div>
                <div className="bag-handle-hole"></div>
              </div>
              <div className="bag-bottom"></div>
            </div>
            
            <div className={`products-container ${step >= 2 ? 'falling' : ''}`}>
              <div className="product p-1"><Milk size={32} /></div>
              <div className="product p-2"><Croissant size={28} /></div>
              <div className="product p-3"><Apple size={24} /></div>
              <div className="product p-4"><UtensilsCrossed size={20} /></div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="success-message-final fade-in">
            <div className="check-ring">
              <CheckCircle2 size={80} color="#10b981" />
            </div>
            <h2>{type === 'order' ? 'Siparişiniz Yolda!' : 'Kampanya Yayında!'}</h2>
            <p>{type === 'order' ? 'Ürünleriniz özenle paketlendi ve tedarikçiye iletildi.' : 'Müşterilerinize yeni teklifleriniz ulaştırılıyor.'}</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .animation-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(15, 23, 42, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(12px);
        }

        .animation-container {
          width: 450px;
          height: 450px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 3rem;
          border-radius: 2.5rem;
          text-align: center;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .bag-animation {
          position: relative;
          width: 300px;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Realistic Paper Bag */
        .realistic-bag {
          position: absolute;
          bottom: 20px;
          width: 140px;
          height: 180px;
          z-index: 5;
        }

        .bag-body {
          position: absolute;
          width: 100%;
          height: 100%;
          background: #d2b48c;
          border-radius: 4px;
          box-shadow: inset -10px 0 20px rgba(0,0,0,0.1), 5px 10px 20px rgba(0,0,0,0.1);
          overflow: hidden;
          border: 1px solid #c4a47c;
        }

        .bag-fold {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 30px;
          background: #c4a47c;
          clip-path: polygon(0% 0%, 10% 100%, 20% 0%, 30% 100%, 40% 0%, 50% 100%, 60% 0%, 70% 100%, 80% 0%, 90% 100%, 100% 0%);
        }

        .bag-handle-hole {
          position: absolute;
          top: 45px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 15px;
          background: rgba(0,0,0,0.1);
          border-radius: 10px;
        }

        .realistic-bag.active {
          animation: bagBounce 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1.5s infinite alternate;
        }

        @keyframes bagBounce {
          from { transform: scaleY(1); }
          to { transform: scaleY(0.95) translateY(5px); }
        }

        /* Products Animation */
        .products-container {
          position: absolute;
          top: -100px;
          width: 100%;
          display: flex;
          justify-content: center;
          z-index: 2;
        }

        .product {
          position: absolute;
          color: #1e293b;
          filter: drop-shadow(0 8px 12px rgba(0,0,0,0.15));
          opacity: 0;
        }

        .products-container.falling .product {
          animation: fallAndHide 1.8s forwards cubic-bezier(0.47, 0, 0.745, 0.715);
        }

        .p-1 { animation-delay: 0.2s !important; left: 20%; }
        .p-2 { animation-delay: 0.5s !important; left: 45%; }
        .p-3 { animation-delay: 0.8s !important; left: 70%; }
        .p-4 { animation-delay: 1.1s !important; left: 35%; }

        @keyframes fallAndHide {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; transform: translateY(220px) rotate(360deg) scale(0.8); }
          100% { opacity: 0; transform: translateY(240px) scale(0.2); }
        }

        /* Final State */
        .success-message-final h2 {
          font-size: 2rem;
          margin-top: 1.5rem;
          color: var(--text-primary);
        }

        .success-message-final p {
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }

        .check-ring {
          animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes popIn {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }

        .fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SuccessAnimation;
