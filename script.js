
const SUPABASE_URL = 'https://owanovbzavmcsrfqafyo.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93YW5vdmJ6YXZtY3NyZnFhZnlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MTcxNjMsImV4cCI6MjA2Nzk5MzE2M30.bX1ExfagBFKf706SEsl97GQBw94JzeRoS5R3F9Ni26U';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function publishEcho() {
  const content = document.getElementById('echoInput').value;
  if (!content.trim()) return;

  const pseudo = localStorage.getItem('pseudo') || generatePseudo();
  localStorage.setItem('pseudo', pseudo);

  const { error } = await supabase.from('echos').insert([{ pseudo, content }]);
  const message = document.getElementById('message');
  if (error) {
    message.textContent = "Erreur lors de la publication.";
  } else {
    message.textContent = "Écho publié avec succès.";
    document.getElementById('echoInput').value = '';
    loadFeed();
  }
}

function generatePseudo() {
  const birds = ['Colibri', 'Aigle', 'Pivert', 'Faucon'];
  const cities = ['Paris', 'Dakar', 'Abidjan', 'Lomé'];
  return birds[Math.floor(Math.random() * birds.length)] + cities[Math.floor(Math.random() * cities.length)];
}

async function loadFeed() {
  const { data, error } = await supabase.from('echos').select('*').order('created_at', { ascending: false });
  const feed = document.getElementById('feed');
  feed.innerHTML = '';

  if (error) {
    feed.innerHTML = "<p>Erreur de chargement des échos.</p>";
    return;
  }

  if (data.length === 0) {
    feed.innerHTML = "<p>Aucun écho pour le moment.</p>";
    return;
  }

  data.forEach(echo => {
    const div = document.createElement('div');
    div.className = 'echo';
    div.textContent = `${echo.pseudo} : ${echo.content}`;
    feed.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", loadFeed);
