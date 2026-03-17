import { notFound } from 'next/navigation';
import { artists } from '@/lib/artists';
import { User, Music, Play } from 'lucide-react';
import Link from 'next/link';

interface ArtistPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArtistDetailPage({ params }: ArtistPageProps) {
  const { slug } = await params;
  const artist = artists.find((a) => a.slug === slug);

  if (!artist) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-12 pb-20">
      {/* Header */}
      <section className="relative h-[40vh] flex items-end px-6 py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-blue-600/10" />
        <div className="max-w-7xl mx-auto w-full z-20 flex flex-col md:flex-row items-center md:items-end gap-8">
          <div className="w-48 h-48 rounded-3xl bg-white/5 flex items-center justify-center border border-white/10 shrink-0 shadow-2xl">
            <User size={80} className="text-white/10" />
          </div>
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">{artist.name}</h1>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <span className="px-3 py-1 bg-blue-600 text-xs font-bold rounded-full uppercase tracking-wider">{artist.genre}</span>
              <span className="text-white/50 text-sm">AI Sanatçısı</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Hakkında</h2>
            <p className="text-white/60 text-lg leading-relaxed">{artist.bio}</p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Popüler Şarkıları</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="glass p-4 flex items-center gap-4 hover:bg-white/5 transition-all group cursor-pointer">
                  <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center group-hover:bg-blue-600/20 transition-all">
                    <Music size={20} className="text-white/30 group-hover:text-blue-400" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold">Örnek Şarkı #{s}</h4>
                    <p className="text-xs text-white/40">{artist.genre} • 0:30</p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <Play size={16} fill="currentColor" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-8 rounded-3xl space-y-6">
            <h3 className="text-xl font-bold">Bu Tarzda Şarkı Üret</h3>
            <p className="text-sm text-white/50">
              {artist.name} tarzında ve sesinde yeni bir başyapıt yaratmak için hemen başla.
            </p>
            <Link 
              href={`/generate?artist=${artist.id}`}
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-bold py-4 rounded-2xl transition-all"
            >
              Hemen Üret
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
