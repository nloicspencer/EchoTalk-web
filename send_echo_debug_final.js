
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://owanovbzavmcsrfqafyo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93YW5vdmJ6YXZtY3NyZnFhZnlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MTcxNjMsImV4cCI6MjA2Nzk5MzE2M30.bX1ExfagBFKf706SEsl97GQBw94JzeRoS5R3F9Ni26U'
const supabase = createClient(supabaseUrl, supabaseKey)

document.getElementById('echo-form').addEventListener('submit', async (e) => {
  e.preventDefault()

  const content = document.getElementById('echo-content').value
  const pseudo = document.getElementById('pseudo').innerText

  if (!content.trim()) {
    alert('Le message est vide.')
    return
  }

  try {
    const { data, error } = await supabase
      .from('echos')
      .insert([{ content, pseudo }])

    if (error) {
      console.error('Erreur lors de l'envoi :', error)
      alert('Erreur : ' + error.message)
    } else {
      console.log('Écho publié :', data)
      alert('Écho publié avec succès !')
      document.getElementById('echo-content').value = ''
    }
  } catch (err) {
    console.error('Erreur JS :', err)
    alert('Erreur inattendue.')
  }
})
