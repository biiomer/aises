import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: songs, error } = await supabase
      .from('songs')
      .select('*, artists(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ songs });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
