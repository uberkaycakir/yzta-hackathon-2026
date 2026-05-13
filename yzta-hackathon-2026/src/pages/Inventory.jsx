import React from 'react';
import { Package, Search, Filter, AlertCircle, TrendingUp, DollarSign } from 'lucide-react';

const Inventory = () => {
  const products = [
    { id: 1, name: 'Ekmek', stock: 12, status: 'critical', price: '₺10.00', category: 'Fırın' },
    { id: 2, name: 'Süt', stock: 45, status: 'overstock', price: '₺35.00', category: 'Süt ve Süt Ürünleri' },
    { id: 3, name: 'Yoğurt', stock: 24, status: 'normal', price: '₺45.00', category: 'Süt ve Süt Ürünleri' },
    { id: 4, name: 'Yumurta (30lu)', stock: 8, status: 'critical', price: '₺120.00', category: 'Gıda' },
  ];

  return (
    <div className="page-container inventory">
      <header className="page-header">
        <div className="header-title">
          <h2>Ürün & Stok Yönetimi</h2>
          <p>Mağazanızdaki tüm envanterin detaylı analizi ve stok durumu.</p>
        </div>
        <div className="header-actions">
          <div className="search-bar">
            <Search size={18} />
            <input type="text" placeholder="Ürün ara..." />
          </div>
          <button className="secondary-btn"><Filter size={18} /> Filtrele</button>
          <button className="primary-btn">+ Yeni Ürün</button>
        </div>
      </header>

      <section className="smart-insight glass">
        <div className="insight-header">
          <AlertCircle color="var(--primary-color)" size={24} />
          <h3>Zeki Öneri</h3>
        </div>
        <p>"Süt" ve "Ekmek" stokları günlük satış hızının %15 üzerine çıktı. Raf Bekleme Süresini düşürmek için önümüzdeki 3 gün için sipariş miktarını %10 azaltmanızı öneririm.</p>
      </section>

      <div className="inventory-grid">
        <div className="products-table-card glass">
          <div className="card-header">
            <h3>Ürün Listesi</h3>
          </div>
          <table className="products-table">
            <thead>
              <tr>
                <th>Ürün Adı</th>
                <th>Kategori</th>
                <th>Stok</th>
                <th>Fiyat</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.stock} Adet</td>
                  <td>{p.price}</td>
                  <td>
                    <span className={`status-badge ${p.status}`}>
                      {p.status === 'critical' ? 'Kritik' : p.status === 'overstock' ? 'Fazla Stok' : 'Normal'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="inventory-sidebar">
          <div className="summary-card glass">
            <div className="card-header">
              <TrendingUp size={20} color="var(--secondary-color)" />
              <h3>En Çok Satanlar</h3>
            </div>
            <div className="summary-list">
              <div className="summary-item"><span>Ekmek</span><strong>85 Satış</strong></div>
              <div className="summary-item"><span>Süt</span><strong>62 Satış</strong></div>
            </div>
          </div>

          <div className="summary-card glass">
            <div className="card-header">
              <DollarSign size={20} color="var(--primary-color)" />
              <h3>Kâr Özeti (Bugün)</h3>
            </div>
            <div className="summary-value">₺1.240,50</div>
            <p className="summary-subtext">Düne göre %5 artış</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .inventory {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .smart-insight {
          padding: 1.5rem;
          border-radius: var(--radius-xl);
          border-left: 6px solid var(--primary-color);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .insight-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .inventory-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }

        .products-table-card, .summary-card {
          padding: 1.5rem;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-md);
        }

        .products-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
        }

        .products-table th {
          text-align: left;
          padding: 1rem;
          color: var(--text-secondary);
          font-weight: 600;
          border-bottom: 1px solid var(--border-color);
        }

        .products-table td {
          padding: 1rem;
          border-bottom: 1px solid var(--border-color);
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .status-badge.critical { background: #fef2f2; color: #ef4444; }
        .status-badge.overstock { background: #fff7ed; color: #f97316; }
        .status-badge.normal { background: #f0fdf4; color: #10b981; }

        .inventory-sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .summary-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px dashed var(--border-color);
        }

        .summary-value {
          font-size: 2rem;
          font-weight: 800;
          margin-top: 0.5rem;
        }

        .summary-subtext {
          color: var(--secondary-color);
          font-size: 0.875rem;
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .inventory-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Inventory;
