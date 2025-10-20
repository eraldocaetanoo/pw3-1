const Cliente = require('../models/Cliente.js');
const ItemVenda = require('../models/ItemVenda.js');
const Produto = require('../models/Produto.js');
const User = require('../models/User.js');
const Venda = require('../models/Venda.js');
const Sequelize = require('sequelize');

module.exports = class VendaController {
    // Listar todas as vendas
    static async listAll(req, res) {
        try {
            const vendas = await Venda.findAll(
                {
                      include: [
                        { model: User, attributes: ['id', 'name', 'email'] },
                        { model: Cliente, attributes: ['id', 'name', 'email', 'endereco'] },
                        { model: ItemVenda, include: [{ model: Produto, attributes: ['id', 'name', 'preco','estoqueMinimo'] }] }
                        ]
                }
                   
            );
            res.status(200).json(vendas);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar vendas' });
        }
    }

    static async getById(req, res) {
        const { id } = req.params;
        try {
            const venda =  await Venda.findByPk(req.params.id, {
                        include: [
                        { model: User, attributes: ['id', 'name', 'email'] },
                        { model: Cliente, attributes: ['id', 'name', 'email', 'endereco'] },
                        { model: ItemVenda, include: [{ model: Produto, attributes: ['id', 'name', 'preco','estoqueMinimo'] }] }
                        ]
            });
            if (venda) {
                res.status(200).json(venda);
            } else {
                res.status(404).json({ error: 'Venda não encontrada' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Erro ao buscar venda' });
        }
    }

     static async delete(req, res) {
        const { id } = req.params;
        try {
            const venda = await Venda.findByPk(id);
            if (venda) {
                await venda.destroy();
                res.status(204).json({ message: 'Venda apagada com sucesso!' });
            } else {
                res.status(404).json({ error: 'Venda não encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar venda' });
        }
    }

     static async deleteItens(itens){
        if (itens?.length !== undefined) {
          for (let i = 0; i < itens.length; i++) {
            console.log(itens[i].id);
            var excl = await ItemVenda.findByPk(itens[i].id);
            await excl.destroy();
          }
        }
     }

     static async createItens(newVenda, itens){
         let itensOut =  []; 
            for (let i = 0; i < itens.length; i++) {
                let element = itens[i];
               const item = await ItemVenda.create({ 
                            idVenda: newVenda.id,
                            idProduto: element.idProduto, 
                            quantidade: element.quantidade, 
                            precoUnitario: element.precoUnitario 
                        });
                        itensOut.push(item)
            }
             
            return itensOut;

     }

     static async update(req, res) {
        const { id } = req.params;
        try {
            const allVenda = await Venda.findByPk(id,{include:[
                {   model: ItemVenda}
            ]
                
            });
            console.log(allVenda.ItemVendas);
           
            if (allVenda) {
                 const { idUser, idCliente, itens } = req.body;
                allVenda.idUser = idUser;
                allVenda.idCliente = idCliente;
                await allVenda.save();
                await VendaController.deleteItens(allVenda.ItemVendas);
                await VendaController.createItens(allVenda, itens);
                res.status(200).json(allVenda);
            } else {
                res.status(404).json({ error: 'Usuário não encontrado' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Erro ao buscar usuário' });
        }
    }

    static async create(req, res) {
        const { idUser, idCliente, itens } = req.body;
       
        try {
            const newVenda = await Venda.create({ idUser, idCliente });
            const itensOut = await VendaController.createItens(newVenda, itens);
            res.status(201).json(newVenda);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Erro ao criar newVenda' });
        }
    }

    

    // Outros métodos como create, update, delete podem ser adicionados aqui    
}   
