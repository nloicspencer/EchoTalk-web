
import { supabase } from './supabaseClient.js';

const birds = ['Aigle', 'Colibri', 'Héron', 'Albatros', 'Flamant', 'Canari', 'Pivert', 'Moineau', 'Autruche', 'Cigogne'];
const cities = ['Paris', 'Lyon', 'Dakar', 'Bamako', 'Abidjan', 'Tunis', 'Alger', 'Libreville', 'Casablanca', 'Ouagadougou'];

function generatePseudo() {
  const bird = birds[Math.floor(Math.random() * birds.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  return bird + city;
}

async function autoSignUp() {
  const pseudo = generatePseudo();

  const { data, error } = await supabase
    .from('users')
    .insert([{ pseudo: pseudo }]);

  if (error) {
    console.error('Erreur lors de la création du compte :', error.message);
  } else {
    document.body.innerHTML += `<p>Pseudo généré : <strong>${pseudo}</strong></p>`;
  }
}

autoSignUp();
