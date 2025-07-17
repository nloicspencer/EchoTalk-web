
// Fichier JS avec debug visuel sur la page
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://owanovbzavmcsrfqafyo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93YW5vdmJ6YXZtY3NyZnFhZnlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MTcxNjMsImV4cCI6MjA2Nzk5MzE2M30.bX1ExfagBFKf706SEsl97GQBw94JzeRoS5R3F9Ni26U';

const supabase = createClient(supabaseUrl, supabaseKey);

const pseudo = document.getElementById('pseudo')?.textContent || 'Anonyme';

document.getElementById('echo-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const content = document.getElementById('echo-content').value;

    const debugBox = document.createElement('div');
    debugBox.style.padding = '10px';
    debugBox.style.marginTop = '15px';
    debugBox.style.backgroundColor = '#f0f0f0';
    debugBox.style.border = '1px solid #ccc';

    document.body.appendChild(debugBox);

    if (!content) {
        debugBox.textContent = '⚠️ Aucun contenu saisi.';
        return;
    }

    try {
        const { data, error } = await supabase.from('echos').insert([{ pseudo, content }]);
        if (error) {
            debugBox.textContent = '❌ Erreur Supabase : ' + error.message;
        } else {
            debugBox.textContent = '✅ Écho publié avec succès : ' + JSON.stringify(data);
            document.getElementById('echo-content').value = '';
        }
    } catch (err) {
        debugBox.textContent = '❌ Exception JS : ' + err.message;
    }
});
