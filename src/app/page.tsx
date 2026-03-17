import Link from 'next/link';
import { Sparkles, Music, Mic2, ArrowRight } from 'lucide-react';
import { artists } from '@/lib/artists';
import ArtistCard from '@/components/ArtistCard';

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-transparent pointer-events-none" />
        <div className="max-w-4xl text-center z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium animate-pulse">
            <Sparkles size={16} />
            <span>Türkiye'nin ilk AI Müzik Platformu</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.9]">
            Hayalindeki <br /> <span className="text-blue-500">Şarkıyı Üret.</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Sözleri yaz, tarzını seç ve saniyeler içinde profesyonel bir şarkıya dönüştür. 
            Üstelik tamamen ücretsiz.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link 
              href="/generate"
              className="w-full md:w-auto bg-white text-black px-8 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              Hemen Başla <ArrowRight size={20} />
            </Link>
            <Link 
              href="/songs"
              className="w-full md:w-auto glass text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all"
            >
              Keşfet
            </Link>
          </div>
        </div>
      </section>

      {/* Artists Section */}
      <section className="max-w-7xl mx-auto w-full px-6 space-y-12">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">AI Sanatçılarımız</h2>
            <p className="text-white/50 max-w-lg">En sevdiğin tarzda şarkı söyleyebilecek, her biri farklı karakterde 4 AI sanatçısı seni bekliyor.</p>
          </div>
          <Link href="/artists" className="text-blue-500 font-bold hover:underline">Tümünü Gör</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <Music className="text-purple-500" />, title: "Müzik Üretimi", desc: "Meta MusicGen ile profesyonel altyapılar." },
          { icon: <Sparkles className="text-blue-500" />, title: "Söz Yazarı", desc: "Gemini Flash ile yaratıcı Türkçe sözler." },
          { icon: <Mic2 className="text-green-500" />, title: "Vokal Performans", desc: "Seçtiğin sanatçının tarzında eşsiz vokaller." },
        ].map((feature, i) => (
          <div key={i} className="glass p-8 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="text-white/50">{feature.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
