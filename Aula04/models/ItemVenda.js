const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ItemVenda = sequelize.define('iten_vendas', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    idVenda: {
        type: DataTypes.INTEGER,
        allowNull:false
    },

    idProduto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
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