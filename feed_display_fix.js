
import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = 'https://owanovbzavmcsrfqafyo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93YW5vdmJ6YXZtY3NyZnFhZnlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MTcxNjMsImV4cCI6MjA2Nzk5MzE2M30.bX1ExfagBFKf706SEsl97GQBw94JzeRoS5R3F9Ni26U'
const supabase = createClient(supabaseUrl, supabaseKey)

async function loadEchos() {
    const { data, error } = await supabase
        .from('echos')
        .select('*')
        .order('created_at', { ascending: false })

    const feed = document.getElementById('feed')
    if (error) {
        feed.innerHTML = '<p>Erreur de chargement : ' + error.message + '</p>'
        return
    }

    if (!data || data.length === 0) {
        feed.innerHTML = '<p>Aucun écho pour le moment.</p>'
        return
    }

    feed.innerHTML = ''
    data.forEach((echo) => {
        const div = document.createElement('div')
        div.className = 'echo'
        div.innerHTML = `<strong>${echo.pseudo}</strong> — <em>${new Date(echo.created_at).toLocaleString()}</em><p>${echo.content}</p>`
        feed.appendChild(div)
    })
}

document.addEventListener('DOMContentLoaded', loadEchos)
