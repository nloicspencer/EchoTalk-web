
import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = 'https://owanovbzavmcsrfqafyo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93YW5vdmJ6YXZtY3NyZnFhZnlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MTcxNjMsImV4cCI6MjA2Nzk5MzE2M30.bX1ExfagBFKf706SEsl97GQBw94JzeRoS5R3F9Ni26U'
const supabase = createClient(supabaseUrl, supabaseKey)

document.addEventListener('DOMContentLoaded', async () => {
  const feed = document.getElementById('feed')
  if (!feed) {
    alert('❌ Élément #feed introuvable dans le HTML.')
    return
  }

  const { data, error } = await supabase
    .from('echos')
    .select('pseudo, content, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Erreur lors du chargement des échos:', error.message)
    feed.innerHTML = '<p style="color: red;">Erreur de chargement des échos.</p>'
    return
  }

  if (!data || data.length === 0) {
    feed.innerHTML = '<p style="color: gray;">Aucun écho pour le moment.</p>'
    return
  }

  feed.innerHTML = ''
  data.forEach((echo) => {
    const div = document.createElement('div')
    div.style.marginBottom = '20px'
    div.style.padding = '10px'
    div.style.border = '1px solid #ccc'
    div.style.borderRadius = '6px'
    div.innerHTML = `
      <strong>${echo.pseudo}</strong><br>
      <small>${new Date(echo.created_at).toLocaleString('fr-FR')}</small>
      <p>${echo.content}</p>
    `
    feed.appendChild(div)
  })
})
