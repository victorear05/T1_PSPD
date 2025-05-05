# 🛒 Sistema de Compras Distribuído com gRPC

Este projeto implementa um sistema de compras distribuído baseado em **microserviços com gRPC**, utilizando três módulos:

- **Módulo P**: API Gateway + Frontend em React (Node.js)
- **Módulo A**: Microserviço de Estoque (.NET + gRPC)
- **Módulo B**: Microserviço de Pagamento (Python + gRPC)

---

## ✅ Pré-requisitos

- **Node.js** (v18 ou superior)
- **Python 3.10+**
- **pip**
- **.NET SDK 7.0 ou superior**
- **protoc (Protocol Buffers Compiler)**

### Bibliotecas Python necessárias:

```bash
pip install grpcio grpcio-tools
```

## ⚙️ Compilar e Instalar

A partir da raiz do projeto, temos algumas opções:

- Instalar dependências node do módulo P
```bash
make node
```

- Instalar dependências .NET do módulo A
```bash
make dotnet
```

- Instalar as dependências Python do módulo B:
```bash
make python
```

---

## 🚀 Como Executar

### Módulo P
#### Web Server
```bash
make modulopserver
```
### Web Client
```bash
make modulopclient
```

### Módulo A (Produto)

```bash
make moduloa
```

### Módulo B (Pagamento)

```bash
make modulob
```
---

## 🛠️ Tecnologias Utilizadas

- React + Vite
- Node.js + Express + gRPC
- Python + gRPC
- .NET + gRPC
- Protocol Buffers (protobuf)
- REST (entre web server e backend client)

---
