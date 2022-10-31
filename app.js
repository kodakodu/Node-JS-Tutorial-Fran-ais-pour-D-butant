const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello Express');
});
app.get('/api/pokemons/:id', (req, res) => {
  const id = req.params.id;
  res.send(`Vous aves demandé le pokemon n°${id}`);
});
console.log('Hello !');

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

