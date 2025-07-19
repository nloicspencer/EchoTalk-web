
const supabaseUrl = 'https://owanovbzavmcsrfqafyo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93YW5vdmJ6YXZtY3NyZnFhZnlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MTcxNjMsImV4cCI6MjA2Nzk5MzE2M30.bX1ExfagBFKf706SEsl97GQBw94JzeRoS5R3F9Ni26U';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById("echoForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const content = document.getElementById("echoInput").value.trim();
    if (!content) return;

    const pseudo = localStorage.getItem("pseudo") || `Anonyme-${Math.floor(Math.random() * 1000)}`;

    const { data, error } = await supabase.from("echos").insert([{ content, pseudo }]);

    const status = document.getElementById("statusMessage");
    if (error) {
        status.textContent = "Erreur lors de la publication.";
    } else {
        status.textContent = "Écho publié avec succès.";
        document.getElementById("echoInput").value = "";
        fetchFeed();
    }
});

async function fetchFeed() {
    const { data, error } = await supabase.from("echos").select("*").order("created_at", { ascending: false });
    const feed = document.getElementById("feed");
    feed.innerHTML = "";
    if (data && data.length > 0) {
        data.forEach(echo => {
            const div = document.createElement("div");
            div.className = "echo";
            div.innerHTML = `<strong>${echo.pseudo}</strong><p>${echo.content}</p>`;
            feed.appendChild(div);
        });
    } else {
        feed.innerHTML = "<p>Aucun écho pour le moment.</p>";
    }
}

fetchFeed();
