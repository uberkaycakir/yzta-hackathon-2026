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
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isCollapsed, setIsCollapsed, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Ana Panel', icon: LayoutDashboard },
    { id: 'inventory', label: 'Ürün & Stok', icon: Package },
    { id: 'history', label: 'Satış Geçmişi', icon: History },
    { id: 'analytics', label: 'Kâr Analizi', icon: BarChart3 },
    { id: 'planning', label: 'Sipariş Planlama', icon: CalendarDays },
    { id: 'calendar', label: 'Akıllı Takvim', icon: CalendarDays },
    { id: 'shelf', label: 'Raf Yerleşimi', icon: Grid3X3 },
    { id: 'campaigns', label: 'Kampanyalar', icon: Megaphone },
    { id: 'ai-assistant', label: 'Dijital Çırak', icon: Bot },
  ];

  const bottomItems = [
    { id: 'settings', label: 'Ayarlar', icon: Settings },
    { id: 'help', label: 'Destek', icon: HelpCircle },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button 
        className="collapse-btn" 
        onClick={() => setIsCollapsed(!isCollapsed)}
        title={isCollapsed ? "Genişlet" : "Daralt"}
      >
        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      <div className="sidebar-logo">
        <div className="logo-icon">TM</div>
        {!isCollapsed && (
          <div className="logo-text">
            <h1>TradeMate AI</h1>
            <span>Mağaza Zekası</span>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
                title={isCollapsed ? item.label : ''}
              >
                <item.icon size={20} />
                {!isCollapsed && <span>{item.label}</span>}
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
                title={isCollapsed ? item.label : ''}
              >
                <item.icon size={20} />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            </li>
          ))}
          <li>
            <button
              className="nav-item logout-btn"
              onClick={onLogout}
              title={isCollapsed ? "Çıkış Yap" : ""}
            >
              <LogOut size={20} />
              {!isCollapsed && <span>Çıkış Yap</span>}
            </button>
          </li>
        </ul>
      </nav>

      <style jsx>{`
        .logout-btn { color: #ef4444 !important; margin-top: auto; }
        .logout-btn:hover { background: #fef2f2 !important; }
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
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 100;
        }

        .sidebar.collapsed {
          width: 80px;
          padding: 1.5rem 0.75rem;
        }

        .collapse-btn {
          position: absolute;
          top: 21rem;
          right: -12px;
          width: 24px;
          height: 50px;
          background: var(--primary-color);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: none;
          box-shadow: var(--shadow-sm);
          z-index: 10;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2.5rem;
          padding: 0.5rem;
          overflow: hidden;
        }

        .logo-icon {
          min-width: 40px;
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
          white-space: nowrap;
        }

        .logo-text span {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 500;
          white-space: nowrap;
        }

        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          overflow: hidden;
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
          white-space: nowrap;
        }

        .sidebar.collapsed .nav-item {
          justify-content: center;
          padding: 0.875rem;
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
      `}</style>
    </aside>
  );
};

export default Sidebar;
