export interface Artist {
  id: string;
  slug: string;
  name: string;
  bio: string;
  genre: string;
  avatar_url: string;
  created_at?: string;
}

export interface Song {
  id: string;
  title: string;
  artist_id: string;
  genre: string;
  lyrics: string;
  audio_url?: string;
  duration?: number;
  status: 'generating' | 'completed' | 'failed';
  created_at?: string;
  metadata?: unknown;
}

export interface GenerateLyricsParams {
  theme: string;
  genre: string;
  artist: string;
}

export interface GenerateMusicParams {
  lyrics: string;
  genre: string;
  artist: string;
}
