import { Music, Filter } from 'lucide-react';
import SongCard from '@/components/SongCard';

// This would normally fetch from API or Supabase
const mockSongs = [
  { id: '1', title: 'Gece Yarısı', genre: 'Drill', artist_id: 'yodel', status: 'completed' as const },
  { id: '2', title: 'Yalnızlık Şehri', genre: 'Rock', artist_id: 'ates', status: 'completed' as const },
  { id: '3', title: 'Pembe Bulutlar', genre: 'Pop', artist_id: 'defne-cey', status: 'completed' as const },
];

export default function SongsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">Tüm <span className="text-blue-500">Şarkılar</span></h1>
          <p className="text-white/50 text-xl max-w-xl">Topluluğumuz tarafından üretilen en yeni AI eserlerini keşfet.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="glass px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-white/10">
            <Filter size={18} />
            Filtrele
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSongs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>

      {mockSongs.length === 0 && (
        <div className="glass p-20 rounded-3xl text-center space-y-6">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
            <Music size={40} className="text-white/10" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Henüz şarkı yok</h3>
            <p className="text-white/40">İlk şarkıyı sen üretmek ister misin?</p>
          </div>
        </div>
      )}
    </div>
  );
}
