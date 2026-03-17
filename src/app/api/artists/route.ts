import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data: artists, error } = await supabase
      .from('artists')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ artists });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
