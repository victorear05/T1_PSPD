from concurrent import futures
import grpc
import pagamento_pb2
import pagamento_pb2_grpc

class PagamentoServiceServicer(pagamento_pb2_grpc.PagamentoServiceServicer):
    def CalcularDesconto(self, request, context):
        valorProduto = request.valor
        quantidade = request.quantidade

        print(f"Requisição recebida: ProcessarPagamento(valor={valorProduto}, valor={quantidade})\n")

        preco_total = valorProduto * quantidade
        desconto = preco_total * 0.05 if quantidade >= 2 else 0.0
        preco_final = preco_total - desconto

        print(f"Preço total calculado em: R$ {preco_total}\n")
        print(f"Desconto calculado em: R$ {desconto}\n")
        print(f"Preço final calculado em: R$ {preco_final}\n")

        return pagamento_pb2.PagamentoResponse(
            preco_total=preco_total,
            desconto=desconto,
            preco_final=preco_final
        )

    def CalcularFrete(self, request, context):
        cep = request.cep

        print(f"Requisição recebida: CalcularFrete(cep={cep})\n")
        
        primeiro = int(cep[0])
        ultimo = int(cep[-1])
        valor_frete = (primeiro + ultimo) * 10
        valor_frete = min(valor_frete, 100.0)

        print(f"Frete calculado em: R$ {valor_frete}\n")

        return pagamento_pb2.FreteResponse(
            valor_frete=valor_frete
        )

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    pagamento_pb2_grpc.add_PagamentoServiceServicer_to_server(
        PagamentoServiceServicer(), server
    )
    server.add_insecure_port('[::]:5002')
    print("Servidor de pagamento rodando na porta 5002")
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
