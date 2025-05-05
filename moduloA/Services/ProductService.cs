using Grpc.Core;
using GrpcServerA;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GrpcServerA.Services
{
    public class ProductServiceImpl : ProductService.ProductServiceBase
    {
        private readonly List<Product> _products = new()
        {
            new Product { Id = "1", Name = "Notebook Dell G15", Category = "Eletrônicos", Price = 3500.0f, StockQuantity = 10 },
            new Product { Id = "2", Name = "Cadeira Gamer Husky", Category = "Móveis", Price = 900.0f, StockQuantity = 5 },
            new Product { Id = "3", Name = "IPhone 15 Pro Max", Category = "SmartPhone", Price = 7000.0f, StockQuantity = 4 },
            new Product { Id = "4", Name = "Microondas Philco", Category = "Eletrodomésticos", Price = 800.0f, StockQuantity = 3 },
            new Product { Id = "5", Name = "Samsung Galaxy S25 Ultra", Category = "SmartPhone", Price = 8000.0f, StockQuantity = 2 },
        };

        public override Task<ProductListResponse> ListProducts(EmptyRequest request, ServerCallContext context)
        {
            Console.WriteLine($"Requisição recebida: ListProducts\n");
            
            var response = new ProductListResponse();
            response.Products.AddRange(_products);
            
            Console.WriteLine($"Enviando lista de produtos: {_products} \n");
            
            return Task.FromResult(response);
        }

        public override Task<Product> GetProductById(ProductIdRequest request, ServerCallContext context)
        {
            Console.WriteLine($"Requisição recebida: GetProductById({request.Id})\n");
            var product = _products.FirstOrDefault(p => p.Id == request.Id);
            if (product == null)
            {
                Console.WriteLine($"Produto de id: {request.Id} não encontrado!\n");
                throw new RpcException(new Status(StatusCode.NotFound, $"Produto com ID {request.Id} não encontrado"));
            }
            Console.WriteLine($"Produto de id {request.Id}: {product}\n");
            return Task.FromResult(product);
        }
    }
}
