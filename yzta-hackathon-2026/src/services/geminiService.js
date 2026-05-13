// src/services/geminiService.js
// Google Gemini API entegrasyonu - Esnaf Akıllı Asistan
// Gemini yoksa JSON FAQ verisinden akıllı fallback ile çalışır

import { GoogleGenerativeAI } from '@google/generative-ai';

// -------------------------------------------------------
// API Key kontrolü
// -------------------------------------------------------
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const isApiKeyValid =
  API_KEY &&
  API_KEY !== 'buraya_api_keyinizi_yazin' &&
  API_KEY.startsWith('AIza');

let genAI = null;
if (isApiKeyValid) {
  genAI = new GoogleGenerativeAI(API_KEY);
}

// -------------------------------------------------------
// Eğitim verilerini JSON'dan yükle (cache'li)
// -------------------------------------------------------
let trainingDataCache = null;

export async function loadTrainingData() {
  if (trainingDataCache) return trainingDataCache;
  try {
    const response = await fetch('/shopkeeper-training-data.json');
    trainingDataCache = await response.json();
    return trainingDataCache;
  } catch (error) {
    console.error('Eğitim verisi yüklenemedi:', error);
    return null;
  }
}

// -------------------------------------------------------
// FAQ Fallback: JSON'daki örnek sorulardan anahtar kelime eşleşmesi
// -------------------------------------------------------
function normalizeTR(str) {
  return str
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c');
}

function findFaqAnswer(userMessage, data) {
  if (!data?.faqExamples) return null;

  const normalizedInput = normalizeTR(userMessage);

  // Her FAQ sorusuyla kelime bazlı benzerlik hesapla
  let bestMatch = null;
  let bestScore = 0;

  for (const faq of data.faqExamples) {
    const normalizedQ = normalizeTR(faq.soru);
    const inputWords = normalizedInput.split(/\s+/).filter(w => w.length > 2);
    const qWords = normalizedQ.split(/\s+/).filter(w => w.length > 2);

    let matchCount = 0;
    for (const word of inputWords) {
      if (qWords.some(qw => qw.includes(word) || word.includes(qw))) {
        matchCount++;
      }
    }

    const score = inputWords.length > 0 ? matchCount / inputWords.length : 0;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = faq;
    }
  }

  // %40'dan fazla kelime örtüşmesi yeterliyse bu cevabı kullan
  if (bestScore >= 0.4 && bestMatch) {
    return bestMatch.cevap;
  }

  return null;
}

// -------------------------------------------------------
// Envanter bazlı dinamik cevaplar (Gemini olmadan)
// -------------------------------------------------------
function buildSmartFallbackAnswer(userMessage, data) {
  if (!data) return null;
  const msg = normalizeTR(userMessage);

  // Kritik stok sorusu
  if (msg.includes('stok') || msg.includes('siparis') || msg.includes('eksik')) {
    const critical = data.inventory.filter(p => p.stock < p.minStock);
    const low = data.inventory.filter(p => p.stock < p.minStock * 1.3 && p.stock >= p.minStock);

    if (critical.length > 0) {
      const critList = critical.map(p => `🔴 **${p.name}**: ${p.stock} adet kaldı (minimum: ${p.minStock})`).join('\n');
      const lowList = low.length > 0
        ? '\n\n⚠️ Yakında tükenecekler:\n' + low.map(p => `• ${p.name}: ${p.stock} adet`).join('\n')
        : '';
      return `**Acil stok uyarısı!** Şu ürünleri hemen sipariş edin:\n\n${critList}${lowList}`;
    }
    return '✅ Tüm ürünler minimum stok seviyesinin üzerinde. Stok durumu normal.';
  }

  // Kâr sorusu
  if (msg.includes('kar') || msg.includes('kazanc') || msg.includes('marj') || msg.includes('kazandiran')) {
    const withMargin = data.inventory
      .map(p => ({ ...p, margin: Math.round(((p.price - p.cost) / p.price) * 100), profit: (p.price - p.cost) * p.monthlySales }))
      .sort((a, b) => b.profit - a.profit);
    const top3 = withMargin.slice(0, 3);
    return `**En kârlı ürünleriniz (aylık kâr bazında):**\n\n${top3.map((p, i) => `${i + 1}. **${p.name}**: %${p.margin} marj · Aylık ~${p.profit.toLocaleString('tr-TR')}₺ kâr`).join('\n')}\n\n💡 Kâr marjınızı artırmak için ${top3[0].name} stoğunu öncelikli tutun.`;
  }

  // Satış / ciro sorusu
  if (msg.includes('ciro') || msg.includes('satis') || msg.includes('performans') || msg.includes('aylik')) {
    const lastMonth = data.salesHistory[data.salesHistory.length - 1];
    const prevMonth = data.salesHistory[data.salesHistory.length - 2];
    const diff = lastMonth.revenue - prevMonth.revenue;
    const pct = Math.round((diff / prevMonth.revenue) * 100);
    const trend = diff >= 0 ? `✅ Geçen aya göre +%${pct}` : `⚠️ Geçen aya göre -%${Math.abs(pct)}`;
    return `**${lastMonth.month} Performansı:**\n\n💰 Ciro: **${lastMonth.revenue.toLocaleString('tr-TR')}₺**\n${trend}\n\nNot: ${lastMonth.notes}\n\n📌 En çok satan: ${lastMonth.topProducts.join(', ')}`;
  }

  return null;
}

// -------------------------------------------------------
// Gemini sistem promptu oluştur
// -------------------------------------------------------
function buildSystemPrompt(data) {
  if (!data) {
    return `Sen "Dijital Çırak" adında, Türk esnafına özel bir yapay zeka asistanısın. Türkçe, kısa ve pratik cevaplar ver.`;
  }

  const criticalStock = data.inventory
    .filter(p => p.stock < p.minStock)
    .map(p => `${p.name} (stok: ${p.stock}, min: ${p.minStock})`)
    .join(', ');

  const topProducts = [...data.inventory]
    .sort((a, b) => b.monthlySales - a.monthlySales)
    .slice(0, 3)
    .map(p => `${p.name} (aylık ${p.monthlySales} adet)`)
    .join(', ');

  const highMarginProducts = data.inventory
    .map(p => ({ ...p, margin: Math.round(((p.price - p.cost) / p.price) * 100) }))
    .sort((a, b) => b.margin - a.margin)
    .slice(0, 3)
    .map(p => `${p.name} (%${p.margin} marj)`)
    .join(', ');

  return `
Sen "Dijital Çırak" adında, Türk esnafına özel bir yapay zeka asistanısın.
Bu esnafa ait GERÇEK mağaza verileri aşağıda. Cevaplarında bu verileri kullan.

## MAĞAZA BİLGİLERİ
- Mağaza Türü: ${data.storeContext.storeType} | Konum: ${data.storeContext.location}
- Aylık Ciro: ${data.storeContext.monthlyRevenue.toLocaleString('tr-TR')}₺ | Çalışan: ${data.storeContext.employeeCount} kişi

## STOK DURUMU
${criticalStock ? `⚠️ KRİTİK STOK: ${criticalStock}` : '✅ Tüm stoklar normal seviyede'}

## ÜRÜNLER
${data.inventory.map(p =>
  `- ${p.name}: ${p.stock} adet stok, ${p.price}₺, Aylık ${p.monthlySales} satış, Tedarikçi: ${p.supplier}`
).join('\n')}

## SON 5 AY SATIŞ
${data.salesHistory.map(s => `- ${s.month}: ${s.revenue.toLocaleString('tr-TR')}₺ | ${s.notes}`).join('\n')}

## EN ÇOK SATAN: ${topProducts}
## EN YÜKSEK MARJ: ${highMarginProducts}

## MEVSİMSEL TAHMİNLER
${Object.entries(data.seasonalTrends).map(([k, v]) => `- ${k}: ${v.join(', ')}`).join('\n')}

## ÖRNEK SORULAR VE CEVAPLAR (referans için)
${data.faqExamples.map(f => `S: ${f.soru}\nC: ${f.cevap}`).join('\n\n')}

## CEVAP KURALLARI
- Türkçe, kısa ve net yaz
- Rakamlarla destekle (stok adedi, kâr %, ciro ₺)
- 🔴 = acil, ⚠️ = önemli, ✅ = iyi, 💡 = öneri
- Esnaf diline uygun sade bir dil kullan
`;
}

// -------------------------------------------------------
// Ana sohbet fonksiyonu (Gemini + akıllı fallback)
// -------------------------------------------------------
export async function sendMessageToGemini(userMessage, conversationHistory = []) {
  const data = await loadTrainingData();

  // 1. API key geçerliyse Gemini'yi dene
  if (isApiKeyValid && genAI) {
    try {
      const systemPrompt = buildSystemPrompt(data);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        systemInstruction: systemPrompt,
      });

      const history = conversationHistory
        .filter(msg => msg.role !== 'system')
        .map(msg => ({
          role: msg.role === 'bot' ? 'model' : 'user',
          parts: [{ text: msg.content }],
        }));

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      return { text: response.text(), source: 'gemini' };

    } catch (error) {
      console.warn('Gemini API hatası, fallback devreye giriyor:', error.message);
      // Gemini başarısız → fallback'e geç
    }
  }

  // 2. FAQ eşleşmesi ara
  const faqAnswer = findFaqAnswer(userMessage, data);
  if (faqAnswer) {
    return { text: faqAnswer, source: 'faq' };
  }

  // 3. Dinamik envanter analizi
  const smartAnswer = buildSmartFallbackAnswer(userMessage, data);
  if (smartAnswer) {
    return { text: smartAnswer, source: 'smart' };
  }

  // 4. Genel fallback mesajı
  const apiHint = !isApiKeyValid
    ? '\n\n💡 **İpucu:** Gemini API key eklerseniz daha kapsamlı ve özel sorulara da cevap verebilirim. `.env` dosyasına `VITE_GEMINI_API_KEY` ekleyin.'
    : '';

  return {
    text: `Bu soruyu tam olarak anlayamadım ama size yardımcı olmaya çalışayım.\n\nMağazanızla ilgili şunları sorabilirsiniz:\n• Stok durumu ve kritik ürünler\n• En kârlı veya en çok satan ürünler\n• Aylık satış performansı\n• Mevsimsel stok önerileri\n• Tedarikçi ve fiyat müzakeresi${apiHint}`,
    source: 'fallback',
  };
}

// -------------------------------------------------------
// Hızlı soru önerileri (sidebar için)
// -------------------------------------------------------
export function getQuickQuestions() {
  return [
    'Bu ay ne stoklamalıyım?',
    'En kârlı ürün hangisi?',
    'Kritik stok uyarısı var mı?',
    'Bu ayki performansım nasıl?',
    'Hava durumu satışı nasıl etkiler?',
    'Ramazan için ne hazırlamalıyım?',
  ];
}

// API durumunu dışarıya aç
export function getApiStatus() {
  return isApiKeyValid ? 'gemini' : 'fallback';
}
