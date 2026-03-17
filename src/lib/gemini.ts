import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const getGeminiModel = () => {
  // gemini-1.5-flash-latest is generally the most stable pointer
  return genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
};
