import Link from 'next/link';
import { Artist } from '@/lib/types';
import { User } from 'lucide-react';

interface ArtistCardProps {
  artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link 
      href={`/artists/${artist.slug}`}
      className="glass rounded-3xl p-6 block hover:scale-[1.02] transition-all group"
    >
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-white/5 mb-6">
        <div className="absolute inset-0 flex items-center justify-center">
          <User className="w-16 h-16 text-white/10" />
        </div>
        {/* Real image would be here: <img src={artist.avatar_url} ... /> */}
      </div>
      <div>
        <h3 className="text-xl font-bold mb-1 group-hover:text-blue-400 transition-colors">
          {artist.name}
        </h3>
        <p className="text-white/50 text-sm mb-4">{artist.genre}</p>
        <p className="text-white/70 text-sm line-clamp-2">{artist.bio}</p>
      </div>
    </Link>
  );
}
