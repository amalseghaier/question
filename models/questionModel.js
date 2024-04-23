
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('examen', 'root', 'mysqlserver', {
  dialect: 'mysql',
  host: 'localhost',
});

const Examen  = require('./examenModel')
const Question = sequelize.define('questions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titre: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('choix_unique', 'choix_multiple', 'vrai_faux'),
    allowNull: false,
  },
  options: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  Reponse_correcte: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_examen: { // Foreign key referencing the Exam model
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Examen,
      key: 'id', // Assuming 'id' is the primary key of the Exam model
    },
  },
});

// Define the association
Question.belongsTo(Examen , { foreignKey: 'id_examen' , as:'Examen'});


module.exports = Question;
