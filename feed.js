
import { supabase } from './supabaseClient.js';

async function publishEcho() {
  const textarea = document.getElementById("new-echo");
  const content = textarea.value.trim();
  if (!content) return;

  const pseudo = localStorage.getItem("pseudo") || "Anonyme";
  const { data, error } = await supabase.from("echos").insert([{ content, pseudo }]);

  if (!error) {
    textarea.value = "";
    loadFeed();
  }
}

async function loadFeed() {
  const container = document.getElementById("feed-container");
  container.innerHTML = "Chargement...";
  const { data, error } = await supabase.from("echos").select("*").order("created_at", { ascending: false });
  if (error) {
    container.innerHTML = "Erreur de chargement.";
    return;
  }

  container.innerHTML = "";
  data.forEach(echo => {
    const div = document.createElement("div");
    div.className = "echo-item";
    div.innerHTML = `<strong>${echo.pseudo}</strong><p>${echo.content}</p>`;
    container.appendChild(div);
  });
}

window.publishEcho = publishEcho;
window.onload = loadFeed;
