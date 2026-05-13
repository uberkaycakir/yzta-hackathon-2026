import React, { useState } from 'react';
import { Sparkles, Mail, Lock, ArrowLeft } from 'lucide-react';

const Login = ({ onLogin, onBack, onGoToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(name || 'Kullanıcı');
  };

  return (
    <div className="auth-page">
      <button className="back-btn" onClick={onBack}><ArrowLeft size={20} /> Geri Dön</button>
      
      <div className="auth-card glass">
        <div className="auth-header">
          <div className="logo">
            <Sparkles size={32} />
            <span>TradeMate AI</span>
          </div>
          <h2>Tekrar Hoş Geldiniz</h2>
          <p>Mağazanızı yönetmek için giriş yapın.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label><Mail size={16} /> Ad Soyad</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Mehmet Yılmaz"
            />
          </div>
          <div className="form-group">
            <label><Mail size={16} /> E-posta</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="isim@sirket.com" 
            />
          </div>
          <div className="form-group">
            <label><Lock size={16} /> Şifre</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
            />
          </div>
          <button type="submit" className="primary-btn full-width">Giriş Yap</button>
        </form>

        <div className="auth-footer">
          Hesabınız yok mu? <button className="link-btn" onClick={onGoToRegister}>Kayıt Ol</button>
        </div>
      </div>

      <style jsx>{`
        .auth-page { 
          min-height: 100vh; width: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; 
          background: var(--background-color); position: relative; padding: 2rem; box-sizing: border-box;
        }
        .back-btn { 
          position: absolute; top: 2rem; left: 2rem; display: flex; align-items: center; gap: 0.5rem;
          background: none; border: none; color: var(--text-secondary); font-weight: 700; cursor: pointer;
        }
        .auth-card { width: 100%; max-width: 450px; padding: 3rem; border-radius: var(--radius-xl); box-shadow: var(--shadow-lg); margin: 0 auto; }
        .auth-header { text-align: center; margin-bottom: 2.5rem; }
        .auth-header .logo { justify-content: center; margin-bottom: 1.5rem; }
        .auth-header h2 { font-size: 1.75rem; font-weight: 850; margin-bottom: 0.5rem; }
        .auth-header p { color: var(--text-secondary); }

        .auth-form { display: flex; flex-direction: column; gap: 1.5rem; }
        .auth-form .form-group label { display: flex; align-items: center; gap: 0.5rem; font-weight: 700; margin-bottom: 0.5rem; }
        .auth-form input { 
          width: 100%; padding: 0.75rem 1rem; border-radius: var(--radius-md); 
          border: 1px solid var(--border-color); background: var(--background-color); color: var(--text-primary);
          box-sizing: border-box;
        }
        .full-width { width: 100%; padding: 1rem; font-size: 1rem; }

        .auth-footer { text-align: center; margin-top: 2rem; color: var(--text-secondary); font-size: 0.9rem; }
        .link-btn { background: none; border: none; color: var(--primary-color); font-weight: 800; cursor: pointer; padding: 0 0.25rem; }
      `}</style>
    </div>
  );
};

export default Login;
