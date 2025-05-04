from concurrent import futures
import grpc
import pagamento_pb2
import pagamento_pb2_grpc

class PagamentoServiceServicer(pagamento_pb2_grpc.PagamentoServiceServicer):
    def CalcularDesconto(self, request, context):
        produto_id = request.produto_id
        quantidade = request.quantidade
        preco_unitario = 100.0  # exemplo fixo

        preco_total = preco_unitario * quantidade
        desconto = preco_total * 0.1 if quantidade >= 5 else 0.0
        preco_final = preco_total - desconto

        return pagamento_pb2.PagamentoResponse(
            preco_total=preco_total,
            desconto=desconto,
            preco_final=preco_final
        )

    def CalcularFrete(self, request, context):
        cep = request.cep
        valor_frete = 20.0 if cep.startswith("7") else 40.0

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
