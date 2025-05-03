import grpc
from concurrent import futures
import time

import pagamento_pb2
import pagamento_pb2_grpc

class PagamentoService(pagamento_pb2_grpc.PagamentoServiceServicer):
    def ProcessarPagamento(self, request, context):
        print(f"Processando pagamento: pedido {request.pedido_id}, valor {request.valor}, método {request.metodo}")

        if request.valor < 100:
            return pagamento_pb2.RespostaPagamento(sucesso=True, mensagem="Pagamento aprovado")
        else:
            return pagamento_pb2.RespostaPagamento(sucesso=False, mensagem="Pagamento recusado: valor alto")

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    pagamento_pb2_grpc.add_PagamentoServiceServicer_to_server(PagamentoService(), server)
    server.add_insecure_port('[::]:50052')
    server.start()
    print("Servidor de Pagamento rodando na porta 50052...")
    try:
        while True:
            time.sleep(86400)
    except KeyboardInterrupt:
        server.stop(0)

if __name__ == '__main__':
    serve()
