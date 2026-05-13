import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Gift, Flame, PartyPopper, ShoppingBag } from 'lucide-react';

const SmartCalendar = ({ setActiveTab }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 13)); // May 13, 2026
  const [selectedDay, setSelectedDay] = useState(13);

  const specialDays = {
    '2026-05-10': { name: 'Anneler Günü', icon: <Gift size={16} />, type: 'major', recommendation: 'Çikolata ve taze çiçek reyonlarını %30 genişletin. Hediye paketleme seti sipariş edin.' },
    '2026-05-19': { name: 'Atatürk\'ü Anma, Gençlik ve Spor Bayramı', icon: <PartyPopper size={16} />, type: 'holiday', recommendation: 'Sporcu içecekleri ve protein bar stoklarını artırın. Türk Bayrağı reyonu oluşturun.' },
    '2026-05-24': { name: 'Kurban Bayramı Arifesi', icon: <Flame size={16} />, type: 'major', recommendation: 'Kıyma makinesi, bıçak ve mangal kömürü reyonu kurun. Et poşeti siparişi verin.' },
    '2026-06-21': { name: 'Babalar Günü', icon: <ShoppingBag size={16} />, type: 'major', recommendation: 'Kişisel bakım ve elektronik reyonlarında kampanya başlatın.' },
  };

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = [];

  // Fill empty days for previous month
  const firstDay = (firstDayOfMonth(year, month) + 6) % 7; // Adjust to Monday start
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Fill current month days
  for (let i = 1; i <= daysInMonth(year, month); i++) {
    days.push(i);
  }

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getSpecialDay = (day) => {
    if (!day) return null;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return specialDays[dateStr];
  };

  const activeSpecialDay = getSpecialDay(selectedDay);

  return (
    <div className="page-container smart-calendar">
      <header className="page-header">
        <div className="header-title">
          <h2>Akıllı Takvim</h2>
          <p>Özel günler ve sezonsal alışveriş trendlerine göre AI destekli planlama.</p>
        </div>
      </header>

      <div className="calendar-grid-container">
        <div className="calendar-main glass">
          <div className="calendar-header">
            <h3>{monthNames[month]} {year}</h3>
            <div className="calendar-controls">
              <button onClick={handlePrevMonth} className="icon-btn"><ChevronLeft /></button>
              <button onClick={handleNextMonth} className="icon-btn"><ChevronRight /></button>
            </div>
          </div>

          <div className="calendar-days-header">
            <span>Pzt</span><span>Sal</span><span>Çar</span><span>Per</span><span>Cum</span><span>Cmt</span><span>Paz</span>
          </div>

          <div className="calendar-days">
            {days.map((day, idx) => {
              const special = getSpecialDay(day);
              const isToday = day === 13 && month === 4;
              return (
                <div 
                  key={idx} 
                  className={`calendar-day ${day ? '' : 'empty'} ${selectedDay === day ? 'selected' : ''} ${isToday ? 'today' : ''} ${special ? 'special' : ''}`}
                  onClick={() => day && setSelectedDay(day)}
                >
                  {day && (
                    <>
                      <span className="day-number">{day}</span>
                      {special && <div className="special-icon-indicator">{special.icon}</div>}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="calendar-sidebar">
          <div className="insight-card glass fade-in">
            <div className="insight-header">
              <Sparkles className="sparkle-icon" />
              <h3>AI Önerisi</h3>
            </div>
            
            {activeSpecialDay ? (
              <div className="special-day-detail">
                <div className={`tag ${activeSpecialDay.type}`}>{activeSpecialDay.name}</div>
                <p className="recommendation-text">{activeSpecialDay.recommendation}</p>
                <button className="primary-btn sm" onClick={() => setActiveTab('campaigns')}>
                  Kampanyayı Hazırla
                </button>
              </div>
            ) : (
              <div className="no-special-day">
                <p>Seçili günde özel bir etkinlik bulunmuyor. Genel stok takibine devam edebilirsiniz.</p>
                <div className="hint">İpucu: 19 Mayıs veya 24 Mayıs tarihlerine tıklayarak AI önerilerini görebilirsiniz.</div>
              </div>
            )}
          </div>

          <div className="upcoming-list glass">
            <h3>Yaklaşan Önemli Günler</h3>
            {Object.entries(specialDays).map(([date, info]) => (
              <div key={date} className="upcoming-item" onClick={() => {
                const [y, m, d] = date.split('-').map(Number);
                setCurrentDate(new Date(y, m - 1, 1));
                setSelectedDay(d);
              }}>
                <div className="u-date">{new Date(date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}</div>
                <div className="u-info">
                  <h4>{info.name}</h4>
                  <span className={`u-type ${info.type}`}>{info.type === 'major' ? 'Ticari Fırsat' : 'Resmi Tatil'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .smart-calendar { display: flex; flex-direction: column; gap: 2rem; }
        .calendar-grid-container { display: grid; grid-template-columns: 1fr 350px; gap: 1.5rem; align-items: start; }
        
        .calendar-main { padding: 1.5rem; border-radius: var(--radius-xl); box-shadow: var(--shadow-md); }
        .calendar-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .calendar-controls { display: flex; gap: 0.5rem; }
        
        .calendar-days-header { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-weight: 700; color: var(--text-secondary); margin-bottom: 1rem; }
        .calendar-days { display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.5rem; }
        
        .calendar-day { 
          aspect-ratio: 1; border-radius: var(--radius-md); border: 1px solid var(--border-color);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer; position: relative; transition: all 0.2s;
        }
        .calendar-day:hover:not(.empty) { background: var(--background-color); transform: translateY(-2px); }
        .calendar-day.selected { border-color: var(--primary-color); background: var(--primary-light); color: var(--primary-color); font-weight: 700; box-shadow: 0 0 0 2px var(--primary-color); }
        .calendar-day.today { background: #fefce8; border-color: #fde047; }
        .calendar-day.today::after { content: 'Bugün'; position: absolute; bottom: 4px; font-size: 10px; color: #854d0e; }
        .calendar-day.special { background: #f0f9ff; }
        .calendar-day.empty { border: none; cursor: default; }
        
        .special-icon-indicator { position: absolute; top: 4px; right: 4px; color: var(--primary-color); }
        .day-number { font-size: 1.1rem; }

        .calendar-sidebar { display: flex; flex-direction: column; gap: 1.5rem; }
        .insight-card, .upcoming-list { padding: 1.5rem; border-radius: var(--radius-xl); box-shadow: var(--shadow-md); }
        
        .insight-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; color: var(--primary-color); }
        .sparkle-icon { animation: pulse 2s infinite; }
        
        .tag { display: inline-block; padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.8rem; font-weight: 700; margin-bottom: 1rem; }
        .tag.major { background: #fee2e2; color: #991b1b; }
        .tag.holiday { background: #dcfce7; color: #166534; }
        
        .recommendation-text { line-height: 1.5; color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.95rem; }
        .hint { font-size: 0.8rem; color: var(--text-secondary); font-style: italic; margin-top: 1rem; }

        .upcoming-item { display: flex; align-items: center; gap: 1rem; padding: 0.75rem; border-radius: var(--radius-md); cursor: pointer; transition: background 0.2s; }
        .upcoming-item:hover { background: var(--background-color); }
        .u-date { font-weight: 800; color: var(--primary-color); min-width: 60px; }
        .u-info h4 { font-size: 0.9rem; }
        .u-type { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
        .u-type.major { color: #ef4444; }
        .u-type.holiday { color: #10b981; }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default SmartCalendar;
