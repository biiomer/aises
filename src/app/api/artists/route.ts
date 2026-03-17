import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  try {
    const { data: artists, error } = await supabase
      .from('artists')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ artists });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
