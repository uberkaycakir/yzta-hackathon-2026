import React, { useState } from 'react';
import { Grid3X3, Sparkles, MapPin, Camera } from 'lucide-react';
import Modal from '../components/Modal';

const ShelfPlacement = ({ setActiveTab }) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState(null);

  const cameras = {
    bakery: { 
      name: 'Reyon 01: Fırın', 
      img: '/assets/cameras/bakery.png', 
      analysis: 'Ekmek stokları yeterli, simitler azalıyor.',
      action: 'Simit Sipariş Et',
      target: 'planning'
    },
    dairy: { 
      name: 'Reyon 02: Süt & Şarküteri', 
      img: '/assets/cameras/dairy.png', 
      analysis: 'Dikkat: Süt stokları kritik seviyede! (%15)',
      action: 'Süt Sipariş Ver',
      target: 'planning'
    },
    aisle1: { 
      name: 'Reyon 03: Atıştırmalıklar', 
      img: '/assets/cameras/snacks.png', 
      analysis: 'Cips reyonunda boşluklar tespit edildi (Stok: %40).',
      action: 'Envanteri Güncelle',
      target: 'inventory'
    },
    aisle2: { 
      name: 'Reyon 04: İçecekler', 
      img: '/assets/cameras/snacks.png', 
      analysis: 'İçecekler ve atıştırmalıklar çapraz satış için uyumlu.',
      action: 'Kampanya Oluştur',
      target: 'campaigns'
    },
  };

  const openCamera = (id) => {
    setSelectedCamera(cameras[id]);
    setIsCameraOpen(true);
  };

  const handleDownloadPlanogram = () => {
    // A more realistic and detailed SVG representing a store planogram
    const svgContent = `
      <svg width="1000" height="800" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#1a56db;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
          </linearGradient>
          <filter id="shadow" x="0" y="0" width="200%" height="200%">
            <feOffset result="offOut" in="SourceAlpha" dx="3" dy="3" />
            <feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" />
            <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
          </filter>
        </defs>

        <rect width="100%" height="100%" fill="#f9f9ff"/>
        
        <!-- Header -->
        <rect width="100%" height="80" fill="url(#headerGrad)"/>
        <text x="30" y="50" font-family="'Segoe UI', Roboto, Helvetica" font-size="28" font-weight="bold" fill="white">AKILLI MAGAZA PLANOGRAMI</text>
        <text x="800" y="50" font-family="Arial" font-size="14" fill="white" opacity="0.8">Yayin Tarihi: ${new Date().toLocaleDateString('tr-TR')}</text>
        
        <!-- Store Layout Legend -->
        <g transform="translate(30, 100)">
          <rect width="940" height="40" rx="5" fill="#eef2ff" stroke="#dbeafe"/>
          <text x="15" y="25" font-family="Arial" font-size="14" font-weight="bold" fill="#1e40af">LEJANT:</text>
          <rect x="100" y="12" width="15" height="15" fill="#10b981" rx="3"/>
          <text x="120" y="25" font-family="Arial" font-size="12" fill="#4b5563">Hizli Devir</text>
          <rect x="220" y="12" width="15" height="15" fill="#f59e0b" rx="3"/>
          <text x="240" y="25" font-family="Arial" font-size="12" fill="#4b5563">Orta Devir</text>
          <rect x="340" y="12" width="15" height="15" fill="#ef4444" rx="3"/>
          <text x="360" y="25" font-family="Arial" font-size="12" fill="#4b5563">Promosyon</text>
        </g>

        <!-- Shelf Block 1: Bakery & Breakfast -->
        <g transform="translate(30, 160)" filter="url(#shadow)">
          <rect width="450" height="280" rx="12" fill="white" stroke="#e2e8f0" stroke-width="2"/>
          <path d="M0 40 Q 225 30 450 40 L 450 0 L 0 0 Z" fill="#fff7ed"/>
          <text x="20" y="25" font-family="Arial" font-size="16" font-weight="bold" fill="#9a3412">REYON 01: FIRIN VE KAHVALTI</text>
          
          <!-- Shelves -->
          <g transform="translate(20, 60)">
            <!-- Top Shelf -->
            <rect width="410" height="50" rx="4" fill="#f8fafc" stroke="#cbd5e1" stroke-dasharray="4"/>
            <text x="10" y="20" font-family="Arial" font-size="11" fill="#64748b">UST RAF (H: 180cm)</text>
            <text x="10" y="40" font-family="Arial" font-size="14" font-weight="bold" fill="#1e293b">Galeta, Kitir Ekmek, Paketli Unlar</text>
            
            <!-- Eye Level Shelf -->
            <rect y="70" width="410" height="70" rx="4" fill="#f0fdf4" stroke="#10b981" stroke-width="2"/>
            <text x="10" y="90" font-family="Arial" font-size="11" fill="#059669" font-weight="bold">GOZ HIZASI - KRITIK BOLGE</text>
            <text x="10" y="120" font-family="Arial" font-size="16" font-weight="bold" fill="#065f46">Taze Ekmek, Simit, Corek (Guncel)</text>
            <circle cx="390" cy="105" r="12" fill="#10b981"/>
            <text x="385" y="110" font-family="Arial" font-size="12" font-weight="bold" fill="white">!</text>

            <!-- Bottom Shelf -->
            <rect y="160" width="410" height="50" rx="4" fill="#f8fafc" stroke="#cbd5e1"/>
            <text x="10" y="180" font-family="Arial" font-size="11" fill="#64748b">ALT RAF (H: 40cm)</text>
            <text x="10" y="200" font-family="Arial" font-size="14" font-weight="bold" fill="#1e293b">Buyuk Paket Unlar, Seker Cuval</text>
          </g>
        </g>

        <!-- Shelf Block 2: Dairy & Deli -->
        <g transform="translate(520, 160)" filter="url(#shadow)">
          <rect width="450" height="280" rx="12" fill="white" stroke="#e2e8f0" stroke-width="2"/>
          <path d="M0 40 Q 225 30 450 40 L 450 0 L 0 0 Z" fill="#eff6ff"/>
          <text x="20" y="25" font-family="Arial" font-size="16" font-weight="bold" fill="#1e40af">REYON 02: SUT VE SARKUTERI</text>
          
          <g transform="translate(20, 60)">
            <rect width="410" height="200" rx="8" fill="#f1f5f9"/>
            <text x="150" y="110" font-family="Arial" font-size="14" fill="#94a3b8" text-anchor="middle">SOGUTMALI SISTEM DUZENI</text>
            
            <!-- Products -->
            <rect x="10" y="20" width="120" height="60" rx="4" fill="#3b82f6"/>
            <text x="70" y="55" font-family="Arial" font-size="12" font-weight="bold" fill="white" text-anchor="middle">SUT (Tam Yagli)</text>
            
            <rect x="145" y="20" width="120" height="60" rx="4" fill="#60a5fa"/>
            <text x="205" y="55" font-family="Arial" font-size="12" font-weight="bold" fill="white" text-anchor="middle">SUT (Yarim Yagli)</text>
            
            <rect x="280" y="20" width="120" height="60" rx="4" fill="#93c5fd"/>
            <text x="340" y="55" font-family="Arial" font-size="12" font-weight="bold" fill="white" text-anchor="middle">PEYNIR GRUBU</text>
            
            <rect x="10" y="100" width="390" height="80" rx="4" fill="#fbbf24" opacity="0.3" stroke="#d97706" stroke-dasharray="4"/>
            <text x="205" y="145" font-family="Arial" font-size="14" font-weight="bold" fill="#92400e" text-anchor="middle">PROMOSYON ALANI: %20 INDIRIMLI YOGURTLAR</text>
          </g>
        </g>

        <!-- AI Insights Footer -->
        <g transform="translate(30, 480)">
          <rect width="940" height="280" rx="15" fill="#fdf4ff" stroke="#f5d0fe" stroke-width="2"/>
          <text x="30" y="40" font-family="Arial" font-size="20" font-weight="bold" fill="#701a75">YAPAY ZEKA YERLESIM ANALIZI</text>
          
          <circle cx="50" cy="90" r="8" fill="#d946ef"/>
          <text x="70" y="95" font-family="Arial" font-size="14" fill="#86198f">Giris trafiginin %80'i dogrudan Reyon 01'e yoneliyor.</text>
          
          <circle cx="50" cy="130" r="8" fill="#d946ef"/>
          <text x="70" y="135" font-family="Arial" font-size="14" fill="#86198f">Reyon 02'deki promosyon alani satis hacmini %18 artirdi.</text>
          
          <rect x="30" y="170" width="880" height="80" rx="10" fill="white" stroke="#f5d0fe"/>
          <text x="50" y="200" font-family="Arial" font-size="14" font-weight="bold" fill="#701a75">STRATEJIK TAVSIYE:</text>
          <text x="50" y="230" font-family="Arial" font-size="15" fill="#4a044e">"Atistirmalik" reyonunu "Icecekler" ile yan yana getirmek capraz satis olasiligini maksimize edecektir.</text>
        </g>
      </svg>
    `;

    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `profesyonel_planogram_${new Date().toISOString().split('T')[0]}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="page-container shelf-placement">
      <header className="page-header">
        <div className="header-title">
          <h2>Raf Yerleşimi</h2>
          <p>Müşteri trafiği ve satış verilerine göre optimize edilmiş raf düzenleri.</p>
        </div>
      </header>

      <div className="shelf-grid">
        <section className="heatmap-card glass">
          <div className="card-header">
            <MapPin color="var(--primary-color)" size={20} />
            <h3>Mağaza Isı Haritası (Canlı Trafik)</h3>
          </div>
          <div className="heatmap-legend">
            <div className="legend-item"><span className="dot high"></span> Yoğun</div>
            <div className="legend-item"><span className="dot medium"></span> Orta</div>
            <div className="legend-item"><span className="dot low"></span> Düşük</div>
          </div>
          <div className="mock-heatmap">
            <div className="heatmap-container">
              {/* Entrance Area */}
              <div className="heat-zone entrance hot">Giriş</div>
              {/* Bakery Area */}
              <div className="heat-zone bakery hot" onClick={() => openCamera('bakery')}>Fırın</div>
              {/* Middle Aisles */}
              <div className="heat-zone aisle-1 warm" onClick={() => openCamera('aisle1')}>Reyon 1</div>
              <div className="heat-zone aisle-2 cold" onClick={() => openCamera('aisle2')}>Reyon 2</div>
              {/* Checkout Area */}
              <div className="heat-zone checkout warm">Kasa</div>
              {/* Cold Storage */}
              <div className="heat-zone cold-storage cold" onClick={() => openCamera('dairy')}>Süt & Et</div>
              
              {/* Traffic Paths */}
              <div className="path path-1"></div>
              <div className="path path-2"></div>
            </div>
          </div>
        </section>

        <section className="optimization-card glass">
          <div className="card-header">
            <Sparkles color="var(--primary-color)" />
            <h3>Yerleşim Optimizasyonu</h3>
          </div>
          <div className="suggestion">
            <h4>"Atıştırmalık" & "İçecek" İlişkisi</h4>
            <p>Veriler, cips alan müşterilerin %65'inin içecek de aldığını gösteriyor. Bu iki reyonu birbirine yaklaştırmanız çapraz satışı %15 artırabilir.</p>
          </div>
          <button className="primary-btn" onClick={handleDownloadPlanogram}>Planogramı İndir</button>
        </section>
      </div>

      <Modal 
        isOpen={isCameraOpen} 
        onClose={() => setIsCameraOpen(false)} 
        title={selectedCamera?.name || 'Canlı Kamera'}
      >
        <div className="camera-view">
          <div className="live-badge">CANLI</div>
          <img src={selectedCamera?.img} alt="Shelf Camera" className="shelf-camera-img" />
          <div className="camera-overlays">
            <div className="detection-box" style={{ top: '20%', left: '30%', width: '15%', height: '20%' }}></div>
            <div className="detection-box" style={{ top: '50%', left: '10%', width: '20%', height: '15%' }}></div>
            <div className="detection-box error" style={{ top: '40%', left: '60%', width: '10%', height: '15%' }}></div>
          </div>
          <div className="camera-analysis">
            <div className="analysis-text">
              <Sparkles size={16} />
              <p>{selectedCamera?.analysis}</p>
            </div>
            {selectedCamera?.action && (
              <button 
                className="primary-btn sm" 
                onClick={() => {
                  setActiveTab(selectedCamera.target);
                  setIsCameraOpen(false);
                }}
              >
                {selectedCamera.action}
              </button>
            )}
          </div>
        </div>
      </Modal>

      <style jsx>{`
        .shelf-placement { display: flex; flex-direction: column; gap: 2rem; }
        .shelf-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 1.5rem; }
        .heatmap-card, .optimization-card { padding: 1.5rem; border-radius: var(--radius-xl); box-shadow: var(--shadow-md); }
        
        .heatmap-legend { display: flex; gap: 1rem; margin-bottom: 1rem; }
        .legend-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; font-weight: 600; color: var(--text-secondary); }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .dot.high { background: #ef4444; }
        .dot.medium { background: #f97316; }
        .dot.low { background: #3b82f6; }

        .mock-heatmap { 
          height: 350px; 
          background: #f8fafc; 
          border-radius: var(--radius-lg); 
          position: relative; 
          overflow: hidden; 
          border: 2px solid var(--border-color);
        }
        
        .heatmap-container {
          position: relative;
          width: 100%;
          height: 100%;
          padding: 1rem;
        }

        .heat-zone {
          position: absolute;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.75rem;
          color: white;
          text-shadow: 0 1px 2px rgba(0,0,0,0.2);
          transition: transform 0.2s;
          cursor: pointer;
        }
        
        .heat-zone:hover { transform: scale(1.05); z-index: 10; }

        .hot { background: radial-gradient(circle, rgba(239,68,68,0.8) 0%, rgba(239,68,68,0.4) 100%); box-shadow: 0 0 20px rgba(239,68,68,0.3); }
        .warm { background: radial-gradient(circle, rgba(249,115,22,0.8) 0%, rgba(249,115,22,0.4) 100%); box-shadow: 0 0 20px rgba(249,115,22,0.3); }
        .cold { background: radial-gradient(circle, rgba(59,130,246,0.8) 0%, rgba(59,130,246,0.4) 100%); box-shadow: 0 0 20px rgba(59,130,246,0.3); }

        .entrance { top: 70%; left: 40%; width: 100px; height: 60px; }
        .bakery { top: 10%; left: 10%; width: 120px; height: 100px; }
        .aisle-1 { top: 20%; left: 40%; width: 40px; height: 150px; }
        .aisle-2 { top: 20%; left: 60%; width: 40px; height: 150px; }
        .checkout { top: 70%; left: 10%; width: 80px; height: 80px; }
        .cold-storage { top: 10%; left: 70%; width: 150px; height: 100px; }

        .path {
          position: absolute;
          background: rgba(var(--primary-color), 0.1);
          pointer-events: none;
        }
        
        .path-1 { top: 60%; left: 45%; width: 4px; height: 100px; background: linear-gradient(to top, #ef4444, transparent); }
        .path-2 { top: 15%; left: 25%; width: 150px; height: 4px; background: linear-gradient(to right, #ef4444, transparent); }

        .suggestion { margin: 1.5rem 0; padding: 1rem; background: var(--background-color); border-radius: var(--radius-lg); border: 1px solid var(--border-color); }
        .suggestion h4 { margin-bottom: 0.5rem; color: var(--primary-color); }

        /* Camera Styles */
        .camera-view { position: relative; border-radius: var(--radius-lg); overflow: hidden; background: black; }
        .shelf-camera-img { width: 100%; height: auto; display: block; filter: brightness(0.9); }
        .live-badge { 
          position: absolute; top: 1rem; right: 1rem; 
          background: #ef4444; color: white; padding: 0.25rem 0.75rem; 
          border-radius: var(--radius-sm); font-size: 0.75rem; font-weight: 800; 
          display: flex; align-items: center; gap: 0.5rem; z-index: 5;
        }
        .live-badge::before { content: ''; width: 8px; height: 8px; background: white; border-radius: 50%; animation: pulse 1s infinite; }
        
        .camera-overlays { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; }
        .detection-box { 
          position: absolute; border: 2px solid #10b981; 
          background: rgba(16, 185, 129, 0.1); border-radius: 4px; 
        }
        .detection-box.error { border-color: #ef4444; background: rgba(239, 68, 68, 0.1); }
        
        .camera-analysis { 
          padding: 1rem; background: rgba(0,0,0,0.8); color: white; 
          display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; font-size: 0.9rem;
        }
        .analysis-text { display: flex; align-items: center; gap: 0.75rem; }
        .primary-btn.sm { padding: 0.5rem 1rem; font-size: 0.8rem; }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ShelfPlacement;
