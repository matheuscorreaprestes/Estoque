const express = require("express");
//const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");
const session = require("../session");

const app = express();
const db = require('./dao/db');
app.use(session);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(db);

//app.use(router);

app.get('/adicionar', (req, res) => {
  res.sendFile(path.join(__dirname, '../paginas', 'add.html'));
});

// Rota para a página de realizar venda
app.get('/vender', (req, res) => {
  res.sendFile(path.join(__dirname, '../paginas', 'venda.html'));
});

// Rota para a página de consultar estoque
app.get('/consultar', (req, res) => {
  res.sendFile(path.join(__dirname, '../paginas', 'cons.html'));
});

// Rota para a página de definir preços
app.get('/precos', (req, res) => {
  res.sendFile(path.join(__dirname, '../paginas', 'geren.html'));
});


const UsuarioController = require('./controller/usuario_controller');
const ProdutoController = require('./controller/produto_controller');


app.set('views', path.join(__dirname, '../', 'paginas'));
app.set('view engine', 'ejs');

app.use(UsuarioController);
app.use(ProdutoController);






const paginasPath = path.join(__dirname,"../","paginas");
app.use("/paginas", express.static(paginasPath,{
    setHeaders:(res, path) => {
        console.log(path)
      if (path.endsWith(".css")){
        res.setHeader("Content-Type","text/css");
      }
    },
})); 

app.listen(5500, ()=>{
  console.log("Servidor Funcionou")
});
