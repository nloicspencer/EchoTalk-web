const SUPABASE_URL = "https://owanovbzavmcsrfqafyo.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93YW5vdmJ6YXZtY3NyZnFhZnlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MTcxNjMsImV4cCI6MjA2Nzk5MzE2M30.bX1ExfagBFKf706SEsl97GQBw94JzeRoS5R3F9Ni26U";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.addEventListener("DOMContentLoaded", async () => {
  const form = document.getElementById("echo-form");
  const contentInput = document.getElementById("echo-content");
  const feedContainer = document.getElementById("feed-container");

  async function fetchEchos() {
    const { data, error } = await supabase
      .from("echos")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("Erreur chargement des échos :", error);
      return;
    }
    feedContainer.innerHTML = "";
    data.forEach((echo) => {
      const div = document.createElement("div");
      div.classList.add("echo");
      div.innerHTML = `<strong>${echo.pseudo}</strong><p>${echo.content}</p>`;
      feedContainer.appendChild(div);
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const content = contentInput.value.trim();
    if (!content) return;
    const pseudo = "Anonyme" + Math.floor(Math.random() * 1000);
    const { error } = await supabase.from("echos").insert([{ pseudo, content }]);
    if (error) {
      alert("Erreur de publication");
      return;
    }
    contentInput.value = "";
    fetchEchos();
  });

  fetchEchos();
});
