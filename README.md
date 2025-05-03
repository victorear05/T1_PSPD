# Sistema de Compras

Um sistema de compras que usa Javascript e React como Web Server/Web Client, e Python nos servidores que processam o estoque e o pagamento.

## Executando
### Compilação
Compilar a servidor de estoque:
```
cd proto/
python3 -m grpc_tools.protoc -I. --python_out=../moduloA --grpc_python_out=../moduloA estoque.proto
```
Compilar a servidor de pagamento:
```
cd proto/
python3 -m grpc_tools.protoc -I. --python_out=../moduloB --grpc_python_out=../moduloB pagamento.proto
```
Compilar o Web Server:
```
cd moduloP/
npm install
```
Compilar o Web Client:
```
cd moduloP/webClient/
npm install
```
### Execução
Executar a servidor de estoque:
```
cd moduloA/
python3 servidor_estoque.py
```
Compilar a servidor de pagamento:
```
cd proto/
python3 servidor_pagamento.py
```
Compilar o Web Server:
```
cd moduloP/
node index.js
```
Compilar o Web Client:
```
cd moduloP/webClient/
npm run dev
```