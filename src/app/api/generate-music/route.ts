import { NextRequest, NextResponse } from 'next/server';
import { replicate } from '@/lib/replicate';
import { supabase } from '@/lib/supabase';

// Note: In a real production app, you would use a Service Role Key for server-side Supabase operations
// to bypass Row Level Security (RLS). For this setup, we're using the client from '@/lib/supabase'.

export async function POST(req: NextRequest) {
  try {
    const { lyrics, genre, artist } = await req.json();

    // 1. Create song record in Supabase (status: generating)
    const { data: song, error: insertError } = await supabase
      .from('songs')
      .insert({
        title: lyrics.split('\n')[0].substring(0, 50).replace('[', '').replace(']', '') || 'Yeni Şarkı',
        artist_id: artist,
        genre,
        lyrics,
        status: 'generating',
      })
      .select()
      .single();

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      throw insertError;
    }

    // 2. Generate music using MusicGen via Replicate
    // meta/musicgen:7a76a8258b23fae65c5a22debb8841d1d7e816b75c2f24218cd2bd8573787906
    const output = await replicate.run(
      'meta/musicgen:7a76a8258b23fae65c5a22debb8841d1d7e816b75c2f24218cd2bd8573787906',
      {
        input: {
          prompt: `${genre} music, instrumental, ${artist} style`,
          duration: 30,
        },
      }
    ) as unknown as string;

    // 3. Update song record with audio URL
    const audioUrl = output; // MusicGen returns a URL to the audio file
    
    const { error: updateError } = await supabase
      .from('songs')
      .update({
        audio_url: audioUrl,
        status: 'completed',
      })
      .eq('id', song.id);

    if (updateError) {
      console.error('Supabase update error:', updateError);
    }

    return NextResponse.json({ songId: song.id, audioUrl });
  } catch (error: unknown) {
    console.error('Music generation error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
