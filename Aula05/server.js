const express = require('express');
const sequelize = require('./config/database.js');
const User = require('./models/User.js');
const Cliente = require('./models/Cliente.js');
const Produto = require('./models/Produto.js');
const Venda = require("./models/Venda.js")
const ItemVenda = require("./models/ItemVenda.js")

Venda.belongsTo(User, { foreignKey: 'idUser' });
Venda.belongsTo(Cliente, { foreignKey: 'idCliente' });
Venda.hasMany(ItemVenda, { foreignKey: 'idVenda' });
ItemVenda.belongsTo(Venda, { foreignKey: 'idVenda' });
ItemVenda.belongsTo(Produto, { foreignKey: 'idProduto' });

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/v1/users',   async (req, res)  => {
  const allUser =  await User.findAll();
  res.status(200).json({users:allUser})

});

app.get('/v1/vendas/:id',   async (req, res)  => {
  const allUser =  await Venda.findByPk(req.params.id, {
    include: [
      { model: User, attributes: ['id', 'name', 'email'] },
      { model: Cliente, attributes: ['id', 'name', 'email', 'endereco'] },
      { model: ItemVenda, include: [{ model: Produto, attributes: ['id', 'name', 'preco','estoqueMinimo'] }] }
    ]
  });
  res.status(200).json({venda:allUser})
});

app.get('/v1/users/:id',   async (req, res)  => {
  const { id } = req.params
  console.log(id);
  const allUser =  await User.findByPk(id);
  if (allUser) { 
    res.status(200).json(allUser)
  } else{
  res.status(404).json({"msg":"Usuário não encontrado"})
  }
});

app.delete('/v1/users/:id',   async (req, res)  => {
  const { id } = req.params
  console.log(id);
  const allUser =  await User.findByPk(id);
  if (allUser) { 
    allUser.destroy();
    res.status(204).json({"msg":"Usuário apagado com sucesso!"})
  } else{
  res.status(404).json({"msg":"Usuário não encontrado"})
  }
});


app.put('/v1/users/:id',   async (req, res)  => {
  const { id } = req.params
  const requestBody = req.body; 
  console.log(id);
  var allUser =  await User.findByPk(id);

  if (allUser) { 
   allUser.name = requestBody.name;
   allUser.email = requestBody.email;
   allUser.endereco = requestBody.endereco;
   allUser.password = requestBody.password;

    allUser.save();
    res.status(201).json({"user":allUser})
  } else{
  res.status(404).json({"msg":"Usuário não encontrado"})
  }
});


app.post('/v1/user', (req, res) => {
 const requestBody = req.body;
  console.log('nome recebido', requestBody.name);
  console.log('email recebido', requestBody.email);
  
  const user = new User({
    name: requestBody.name,
    email: requestBody.email,
    password: requestBody.password,
    endereco:requestBody.endereco
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