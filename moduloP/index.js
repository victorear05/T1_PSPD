const express = require('express');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());

// Carregando os .proto
const estoqueProtoPath = path.join(__dirname, '../proto/estoque.proto');
const pagamentoProtoPath = path.join(__dirname, '../proto/pagamento.proto');

const estoquePackageDef = protoLoader.loadSync(estoqueProtoPath, {});
const pagamentoPackageDef = protoLoader.loadSync(pagamentoProtoPath, {});

const estoqueProto = grpc.loadPackageDefinition(estoquePackageDef).estoque;
const pagamentoProto = grpc.loadPackageDefinition(pagamentoPackageDef).pagamento;

// Clientes gRPC
const estoqueClient = new estoqueProto.EstoqueService(
  'moduloa:50051', grpc.credentials.createInsecure()
);
const pagamentoClient = new pagamentoProto.PagamentoService(
  'modulob:50052', grpc.credentials.createInsecure()
);

// Endpoint HTTP para simular compra
app.post('/comprar', (req, res) => {
  const { produto_id, quantidade, metodo_pagamento } = req.body;

  estoqueClient.VerificarDisponibilidade({ produto_id, quantidade }, (err, estoqueRes) => {
    console.log("Resposta Estoque:", { err, estoqueRes });
    if (err || !estoqueRes.disponivel) {
      return res.status(400).json({ erro: estoqueRes?.mensagem || 'Erro no estoque' });
    }

    pagamentoClient.ProcessarPagamento({
      pedido_id: produto_id,
      valor: 50.00, // valor fixo só para teste
      metodo: metodo_pagamento
    }, (err, pagRes) => {
      if (err || !pagRes.sucesso) {
        return res.status(400).json({ erro: pagRes?.mensagem || 'Erro no pagamento' });
      }

      res.json({ mensagem: 'Compra realizada com sucesso!' });
    });
  });
});

// Iniciar servidor HTTP
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API Gateway rodando em http://localhost:${PORT}`);
});
