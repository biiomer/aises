import Link from 'next/link';
import { Song } from '@/lib/types';
import { Play, Music } from 'lucide-react';

interface SongCardProps {
  song: Song;
}

export default function SongCard({ song }: SongCardProps) {
  return (
    <Link 
      href={`/songs/${song.id}`}
      className="glass rounded-2xl p-4 flex items-center gap-4 hover:bg-white/5 transition-all group"
    >
      <div className="w-16 h-16 rounded-xl bg-blue-600/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600/40 transition-all">
        <Music className="text-blue-400" />
      </div>
      <div className="flex-grow min-w-0">
        <h4 className="font-bold truncate">{song.title}</h4>
        <p className="text-sm text-white/50">{song.genre}</p>
      </div>
      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
        <Play size={18} fill="currentColor" />
      </div>
    </Link>
  );
}
