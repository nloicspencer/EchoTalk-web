
import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = 'https://owanovbzavmcsrfqafyo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93YW5vdmJ6YXZtY3NyZnFhZnlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MTcxNjMsImV4cCI6MjA2Nzk5MzE2M30.bX1ExfagBFKf706SEsl97GQBw94JzeRoS5R3F9Ni26U'
const supabase = createClient(supabaseUrl, supabaseKey)

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('echo-form')
  const messageInput = document.getElementById('message')
  const notification = document.getElementById('notification')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const content = messageInput.value.trim()
    if (!content) {
      notification.textContent = '⛔ Le message est vide.'
      return
    }

    // Générer un pseudo aléatoire local (exemple fixe ici)
    const pseudo = 'Anonyme_' + Math.floor(Math.random() * 1000)

    const { error } = await supabase.from('echos').insert([
      { pseudo: pseudo, content: content }
    ])

    if (error) {
      console.error(error)
      notification.textContent = '❌ Erreur lors de la publication.'
    } else {
      notification.textContent = '✅ Écho publié avec succès.'
      messageInput.value = ''
    }
  })
})
