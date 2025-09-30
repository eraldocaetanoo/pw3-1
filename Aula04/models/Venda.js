const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Venda = sequelize.define('vendas', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    }, {
    timestamps: false // Cria campos createdAt e updatedAt automaticamente
});

// Sincronizar o modelo com o banco de dados
// Sincronizar o modelo com o banco de dados
(async () => {
    await Venda.sync();
    console.log('Modelo User sincronizado com o banco de dados.');
})();

module.exports = Venda;