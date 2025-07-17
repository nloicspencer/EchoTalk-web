
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://owanovbzavmcsrfqafyo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93YW5vdmJ6YXZtY3NyZnFhZnlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MTcxNjMsImV4cCI6MjA2Nzk5MzE2M30.bX1ExfagBFKf706SEsl97GQBw94JzeRoS5R3F9Ni26U';
const supabase = createClient(supabaseUrl, supabaseKey);

const feedContainer = document.getElementById('feed-container');

async function loadEchos() {
  const { data, error } = await supabase
    .from('echos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    feedContainer.innerHTML = '<p>Erreur de chargement : ' + error.message + '</p>';
    return;
  }

  if (!data || data.length === 0) {
    feedContainer.innerHTML = '<p>Aucun écho pour le moment.</p>';
    return;
  }

  data.forEach(echo => {
    const card = document.createElement('div');
    card.className = 'echo-card';

    const pseudo = document.createElement('div');
    pseudo.className = 'pseudo';
    pseudo.textContent = echo.pseudo || 'Anonyme';

    const date = document.createElement('div');
    date.className = 'date';
    date.textContent = new Date(echo.created_at).toLocaleString();

    const content = document.createElement('div');
    content.className = 'content';
    content.textContent = echo.content;

    card.appendChild(pseudo);
    card.appendChild(date);
    card.appendChild(content);
    feedContainer.appendChild(card);
  });
}

loadEchos();
