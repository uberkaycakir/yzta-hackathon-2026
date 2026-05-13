import React, { useState } from 'react';
import { Send, Bot, User, Sparkles, MessageSquare, Clock } from 'lucide-react';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { role: 'user', content: 'Bu ay hangi ürünleri daha fazla stoklamalıyım?' },
    { role: 'bot', content: 'Harika bir soru! Verileri ve güncel trendleri senin için analiz ettim. Önümüzdeki ay için meşrubat ve temizlik grubu ürünlerini artırmanı öneririm.' }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMessage = { role: 'user', content: inputValue };
    setMessages([...messages, newUserMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: 'Analiz tamamlandı. Verilerinize göre talebinizle ilgili optimizasyon önerilerimi hazırladım.' 
      }]);
    }, 1000);
  };

  const history = [
    { title: 'Mart Ayı Stok Tahmini', time: '2 saat önce' },
    { title: 'Bayram Kampanyası Analizi', time: 'Dün' },
    { title: 'Yeni Tedarikçi Değerlendirmesi', time: '3 gün önce' },
  ];

  return (
    <div className="page-container ai-assistant">
      <header className="page-header">
        <div className="header-title">
          <h2>Dijital Çırak</h2>
          <p>Mağaza verilerinizi gerçek zamanlı kullanarak stratejik tavsiyeler üretir.</p>
        </div>
      </header>

      <div className="assistant-layout">
        <aside className="assistant-sidebar glass">
          <div className="sidebar-section">
            <div className="section-header">
              <MessageSquare size={18} />
              <h3>Sık Sorulan Sorular</h3>
            </div>
            <div className="question-chips">
              <button className="chip" onClick={() => setInputValue('Bu ay ne stoklamalıyım?')}>Bu ay ne stoklamalıyım?</button>
              <button className="chip" onClick={() => setInputValue('En kârlı ürün hangisi?')}>En kârlı ürün hangisi?</button>
              <button className="chip" onClick={() => setInputValue('Hava durumu satışı nasıl etkiler?')}>Hava durumu satışı nasıl etkiler?</button>
            </div>
          </div>

          <div className="sidebar-section">
            <div className="section-header">
              <Clock size={18} />
              <h3>Geçmiş Sohbetler</h3>
            </div>
            <div className="history-list">
              {history.map((item, index) => (
                <div key={index} className="history-item">
                  <h4>{item.title}</h4>
                  <span>{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="chat-container glass">
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                <div className="avatar">
                  {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className="bubble">
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="chat-input-area">
            <form onSubmit={handleSendMessage} className="input-wrapper">
              <input 
                type="text" 
                placeholder="Dijital Çırak'a bir soru sor..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button type="submit" className="send-btn"><Send size={20} /></button>
            </form>
          </div>
        </main>
      </div>

      <style jsx>{`
        .ai-assistant {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          height: calc(100vh - 4rem);
        }

        .assistant-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 1.5rem;
          flex: 1;
          min-height: 0;
        }

        .assistant-sidebar, .chat-container {
          padding: 1.5rem;
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-md);
          display: flex;
          flex-direction: column;
        }

        .sidebar-section {
          margin-bottom: 2rem;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          color: var(--text-secondary);
        }

        .question-chips {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .chip {
          text-align: left;
          padding: 0.75rem 1rem;
          background: var(--background-color);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.2s;
        }

        .chip:hover {
          background: var(--primary-light);
          color: var(--primary-color);
          border-color: var(--primary-color);
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .history-item {
          padding: 0.75rem;
          border-radius: var(--radius-md);
          cursor: pointer;
        }

        .history-item:hover {
          background: var(--background-color);
        }

        .history-item h4 {
          font-size: 0.9375rem;
          margin-bottom: 0.25rem;
        }

        .history-item span {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .chat-container {
          flex: 1;
          min-height: 0;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding-right: 1rem;
        }

        .message {
          display: flex;
          gap: 1rem;
          max-width: 80%;
        }

        .message.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .avatar {
          width: 40px;
          height: 40px;
          background: var(--border-color);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .bot .avatar {
          background: var(--primary-color);
          color: white;
        }

        .bubble {
          padding: 1rem;
          border-radius: var(--radius-lg);
          background: var(--background-color);
        }

        .user .bubble {
          background: var(--primary-color);
          color: white;
          border-bottom-right-radius: 0;
        }

        .bot .bubble {
          border-top-left-radius: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .analysis-card {
          background: white;
          padding: 1rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .analysis-card h5 {
          margin-bottom: 0.25rem;
          color: var(--primary-color);
        }

        .hint {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: #fdf4ff;
          border-radius: var(--radius-md);
          color: #701a75;
          font-size: 0.875rem;
        }

        .chat-input-area {
          margin-top: 1.5rem;
        }

        .input-wrapper {
          display: flex;
          gap: 1rem;
          background: var(--background-color);
          padding: 0.5rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-color);
        }

        .input-wrapper input {
          flex: 1;
          background: none;
          border: none;
          padding: 0.5rem 1rem;
          font-family: inherit;
          font-size: 1rem;
        }

        .input-wrapper input:focus {
          outline: none;
        }

        .send-btn {
          background: var(--primary-color);
          color: white;
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }

        .send-btn:hover {
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .assistant-layout {
            grid-template-columns: 1fr;
          }
          .assistant-sidebar {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default AIAssistant;
