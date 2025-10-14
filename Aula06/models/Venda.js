const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Venda = sequelize.define('Venda', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    idUser: {
        type: DataTypes.INTEGER,
        references: {
      model: 'Users', // Table name of the referenced model
      key: 'id', // Primary key of the referenced model
    },
        allowNull: false
    },

     idCliente: {
        type: DataTypes.INTEGER,
        references: {
      model: 'Clientes', // Table name of the referenced model
      key: 'id', // Primary key of the referenced model
    },

        allowNull: false
    },
    
    }, {
    timestamps: true // Cria campos createdAt e updatedAt automaticamente
});

// Sincronizar o modelo com o banco de dados
// Sincronizar o modelo com o banco de dados
(async () => {
    await Venda.sync();
    console.log('Modelo User sincronizado com o banco de dados.');
})();

module.exports = Venda;