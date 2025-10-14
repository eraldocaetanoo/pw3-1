const User = require('../models/User.js');
const Sequelize = require('sequelize');

module.exports = class UserController {
    // Listar todos os usuários
    static async listAll(req, res) {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar usuários' });
        }
    }

    static async getById(req, res) {
        const { id } = req.params;
        try {
            const user = await User.findByPk(id);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'Usuário não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuário' });
        }
    }

     static async delete(req, res) {
        const { id } = req.params;
        try {
            const user = await User.findByPk(id);
            if (user) {
                await user.destroy();
                res.status(204).json({ message: 'Usuário apagado com sucesso!' });
            } else {
                res.status(404).json({ error: 'Usuário não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuário' });
        }
    }

     static async update(req, res) {
        const { id } = req.params;
        try {
            const allUser = await User.findByPk(id);
            if (allUser) {
                const { name, email, password, endereco } = req.body;
                allUser.name = name;
                allUser.email = email;
                allUser.endereco = endereco;
                allUser.password = password;
                await allUser.save();
                res.status(200).json(allUser);
            } else {
                res.status(404).json({ error: 'Usuário não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar usuário' });
        }
    }

    static async create(req, res) {
        const { name, email, password, endereco } = req.body;
        try {
            const newUser = await User.create({ name, email, password, endereco });
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar usuário' });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ where: { email, password } });
            if (user) {
                res.status(200).json({ message: 'Login bem-sucedido', user });
            } else {
                res.status(401).json({ error: 'Credenciais inválidas' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao processar login' });
        }   
    }  

    // Outros métodos como create, update, delete podem ser adicionados aqui    
}   
