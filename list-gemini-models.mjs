import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';

// Manually parse .env.local
const envFile = fs.readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, value] = line.split('=');
  if (key && value) {
    env[key.trim()] = value.trim();
  }
});

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

async function listModels() {
  try {
    console.log('Fetching models with key:', env.GEMINI_API_KEY.substring(0, 10) + '...');
    const result = await genAI.listModels();
    console.log('Available models:');
    result.models.forEach(m => console.log(`- ${m.name} (${m.displayName})`));
  } catch (error) {
    console.error('Error listing models:', error);
  }
}

listModels();
