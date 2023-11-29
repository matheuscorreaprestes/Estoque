const Sequelize  = require("sequelize");

const sequelize = new Sequelize("teste","root", "C@t4t4u",{
    host: "localhost",
    dialect: "mysql"
})

sequelize.authenticate().then(function(){
    console.log("Servidor rodou")
}).catch(function(){
    console.log("não rodou");
})

module.exports = Sequelize;