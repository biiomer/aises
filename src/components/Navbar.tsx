import Link from 'next/link';
import { Music2 } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="glass sticky top-0 z-50 w-full border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tighter">
          <Music2 className="text-blue-500" />
          <span>AISES</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <Link href="/generate" className="hover:text-white transition-colors">Üret</Link>
          <Link href="/artists" className="hover:text-white transition-colors">Sanatçılar</Link>
          <Link href="/songs" className="hover:text-white transition-colors">Keşfet</Link>
        </div>
        <Link 
          href="/generate"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all"
        >
          Şarkı Üret
        </Link>
      </div>
    </nav>
  );
}
