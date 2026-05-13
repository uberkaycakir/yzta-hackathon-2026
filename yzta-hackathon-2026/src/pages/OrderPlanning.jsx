import React, { useState } from 'react';
import { CalendarDays, ShoppingCart, Truck, CheckCircle2, Plus } from 'lucide-react';
import { useData } from '../context/DataContext';
import Modal from '../components/Modal';
import SuccessAnimation from '../components/SuccessAnimation';

const OrderPlanning = () => {
  const { orders, addOrder } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [newOrder, setNewOrder] = useState({
    supplier: '',
    items: '',
    total: ''
  });

  const handleAddOrder = (e) => {
    e.preventDefault();
    addOrder({
      supplier: newOrder.supplier,
      items: newOrder.items,
      total: `₺${newOrder.total}`
    });
    setNewOrder({ supplier: '', items: '', total: '' });
    setIsModalOpen(false);
    setShowAnimation(true);
  };

  return (
    <div className="page-container order-planning">
      <header className="page-header">
        <div className="header-title">
          <h2>Sipariş Planlama</h2>
          <p>Yapay zeka tahminlerine dayalı gelecek dönem siparişlerinizi yönetin.</p>
        </div>
        <div className="header-actions">
          <button className="primary-btn" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} /> Yeni Sipariş Planla
          </button>
        </div>
      </header>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Yeni Sipariş Oluştur"
      >
        <form onSubmit={handleAddOrder} className="modal-form">
          <div className="form-group">
            <label>Tedarikçi</label>
            <input 
              type="text" 
              required 
              value={newOrder.supplier}
              onChange={(e) => setNewOrder({...newOrder, supplier: e.target.value})}
              placeholder="Örn: Öz Süt A.Ş."
            />
          </div>
          <div className="form-group">
            <label>Ürünler</label>
            <input 
              type="text" 
              required 
              value={newOrder.items}
              onChange={(e) => setNewOrder({...newOrder, items: e.target.value})}
              placeholder="Örn: Süt, Yoğurt"
            />
          </div>
          <div className="form-group">
            <label>Toplam Tutar (₺)</label>
            <input 
              type="number" 
              required 
              value={newOrder.total}
              onChange={(e) => setNewOrder({...newOrder, total: e.target.value})}
              placeholder="0.00"
            />
          </div>
          <button type="submit" className="primary-btn full-width">Siparişi Onayla</button>
        </form>
      </Modal>

      <div className="planning-grid">
        <section className="upcoming-orders glass">
          <h3>Beklenen Teslimatlar</h3>
          <div className="order-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-info">
                  <Truck className="truck-icon" />
                  <div>
                    <h4>{order.supplier}</h4>
                    <p>{order.items}</p>
                  </div>
                </div>
                <div className="order-status-group">
                  <span className="order-total">{order.total}</span>
                  <span className={`status-label ${order.status === 'Beklemede' ? 'shipping' : 'confirmed'}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="ai-prediction glass">
          <div className="card-header">
            <CheckCircle2 color="var(--primary-color)" />
            <h3>AI Sipariş Önerisi</h3>
          </div>
          <p>Hafta sonu gerçekleşecek olan yerel etkinlik nedeniyle içecek talebinde <strong>%40 artış</strong> bekleniyor. Stoklarınızı bugün güncellemenizi öneririz.</p>
          <button className="secondary-btn full-width">Önerilen Listeyi Görüntüle</button>
        </section>
      </div>

      {showAnimation && (
        <SuccessAnimation 
          type="order" 
          onClose={() => setShowAnimation(false)} 
        />
      )}

      <style jsx>{`
        .order-planning { display: flex; flex-direction: column; gap: 2rem; }
        .planning-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 1.5rem; }
        .upcoming-orders, .ai-prediction { padding: 1.5rem; border-radius: var(--radius-xl); box-shadow: var(--shadow-md); }
        .order-list { display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem; }
        .order-card { display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: var(--background-color); border-radius: var(--radius-lg); border: 1px solid var(--border-color); }
        .order-info { display: flex; gap: 1rem; align-items: center; }
        .truck-icon { color: var(--primary-color); }
        .order-status-group { display: flex; flex-direction: column; align-items: flex-end; gap: 0.25rem; }
        .order-total { font-weight: 800; font-size: 1rem; }
        .status-label { font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.75rem; border-radius: 999px; }
        .status-label.shipping { background: #eff6ff; color: #2563eb; }
        .status-label.confirmed { background: #f0fdf4; color: #10b981; }
        .full-width { width: 100%; margin-top: 1rem; }
      `}</style>
    </div>
  );
};

export default OrderPlanning;
