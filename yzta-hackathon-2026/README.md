# 🤖 AI Shop Intelligence Hub: Dijital Çırak 🚀

**Küçük Esnafı Yapay Zeka ile Geleceğe Taşıyan Akıllı Mağaza Yönetim Ekosistemi**

---

## 🌟 Proje Vizyonu
Geleneksel mahalle esnafı ve küçük işletmeler, büyük zincir marketlerin veri analitiği güçleriyle rekabet etmekte zorlanıyor. **AI Shop Intelligence Hub**, bu eşitsizliği ortadan kaldırmak için geliştirildi. "Dijital Çırak" modülü sayesinde esnaf, karmaşık tablolarla uğraşmak yerine kendi verileriyle konuşan bir yapay zekaaya sahip oluyor.

## 🧠 Proje Mantığı ve Çözülen Problemler
Proje, bir esnafın günlük operasyonlarını (stok, satış, kâr) tek bir merkezden yönetmesini sağlarken, bu verileri anlamlandıracak bir **Akıllı Asistan** sunar.

- **Veri Demokratikleşmesi:** Büyük veriyi (Big Data) mahalle bakkalının seviyesine indirger.
- **Proaktif Karar Alma:** "Yarın ne satmalıyım?" sorusuna geçmiş veriler ve trendlerle cevap verir.
- **Kritik Stok Yönetimi:** Ürün bitmeden çok önce uyarı yaparak tedarik zincirini optimize eder.

---

## 🛠️ Teknik Ekosistem
Proje, modern ve ölçeklenebilir bir teknoloji yığını üzerine inşa edilmiştir:

### 1. Frontend: Modern & Premium UI
- **React 19 & Vite:** Ultra hızlı geliştirme ve çalışma performansı.
- **Lucide React:** Modern ve temiz ikonografik dil.
- **Glassmorphism Design:** Modern, şeffaf ve profesyonel bir kullanıcı deneyimi (UX).
- **Responsive Architecture:** Hem desktop hem mobil cihazlarda esnafın elinin altında.

### 2. Yapay Zeka Sistemi (Gemini LLM Entegrasyonu)
Projenin kalbi olan "Dijital Çırak", **Google Gemini 1.5 Flash** modelini kullanır.
- **Dinamik Context Injection:** Sisteme esnafın envanteri, satış geçmişi ve mevsimsel trendleri "Sistem Promptu" olarak anlık beslenir.
- **Hybrid Fallback Mekanizması:** API anahtarı olmasa veya internet kesilse dahi, özel geliştirilmiş **Heuristic Keyword Matching** ve **Data Analytics** algoritmalarıyla JSON veritabanından akıllı cevaplar üretmeye devam eder.

### 3. Veri Yapısı
- **Eğitim Verisi (`shopkeeper-training-data.json`):** Esnafın mağaza profili, 5 aylık ciro trendleri, kâr marjları ve mevsimsel dondurma/sıcak içecek satış eğilimleri gibi zengin bir dataset içerir.

---

## 🚀 Öne Çıkan Özellikler

| Özellik | Açıklama |
| :--- | :--- |
| **Dijital Çırak (AI)** | Mağaza verileriyle eğitilmiş, stok ve strateji öneren asistan. |
| **Akıllı Envanter** | Kritik stok seviyelerini otomatik takip eden dinamik liste. |
| **Kâr/Zarar Analizi** | Ürün bazlı kâr marjlarını ve aylık performans trendlerini gösteren dashboard. |
| **Kampanya Planlayıcı** | Bayram, Ramazan veya özel günler için AI destekli stok planlama. |
| **Raf Yerleşim Optimizasyonu** | Satış hızına göre ürünlerin mağaza içi konumlandırma önerileri. |

---

## 🔧 Kurulum ve Çalıştırma

1. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

2. **API Ayarları:**
   `.env` dosyasına Google AI Studio'dan aldığınız API anahtarını ekleyin:
   ```env
   VITE_GEMINI_API_KEY=AIza...
   ```

3. **Geliştirme Modunda Başlatın:**
   ```bash
   npm run dev
   ```

---

## 📈 Gelecek Yol Haritası
- [ ] **Görüntü İşleme:** Rafların fotoğrafını çekerek eksik ürünleri otomatik tespit etme.
- [ ] **Sesli Komut:** Esnafın "Çırak, dünkü ciro neydi?" diyerek sesli cevap alabilmesi.
- [ ] **Entegrasyon:** Yerel toptancı sistemlerine otomatik sipariş geçme özelliği.

---
*Bu proje, YZTA Hackathon 2026 kapsamında, geleneksel ticaretin dijital dönüşümüne katkı sağlamak amacıyla geliştirilmiştir.*
