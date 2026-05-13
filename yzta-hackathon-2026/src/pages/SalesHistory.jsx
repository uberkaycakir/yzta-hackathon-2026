import React, { useState } from 'react';
import { History, Search, Download, Calendar } from 'lucide-react';
import { useData } from '../context/DataContext';

import Modal from '../components/Modal';

const SalesHistory = () => {
  const { sales } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  const parseDate = (dateStr) => {
    const [d, m, y] = dateStr.split('.').map(Number);
    return new Date(y, m - 1, d);
  };

  const handleExport = () => {
    const headers = ['Islem No', 'Tarih', 'Urunler', 'Toplam (TL)', 'Durum'];
    const rows = filteredSales.map(s => [
      `TRX${s.id.toString().padStart(3, '0')}`,
      s.date,
      s.product,
      s.total.toFixed(2),
      'Tamamlandi'
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `satis_gecmisi_${new Date().toISOString().split('T')[0]}.csv`);
    link.click();
  };

  const filteredSales = sales.filter(s => {
    const matchesSearch = s.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.id.toString().includes(searchTerm);
    
    if (!startDate && !endDate) return matchesSearch;

    const saleDate = parseDate(s.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start) start.setHours(0, 0, 0, 0);
    if (end) end.setHours(23, 59, 59, 999);

    const matchesDate = (!start || saleDate >= start) && (!end || saleDate <= end);
    return matchesSearch && matchesDate;
  });

  return (
    <div className="page-container sales-history">
      <header className="page-header">
        <div className="header-title">
          <h2>Satış Geçmişi</h2>
          <p>Mağazanızın geçmiş tüm işlemlerini ve satış detaylarını inceleyin.</p>
        </div>
        <div className="header-actions">
          <button className="secondary-btn" onClick={() => setIsDateModalOpen(true)}>
            <Calendar size={18} /> {startDate || endDate ? 'Filtreyi Düzenle' : 'Tarih Aralığı'}
          </button>
          {(startDate || endDate) && (
            <button className="secondary-btn" onClick={() => { setStartDate(''); setEndDate(''); }} style={{ color: '#ef4444' }}>
              Temizle
            </button>
          )}
          <button className="secondary-btn" onClick={handleExport}>
            <Download size={18} /> Dışa Aktar
          </button>
        </div>
      </header>

      <Modal
        isOpen={isDateModalOpen}
        onClose={() => setIsDateModalOpen(false)}
        title="Tarih Aralığı Seçin"
      >
        <div className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>Başlangıç Tarihi</label>
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label>Bitiş Tarihi</label>
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
              />
            </div>
          </div>
          <button className="primary-btn full-width" onClick={() => setIsDateModalOpen(false)}>
            Uygula
          </button>
        </div>
      </Modal>

      <div className="transactions-card glass">
        <div className="table-header">
          <div className="search-box">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="İşlem veya ürün ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
            {filteredSales.map((t) => (
              <tr key={t.id}>
                <td><strong>TRX{t.id.toString().padStart(3, '0')}</strong></td>
                <td>{t.date}</td>
                <td>{t.product}</td>
                <td>₺{t.total.toFixed(2)}</td>
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
