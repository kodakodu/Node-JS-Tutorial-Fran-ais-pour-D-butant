const express = require('express');
let pokemons = require('./mock-pokemon.js');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello Express');
});
app.get('/api/pokemons/:id', (req, res) => {
  const id = req.params.id;
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  res.send(`Vous aves demandé le pokemon n°${id}`);
});
//console.log('Hello !');

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

