const Question = require('../models/questionModel');
const Examen = require('../models/examenModel');

// Créer une nouvelle question
const createQuestion = async (req, res) => {
  try {
    const { questions, id_examen } = req.body;
    if (!Array.isArray(questions) || !id_examen) {
      return res.status(400).json({ message: 'Format de requête invalide' });
    }

    const createdQuestions = await Promise.all(
      questions.map(async (question) => {
        const { titre, type, options, Reponse_correcte, points } = question;

        // Traiter les réponses correctes en fonction du type de question
        let processedCorrectAnswers = Reponse_correcte;
        if (type === 'choix_multiple') {
          processedCorrectAnswers = Reponse_correcte.join(',');
        } else if (type === 'vrai_faux' && typeof Reponse_correcte === 'boolean') {
          processedCorrectAnswers = Reponse_correcte.toString();
        }

        const newQuestion = await Question.create({
          titre,
          type,
          options,
          Reponse_correcte: processedCorrectAnswers,
          points,
          id_examen
        });
        return newQuestion;
      })
    );

    res.status(201).json(createdQuestions);
  } catch (error) {
    console.error('Erreur lors de la création des questions :', error);
    res.status(500).json({ message: 'Erreur lors de la création des questions' });
  }
};


// Obtenir toutes les questions
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.status(200).json(questions);
  } catch (error) {
    console.error('Erreur lors de l\'obtention des questions :', error);
    res.status(500).json({ message: 'Erreur lors de l\'obtention des questions' });
  }
};

// Obtenir une question par ID
const getQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findByPk(id);
    if (question) {
      res.status(200).json(question);
    } else {
      res.status(404).json({ message: 'Question non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de l\'obtention de la question par ID :', error);
    res.status(500).json({ message: 'Erreur lors de l\'obtention de la question par ID' });
  }
};

// Mettre à jour une question
const updateQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const { titre, type, options, Reponse_correcte, points, id_examen } = req.body;
    const updatedQuestion = await Question.update(
      { titre, type, options, Reponse_correcte, points, id_examen },
      { where: { id }, returning: true }
    );
    if (updatedQuestion[0] === 1) {
      res.status(200).json(updatedQuestion[1][0]);
    } else {
      res.status(404).json({ message: 'Question non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la question :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la question' });
  }
};

// Supprimer une question
const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRowCount = await Question.destroy({ where: { id } });
    if (deletedRowCount === 1) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Question non trouvée' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de la question :', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la question' });
  }
};

module.exports = { createQuestion, getAllQuestions, getQuestionById, updateQuestion, deleteQuestion };
