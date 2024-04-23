const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('examen', 'root', 'mysqlserver', {
  dialect: 'mysql',
  host: 'localhost',
});
const Classe = require('./classeModel')

const Examen = sequelize.define('examen', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titre: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  date_debut: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  date_fin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  heure: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  type_examen: {
    type: DataTypes.ENUM('synthese', 'controle'),
    allowNull: false,
  },
  duree: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_classe: {
    type: DataTypes.INTEGER, // Change to INTEGER for compatibility with the Classes table
    allowNull: false,
  },
});
Examen.belongsTo(Classe, { foreignKey: 'id_classe', as: 'Classes' });

module.exports = Examen;
