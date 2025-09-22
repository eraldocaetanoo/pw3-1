const express = require('express');
const sequelize = require('./config/database.js');
const User = require('./models/User.js');
const Produto = require('./models/Produto.js');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.post('/', (req, res) => {
 const requestBody = req.body;
  console.log('nome recebido', requestBody.nome);
  console.log('email recebido', requestBody.email);
  
  const user = new User({
    name: requestBody.nome,
    email: requestBody.email,
    nota: requestBody.nota
  });


  user.save().then(()=>{
    res.status(201).json({ message: "Usuário criado com sucesso!" })
  }).catch((err)=>{
    res.status(500).json({ message: err.message })
  });
  //res.send(`Hello World! post with body: ${JSON.stringify(requestBody)}`);
});

// Start the server
const PORT = process.env.PORT || 3000;
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
        console.log(`Banco de dados SQLite sincronizado`);
    });
}).catch(err => {
    console.error('Erro ao sincronizar banco de dados:', err);
});