const express = require('express');
const { success, notsuccess } = require('./helper');
let pokemons = require('./mock-pokemon.js');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello Express');
});
app.get('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);

  if (pokemon == null) {
    const message = 'Aucun pokémon a été trouvé !';
    res.json(notsuccess(message));
  } else {
    const message = 'Un pokémon a bien été trouvé';
    res.json(success(message, pokemon));
  }
});

app.get('/api/pokemons', (req, res) => {
  const message = 'La liste des pokémons a bien été recupérée';
  //const pokemons = pokemons;

  res.json(success(message, pokemons));
});
//console.log('Hello !');

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

