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
            new Product { Id = "1", Name = "Notebook", Category = "Eletrônicos", Price = 3500.0f, StockQuantity = 10 },
            new Product { Id = "2", Name = "Cadeira Gamer", Category = "Móveis", Price = 900.0f, StockQuantity = 5 },
            new Product { Id = "3", Name = "Smartphone", Category = "Eletrônicos", Price = 2500.0f, StockQuantity = 15 }
        };

        public override Task<ProductListResponse> ListProducts(EmptyRequest request, ServerCallContext context)
        {
            var response = new ProductListResponse();
            response.Products.AddRange(_products);
            return Task.FromResult(response);
        }

        public override Task<Product> GetProductById(ProductIdRequest request, ServerCallContext context)
        {
            var product = _products.FirstOrDefault(p => p.Id == request.Id);
            if (product == null)
            {
                throw new RpcException(new Status(StatusCode.NotFound, $"Produto com ID {request.Id} não encontrado"));
            }
            return Task.FromResult(product);
        }
    }
}
