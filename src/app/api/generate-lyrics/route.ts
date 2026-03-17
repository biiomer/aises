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
  } catch (error: unknown) {
    console.error('Gemini error:', error);
    
    if (error instanceof Error && error.message?.includes('API key not valid')) {
      return NextResponse.json({ 
        error: 'Gemini API anahtarı geçersiz. Lütfen .env.local dosyasındaki GEMINI_API_KEY değerini kontrol edin.' 
      }, { status: 401 });
    }

    if (error instanceof Error && error.message?.includes('429 Too Many Requests')) {
      return NextResponse.json({ 
        error: 'Gemini API kullanım kotası doldu (Free Tier). Lütfen 1 dakika bekleyip tekrar deneyin veya ücretli plana geçin.' 
      }, { status: 429 });
    }

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
