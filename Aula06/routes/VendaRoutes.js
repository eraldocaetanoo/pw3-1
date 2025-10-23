const express = require('express');
const router = express.Router();
const VendaController = require('../controllers/VendaController');

// Definir as rotas para usuários
router.get('/vendas', VendaController.listAll);
router.get('/vendas/:id', VendaController.getById);
router.post('/vendas', VendaController.create);
router.put('/vendas/:id', VendaController.update);
router.delete('/vendas/:id', VendaController.delete);


module.exports = router;