
// Configuration Supabase (À personnaliser)
const SUPABASE_URL = "https://owanovbzavmcsrfqafyo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93YW5vdmJ6YXZtY3NyZnFhZnlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MTcxNjMsImV4cCI6MjA2Nzk5MzE2M30.bX1ExfagBFKf706SEsl97GQBw94JzeRoS5R3F9Ni26U";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Fonction pour publier un écho
async function publishEcho() {
    const pseudo = document.getElementById("pseudo").value.trim();
    const content = document.getElementById("content").value.trim();

    if (!pseudo || !content) {
        alert("Merci de remplir les deux champs.");
        return;
    }

    const { data, error } = await supabase
        .from("echos")
        .insert([{ pseudo: pseudo, content: content }]);

    if (error) {
        console.error("Erreur de publication :", error.message);
        alert("Erreur lors de la publication de l'écho.");
    } else {
        alert("Écho publié avec succès !");
        document.getElementById("content").value = "";
        fetchEchos();
    }
}

// Fonction pour afficher les échos
async function fetchEchos() {
    const { data, error } = await supabase
        .from("echos")
        .select("*")
        .order("created", { ascending: false });

    if (error) {
        console.error("Erreur de chargement :", error.message);
        return;
    }

    const feedContainer = document.getElementById("feed-container");
    feedContainer.innerHTML = "";

    if (data.length === 0) {
        feedContainer.innerHTML = "<p>Aucun écho pour le moment.</p>";
        return;
    }

    data.forEach((echo) => {
        const echoElement = document.createElement("div");
        echoElement.classList.add("echo");
        echoElement.innerHTML = `
            <p><strong>${echo.pseudo}</strong> <em>${new Date(echo.created).toLocaleString()}</em></p>
            <p>${echo.content}</p>
            <hr/>
        `;
        feedContainer.appendChild(echoElement);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    fetchEchos();
});
