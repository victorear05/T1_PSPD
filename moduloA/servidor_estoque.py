import grpc
from concurrent import futures
import time

import estoque_pb2
import estoque_pb2_grpc

class EstoqueService(estoque_pb2_grpc.EstoqueServiceServicer):
    def VerificarDisponibilidade(self, request, context):
        print(f"Verificando produto {request.produto_id} com quantidade {request.quantidade}")
        
        # Simulação simples: sempre retorna disponível se quantidade <= 10
        if request.quantidade <= 10:
            return estoque_pb2.RespostaEstoque(disponivel=True, mensagem="Produto disponível")
        else:
            return estoque_pb2.RespostaEstoque(disponivel=False, mensagem="Quantidade indisponível")

    def AtualizarEstoque(self, request, context):
        return estoque_pb2.RespostaEstoque(disponivel=True, mensagem="Estoque atualizado com sucesso")

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    estoque_pb2_grpc.add_EstoqueServiceServicer_to_server(EstoqueService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("Servidor de Estoque rodando em localhost:50051")
    try:
        while True:
            time.sleep(86400)
    except KeyboardInterrupt:
        server.stop(0)

if __name__ == '__main__':
    serve()
