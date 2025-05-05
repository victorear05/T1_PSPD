const express = require('express');
const app = express();
const grpcClient = require('./grpcClient');
const grpcClientPagamento = require('./grpcClientPagamento');
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000', // ou a porta do seu frontend
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// Rota para listar todos os produtos
// Rota para listar todos os produtos
app.get('/produtos', (req, res) => {
  grpcClient.listarProdutos((error, produtos) => {
    if (error) {
      console.error('Detalhes do erro gRPC:', error);
      res.status(500).json({ 
        error: 'Erro ao listar produtos',
        details: error.details || error.message 
      });
    } else {
      console.log('Produtos recebidos:', produtos); // Adicione este log
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
  
  console.log('Recebida requisição para /comprar:', { produto_id, quantidade }); // Log de debug

  if (!produto_id || !quantidade) {
    return res.status(400).json({ error: 'produto_id e quantidade são obrigatórios' });
  }

  grpcClientPagamento.calcularDesconto(produto_id, quantidade, (err, response) => {
    if (err) {
      console.error('Erro no serviço de pagamento:', {
        message: err.message,
        code: err.code,
        details: err.details
      });
      return res.status(500).json({ 
        error: 'Erro ao calcular desconto',
        details: err.details || err.message 
      });
    }
    console.log('Resposta do serviço de pagamento:', response);
    res.json({
      preco_total: response.preco_total,
      desconto: response.desconto,
      preco_final: response.preco_final,
      mensagem: "Desconto calculado com sucesso"
    });
  });
});

app.post('/frete', (req, res) => {
  const { cep } = req.body;
  
  console.log('Recebida requisição para /frete:', { cep }); // Log de debug

  if (!cep) {
    return res.status(400).json({ error: 'CEP é obrigatório' });
  }

  grpcClientPagamento.calcularFrete(cep, (err, response) => {
    if (err) {
      console.error('Erro no serviço de frete:', {
        message: err.message,
        code: err.code,
        details: err.details
      });
      return res.status(500).json({ 
        error: 'Erro ao calcular frete',
        details: err.details || err.message 
      });
    }
    console.log('Resposta do serviço de frete:', response);
    res.json({
      valor_frete: response.valor_frete,
      mensagem: "Frete calculado com sucesso"
    });
  });
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API Gateway rodando na porta ${PORT}`);
});
