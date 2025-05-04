
# Makefile para compilar, instalar e executar o sistema completo

PROTOC=protoc
PROTO_DIR=proto
MODULO_A=moduloA
MODULO_B=moduloB
MODULO_P=moduloP

.PHONY:	 proto install run clean run_moduloA run_moduloB run_moduloP

# 2. Gera os stubs gRPC para os módulos A e B
proto: gerar_moduloA gerar_moduloB

gerar_moduloA:
	python3 -m grpc_tools.protoc -I$(PROTO_DIR) \
	  --python_out=$(MODULO_A) \
	  --grpc_python_out=$(MODULO_A) \
	  $(PROTO_DIR)/estoque.proto

gerar_moduloB:
	python3 -m grpc_tools.protoc -I$(PROTO_DIR) \
	  --python_out=$(MODULO_B) \
	  --grpc_python_out=$(MODULO_B) \
	  $(PROTO_DIR)/pagamento.proto

# 3. Instala as dependências do Node.js (API e frontend)
install:
	cd $(MODULO_P) && npm install
	cd $(MODULO_P)/webClient && npm install

# 4. Executa todos os módulos (estoque, pagamento, gateway + frontend)
run: run_moduloA run_moduloB run_moduloP

# 5. Executa o módulo de estoque (Python)
run_moduloA:
	cd $(MODULO_A) && nohup python3 servidor_estoque.py

# 6. Executa o módulo de pagamento (Python)
run_moduloB:
	cd $(MODULO_B) && nohup python3 servidor_pagamento.py

# 7. Executa o módulo P (API Gateway + Frontend)
run_moduloP:
	cd $(MODULO_P) && nohup node index.js
	cd $(MODULO_P)/webClient && nohup npm run dev

# 8. Limpa arquivos gerados e dependências
clean:
	rm -f $(MODULO_A)/estoque_pb2*.py
	rm -f $(MODULO_B)/pagamento_pb2*.py
	rm -rf $(MODULO_P)/node_modules
	rm -rf $(MODULO_P)/webClient/node_modules
