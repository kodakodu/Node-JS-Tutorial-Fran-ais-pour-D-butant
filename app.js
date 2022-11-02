const express = require('express');
const morgan = require('morgan');
const { success, notsuccess } = require('./helper');
const favicon = require('serve-favicon');
let pokemons = require('./mock-pokemon.js');
const app = express();

const port = 3000;

app.use(favicon(__dirname + '/favicon.ico')).use(morgan('dev'));

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
  res.json(success(message, pokemons));
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

