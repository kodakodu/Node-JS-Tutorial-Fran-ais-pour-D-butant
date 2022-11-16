const { Pokemon } = require('../db/sequelize');

module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    try {
      Pokemon.findByPk(req.params.id)
        .then((pokemon) => {
          if (pokemon === null) {
            const message = `Le pokemon ndemandé n'existe pas. Réessayez avec un autre identifiant.`;
            return res.status(404).json({ message });
          }
          const message = 'Un pokémon a bien été trouvé.';
          res.json({ message, data: pokemon });
        })
        .catch((error) => {
          const message = `Le pokemon n'a pas été recupéré. Réessayez dans un instant.`;
          res.status(500).json({ message, data: error });
        });
    } catch (error) {}

  });
};
