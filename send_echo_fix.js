
import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = 'https://owanovbzavmcsrfqafyo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93YW5vdmJ6YXZtY3NyZnFhZnlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MTcxNjMsImV4cCI6MjA2Nzk5MzE2M30.bX1ExfagBFKf706SEsl97GQBw94JzeRoS5R3F9Ni26U'
const supabase = createClient(supabaseUrl, supabaseKey)

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('echo-form')
  const input = document.getElementById('echo-input')
  const feedback = document.getElementById('feedback')

  if (!form || !input) {
    console.error("Form or input field not found.")
    return
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const content = input.value.trim()
    if (content === '') {
      alert('Le message est vide.')
      return
    }

    // Générer un pseudo aléatoire si non stocké
    let pseudo = localStorage.getItem('pseudo')
    if (!pseudo) {
      const oiseaux = ['pivert', 'hirondelle', 'corbeau', 'colibri', 'aigle']
      const villes = ['Paris', 'Dakar', 'Lyon', 'Bamako', 'Abidjan']
      pseudo = oiseaux[Math.floor(Math.random() * oiseaux.length)] + villes[Math.floor(Math.random() * villes.length)]
      localStorage.setItem('pseudo', pseudo)
    }

    const { error } = await supabase.from('echos').insert([{ pseudo, content }])

    if (error) {
      console.error('Erreur:', error.message)
      alert('Erreur lors de la publication.')
      return
    }

    input.value = ''
    if (feedback) {
      feedback.innerText = '✅ Écho publié !'
      setTimeout(() => {
        feedback.innerText = ''
      }, 3000)
    } else {
      alert('✅ Écho publié !')
    }
  })
})
