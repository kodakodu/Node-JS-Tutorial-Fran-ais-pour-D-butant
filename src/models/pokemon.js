const validTypes = [
  'Plante',
  'Poisson',
  'Feu',
  'Eau',
  'Insecte',
  'Vol',
  'Normal',
  'Electrik',
  'Fée',
];
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Pokemon',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Le nom est dejà pris.',
        },
        validate: {
          notNull: { msg: 'Le nom est une propriété requise.' },
          notEmpty: { msg: 'Le nom ne peut pas être vide.' },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Utilisez uniquement des nombres entiers pour les points de vie.',
          },
          max: {
            args: [999],
            msg: 'Maximun de HP à 999',
          },
          min: {
            args: [0],
            msg: 'Minimum de HP à 0',
          },
          notNull: { msg: 'Les points de vie sont une propriété requise.' },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Uniquement des nombres entiers pour les points de combat.',
          },
          max: {
            args: [99],
            msg: 'Maximun de CP à 99',
          },
          min: {
            args: [0],
            msg: 'Minimum de CP à 0',
          },
          notNull: { msg: 'Les points de combat sont une propriété requise.' },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: 'Picture doit être une url valide.' },
          notNull: { msg: 'Picture est une propriété requise.' },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('types').split();
        },
        set(types) {
          this.setDataValue('types', types.join());
        },
        validate: {
          isTypesValid(value) {
            if (!value) {
              throw new Error('Un pokemon doit au moins avoir un type');
            }
            if (value.split(',').length > 3) {
              throw new Error(
                'Un pokemon ne peux pas avoir plus de trois types.'
              );
            }
            value.split(',').forEach((type) => {
              if (!validTypes.includes(type)) {
                throw new Error(
                  `Le type d'un pokemon doit appartenir à la liste suivante: ${validTypes}`
                );
              }
            });
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false,
    }
  );
};
