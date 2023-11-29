const express = require("express");
const router = express.Router();
const path = require("path");
const bodyParser = require("body-parser");
const session = require("./session");

const app = express();
const db = require('./db');

app.use(express.json());
app.use(session);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()); //novo 
app.use(db);
//  app.use(router);

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname,"../paginas","login.html"));
});








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
