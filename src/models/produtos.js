const Sequelize = require('sequelize');
const db = require('../dao/db');

const Produtos = db.define(
    'Produtos',{
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },
        categoria: {
            type: Sequelize.STRING,
            allowNull: false
        },
        quantidade: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        preco: {
            type: Sequelize.FLOAT,
            allowNull: false
        }
});

//COMANDO PARA CRIAR A TABELA NO BANCO DE DADOS
Produtos.sync();

//VERIFICA SE TEM ALGUMA ALTERAÇÃO NA TABELA PARA INSERIR OS NOVOS CAMPOS
//Produtos.sync({alter: true});
module.exports = Produtos;