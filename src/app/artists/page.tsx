import { artists } from '@/lib/artists';
import ArtistCard from '@/components/ArtistCard';

export default function ArtistsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 space-y-12">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold tracking-tight">Tüm <span className="text-blue-500">Sanatçılar</span></h1>
        <p className="text-white/50 text-xl max-w-2xl">Hayallerindeki şarkıyı seslendirecek AI sanatçılarımızın tarzlarını keşfet.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}
