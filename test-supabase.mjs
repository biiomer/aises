import { createClient } from '@supabase/supabase-js';
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

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('Testing Supabase connection...');
  
  // Try to count records in artists table
  const { data, error, count } = await supabase
    .from('artists')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Supabase connection error:', error.message);
    if (error.message.includes('relation "artists" does not exist')) {
      console.log('TIP: "artists" tablosu bulunamadı. SQL Editöründe tabloyu oluşturduğunuzdan emin olun.');
    }
  } else {
    console.log('Supabase connection successful!');
    console.log('Artists count:', count);
  }
}

testConnection();
