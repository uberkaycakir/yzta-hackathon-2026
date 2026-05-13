import React, { useState } from 'react';
import { Package, Search, Filter, AlertCircle, TrendingUp, DollarSign, Trash2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import Modal from '../components/Modal';

const Inventory = ({ setActiveTab }) => {
  const { products, addProduct, deleteProduct } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    stock: '',
    price: '',
    category: 'Gıda'
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    addProduct({
      ...newProduct,
      stock: parseInt(newProduct.stock),
      price: parseFloat(newProduct.price)
    });
    setNewProduct({ name: '', stock: '', price: '', category: 'Gıda' });
    setIsModalOpen(false);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <input 
              type="text" 
              placeholder="Ürün ara..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="secondary-btn"><Filter size={18} /> Filtrele</button>
          <button className="primary-btn" onClick={() => setIsModalOpen(true)}>+ Yeni Ürün</button>
        </div>
      </header>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Yeni Ürün Ekle"
      >
        <form onSubmit={handleAddProduct} className="modal-form">
          <div className="form-group">
            <label>Ürün Adı</label>
            <input 
              type="text" 
              required 
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              placeholder="Örn: Elma"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Stok Adedi</label>
              <input 
                type="number" 
                required 
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                placeholder="0"
              />
            </div>
            <div className="form-group">
              <label>Fiyat (₺)</label>
              <input 
                type="number" 
                step="0.01" 
                required 
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Kategori</label>
            <select 
              value={newProduct.category}
              onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
            >
              <option value="Gıda">Gıda</option>
              <option value="Süt ve Süt Ürünleri">Süt ve Süt Ürünleri</option>
              <option value="Fırın">Fırın</option>
              <option value="Manav">Manav</option>
              <option value="Temizlik">Temizlik</option>
            </select>
          </div>
          <button type="submit" className="primary-btn full-width">Ürünü Kaydet</button>
        </form>
      </Modal>

      <section className="smart-insight glass">
        <div className="insight-header">
          <AlertCircle color="var(--primary-color)" size={24} />
          <h3>Öneri</h3>
        </div>
        <p>"Süt" ve "Ekmek" stokları günlük satış hızının %15 üzerine çıktı. Raf Bekleme Süresini düşürmek için önümüzdeki 3 gün için sipariş miktarını %10 azaltmanızı öneririm.</p>
        <button 
          className="secondary-btn" 
          style={{ marginTop: '1rem', width: 'fit-content' }}
          onClick={() => setActiveTab('planning')}
        >
          Sipariş Planlamaya Git
        </button>
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
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{p.stock} Adet</td>
                  <td>₺{p.price.toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${p.status}`}>
                      {p.status === 'critical' ? 'Kritik' : p.status === 'overstock' ? 'Fazla Stok' : 'Normal'}
                    </span>
                  </td>
                  <td>
                    <button className="icon-btn delete" onClick={() => deleteProduct(p.id)}>
                      <Trash2 size={16} />
                    </button>
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

        .status-badge.critical { background: var(--status-error-bg); color: var(--status-error-text); }
        .status-badge.overstock { background: var(--status-warning-bg); color: var(--status-warning-text); }
        .status-badge.normal { background: var(--status-success-bg); color: var(--status-success-text); }

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
