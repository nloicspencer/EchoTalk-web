document.getElementById('echo-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const content = document.getElementById('echo-content').value.trim();
  if (!content) return;

  const pseudo = 'TestPseudo'; // à remplacer par pseudo dynamique si disponible

  const response = await fetch('https://owanovbzavmcsrfqafyo.supabase.co/rest/v1/echos', {
    method: 'POST',
    headers: {
      'apikey': 'YOUR_API_KEY',
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify({ content, pseudo })
  });

  if (response.ok) {
    alert('Écho publié avec succès');
    document.getElementById('echo-content').value = '';
    loadEchos();
  } else {
    alert('Erreur lors de la publication');
  }
});

async function loadEchos() {
  const response = await fetch('https://owanovbzavmcsrfqafyo.supabase.co/rest/v1/echos?select=*', {
    headers: {
      'apikey': 'YOUR_API_KEY',
      'Authorization': 'Bearer YOUR_API_KEY',
    }
  });

  if (response.ok) {
    const echos = await response.json();
    const container = document.getElementById('feed-container');
    container.innerHTML = '';
    echos.reverse().forEach(echo => {
      const div = document.createElement('div');
      div.textContent = `${echo.pseudo}: ${echo.content}`;
      container.appendChild(div);
    });
  }
}

window.onload = loadEchos;
