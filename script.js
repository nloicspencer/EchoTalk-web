const supabaseUrl = 'https://owanovbzavmcsrfqafyo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93YW5vdmJ6YXZtY3NyZnFhZnlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MTcxNjMsImV4cCI6MjA2Nzk5MzE2M30.bX1ExfagBFKf706SEsl97GQBw94JzeRoS5R3F9Ni26U';

const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function publishEcho() {
    const content = document.getElementById('echoInput').value.trim();
    const pseudo = 'anonyme';  // À améliorer avec le système de pseudo plus tard
    if (!content) return;

    const { data, error } = await _supabase.from('echos').insert([
        { content, pseudo }
    ]);

    const notification = document.getElementById('notification');
    if (error) {
        notification.textContent = 'Erreur lors de la publication.';
        notification.style.color = 'red';
    } else {
        notification.textContent = 'Écho publié avec succès !';
        notification.style.color = 'green';
        document.getElementById('echoInput').value = '';
        loadEchos();
    }
}

async function loadEchos() {
    const { data, error } = await _supabase
        .from('echos')
        .select('*')
        .order('created_at', { ascending: false });

    const feed = document.getElementById('echoFeed');
    if (error || !data || data.length === 0) {
        feed.textContent = 'Aucun écho pour le moment.';
        return;
    }

    feed.innerHTML = '';
    data.forEach(echo => {
        const div = document.createElement('div');
        div.textContent = `${echo.pseudo} : ${echo.content}`;
        feed.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', loadEchos);
