const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('examen', 'root', 'mysqlserver', {
    dialect: 'mysql',
    host: 'localhost',
  });

const Departement = sequelize.define('Departement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});
Departement.associate = (models) => {
  Departement.hasMany(models.Classe, {
    foreignKey: 'departementId',
    onDelete: 'CASCADE', // Supprimer les classes associées lorsque le département est supprimé (optionnel)
  });
};
module.exports = Departement;
