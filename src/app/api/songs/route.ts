import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const { data: songs, error } = await supabase
      .from('songs')
      .select('*, artists(*)')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ songs });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
