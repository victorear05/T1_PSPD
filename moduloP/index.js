const express = require('express');
const app = express();
const grpcClient = require('./grpcClient');
const grpcClientPagamento = require('./grpcClientPagamento');

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

app.post('/comprar', (req, res) => {
  const { produto_id, quantidade } = req.body;
  grpcClientPagamento.calcularDesconto(produto_id, quantidade, (err, response) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao calcular desconto' });
    }
    res.json(response);
  });
});

app.post('/frete', (req, res) => {
  const { cep } = req.body;
  grpcClientPagamento.calcularFrete(cep, (err, response) => {
    if (err) {
      return res.status(500).json({ erro: 'Erro ao calcular frete' });
    }
    res.json(response);
  });
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API Gateway rodando na porta ${PORT}`);
});
