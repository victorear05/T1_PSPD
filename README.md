# 🛒 Sistema de Compras Distribuído com gRPC

Este projeto implementa um sistema de compras distribuído baseado em **microserviços com gRPC**, utilizando três módulos:

- **Módulo P**: API Gateway + Frontend em React (Node.js)
- **Módulo A**: Microserviço de Estoque (Python + gRPC)
- **Módulo B**: Microserviço de Pagamento (Python + gRPC)

---

## ✅ Pré-requisitos

- **Node.js** (v18 ou superior)
- **Python 3.10+**
- **pip**
- **protoc (Protocol Buffers Compiler)**

### Bibliotecas Python necessárias:

```bash
pip install grpcio grpcio-tools
