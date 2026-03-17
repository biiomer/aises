import { Music2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-12 bg-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xl font-bold tracking-tighter">
            <Music2 className="text-blue-500" />
            <span>AISES</span>
          </div>
          <p className="text-sm text-white/50">
            Türkiye'nin ilk AI tabanlı müzik üretim platformu.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Platform</h4>
          <ul className="text-sm text-white/50 space-y-2">
            <li>Nasıl Çalışır?</li>
            <li>Sanatçılar</li>
            <li>Şarkılar</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Destek</h4>
          <ul className="text-sm text-white/50 space-y-2">
            <li>SSS</li>
            <li>İletişim</li>
            <li>Kullanım Koşulları</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Sosyal Medya</h4>
          <ul className="text-sm text-white/50 space-y-2">
            <li>Instagram</li>
            <li>Twitter</li>
            <li>YouTube</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-sm text-white/30">
        © {new Date().getFullYear()} AISES. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
