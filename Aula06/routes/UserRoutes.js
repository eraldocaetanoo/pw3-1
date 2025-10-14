const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Definir as rotas para usuários
router.get('/users', UserController.listAll);
router.get('/users/:id', UserController.getById);
router.post('/users', UserController.create);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);
router.get('/login', UserController.login);

module.exports = router;