const Sequelize = require('sequelize');
const db = require('../dao/db.js');

const Funcionario = db.define(
    'Funcionario',{
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
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        senha: {
            type: Sequelize.STRING,
            allowNull: false
        }
});

//COMANDO PARA CRIAR A TABELA NO BANCO DE DADOS
Funcionario.sync();

//VERIFICA SE TEM ALGUMA ALTERAÇÃO NA TABELA PARA INSERIR OS NOVOS CAMPOS
//Funcionario.sync({alter: true});
module.exports = Funcionario;