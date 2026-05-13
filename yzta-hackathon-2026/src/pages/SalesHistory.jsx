import React from 'react';
import { History, Search, Download, Calendar } from 'lucide-react';

const SalesHistory = () => {
  const transactions = [
    { id: 'TRX001', date: '13 May 2026, 14:20', items: 'Ekmek, Süt, Yumurta', total: '₺165.00', status: 'completed' },
    { id: 'TRX002', date: '13 May 2026, 13:45', items: 'Yoğurt, Peynir', total: '₺120.50', status: 'completed' },
    { id: 'TRX003', date: '13 May 2026, 12:30', items: 'Su (5L), Meyve Suyu', total: '₺45.00', status: 'completed' },
    { id: 'TRX004', date: '12 May 2026, 18:15', items: 'Temizlik Malzemeleri', total: '₺340.00', status: 'completed' },
  ];

  return (
    <div className="page-container sales-history">
      <header className="page-header">
        <div className="header-title">
          <h2>Satış Geçmişi</h2>
          <p>Mağazanızın geçmiş tüm işlemlerini ve satış detaylarını inceleyin.</p>
        </div>
        <div className="header-actions">
          <button className="secondary-btn"><Calendar size={18} /> Tarih Aralığı</button>
          <button className="secondary-btn"><Download size={18} /> Dışa Aktar</button>
        </div>
      </header>

      <div className="transactions-card glass">
        <div className="table-header">
          <div className="search-box">
            <Search size={18} />
            <input type="text" placeholder="İşlem veya ürün ara..." />
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>İşlem No</th>
              <th>Tarih</th>
              <th>Ürünler</th>
              <th>Toplam</th>
              <th>Durum</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id}>
                <td><strong>{t.id}</strong></td>
                <td>{t.date}</td>
                <td>{t.items}</td>
                <td>{t.total}</td>
                <td><span className="status-dot completed">Tamamlandı</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .sales-history { display: flex; flex-direction: column; gap: 2rem; }
        .transactions-card { padding: 1.5rem; border-radius: var(--radius-xl); box-shadow: var(--shadow-md); }
        .table-header { margin-bottom: 1.5rem; display: flex; justify-content: flex-start; }
        .search-box { display: flex; align-items: center; gap: 0.75rem; background: var(--background-color); padding: 0.5rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-color); width: 100%; max-width: 400px; }
        .search-box input { background: none; border: none; flex: 1; font-family: inherit; }
        .search-box input:focus { outline: none; }
        .data-table { width: 100%; border-collapse: collapse; }
        .data-table th { text-align: left; padding: 1rem; color: var(--text-secondary); border-bottom: 1px solid var(--border-color); }
        .data-table td { padding: 1rem; border-bottom: 1px solid var(--border-color); font-size: 0.9375rem; }
        .status-dot { display: flex; align-items: center; gap: 0.5rem; }
        .status-dot::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background: #10b981; }
      `}</style>
    </div>
  );
};

export default SalesHistory;
