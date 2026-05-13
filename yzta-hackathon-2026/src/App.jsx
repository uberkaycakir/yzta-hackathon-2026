import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import SalesHistory from './pages/SalesHistory';
import ProfitAnalysis from './pages/ProfitAnalysis';
import OrderPlanning from './pages/OrderPlanning';
import SmartCalendar from './pages/SmartCalendar';
import ShelfPlacement from './pages/ShelfPlacement';
import CampaignPlanner from './pages/CampaignPlanner';
import AIAssistant from './pages/AIAssistant';
import Settings from './pages/Settings';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import WelcomeScreen from './components/WelcomeScreen';

function App() {
  const [appState, setAppState] = useState('landing');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [userName, setUserName] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state) {
        setAppState(event.state.appState || 'landing');
        setActiveTab(event.state.activeTab || 'dashboard');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const state = { appState, activeTab };
    if (JSON.stringify(window.history.state) !== JSON.stringify(state)) {
      window.history.pushState(state, '', '');
    }
  }, [appState, activeTab]);

  const handleLogin = (name) => {
    setUserName(name || 'Kullanıcı');
    setShowWelcome(true);
    setAppState('app');
  };
  const handleLogout = () => {
    setAppState('landing');
    setActiveTab('dashboard');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'inventory':
        return <Inventory setActiveTab={setActiveTab} />;
      case 'history':
        return <SalesHistory />;
      case 'analytics':
        return <ProfitAnalysis />;
      case 'planning':
        return <OrderPlanning />;
      case 'calendar':
        return <SmartCalendar setActiveTab={setActiveTab} />;
      case 'shelf':
        return <ShelfPlacement setActiveTab={setActiveTab} />;
      case 'campaigns':
        return <CampaignPlanner />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'settings':
        return <Settings />;
      default:
        return (
          <div className="placeholder-view">
            <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
            <p>Bu bölüm yakında eklenecektir.</p>
          </div>
        );
    }
  };

  if (appState === 'landing') {
    return (
      <LandingPage 
        onGetStarted={() => setAppState('register')} 
        onLogin={() => setAppState('login')} 
      />
    );
  }

  if (appState === 'login') {
    return (
      <Login 
        onLogin={handleLogin} 
        onBack={() => setAppState('landing')} 
        onGoToRegister={() => setAppState('register')}
      />
    );
  }

  if (appState === 'register') {
    return (
      <Register 
        onRegister={handleLogin} 
        onBack={() => setAppState('landing')} 
        onGoToLogin={() => setAppState('login')}
      />
    );
  }

  return (
    <>
      {showWelcome && (
        <WelcomeScreen 
          name={userName} 
          onDone={() => setShowWelcome(false)} 
        />
      )}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        onLogout={handleLogout}
      />
      <main className={`main-content ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        {renderContent()}
      </main>
    </>
  );
}

export default App;
