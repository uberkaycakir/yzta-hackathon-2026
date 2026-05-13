import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MessageSquare, Clock, Trash2, AlertCircle, Loader } from 'lucide-react';
import { sendMessageToGemini, getQuickQuestions, getApiStatus } from '../services/geminiService';

const AIAssistant = () => {
  const apiStatus = getApiStatus(); // 'gemini' veya 'fallback'
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: apiStatus === 'gemini'
        ? '👋 Merhaba! Ben **Dijital Çırak**, mağazanın verilerini analiz eden yapay zeka asistanınım.\n\nStok durumu, satış trendleri, kâr analizi veya kampanya planlaması hakkında her şeyi sorabilirsiniz.'
        : '👋 Merhaba! Ben **Dijital Çırak**!\n\nŞu an mağaza veritabanımdan cevap veriyorum. Stok durumu, satış trendleri ve kâr analizi için hazırım!\n\n💡 Daha gelişmiş sorular için Google Gemini API key ekleyebilirsiniz.',
      source: 'system',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickQuestions = getQuickQuestions();

  const history = [
    { title: 'Mart Ayı Stok Tahmini', time: '2 saat önce' },
    { title: 'Bayram Kampanyası Analizi', time: 'Dün' },
    { title: 'Yeni Tedarikçi Değerlendirmesi', time: '3 gün önce' },
  ];

  // Yeni mesaj gelince otomatik scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const formatMessage = (text) => {
    // Basit markdown: **bold**, newline, emoji desteği
    return text
      .split('\n')
      .map((line, i) => {
        const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return <p key={i} dangerouslySetInnerHTML={{ __html: formatted || '&nbsp;' }} />;
      });
  };

  const handleSendMessage = async (e) => {
    e?.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed || isLoading) return;

    const newUserMessage = { role: 'user', content: trimmed };
    const updatedMessages = [...messages, newUserMessage];

    setMessages(updatedMessages);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      const conversationHistory = updatedMessages.slice(1);
      const { text, source } = await sendMessageToGemini(trimmed, conversationHistory);
      setMessages(prev => [...prev, { role: 'bot', content: text, source }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  // Chip'e tıklanınca direkt mesaj olarak gönder
  const handleQuickQuestion = (question) => {
    if (isLoading) return;
    setInputValue(question);
    // Mikro gecikmeyle state güncellemesini bekle, sonra gönder
    setTimeout(() => {
      setMessages(prev => {
        const newUserMsg = { role: 'user', content: question };
        const updated = [...prev, newUserMsg];
        setIsLoading(true);
        setError(null);
        sendMessageToGemini(question, prev.slice(1))
          .then(({ text, source }) => {
            setMessages(m => [...m, { role: 'bot', content: text, source }]);
          })
          .catch(err => setError(err.message))
          .finally(() => setIsLoading(false));
        return updated;
      });
      setInputValue('');
    }, 50);
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'bot',
        content: '🔄 Sohbet sıfırlandı. Yeni bir soru sormaya hazırım!',
      },
    ]);
    setError(null);
  };

  return (
    <div className="page-container ai-assistant">
      <header className="page-header">
        <div className="header-title">
          <h2>Dijital Çırak</h2>
          <p>Mağaza verilerinizi gerçek zamanlı analiz ederek stratejik tavsiyeler üretir.</p>
        </div>
        <button className="clear-btn" onClick={clearChat} title="Sohbeti Temizle">
          <Trash2 size={16} />
          <span>Temizle</span>
        </button>
      </header>

      <div className="assistant-layout">
        {/* Sol Sidebar */}
        <aside className="assistant-sidebar glass">
          <div className="sidebar-section">
            <div className="section-header">
              <MessageSquare size={18} />
              <h3>Hızlı Sorular</h3>
            </div>
            <div className="question-chips">
              {quickQuestions.map((q, i) => (
                <button key={i} className="chip" onClick={() => handleQuickQuestion(q)}>
                  {q}
                </button>
              ))}
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

          {/* API Durumu */}
          <div className="api-status">
            <div className={`status-dot ${error ? 'error' : 'active'}`} />
            <span>
              {error
                ? 'Bağlantı Hatası'
                : apiStatus === 'gemini'
                  ? 'Gemini 1.5 Flash • Aktif'
                  : '📚 Veri Tabanı Modu'}
            </span>
          </div>
        </aside>

        {/* Ana Chat Alanı */}
        <main className="chat-container glass">
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                <div className="avatar">
                  {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className="bubble">
                  {formatMessage(msg.content)}
                  {msg.role === 'bot' && msg.source && msg.source !== 'system' && (
                    <span className={`source-tag source-${msg.source}`}>
                      {msg.source === 'gemini' ? '✨ Gemini AI' : msg.source === 'faq' ? '📚 Veri Tabanı' : '📊 Analiz'}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Yükleniyor animasyonu */}
            {isLoading && (
              <div className="message bot">
                <div className="avatar">
                  <Bot size={20} />
                </div>
                <div className="bubble typing-bubble">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
              </div>
            )}

            {/* Hata mesajı */}
            {error && !isLoading && (
              <div className="error-banner">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Mesaj Giriş Alanı */}
          <div className="chat-input-area">
            <form onSubmit={handleSendMessage} className="input-wrapper">
              <input
                ref={inputRef}
                type="text"
                placeholder="Dijital Çırak'a bir soru sor..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isLoading}
              />
              <button type="submit" className="send-btn" disabled={isLoading || !inputValue.trim()}>
                {isLoading ? <Loader size={20} className="spin" /> : <Send size={20} />}
              </button>
            </form>
            <p className="input-hint">
              Powered by <strong>Google Gemini</strong> · Mağaza verilerinizle eğitildi
            </p>
          </div>
        </main>
      </div>

      <style>{`
        .ai-assistant {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          height: calc(100vh - 4rem);
        }

        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .clear-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 1rem;
          background: transparent;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
        }
        .clear-btn:hover {
          border-color: #ef4444;
          color: #ef4444;
        }

        .assistant-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
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
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .question-chips {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .chip {
          text-align: left;
          padding: 0.6rem 0.9rem;
          background: var(--background-color);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          font-size: 0.8125rem;
          font-weight: 500;
          transition: all 0.2s;
          cursor: pointer;
          color: var(--text-primary);
        }

        .chip:hover {
          background: var(--primary-light);
          color: var(--primary-color);
          border-color: var(--primary-color);
          transform: translateX(3px);
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .history-item {
          padding: 0.6rem 0.75rem;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: background 0.2s;
        }

        .history-item:hover {
          background: var(--background-color);
        }

        .history-item h4 {
          font-size: 0.875rem;
          margin-bottom: 0.15rem;
        }

        .history-item span {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .api-status {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
          padding: 0.75rem;
          background: var(--background-color);
          border-radius: var(--radius-md);
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .status-dot.active {
          background: #22c55e;
          box-shadow: 0 0 6px #22c55e88;
          animation: pulse-dot 2s infinite;
        }
        .status-dot.error {
          background: #ef4444;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
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
          gap: 1.25rem;
          padding-right: 0.5rem;
          padding-bottom: 0.5rem;
        }

        .chat-messages::-webkit-scrollbar {
          width: 4px;
        }
        .chat-messages::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-messages::-webkit-scrollbar-thumb {
          background: var(--border-color);
          border-radius: 4px;
        }

        .message {
          display: flex;
          gap: 0.75rem;
          max-width: 85%;
          animation: fadeInUp 0.3s ease;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .message.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .avatar {
          width: 36px;
          height: 36px;
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
          padding: 0.875rem 1.1rem;
          border-radius: var(--radius-lg);
          background: var(--background-color);
          border: 1px solid var(--border-color);
          line-height: 1.6;
          font-size: 0.9375rem;
        }

        .bubble p {
          margin: 0 0 0.25rem;
        }
        .bubble p:last-child { margin-bottom: 0; }

        .user .bubble {
          background: var(--primary-color);
          color: white;
          border-color: var(--primary-color);
          border-bottom-right-radius: 4px;
        }

        .bot .bubble {
          border-top-left-radius: 4px;
        }

        /* Typing animation */
        .typing-bubble {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 1rem 1.25rem;
          min-width: 60px;
        }

        .dot {
          width: 8px;
          height: 8px;
          background: var(--text-secondary);
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out;
        }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
          40% { transform: scale(1); opacity: 1; }
        }

        .error-banner {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: var(--radius-md);
          color: #dc2626;
          font-size: 0.875rem;
          animation: fadeInUp 0.3s ease;
        }

        .chat-input-area {
          margin-top: 1rem;
        }

        .input-wrapper {
          display: flex;
          gap: 0.75rem;
          background: var(--background-color);
          padding: 0.4rem;
          border-radius: var(--radius-lg);
          border: 1.5px solid var(--border-color);
          transition: border-color 0.2s;
        }

        .input-wrapper:focus-within {
          border-color: var(--primary-color);
        }

        .input-wrapper input {
          flex: 1;
          background: none;
          border: none;
          padding: 0.5rem 1rem;
          font-family: inherit;
          font-size: 1rem;
          color: var(--text-primary);
        }

        .input-wrapper input:focus {
          outline: none;
        }

        .input-wrapper input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
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
          transition: all 0.2s;
          flex-shrink: 0;
          cursor: pointer;
          border: none;
        }

        .send-btn:hover:not(:disabled) {
          transform: scale(1.05);
          filter: brightness(1.1);
        }

        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .source-tag {
          display: inline-block;
          margin-top: 0.4rem;
          font-size: 0.7rem;
          padding: 0.15rem 0.5rem;
          border-radius: 99px;
          font-weight: 600;
          opacity: 0.75;
        }
        .source-gemini { background: #ede9fe; color: #6d28d9; }
        .source-faq    { background: #dbeafe; color: #1d4ed8; }
        .source-smart  { background: #dcfce7; color: #15803d; }
        .source-fallback { background: #fef3c7; color: #92400e; }

        .input-hint {
          text-align: center;
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-top: 0.5rem;
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
