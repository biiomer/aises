# 🎵 AISES - AI Şarkı Üretim Platformu (MASTER DOKÜMANTASYON)

## 📋 PROJE TANIMI

**AISES** = AI-powered music generation platform (Türkiye odaklı)

Kullanıcılar:
1. Şarkı sözü yazar (veya AI yazdırır)
2. Tür seçer (drill, pop, rock vs.)
3. Sanatçı seçer (YODEL, ATEŞ, Defne Cey, Çağtay)
4. "Şarkı Üret" butonuna basar
5. AI şarkıyı üretir (müzik + vokal)
6. YouTube'a otomatik yükler (opsiyonel)

---

## 🎯 PROJE HEDEFLERI

1. ✅ Tamamen ücretsiz çalışsın (test aşaması)
2. ✅ Modern, hızlı, mobil uyumlu web sitesi
3. ✅ Gemini Flash ile söz yazma/düzeltme
4. ✅ MusicGen ile müzik üretimi (açık kaynak)
5. ✅ Sanatçı profilleri (YODEL, ATEŞ, Defne Cey, Çağtay)
6. ✅ Üretilen şarkıları veritabanında sakla
7. ✅ YouTube'a manuel veya otomatik yükleme

---

## 🛠️ TEKNOLOJI STACK (ÜCRETSIZ SENARYO)

### Frontend:
- **Next.js 15** (React framework)
- **TypeScript** (tip güvenliği)
- **Tailwind CSS** (styling)
- **Vercel** (ücretsiz hosting)

### Backend:
- **Next.js API Routes** (serverless functions)
- **Node.js 20+**

### AI/ML:
- **Google Gemini Flash 2.0** (söz yazma - ÜCRETSIZ 1500 req/gün)
- **Meta MusicGen** (müzik üretimi - açık kaynak)
- **Replicate API** (MusicGen hosting - ÜCRETSIZ tier)

### Database:
- **Supabase** (PostgreSQL - ÜCRETSIZ 500MB)

### Storage:
- **Supabase Storage** (ÜCRETSIZ 1GB)

### Authentication:
- **NextAuth.js** (email/password)

### Deployment:
- **Vercel** (frontend + API)
- **Supabase** (database + storage)

---

## 📊 SİSTEM MİMARİSİ
```
┌──────────────────────────────────────────────────┐
│  KULLANICI (Browser)                             │
│  - Şarkı sözü yazar                              │
│  - Tür/sanatçı seçer                             │
│  - "Üret" butonuna basar                         │
└──────────────────────────────────────────────────┘
                    ↓ HTTPS
┌──────────────────────────────────────────────────┐
│  NEXT.JS FRONTEND (Vercel)                       │
│  - Ana sayfa                                     │
│  - Şarkı üretim formu                            │
│  - Sanatçı profilleri                            │
│  - Şarkı galerisi                                │
└──────────────────────────────────────────────────┘
                    ↓ API Call
┌──────────────────────────────────────────────────┐
│  NEXT.JS API ROUTES (Serverless)                 │
│  /api/generate-lyrics  (Gemini Flash)            │
│  /api/generate-music   (MusicGen via Replicate)  │
│  /api/songs            (CRUD)                    │
│  /api/artists          (CRUD)                    │
└──────────────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────────────┐
│  EXTERNAL SERVICES                               │
│  - Gemini Flash API (Google)                     │
│  - Replicate API (MusicGen)                      │
│  - Supabase (Database + Storage)                 │
└──────────────────────────────────────────────────┘
```

---

## 📁 PROJE KLASÖR YAPISI
```
aises/
├── public/
│   ├── logo.svg
│   └── artists/
│       ├── yodel.jpg
│       ├── ates.jpg
│       ├── defne-cey.jpg
│       └── cagtay.jpg
│
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Ana sayfa
│   │   ├── globals.css             # Global styles
│   │   │
│   │   ├── generate/               # Şarkı üretim sayfası
│   │   │   └── page.tsx
│   │   │
│   │   ├── artists/                # Sanatçılar
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── songs/                  # Üretilen şarkılar
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   │
│   │   └── api/                    # API Routes
│   │       ├── generate-lyrics/
│   │       │   └── route.ts
│   │       ├── generate-music/
│   │       │   └── route.ts
│   │       ├── songs/
│   │       │   └── route.ts
│   │       └── artists/
│   │           └── route.ts
│   │
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── SongGeneratorForm.tsx
│   │   ├── ArtistCard.tsx
│   │   ├── SongCard.tsx
│   │   └── AudioPlayer.tsx
│   │
│   ├── lib/
│   │   ├── supabase.ts             # Supabase client
│   │   ├── gemini.ts               # Gemini Flash client
│   │   ├── replicate.ts            # Replicate (MusicGen)
│   │   ├── artists.ts              # Sanatçı data
│   │   └── types.ts                # TypeScript types
│   │
│   └── utils/
│       ├── seo.ts
│       └── helpers.ts
│
├── .env.local                      # Environment variables
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🗄️ VERİTABANI ŞEMASI (SUPABASE)

### Tablo: `artists`
```sql
CREATE TABLE artists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  bio TEXT,
  genre TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Örnek veri
INSERT INTO artists (slug, name, bio, genre, avatar_url) VALUES
('yodel', 'YODEL', 'Turkish drill''in yükselen ismi', 'Drill/Trap', '/artists/yodel.jpg'),
('ates', 'ATEŞ', 'Türk rock''un duygusal sesi', 'Rock', '/artists/ates.jpg'),
('defne-cey', 'Defne Cey', 'Çok katmanlı pop sanatçısı', 'Pop', '/artists/defne-cey.jpg'),
('cagtay', 'Çağtay', 'Conscious hip hop & mental health', 'Hip Hop', '/artists/cagtay.jpg');
```

### Tablo: `songs`
```sql
CREATE TABLE songs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  artist_id UUID REFERENCES artists(id),
  genre TEXT NOT NULL,
  lyrics TEXT,
  audio_url TEXT,
  duration INTEGER,
  status TEXT DEFAULT 'generating', -- generating, completed, failed
  created_at TIMESTAMP DEFAULT NOW(),
  metadata JSONB -- {prompt, gemini_response, musicgen_params}
);
```

### Tablo: `users` (opsiyonel - ileride)
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔑 ENVIRONMENT VARIABLES (.env.local)
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Google Gemini
GEMINI_API_KEY=your-gemini-api-key

# Replicate (MusicGen)
REPLICATE_API_TOKEN=your-replicate-token

# NextAuth (opsiyonel)
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
```

---

## 🎨 COMPONENT ÖRNEKLERİ

### 1. `src/components/SongGeneratorForm.tsx`
```tsx
'use client';

import { useState } from 'react';

const genres = ['Drill', 'Pop', 'Rock', 'Hip Hop', 'Arabesk'];
const artists = [
  { id: 'yodel', name: 'YODEL' },
  { id: 'ates', name: 'ATEŞ' },
  { id: 'defne-cey', name: 'Defne Cey' },
  { id: 'cagtay', name: 'Çağtay' },
];

export default function SongGeneratorForm() {
  const [theme, setTheme] = useState('');
  const [genre, setGenre] = useState('Drill');
  const [artist, setArtist] = useState('yodel');
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: form, 2: lyrics, 3: music

  // 1. Söz üret (Gemini Flash)
  const handleGenerateLyrics = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate-lyrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme, genre, artist }),
      });
      const data = await res.json();
      setLyrics(data.lyrics);
      setStep(2);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Müzik üret (MusicGen)
  const handleGenerateMusic = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate-music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lyrics, genre, artist }),
      });
      const data = await res.json();
      // Şarkı oluşturuldu, detay sayfasına yönlendir
      window.location.href = `/songs/${data.songId}`;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-xl">
      
      {/* ADIM 1: FORM */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Yeni Şarkı Üret</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white mb-2">Tema</label>
              <input
                type="text"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="örn: motivasyon, ayrılık, sokak hayatı"
                className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              />
            </div>

            <div>
              <label className="block text-white mb-2">Tür</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              >
                {genres.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white mb-2">Sanatçı</label>
              <select
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white"
              >
                {artists.map(a => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleGenerateLyrics}
              disabled={loading || !theme}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
            >
              {loading ? 'Üretiliyor...' : '1. Söz Üret (AI ile)'}
            </button>
          </div>
        </div>
      )}

      {/* ADIM 2: SÖZLER */}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Şarkı Sözleri</h2>
          <textarea
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            className="w-full h-64 px-4 py-2 rounded bg-gray-700 text-white"
          />
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setStep(1)}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg"
            >
              ← Geri
            </button>
            <button
              onClick={handleGenerateMusic}
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
            >
              {loading ? 'Müzik Üretiliyor...' : '2. Müzik Üret'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
```

---

## 🔌 API ROUTES

### 1. `/api/generate-lyrics/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { theme, genre, artist } = await req.json();

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const prompt = `Sen profesyonel bir Türkçe şarkı sözü yazarısın.

Tema: ${theme}
Tür: ${genre}
Sanatçı: ${artist}

${artist} tarzında, ${genre} türünde, "${theme}" temalı bir şarkı sözü yaz.

Format:
[Kıta 1]
...

[Nakarat]
...

[Kıta 2]
...

[Nakarat]
...

SADECE şarkı sözlerini yaz, başka açıklama yapma.`;

    const result = await model.generateContent(prompt);
    const lyrics = result.response.text();

    return NextResponse.json({ lyrics });
  } catch (error: any) {
    console.error('Gemini error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

### 2. `/api/generate-music/route.ts`
```typescript
import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';
import { createClient } from '@supabase/supabase-js';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { lyrics, genre, artist } = await req.json();

    // 1. Veritabanına şarkı kaydı oluştur (status: generating)
    const { data: song, error: insertError } = await supabase
      .from('songs')
      .insert({
        title: lyrics.split('\n')[0].substring(0, 50), // İlk satır başlık
        artist_id: artist, // UUID olarak sanatçı ID'si gerekir
        genre,
        lyrics,
        status: 'generating',
      })
      .select()
      .single();

    if (insertError) throw insertError;

    // 2. MusicGen ile müzik üret (async - webhook kullanılabilir)
    const output = await replicate.run(
      'meta/musicgen:7a76a8258b23fae65c5a22debb8841d1d7e816b75c2f24218cd2bd8573787906',
      {
        input: {
          prompt: `${genre} music, instrumental, ${artist} style`,
          duration: 30, // saniye
        },
      }
    );

    // 3. Üretilen müziği Supabase Storage'a yükle
    const audioUrl = output; // Replicate URL döner
    
    // 4. Şarkıyı güncelle (status: completed)
    await supabase
      .from('songs')
      .update({
        audio_url: audioUrl,
        status: 'completed',
      })
      .eq('id', song.id);

    return NextResponse.json({ songId: song.id, audioUrl });
  } catch (error: any) {
    console.error('Music generation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

---

## 📦 PACKAGE.JSON
```json
{
  "name": "aises",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.1.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@google/generative-ai": "^0.21.0",
    "@supabase/supabase-js": "^2.47.10",
    "replicate": "^0.34.1"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "typescript": "^5",
    "tailwindcss": "^3.4.1",
    "postcss": "^8",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "15.1.3"
  }
}
```

---

## 🚀 KURULUM ADIMLARI

### 1. Proje Oluştur
```bash
npx create-next-app@latest aises --typescript --tailwind --app
cd aises
```

### 2. Paketleri Yükle
```bash
npm install @google/generative-ai @supabase/supabase-js replicate
```

### 3. Supabase Kurulumu
1. supabase.com'a git
2. Yeni proje oluştur
3. SQL Editor'da yukarıdaki tabloları oluştur
4. API keys'i kopyala → .env.local'a ekle

### 4. Gemini API Key
1. aistudio.google.com/app/apikey
2. API key oluştur
3. .env.local'a ekle

### 5. Replicate API Key
1. replicate.com → Sign up
2. Account settings → API tokens
3. .env.local'a ekle

### 6. Projeyi Çalıştır
```bash
npm run dev
```

---

## 📱 SAYFALAR

### Ana Sayfa (`src/app/page.tsx`)
- Hero section
- "Hemen Şarkı Üret" CTA
- Sanatçı kartları
- Örnek şarkılar

### Şarkı Üretim (`src/app/generate/page.tsx`)
- SongGeneratorForm component
- 3 adımlı süreç

### Sanatçılar (`src/app/artists/page.tsx`)
- YODEL, ATEŞ, Defne Cey, Çağtay kartları
- Sanatçıya tıkla → profil sayfası

### Şarkılar (`src/app/songs/page.tsx`)
- Tüm üretilen şarkılar
- Filtreleme (sanatçı, tür)

---

## ⚠️ KISITLAMALAR (ÜCRETSIZ SENARYO)

1. **Günlük Limitler:**
   - Gemini Flash: 1500 istek/gün
   - Replicate: 5-10 üretim/gün (free tier)
   - Supabase: 500MB storage

2. **Kalite:**
   - MusicGen kalitesi Suno AI'dan düşük
   - Ses tutarlılığı yok (her şarkı farklı ses)

3. **Özellikler:**
   - Spotify dağıtımı YOK
   - Voice cloning YOK
   - Otomatik YouTube yükleme SINIRLI

---

## 🎯 SONRAKI ADIMLAR

### Faz 2 (Ücretli Özellikler):
- Suno AI entegrasyonu
- Eleven Labs (voice cloning)
- DistroKid (Spotify)
- YouTube automation

---

## 📞 DESTEK

Sorun yaşarsan:
1. Supabase logs kontrol et
2. Vercel logs kontrol et
3. Console errors bak

---

## ✅ SON KONTROL LİSTESİ

- [ ] Supabase projesi oluşturuldu
- [ ] Gemini API key alındı
- [ ] Replicate hesabı açıldı
- [ ] .env.local dosyası dolduruldu
- [ ] npm install tamamlandı
- [ ] Veritabanı tabloları oluşturuldu
- [ ] npm run dev çalışıyor
- [ ] localhost:3000 açılıyor

---

**PROJE HAZIR!** 🎉

Sorun yaşarsan, hata mesajlarını paylaş.
```

---

