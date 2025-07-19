const SUPABASE_URL = "https://owanovbzavmcsrfqafyo.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93YW5vdmJ6YXZtY3NyZnFhZnlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MTcxNjMsImV4cCI6MjA2Nzk5MzE2M30.bX1ExfagBFKf706SEsl97GQBw94JzeRoS5R3F9Ni26U";

const headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": "Bearer " + SUPABASE_KEY,
    "Content-Type": "application/json"
};

async function postEcho() {
    const content = document.getElementById("echoInput").value.trim();
    const status = document.getElementById("statusMessage");

    if (!content) {
        status.textContent = "Le message est vide.";
        return;
    }

    const pseudo = "Anonyme" + Math.floor(Math.random() * 10000);

    const response = await fetch(`${SUPABASE_URL}/rest/v1/echos`, {
        method: "POST",
        headers,
        body: JSON.stringify({ pseudo: pseudo, content: content })
    });

    if (response.ok) {
        status.textContent = "Écho publié avec succès.";
        document.getElementById("echoInput").value = "";
        loadFeed();  // Recharger le flux
    } else {
        status.textContent = "Erreur lors de la publication.";
    }
}

async function loadFeed() {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/echos?select=*&order=created_at.desc`, {
        method: "GET",
        headers
    });

    const feed = document.getElementById("echoFeed");
    feed.innerHTML = "";

    if (response.ok) {
        const echos = await response.json();
        if (echos.length === 0) {
            feed.innerHTML = "<p>Aucun écho pour le moment.</p>";
        } else {
            echos.forEach(echo => {
                const div = document.createElement("div");
                div.className = "echo";
                div.innerHTML = `<strong>${echo.pseudo}</strong><p>${echo.content}</p>`;
                feed.appendChild(div);
            });
        }
    } else {
        feed.innerHTML = "<p>Erreur de chargement des échos.</p>";
    }
}

window.onload = loadFeed;