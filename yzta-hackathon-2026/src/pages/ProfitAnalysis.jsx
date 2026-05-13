import React from 'react';
import { BarChart3, TrendingUp, PieChart, ArrowUpRight } from 'lucide-react';

const ProfitAnalysis = () => {
  return (
    <div className="page-container profit-analysis">
      <header className="page-header">
        <div className="header-title">
          <h2>Kâr Analizi</h2>
          <p>Mağazanızın finansal performansını ve kârlılık oranlarını takip edin.</p>
        </div>
      </header>

      <div className="analysis-grid">
        <div className="summary-card glass">
          <h3>Toplam Brüt Kâr</h3>
          <div className="value">₺12.450,00</div>
          <div className="trend up"><ArrowUpRight size={16} /> %8.5</div>
        </div>
        <div className="summary-card glass">
          <h3>Ortalama Marj</h3>
          <div className="value">%24.2</div>
          <div className="trend up"><ArrowUpRight size={16} /> %1.2</div>
        </div>
      </div>

      <div className="chart-card glass full-width">
        <h3>Kategori Bazlı Kâr Dağılımı</h3>
        <div className="mock-pie-chart">
          {/* Mock Pie Chart Visualization */}
          <div className="pie-segments">
            <div className="segment gida" style={{ '--val': 40 }}></div>
            <div className="segment sut" style={{ '--val': 30 }}></div>
            <div className="segment firin" style={{ '--val': 20 }}></div>
            <div className="segment diger" style={{ '--val': 10 }}></div>
          </div>
          <div className="legend">
            <div className="item"><span className="dot gida"></span> Gıda (%40)</div>
            <div className="item"><span className="dot sut"></span> Süt (%30)</div>
            <div className="item"><span className="dot firin"></span> Fırın (%20)</div>
            <div className="item"><span className="dot diger"></span> Diğer (%10)</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .profit-analysis { display: flex; flex-direction: column; gap: 2rem; }
        .analysis-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        .summary-card, .chart-card { padding: 1.5rem; border-radius: var(--radius-xl); box-shadow: var(--shadow-md); }
        .summary-card h3 { font-size: 1rem; color: var(--text-secondary); margin-bottom: 0.5rem; }
        .summary-card .value { font-size: 2.5rem; font-weight: 800; }
        .trend.up { color: #10b981; display: flex; align-items: center; gap: 0.25rem; font-weight: 700; }
        .mock-pie-chart { display: flex; align-items: center; gap: 4rem; margin-top: 2rem; padding: 2rem; justify-content: center; }
        .pie-segments { width: 200px; height: 200px; border-radius: 50%; background: conic-gradient(var(--primary-color) 0% 40%, var(--secondary-color) 40% 70%, #f97316 70% 90%, #6b7280 90% 100%); }
        .legend { display: flex; flex-direction: column; gap: 1rem; }
        .item { display: flex; align-items: center; gap: 0.75rem; font-weight: 600; }
        .dot { width: 12px; height: 12px; border-radius: 50%; }
        .dot.gida { background: var(--primary-color); }
        .dot.sut { background: var(--secondary-color); }
        .dot.firin { background: #f97316; }
        .dot.diger { background: #6b7280; }
      `}</style>
    </div>
  );
};

export default ProfitAnalysis;
