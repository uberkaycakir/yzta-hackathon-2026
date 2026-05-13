import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import SalesHistory from './pages/SalesHistory';
import ProfitAnalysis from './pages/ProfitAnalysis';
import OrderPlanning from './pages/OrderPlanning';
import ShelfPlacement from './pages/ShelfPlacement';
import CampaignPlanner from './pages/CampaignPlanner';
import AIAssistant from './pages/AIAssistant';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'inventory':
        return <Inventory />;
      case 'history':
        return <SalesHistory />;
      case 'analytics':
        return <ProfitAnalysis />;
      case 'planning':
        return <OrderPlanning />;
      case 'shelf':
        return <ShelfPlacement />;
      case 'campaigns':
        return <CampaignPlanner />;
      case 'ai-assistant':
        return <AIAssistant />;
      default:
        return (
          <div className="placeholder-view">
            <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h2>
            <p>Bu bölüm yakında eklenecektir.</p>
          </div>
        );
    }
  };

  return (
    <>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        {renderContent()}
      </main>
    </>
  );
}

export default App;
