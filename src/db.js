const Sequelize  = require("sequelize");

const sequelize = new Sequelize("estoque","root", "C@t4t4u",{
    host: "localhost",
    dialect: "mysql"
})

sequelize.authenticate().then(function(){
    console.log("Conexão Pocando!!!")
}).catch(function(){
    console.log("Não Pocou :(");
})

module.exports = Sequelize;