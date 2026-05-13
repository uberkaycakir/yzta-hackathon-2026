import React, { useState } from 'react';
import { Megaphone, Target, Users, Zap, Plus, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';
import Modal from '../components/Modal';
import SuccessAnimation from '../components/SuccessAnimation';

const CampaignPlanner = () => {
  const { campaigns, addCampaign } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    type: 'İndirim',
    description: ''
  });

  const handleAddCampaign = (e) => {
    if (e) e.preventDefault();
    addCampaign({
      name: newCampaign.name,
      type: newCampaign.type,
      reach: '0'
    });
    setNewCampaign({ name: '', type: 'İndirim', description: '' });
    setIsModalOpen(false);
    setShowAnimation(true);
  };

  const handleStartRecommended = () => {
    addCampaign({
      name: '"Yoğurt & Meyve" Paketi',
      type: 'Paket Teklifi',
      reach: '0'
    });
    setShowAnimation(true);
  };

  const handleCampaignClick = (camp) => {
    // Simulating performance stats
    const stats = {
      profit: Math.floor(Math.random() * 5000) + 1200,
      conversion: (Math.random() * 15 + 5).toFixed(1),
      newCustomers: Math.floor(Math.random() * 200) + 50,
      aiFeedback: `Tebrikler! ${camp.name} kampanyası beklentilerin %25 üzerinde performans gösterdi. Toplamda ₺${(Math.random() * 3000 + 1000).toFixed(0)} ek kâr elde ettiniz. Bir sonraki adımda bu kitleye sadakat puanı teklif ederek geri dönüş oranını artırabilirsiniz.`
    };
    setSelectedCampaign({ ...camp, stats });
    setIsResultsModalOpen(true);
  };

  return (
    <div className="page-container campaign-planner">
      <header className="page-header">
        <div className="header-title">
          <h2>Kampanyalar</h2>
          <p>Müşteri sadakatini artıran ve satışları teşvik eden akıllı kampanyalar.</p>
        </div>
        <div className="header-actions">
          <button className="primary-btn" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} /> Yeni Kampanya
          </button>
        </div>
      </header>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Yeni Kampanya Oluştur"
      >
        <form onSubmit={handleAddCampaign} className="modal-form">
          <div className="form-group">
            <label>Kampanya Adı</label>
            <input 
              type="text" 
              required 
              value={newCampaign.name}
              onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
              placeholder="Örn: Hafta Sonu Şenliği"
            />
          </div>
          <div className="form-group">
            <label>Kampanya Türü</label>
            <select 
              value={newCampaign.type}
              onChange={(e) => setNewCampaign({...newCampaign, type: e.target.value})}
            >
              <option value="İndirim">İndirim</option>
              <option value="Paket Teklifi">Paket Teklifi</option>
              <option value="Sadakat Puanı">Sadakat Puanı</option>
            </select>
          </div>
          <div className="form-group">
            <label>Açıklama</label>
            <textarea 
              value={newCampaign.description}
              onChange={(e) => setNewCampaign({...newCampaign, description: e.target.value})}
              placeholder="Kampanya detaylarını girin..."
            />
          </div>
          <button type="submit" className="primary-btn full-width">Kampanyayı Başlat</button>
        </form>
      </Modal>

      <div className="campaign-grid">
        <div className="active-campaigns glass">
          <h3>Aktif Kampanyalar</h3>
          <div className="campaign-list">
            {campaigns.map((camp) => (
              <div key={camp.id} className="campaign-card clickable" onClick={() => handleCampaignClick(camp)}>
                <div className="c-info">
                  <div className="c-icon"><Zap size={20} /></div>
                  <div>
                    <h4>{camp.name}</h4>
                    <p>{camp.type}</p>
                  </div>
                </div>
                <div className="c-stats">
                  <strong>{camp.status}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="campaign-recommendation glass">
          <div className="card-header">
            <Target color="var(--primary-color)" />
            <h3>Önerilen Kampanya</h3>
          </div>
          <div className="rec-box">
            <h4>"Yoğurt & Meyve" Paketi</h4>
            <p>Son kullanma tarihi yaklaşan yoğurtları tüketmek için yanına taze meyve ekleyerek bir kombo paket oluşturun.</p>
            <div className="potential">Potansiyel Etki: <strong>+₺850 Kâr</strong></div>
          </div>
          <button className="secondary-btn full-width" onClick={handleStartRecommended}>
            Kampanyayı Başlat
          </button>
        </div>
      </div>

      <Modal
        isOpen={isResultsModalOpen}
        onClose={() => setIsResultsModalOpen(false)}
        title="Kampanya Performans Analizi"
      >
        {selectedCampaign && (
          <div className="results-container">
            <div className="results-header">
              <h3>{selectedCampaign.name}</h3>
              <span className="tag major">{selectedCampaign.type}</span>
            </div>

            <div className="stats-table">
              <div className="stat-row">
                <span>Elde Edilen Kâr:</span>
                <strong className="success">₺{selectedCampaign.stats.profit}</strong>
              </div>
              <div className="stat-row">
                <span>Dönüşüm Oranı:</span>
                <strong>%{selectedCampaign.stats.conversion}</strong>
              </div>
              <div className="stat-row">
                <span>Yeni Müşteri Kazanımı:</span>
                <strong>{selectedCampaign.stats.newCustomers} Kişi</strong>
              </div>
            </div>

            <div className="ai-feedback-box glass">
              <div className="ai-header">
                <Sparkles size={20} color="var(--primary-color)" />
                <h4>Dijital Çırak Analizi</h4>
              </div>
              <p>{selectedCampaign.stats.aiFeedback}</p>
            </div>

            <button className="primary-btn full-width" onClick={() => setIsResultsModalOpen(false)}>
              Analizi Kapat
            </button>
          </div>
        )}
      </Modal>

      {showAnimation && (
        <SuccessAnimation 
          type="campaign" 
          onClose={() => setShowAnimation(false)} 
        />
      )}

      <style jsx>{`
        .campaign-planner { display: flex; flex-direction: column; gap: 2rem; }
        .campaign-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 1.5rem; }
        .active-campaigns, .campaign-recommendation { padding: 1.5rem; border-radius: var(--radius-xl); box-shadow: var(--shadow-md); }
        .campaign-list { display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem; }
        .campaign-card { display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: var(--background-color); border-radius: var(--radius-lg); border: 1px solid var(--border-color); }
        .c-info { display: flex; gap: 1rem; align-items: center; }
        .c-icon { background: var(--primary-light); color: var(--primary-color); padding: 0.5rem; border-radius: var(--radius-md); }
        .c-stats strong { color: var(--secondary-color); font-size: 0.875rem; }
        .rec-box { margin: 1.5rem 0; padding: 1.5rem; background: #fefce8; border-radius: var(--radius-lg); border: 1px solid #fef08a; }
        .rec-box h4 { color: #854d0e; margin-bottom: 0.5rem; }
        .potential { margin-top: 1rem; font-size: 0.875rem; color: #854d0e; }
        .full-width { width: 100%; margin-top: 1rem; }
        .clickable { cursor: pointer; transition: all 0.2s; }
        .clickable:hover { border-color: var(--primary-color); transform: translateY(-2px); box-shadow: var(--shadow-md); }
        .results-container { display: flex; flex-direction: column; gap: 1.5rem; }
        .results-header { display: flex; justify-content: space-between; align-items: center; }
        .stats-table { display: flex; flex-direction: column; gap: 1rem; padding: 1.5rem; background: var(--background-color); border-radius: var(--radius-lg); }
        .stat-row { display: flex; justify-content: space-between; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-color); }
        .stat-row:last-child { border-bottom: none; padding-bottom: 0; }
        .stat-row strong.success { color: var(--secondary-color); font-size: 1.1rem; }
        .ai-feedback-box { padding: 1.5rem; background: #eff6ff; border: 1px solid #dbe1ff; border-radius: var(--radius-lg); }
        .ai-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; }
        .ai-header h4 { color: var(--primary-color); }
        .ai-feedback-box p { font-size: 0.95rem; line-height: 1.6; color: var(--text-secondary); }
        .tag.major { background: #fee2e2; color: #991b1b; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.8rem; font-weight: 700; }
      `}</style>
    </div>
  );
};

export default CampaignPlanner;
