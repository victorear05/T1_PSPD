const express = require('express');
const app = express();
const grpcClientProduto = require('./grpcClientProduto');
const grpcClientPagamento = require('./grpcClientPagamento');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/produtos', (req, res) => {
  console.log("Requisição recebida na endpoint /produtos redirecionando para modulo A via grpc\n");
  grpcClientProduto.listarProdutos((error, produtos) => {
    if (error) {
      console.log(`Erro ao listar produtos: ${error}\n`);
      res.status(500).json({ error: 'Erro ao listar produtos' });
    } else {
      let message = "";
      for (let i=0;i<produtos.length;i++) {
        message += "{Id: " + produtos[i].Id;
        message += ", Name: " + produtos[i].Name;
        message += ", Category: " + produtos[i].Category;
        message += ", Price: " + produtos[i].Price;
        message += ", Stock_quantity: " + produtos[i].Stock_quantity;
        message += "}\n";
      }
      console.log(`Resposta recebida do modulo A:\n${message}\n`);
      res.json(produtos);
    }
  });
});

app.get('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  console.log(`Requisição recebida na endpoint /produtos/:${id} redirecionando para modulo A via grpc\n`);
  grpcClientProduto.obterProdutoPorId(id, (error, produto) => {
    if (error) {
      console.log(`Erro ao obter produto com ID: ${error}\n`);
      res.status(500).json({ error: `Erro ao obter produto com ID ${id}` });
    } else {
      let message = "";
      message += "{Id: " + produto.Id;
      message += ", Name: " + produto.Name;
      message += ", Category: " + produto.Category;
      message += ", Price: " + produto.Price;
      message += ", Quantidade em estoque: " + produto.Stock_quantity;
      message += "}\n";
      console.log(`Resposta recebida do modulo A:\n${message}\n`);
      res.json(produto);
    }
  });
});

app.post('/comprar', (req, res) => {
  const { valor, quantidade } = req.body;
  console.log(`Requisição recebida na endpoint /comprar com os parâmetros: {valor: ${valor}, quantidade: ${quantidade}} redirecionando para modulo B via grpc\n`);
  grpcClientPagamento.calcularDesconto(valor, quantidade, (err, response) => {
    if (err) {
      console.log(`Erro ao calcular desconto: ${err}\n`);
      res.status(500).json({ erro: 'Erro ao calcular desconto!' });
    } else {
      let message = "";
      message += "{Preço total: " + response.preco_total;
      message += ", Name: " + response.desconto;
      message += ", Stock_quantity: " + response.preco_final;
      message += "}";
      console.log(`Resposta recebida do modulo B:\n${message}\n`);
      res.json(response);
    }
    
  });
});

app.post('/frete', (req, res) => {
  const { cep } = req.body;
  console.log(`Requisição recebida na endpoint /frete com o CEP: ${cep} redirecionando para modulo B via grpc\n`);
  grpcClientPagamento.calcularFrete(cep, (err, response) => {
    if (err) {
      console.log(`Erro ao calcular frete: ${err}\n`);
      res.status(500).json({ erro: 'Erro ao calcular frete' });
    } else {
      console.log(`Resposta recebida do modulo B: ${response.valor_frete}\n`);
      res.json(response);
    }
  });
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API Gateway rodando na porta ${PORT}`);
});
