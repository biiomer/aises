'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, SkipBack, SkipForward } from 'lucide-react';

interface AudioPlayerProps {
  url: string;
}

export default function AudioPlayer({ url }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  return (
    <div className="glass rounded-3xl p-6 md:p-8 w-full">
      <audio
        ref={audioRef}
        src={url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      
      <div className="flex flex-col gap-6">
        {/* Progress Bar */}
        <div className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="text-white/50 hover:text-white transition-colors">
              <SkipBack size={24} />
            </button>
            <button 
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-all"
            >
              {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
            </button>
            <button className="text-white/50 hover:text-white transition-colors">
              <SkipForward size={24} />
            </button>
          </div>

          <div className="flex items-center gap-4 text-white/50">
            <Volume2 size={20} />
            <div className="w-24 h-1 bg-white/10 rounded-full relative">
              <div className="absolute top-0 left-0 h-full w-2/3 bg-white/50 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
