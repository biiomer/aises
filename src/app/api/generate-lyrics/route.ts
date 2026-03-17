import { NextRequest, NextResponse } from 'next/server';
import { getGeminiModel } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    // 1. Check API Key
    if (!process.env.GEMINI_API_KEY) {
      console.error('❌ GEMINI_API_KEY eksik!');
      return NextResponse.json(
        { error: 'API key yapılandırılmamış. Lütfen .env.local veya Vercel ayarlarınızı kontrol edin.' },
        { status: 500 }
      );
    }

    const { theme, genre, artist } = await req.json();
    console.log('📝 İstek:', { theme, genre, artist });

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

    console.log('⏳ Gemini API çağrısı yapılıyor...');

    const result = await model.generateContent(prompt);
    const lyrics = result.response.text();

    console.log('✅ Sonuç alındı:', lyrics.substring(0, 50) + '...');

    return NextResponse.json({ lyrics });
  } catch (error: any) {
    console.error('❌ Gemini Hatası:', error);
    
    // Kota aşımı (Rate limit)
    if (error.message?.includes('429') || error.message?.includes('quota')) {
      return NextResponse.json({ 
        error: 'Gemini API kullanım kotası doldu (Free Tier). Lütfen 30 saniye bekleyip tekrar deneyin.' 
      }, { status: 429 });
    }

    // Geçersiz anahtar
    if (error.message?.includes('API key not valid')) {
      return NextResponse.json({ 
        error: 'Gemini API anahtarı geçersiz. Lütfen anahtarınızı kontrol edin.' 
      }, { status: 401 });
    }

    return NextResponse.json(
      {
        error: error.message || 'Bilinmeyen bir hata oluştu',
        details: error.status ? `HTTP ${error.status}` : undefined
      },
      { status: 500 }
    );
  }
}