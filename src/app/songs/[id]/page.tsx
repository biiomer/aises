import { notFound } from 'next/navigation';
import { Music, Share2, Download, User } from 'lucide-react';
import AudioPlayer from '@/components/AudioPlayer';
import { artists } from '@/lib/artists';

interface SongPageProps {
  params: Promise<{ id: string }>;
}

export default async function SongDetailPage({ params }: SongPageProps) {
  const { id } = await params;

  // Mock fetching a song - in real app use Supabase
  const song = {
    id: id,
    title: 'Yeni Şarkı',
    genre: 'Drill',
    artist_id: 'yodel',
    lyrics: `[Kıta 1]
Karanlık sokaklar, yankılanır sesler
Adım attıkça, kesilir tüm nefesler
Elimizde hayaller, cebimizde hüzün
Gerçekler acı, ama gülüyor bu yüzün

[Nakarat]
Vur vur, davullar çalarken durma
Sokaklar bizim, kimseye sorma
Yükselirken duman, kaybolur acı
Drill'in kralı, başımızda tacı`,
    audio_url: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Sample-OGG-File.ogg', // Sample
    status: 'completed' as const
  };

  const artist = artists.find(a => a.id === song.artist_id);

  if (!song) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Side: Audio & Info */}
        <div className="space-y-12">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
              <Music size={16} />
              <span>{song.genre}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">{song.title}</h1>
            
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                <User size={20} className="text-white/30" />
              </div>
              <p className="text-lg text-white/60">
                <span className="text-white font-bold">{artist?.name}</span> tarafından seslendirildi
              </p>
            </div>
          </div>

          <AudioPlayer url={song.audio_url} />

          <div className="flex items-center gap-4">
            <button className="flex-1 glass py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
              <Share2 size={20} /> Paylaş
            </button>
            <button className="flex-1 glass py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
              <Download size={20} /> İndir
            </button>
          </div>
        </div>

        {/* Right Side: Lyrics */}
        <div className="glass rounded-[40px] p-8 md:p-12 space-y-8">
          <h2 className="text-2xl font-bold border-b border-white/10 pb-4">Şarkı Sözleri</h2>
          <div className="whitespace-pre-wrap text-white/80 leading-relaxed font-serif text-lg italic">
            {song.lyrics}
          </div>
        </div>
      </div>
    </div>
  );
}
