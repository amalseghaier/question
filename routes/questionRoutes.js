const express = require('express');
const router = express.Router();
const { createQuestion, getAllQuestions, getQuestionById, updateQuestion, deleteQuestion} = require('../controllers/questionController');

// Create a new question
router.post('/question', createQuestion);

// Get all questions
router.get('/', getAllQuestions);
// Get question by ID
router.get('/:id', getQuestionById);

// Update question
router.put('/:id', updateQuestion);

// Delete question
router.delete('/:id', deleteQuestion);

module.exports = router;
