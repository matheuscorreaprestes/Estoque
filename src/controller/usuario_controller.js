const express = require("express");
const path = require("path");

const spawnSync = require('child_process');

const router = express.Router();
const conexao = require('../dao/db');
const Funcionario = require('../models/funcionario');

router.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "../../paginas", "login.html"));
});

router.post("/", async (req, res)=>{
    var campo_email = req.body.email;
    var campo_senha = req.body.senha;

    const funcionario = await Funcionario.findOne({
        attributes: ['id', 'nome', 'email', 'senha'],
        where: {
            email: campo_email
        }
    })

    if(funcionario === null){
        console.log("Usuário ou senha inválida");
        res.sendFile(path.join(__dirname, "../../paginas", "login.html"));
    }

    if((campo_email == funcionario.email) && (campo_senha == funcionario.senha)){
        req.session.funcionario = {
            id: funcionario.id,
            nome: funcionario.nome,
            email: funcionario.email
        }
        res.sendFile(path.join(__dirname, "../../paginas", "menu.html"));
    }else{
        console.log("Usuário ou senha inválida");
        res.sendFile(path.join(__dirname, "../../paginas", "login.html"));
    }
});

router.post("/realizarLoginAPI", async(req, res)=>{
    var email = req.body.email;
    var senha = req.body.senha;

    console.log(email);

    const funcionario = await Funcionario.findOne({
        attributes: ['id', 'nome', 'email', 'senha'],
        where: {
            email: email
        }
    })

    if(funcionario === null){
        return res.status(404).json({
            mensagem: "Usuário não localizado!"
        });
    }

    if(email == funcionario.email && senha == funcionario.senha){
        return res.status(200).json({
            funcionario
        });
    }else{
        return res.status(404).json({
            mensagem: "Usuário ou senha inválida!"
        });
    }
    
});

router.post("/cadastrarFuncionarioAPI", async (req, res)=>{
    await   Funcionario.create(req.body)
    .then(()=>{
       return res.json({
            erro: false,
            mensagem: "Usuário cadastrado com sucesso!"
       });
    }
    ).catch(()=>{
        return res.status(400).json({
            erro: true,
            mensagem: "Falha ao cadastrar usuário!"
       });
    });
});

router.post("/cadastrarFuncionario", async (req, res)=>{
    console.log(req.body);
    await   Funcionario.create(req.body)
    .then(()=>{
        document.getElementById("popup_cadastrar_funcionario").style.display = 'none';
        res.redirect('/');
    }).catch(()=>{
        res.sendFile(path.join(__dirname, "../../paginas", "login.html"));
    });
});

router.get("/menu", (req, res)=>{
    res.sendFile(path.join(__dirname, "../../paginas", "menu.html"));
});

router.get("/tabelaFuncionario", async (req, res)=>{
    const dados = await Funcionario.findAll();
    res.json(dados);
});

router.get("/editarFuncionario/:id", async (req, res) => {
    try {
        const funcionarioid = req.params.id;
        const funcionario = await Funcionario.findByPk(funcionarioid);

        const funcionarioSessao = req.session.funcionario;
        console.log(funcionarioSessao.nome);

        if (!funcionario) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado!",
            });
        }

        res.render('editarFuncionario', { funcionario });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensagem: "Erro interno do servidor",
        });
    }
});

router.post("/alterarFuncionario/:id", async (req, res) => {
    try {
        const funcionarioId = req.params.id;
        const funcionarioAtualizado = req.body;

        await Funcionario.update(funcionarioAtualizado, {
            where: { id: funcionarioId },
        });

        res.redirect("/menu");
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            erro: true,
            mensagem: "Falha ao alterar usuário!",
        });
    }
});




//PADRÃO SINGLETON
module.exports = router;