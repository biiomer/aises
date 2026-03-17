import { NextRequest, NextResponse } from 'next/server';
import { getGeminiModel } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { theme, genre, artist } = await req.json();

    const model = getGeminiModel();

    const prompt = `Sen profesyonel bir Türkçe şarkı sözü yazarısın.

Tema: ${theme}
Tür: ${genre}
Sanatçı: ${artist}

${artist} tarzında, ${genre} türünde, "${theme}" temalı bir şarkı sözü yaz.

Format:
[Kıta 1]
...

[Nakarat]
...

[Kıta 2]
...

[Nakarat]
...

SADECE şarkı sözlerini yaz, başka açıklama yapma.`;

    const result = await model.generateContent(prompt);
    const lyrics = result.response.text();

    return NextResponse.json({ lyrics });
  } catch (error: any) {
    console.error('Gemini error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
