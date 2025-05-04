const express = require('express');
const app = express();
const grpcClient = require('./grpcClient');

app.use(express.json());

// Rota para listar todos os produtos
app.get('/produtos', (req, res) => {
  grpcClient.listarProdutos((error, produtos) => {
    if (error) {
      res.status(500).json({ error: 'Erro ao listar produtos' });
    } else {
      res.json(produtos);
    }
  });
});

// Rota para obter um produto por ID
app.get('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  grpcClient.obterProdutoPorId(id, (error, produto) => {
    if (error) {
      res.status(500).json({ error: `Erro ao obter produto com ID ${id}` });
    } else {
      res.json(produto);
    }
  });
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API Gateway rodando na porta ${PORT}`);
});
