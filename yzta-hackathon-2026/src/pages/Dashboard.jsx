import React from 'react';
import { TrendingUp, Package, AlertTriangle, ShoppingCart, Sparkles, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, trend, icon: Icon, color }) => (
  <div className="stat-card glass">
    <div className="stat-card-header">
      <div className={`icon-container ${color}`}>
        <Icon size={20} />
      </div>
      {trend && (
        <div className={`trend ${trend.type}`}>
          {trend.type === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          <span>{trend.value}</span>
        </div>
      )}
    </div>
    <div className="stat-card-body">
      <h3>{title}</h3>
      <p className="value">{value}</p>
    </div>
  </div>
);

const RecommendationItem = ({ text }) => (
  <div className="recommendation-item">
    <div className="recommendation-icon">
      <Sparkles size={16} />
    </div>
    <p>{text}</p>
    <button className="apply-btn">Uygula</button>
  </div>
);

const Dashboard = () => {
  const stats = [
    { title: 'Günlük Satış', value: '₺4.250', trend: { type: 'up', value: '%12' }, icon: TrendingUp, color: 'blue' },
    { title: 'Kritik Stok', value: '3 Ürün', trend: { type: 'down', value: '5 Ürün' }, icon: AlertTriangle, color: 'orange' },
    { title: 'Toplam Ürün', value: '1.240', trend: { type: 'up', value: '+12' }, icon: Package, color: 'green' },
    { title: 'Yeni Sipariş', value: '5 Yeni', trend: { type: 'up', value: '+2' }, icon: ShoppingCart, color: 'purple' },
  ];

  const recommendations = [
    { text: 'Süt stokları hızla tükeniyor, bugün sipariş vermeniz önerilir.' },
    { text: 'Ekmek satışları öğleden sonra artıyor, rafı ön plana çekin.' },
    { text: 'Bekleyen yoğurtlar için "1 alana 1 bedava" kampanyası başlatın.' },
  ];

  return (
    <div className="page-container dashboard">
      <header className="page-header">
        <div className="header-title">
          <h2>Ana Panel</h2>
          <p>Mağazanızın bugünkü performans özeti ve akıllı önerileri.</p>
        </div>
        <div className="header-actions">
          <button className="primary-btn">Verileri Güncelle</button>
        </div>
      </header>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="dashboard-layout">
        <section className="recommendations-card glass">
          <div className="card-header">
            <Sparkles className="sparkle-icon" size={20} />
            <h3>AI Ticari Öneriler</h3>
          </div>
          <div className="recommendations-list">
            {recommendations.map((rec, index) => (
              <RecommendationItem key={index} text={rec.text} />
            ))}
          </div>
        </section>

        <section className="chart-card glass">
          <div className="card-header">
            <h3>Günlük Satış Trendi</h3>
          </div>
          <div className="chart-area">
            <div className="chart-bars">
              {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                <div key={i} className="bar" style={{ height: `${h}%` }}>
                  <div className="bar-tooltip">₺{h * 100}</div>
                </div>
              ))}
            </div>
            <div className="chart-labels">
              <span>Pzt</span><span>Sal</span><span>Çar</span><span>Per</span><span>Cum</span><span>Cmt</span><span>Paz</span>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .dashboard {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }

        .stat-card {
          padding: 1.5rem;
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          gap: 1rem;
          box-shadow: var(--shadow-md);
        }

        .stat-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .icon-container {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-container.blue { background: #eef2ff; color: #1a56db; }
        .icon-container.orange { background: #fff7ed; color: #f97316; }
        .icon-container.green { background: #f0fdf4; color: #10b981; }
        .icon-container.purple { background: #faf5ff; color: #7c3aed; }

        .trend {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.875rem;
          font-weight: 700;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
        }

        .trend.up { color: #10b981; background: #f0fdf4; }
        .trend.down { color: #ef4444; background: #fef2f2; }

        .stat-card-body h3 {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 0.25rem;
        }

        .stat-card-body .value {
          font-size: 1.75rem;
          font-weight: 800;
        }

        .dashboard-layout {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 1.5rem;
        }

        .recommendations-card, .chart-card {
          padding: 1.5rem;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-md);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .sparkle-icon {
          color: var(--primary-color);
        }

        .recommendations-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .recommendation-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--background-color);
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
        }

        .recommendation-icon {
          color: var(--primary-color);
          background: var(--primary-light);
          padding: 0.5rem;
          border-radius: var(--radius-md);
        }

        .recommendation-item p {
          flex: 1;
          font-size: 0.9375rem;
          font-weight: 500;
        }

        .apply-btn {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--primary-color);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--primary-color);
        }

        .chart-area {
          height: 300px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 1rem;
        }

        .chart-bars {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          height: 100%;
          padding: 0 1rem;
        }

        .bar {
          width: 32px;
          background: var(--primary-color);
          border-radius: var(--radius-sm) var(--radius-sm) 0 0;
          position: relative;
        }

        .bar-tooltip {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--text-primary);
          color: white;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          display: none;
        }

        .bar:hover .bar-tooltip {
          display: block;
        }

        .chart-labels {
          display: flex;
          justify-content: space-between;
          padding: 0 1rem;
          color: var(--text-secondary);
          font-size: 0.75rem;
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .dashboard-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
