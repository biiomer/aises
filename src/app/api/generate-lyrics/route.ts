import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    // API key kontrolü
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'API key yapılandırılmamış' },
        { status: 500 }
      );
    }

    const { theme, genre, artist } = await req.json();

    // Use gemini-2.0-flash as it was previously found (though rate limited)
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash'
    });

    const prompt = `Sen profesyonel bir Türkçe şarkı sözü yazarısın.

Tema: ${theme}
Tür: ${genre}
Sanatçı: ${artist}

${artist} tarzında, ${genre} türünde, "${theme}" temalı bir şarkı sözü yaz.

Format:
[Kıta 1]
[4 satır]

[Nakarat]
[4 satır]

[Kıta 2]
[4 satır]

[Nakarat]
[4 satır]

SADECE şarkı sözlerini yaz, başka açıklama yapma.`;

    console.log('⏳ Gemini API çağrısı...');

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const lyrics = response.text();

    console.log('✅ Başarılı!');

    return NextResponse.json({ lyrics });
  } catch (error: any) {
    console.error('❌ Gemini hatası:', error);

    // Rate Limit (Quota)
    if (error.message?.includes('429') || error.message?.includes('quota')) {
      return NextResponse.json(
        { error: 'Gemini API kullanım kotası doldu (Free Tier). Lütfen 30 saniye bekleyip tekrar deneyin.' },
        { status: 429 }
      );
    }

    // Model Not Found
    if (error.message?.includes('404') || error.message?.includes('not found')) {
      return NextResponse.json(
        { error: 'Seçili Gemini modeli bulunamadı. Lütfen API ayarlarını kontrol edin.' },
        { status: 404 }
      );
    }

    // Invalid API Key
    if (error.message?.includes('401') || error.message?.includes('API key not valid')) {
      return NextResponse.json(
        { error: 'Gemini API anahtarı geçersiz. Lütfen .env.local dosyasını kontrol edin.' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Şarkı sözü oluşturulamadı', details: error.status },
      { status: 500 }
    );
  }
}