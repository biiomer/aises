'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Music, Sparkles, Wand2, ArrowRight, ArrowLeft } from 'lucide-react';
import { artists } from '@/lib/artists';

const genres = ['Drill', 'Pop', 'Rock', 'Hip Hop', 'Arabesk'];

export default function SongGeneratorForm() {
  const router = useRouter();
  const [theme, setTheme] = useState('');
  const [genre, setGenre] = useState('Drill');
  const [artist, setArtist] = useState('yodel');
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const handleGenerateLyrics = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/generate-lyrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme, genre, artist }),
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Lyrics generation failed');
      }

      if (data.lyrics) {
        setLyrics(data.lyrics);
        setStep(2);
      }
    } catch (err: any) {
      console.error('Lyrics generation failed:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateMusic = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/generate-music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lyrics, genre, artist }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Music generation failed');
      }

      if (data.songId) {
        router.push(`/songs/${data.songId}`);
      }
    } catch (err: any) {
      console.error('Music generation failed:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      {/* Progress */}
      <div className="flex items-center justify-between mb-12">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
              step >= s ? 'bg-blue-600 text-white' : 'bg-white/10 text-white/30'
            }`}>
              {s}
            </div>
            {s < 3 && <div className={`w-24 h-1 mx-2 rounded-full ${step > s ? 'bg-blue-600' : 'bg-white/10'}`} />}
          </div>
        ))}
      </div>

      <div className="glass rounded-3xl p-8 md:p-12">
        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium animate-in fade-in slide-in-from-top-2">
            {error}
          </div>
        )}
        {step === 1 && (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Yeni Bir Şarkı Başlat</h2>
              <p className="text-white/50">Şarkının temasını ve tarzını belirle, AI senin için yazsın.</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Şarkı Teması</label>
                <input
                  type="text"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder="Örn: Yağmurlu bir akşam, Eski bir aşk hikayesi..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Müzik Türü</label>
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                  >
                    {genres.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Seslendirecek Sanatçı</label>
                  <select
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                  >
                    {artists.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerateLyrics}
                disabled={loading || !theme}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-2 transition-all group"
              >
                {loading ? (
                  <Sparkles className="animate-spin" />
                ) : (
                  <>
                    <span>1. Bölüm: Sözleri Hazırla</span>
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Şarkı Sözlerin Hazır</h2>
              <p className="text-white/50">Gemini Flash tarafından senin için yazıldı. Düzenleyebilirsin.</p>
            </div>

            <textarea
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              className="w-full h-80 bg-white/5 border border-white/10 rounded-2xl p-6 focus:outline-none focus:border-blue-500 transition-colors font-mono text-sm leading-relaxed"
            />

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all"
              >
                <ArrowLeft />
                <span>Geri</span>
              </button>
              <button
                onClick={handleGenerateMusic}
                disabled={loading}
                className="flex-[2] bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all group"
              >
                {loading ? (
                  <Music className="animate-bounce" />
                ) : (
                  <>
                    <span>2. Bölüm: Müziği Üret</span>
                    <Wand2 className="group-hover:rotate-12 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
