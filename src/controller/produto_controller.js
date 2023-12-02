const express = require('express');
const router = express.Router();
const Produtos = require('../models/produtos');

router.post('/adicionar-produto', async (req, res) => {
    try {
      const { produto, categoria, quantidade, preco } = req.body;
  
      // Adicione os dados ao banco de dados usando o modelo Produtos
      const novoProduto = await Produtos.create({
        nome: produto,
        categoria: categoria,
        quantidade: quantidade,
        preco: preco,
      });
  
      // Em vez de redirecionar, envie uma resposta JSON
      res.status(201).json({ message: 'Produto adicionado com sucesso!', produto: novoProduto });
    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
      res.status(500).json({ error: 'Erro ao adicionar produto' });
    }
  });
  




router.get('/api/produtos', async (req, res) => {
    try {
      const produtos = await Produtos.findAll();
      res.json(produtos);
    } catch (error) {
      console.error('Erro ao obter produtos:', error);
      res.status(500).json({ error: 'Erro ao obter produtos' });
    }
  });


router.get('/preco/:id', async (req, res) => {
    try {
      const produtoId = req.params.id;
      const produto = await Produtos.findByPk(produtoId, { attributes: ['preco'] });
  
      if (!produto) {
        res.status(404).json({ error: 'Produto não encontrado' });
        return;
      }
  
      res.json({ preco: produto.preco });
    } catch (error) {
      console.error('Erro ao obter preço do produto:', error);
      res.status(500).json({ error: 'Erro ao obter preço do produto' });
    }
  });


  // produto_controller.js

  router.post('/vender-produto', async (req, res) => {
    try {
      const { produto, quantidade } = req.body;
  
      // Busque o produto no banco de dados
      const produtoExistente = await Produtos.findOne({
        where: {
          nome: produto,
        },
      });
  
      if (!produtoExistente) {
        res.status(404).json({ error: 'Produto não encontrado' });
        return;
      }
  
      // Verifique se há quantidade suficiente para vender
      if (produtoExistente.quantidade < quantidade) {
        res.status(400).json({ error: 'Quantidade insuficiente para venda' });
        return;
      }
  
      // Atualize a quantidade no banco de dados
      await produtoExistente.update({
        quantidade: produtoExistente.quantidade - quantidade,
      });
  
      // Se a quantidade for igual a zero, exclua o produto
      if (produtoExistente.quantidade === 0) {
        await produtoExistente.destroy();
      }
  
      res.status(200).json({ message: 'Venda realizada com sucesso!' });
    } catch (error) {
      console.error('Erro ao vender produto:', error);
      res.status(500).json({ error: 'Erro ao vender produto' });
    }
  });


  // produto_controller.js

router.get('/consultar-produtos', async (req, res) => {
    try {
      // Consulta todos os produtos no banco de dados
      const produtos = await Produtos.findAll();
  
      res.json(produtos);
    } catch (error) {
      console.error('Erro ao consultar produtos:', error);
      res.status(500).json({ error: 'Erro ao consultar produtos' });
    }
  });
  
  // Adicione isso ao seu produto_controller.js
router.post('/atualizar-preco', async (req, res) => {
    try {
        const { nomeProduto, novoPreco } = req.body;

        // Lógica para atualizar o preço no banco de dados usando o modelo Produtos
        const produtoAtualizado = await Produtos.update(
            { preco: novoPreco },
            { where: { nome: nomeProduto } }
        );

        if (produtoAtualizado > 0) {
            res.status(200).json({ message: 'Preço atualizado com sucesso!' });
        } else {
            res.status(404).json({ error: 'Produto não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao atualizar preço:', error);
        res.status(500).json({ error: 'Erro ao atualizar preço' });
    }
});




  

// Adicione outras rotas e lógicas relacionadas a produtos conforme necessário

module.exports = router;
