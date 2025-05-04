PROTO_DIR=proto
MODULO_A=moduloA
MODULO_B=moduloB
MODULO_P=moduloP

# Compilar os arquivos para .Net
dotnet:
	cd $(MODULO_A) && dotnet build

# Gera arquivos gRPC a partir dos .proto para Python
python:
	python3 -m grpc_tools.protoc -I $(PROTO_DIR) \
	  --python_out=$(MODULO_B) \
	  --grpc_python_out=$(MODULO_B) \
	  $(PROTO_DIR)/pagamento.proto

# Instala dependências Node.js
node:
	cd $(MODULO_P) && npm install
	cd $(MODULO_P)/webClient && npm install

# Executa o módulo A (.NET)
moduloa:
	cd $(MODULO_A) && dotnet run

# Executa o módulo B (Python)
modulob:
	cd $(MODULO_B) && python3 servidor_pagamento.py

# Executa o módulo P (Web Server Node.js)
modulopserver:
	cd $(MODULO_P) && node index.js

# Executa o módulo P (Web Client Node.js/React)
modulopclient:
	cd $(MODULO_P)/webClient && npm run dev

# Limpa arquivos gerados e pastas desnecessárias
clean:
	rm -f $(MODULO_B)/pagamento_pb2*.py
	rm -rf $(MODULO_P)/node_modules
	rm -rf $(MODULO_P)/webClient/node_modules
	rm -rf $(MODULO_A)/bin $(MODULO_A)/obj
