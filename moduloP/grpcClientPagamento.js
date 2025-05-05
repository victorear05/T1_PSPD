const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, '../proto/pagamento.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const pagamentoProto = grpc.loadPackageDefinition(packageDefinition).pagamento;

const client = new pagamentoProto.PagamentoService(
  'http://192.168.100.12:5002',
  grpc.credentials.createInsecure()
);

function calcularDesconto(valor, quantidade, callback) {
  client.CalcularDesconto({ valor, quantidade }, callback);
}

function calcularFrete(cep, callback) {
  client.CalcularFrete({ cep }, callback);
}

module.exports = {
  calcularDesconto,
  calcularFrete,
};
