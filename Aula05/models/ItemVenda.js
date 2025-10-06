const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ItemVenda = sequelize.define('ItemVenda', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    idVenda: {
        type: DataTypes.INTEGER,
        references:{
            model: 'Vendas',
            key: 'id',
        },
       allowNull: false
    },

    idProduto: {
        type: DataTypes.INTEGER,
        references: {
      model: 'Produtos', // Table name of the referenced model
      key: 'id', // Primary key of the referenced model
    },
      
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false},

    precoUnitario: {
        type: DataTypes.FLOAT,
        allowNull: false
    }   
    
    }, {
    timestamps: false // Cria campos createdAt e updatedAt automaticamente
});

// Sincronizar o modelo com o banco de dados
// Sincronizar o modelo com o banco de dados
(async () => {
    await ItemVenda.sync();
    console.log('Modelo User sincronizado com o banco de dados.');
})();

module.exports = ItemVenda;