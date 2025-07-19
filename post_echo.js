import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://owanovbzavmcsrfqafyo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93YW5vdmJ6YXZtY3NyZnFhZnlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MTcxNjMsImV4cCI6MjA2Nzk5MzE2M30.bX1ExfagBFKf706SEsl97GQBw94JzeRoS5R3F9Ni26U';
const supabase = createClient(supabaseUrl, supabaseKey);

function getOrCreatePseudo() {
  let p = localStorage.getItem('et_pseudo');
  if (!p) {
    const oiseaux = ['Pivert','Hirondelle','Colibri','Aigle','Canari','Flamant','Autruche','Cigogne','Moineau','Héron'];
    const villes = ['Paris','Dakar','Lyon','Bamako','Abidjan','Tunis','Alger','Libreville','Casablanca','Ouagadougou'];
    p = oiseaux[Math.floor(Math.random()*oiseaux.length)] + villes[Math.floor(Math.random()*villes.length)];
    localStorage.setItem('et_pseudo', p);
  }
  return p;
}

const pseudo = getOrCreatePseudo();
document.getElementById('pseudo').textContent = pseudo;

document.getElementById('echo-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const statusEl = document.getElementById('status');
  const content = document.getElementById('echo-content').value.trim();

  if (!content) {
    statusEl.textContent = '⚠️ Message vide.';
    statusEl.style.color = 'orange';
    return;
  }

  statusEl.textContent = 'Publication...';
  statusEl.style.color = '#333';

  const { data, error } = await supabase
    .from('echos')
    .insert([{ pseudo, content }])
    .select();

  if (error) {
    console.error('Erreur Supabase:', error);
    statusEl.textContent = '❌ Erreur : ' + error.message;
    statusEl.style.color = 'red';
    return;
  }

  console.log('Écho inséré:', data);
  statusEl.textContent = '✅ Écho publié !';
  statusEl.style.color = 'green';
  document.getElementById('echo-content').value = '';
});
