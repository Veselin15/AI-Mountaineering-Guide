import { createClient } from '@supabase/supabase-js';

// Взимаме ключовете от .env.local файла
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Експортираме клиента, за да го ползваме в цялото приложение
export const supabase = createClient(supabaseUrl, supabaseKey);