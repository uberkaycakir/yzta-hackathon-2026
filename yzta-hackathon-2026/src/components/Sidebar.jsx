import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  History, 
  BarChart3, 
  CalendarDays, 
  Grid3X3, 
  Megaphone, 
  Bot, 
  Settings, 
  HelpCircle 
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Ana Panel', icon: LayoutDashboard },
    { id: 'inventory', label: 'Ürün & Stok', icon: Package },
    { id: 'history', label: 'Satış Geçmişi', icon: History },
    { id: 'analytics', label: 'Kâr Analizi', icon: BarChart3 },
    { id: 'planning', label: 'Sipariş Planlama', icon: CalendarDays },
    { id: 'shelf', label: 'Raf Yerleşimi', icon: Grid3X3 },
    { id: 'campaigns', label: 'Kampanyalar', icon: Megaphone },
    { id: 'ai-assistant', label: 'Dijital Çırak', icon: Bot },
  ];

  const bottomItems = [
    { id: 'settings', label: 'Ayarlar', icon: Settings },
    { id: 'help', label: 'Destek', icon: HelpCircle },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">AI</div>
        <div className="logo-text">
          <h1>Dijital Çırak</h1>
          <span>Yapay Zeka Destekli</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="nav-divider" />

        <ul>
          {bottomItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <style jsx>{`
        .sidebar {
          width: 280px;
          height: 100vh;
          background: var(--surface-color);
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          position: sticky;
          top: 0;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2.5rem;
          padding: 0.5rem;
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          background: var(--primary-color);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          font-weight: 800;
          font-size: 1.2rem;
        }

        .logo-text h1 {
          font-size: 1.1rem;
          line-height: 1.2;
        }

        .logo-text span {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 500;
        }

        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1rem;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          transition: all 0.2s ease;
          font-weight: 500;
        }

        .nav-item:hover {
          background: var(--background-color);
          color: var(--primary-color);
        }

        .nav-item.active {
          background: var(--primary-light);
          color: var(--primary-color);
          font-weight: 600;
        }

        .nav-divider {
          height: 1px;
          background: var(--border-color);
          margin: 1rem 0;
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 80px;
            padding: 1rem 0.5rem;
          }
          .logo-text, .nav-item span {
            display: none;
          }
          .sidebar-logo {
            justify-content: center;
          }
          .nav-item {
            justify-content: center;
            padding: 0.875rem;
          }
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
