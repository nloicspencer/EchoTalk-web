
import { supabase } from './supabaseClient.js';

async function testConnection() {
  const { data, error } = await supabase.from('test').select('*');
  if (error) {
    console.error('Erreur de connexion à Supabase :', error.message);
  } else {
    console.log('Connexion Supabase réussie :', data);
  }
}

testConnection();
