import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Moon, Sun, Palette, Bell, Shield, Languages } from 'lucide-react';

const Settings = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const themes = [
    { id: 'light', name: 'Açık Mod', icon: <Sun size={20} />, color: '#ffffff' },
    { id: 'dark', name: 'Koyu Mod', icon: <Moon size={20} />, color: '#0f172a' },
    { id: 'midnight', name: 'Gece Yarısı', icon: <Palette size={20} />, color: '#020617' },
    { id: 'emerald', name: 'Zümrüt', icon: <Palette size={20} />, color: '#f0fdf4' },
  ];

  return (
    <div className="page-container settings-page">
      <header className="page-header">
        <div className="header-title">
          <h2>Ayarlar</h2>
          <p>Uygulama tercihlerini ve görünümünü kişiselleştirin.</p>
        </div>
      </header>

      <div className="settings-grid">
        <section className="settings-section glass">
          <div className="section-header">
            <Palette className="section-icon" />
            <h3>Görünüm ve Tema</h3>
          </div>
          <p className="section-desc">Uygulamanın renk paletini tercihinize göre değiştirin.</p>
          
          <div className="theme-options">
            {themes.map((t) => (
              <button 
                key={t.id} 
                className={`theme-card ${theme === t.id ? 'active' : ''}`}
                onClick={() => setTheme(t.id)}
              >
                <div className="theme-preview" style={{ background: t.color }}>
                  {t.icon}
                </div>
                <span>{t.name}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="settings-section glass">
          <div className="section-header">
            <Bell className="section-icon" />
            <h3>Bildirim Tercihleri</h3>
          </div>
          <div className="setting-toggle-row">
            <div>
              <h4>Akıllı Stok Uyarıları</h4>
              <p>Stok kritik seviyeye düştüğünde bildirim al.</p>
            </div>
            <label className="switch">
              <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} />
              <span className="slider round"></span>
            </label>
          </div>
        </section>

        <section className="settings-section glass">
          <div className="section-header">
            <Languages className="section-icon" />
            <h3>Dil Seçimi</h3>
          </div>
          <select className="settings-select">
            <option value="tr">Türkçe</option>
            <option value="en">English</option>
            <option value="de">Deutsch</option>
          </select>
        </section>

        <section className="settings-section glass">
          <div className="section-header">
            <Shield className="section-icon" />
            <h3>Güvenlik</h3>
          </div>
          <button className="secondary-btn full-width">Şifreyi Değiştir</button>
          <button className="secondary-btn full-width" style={{ marginTop: '0.5rem', color: '#ef4444', borderColor: '#fee2e2' }}>
            Hesabı Devre Dışı Bırak
          </button>
        </section>
      </div>

      <style jsx>{`
        .settings-page { display: flex; flex-direction: column; gap: 2rem; }
        .settings-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(400px, 1fr)); gap: 1.5rem; }
        .settings-section { padding: 2rem; border-radius: var(--radius-xl); box-shadow: var(--shadow-md); }
        .section-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem; }
        .section-icon { color: var(--primary-color); }
        .section-desc { color: var(--text-secondary); margin-bottom: 2rem; font-size: 0.9rem; }

        .theme-options { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
        .theme-card { 
          display: flex; flex-direction: column; align-items: center; gap: 0.75rem; 
          padding: 1rem; border-radius: var(--radius-lg); border: 2px solid var(--border-color);
          background: var(--background-color); transition: all 0.2s;
        }
        .theme-card:hover { transform: translateY(-4px); border-color: var(--primary-color); }
        .theme-card.active { border-color: var(--primary-color); background: var(--primary-light); }
        
        .theme-preview { 
          width: 50px; height: 50px; border-radius: 50%; display: flex; 
          align-items: center; justify-content: center; border: 2px solid var(--border-color);
          box-shadow: var(--shadow-sm);
        }

        .setting-toggle-row { display: flex; justify-content: space-between; align-items: center; }
        .setting-toggle-row h4 { font-size: 1rem; margin-bottom: 0.25rem; }
        .setting-toggle-row p { font-size: 0.85rem; color: var(--text-secondary); }

        .settings-select { 
          width: 100%; padding: 0.75rem; border-radius: var(--radius-md); 
          border: 1px solid var(--border-color); background: var(--background-color);
          color: var(--text-primary); font-family: inherit; font-weight: 600;
        }

        /* Toggle Switch */
        .switch { position: relative; display: inline-block; width: 50px; height: 24px; }
        .switch input { opacity: 0; width: 0; height: 0; }
        .slider { 
          position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; 
          background-color: #ccc; transition: .4s; border-radius: 34px; 
        }
        .slider:before { 
          position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; 
          background-color: white; transition: .4s; border-radius: 50%; 
        }
        input:checked + .slider { background-color: var(--primary-color); }
        input:checked + .slider:before { transform: translateX(26px); }

        .full-width { width: 100%; }
      `}</style>
    </div>
  );
};

export default Settings;
