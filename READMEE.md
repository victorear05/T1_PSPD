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
```

## ⚙️ Compilar e Instalar

A partir da raiz do projeto, temos algumas opções:

- Gera: os arquivos de stub e instala as dependências Node.js
```bash
make ou make all 
```

- Gerar os stubs gRPC para os módulos A e B:
```bash
make proto
```

- Instalar as dependências Node.js no backend e frontend:
```bash
make install
```

---

## 🚀 Como Executar

### 1. Inicie o Microserviço de Estoque (móduloA)

- Executar o projeto:
```bash
make execute estoque
```
### 2. Inicie o Microserviço de Pagamento (móduloB)

```bash
cd moduloB
python3 servidor_pagamento.py
```

### 3. Inicie o API Gateway (móduloP)

```bash
cd moduloP
npm install
node index.js
```

Você verá: `API Gateway rodando em http://localhost:3000`

### 4. Inicie o Frontend React

```bash
cd moduloP/frontend
npm install
npm run dev
```

Acesse no navegador: [http://localhost:5173](http://localhost:5173)

---

## 🧪 Como Usar

No navegador:

1. Digite um **produto_id** (ex: `p1`)
2. Informe uma **quantidade**
3. Escolha um **método de pagamento**
4. Clique em **"Comprar"**
5. Uma mensagem aparecerá dizendo se a compra foi realizada com sucesso ou não

---

## 🛠️ Tecnologias Utilizadas

- React + Vite
- Node.js + Express + gRPC
- Python + gRPC
- Protocol Buffers (protobuf)
- REST (entre frontend e backend)
- gRPC (entre backend e microserviços)

---

## 📄 Licença

Projeto acadêmico para fins de estudo. Todos os direitos reservados aos autores.
