const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Caminho para o arquivo .proto
const PROTO_PATH = path.join(__dirname, '../', 'proto', 'produto.proto');

// Carrega o arquivo .proto
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true, // mantém camelCase/underline dos campos como estão
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// Carrega o pacote correto do proto: "product"
const productProto = grpc.loadPackageDefinition(packageDefinition).product;

// Cria o cliente gRPC
const client = new productProto.ProductService(
  'localhost:5000',
  grpc.credentials.createInsecure()
);

// Função para listar produtos
function listarProdutos(callback) {
  client.ListProducts({}, (error, response) => {
    if (error) {
      console.error('Erro ao listar produtos:', error);
      callback(error, null);
    } else {
      callback(null, response.products); // usa o nome correto no response
    }
  });
}

// Função para obter produto por ID
function obterProdutoPorId(id, callback) {
  client.GetProductById({ Id: id }, (error, response) => {
    if (error) {
      console.error(`Erro ao obter produto com ID ${id}:`, error);
      callback(error, null);
    } else {
      callback(null, response);
    }
  });
}

module.exports = {
  listarProdutos,
  obterProdutoPorId,
};
