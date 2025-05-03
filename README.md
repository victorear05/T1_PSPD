# gRPC Server A (C#)

Esta parte do repositório contém a implementação do **microserviço A** da aplicação distribuída, utilizando **gRPC com .NET (C#)**.
O objetivo deste serviço é fornecer uma API gRPC com:

- Listagem de produtos
- Consulta de informações detalhadas de um produto por ID

Este microserviço será consumido pelo módulo intermediário `P` via chamadas gRPC.

---

## Estrutura do Modulo

moduloA/
├── GrpcServerA.csproj              # Arquivo do projeto .NET
├── Program.cs                      # Inicialização do servidor
├── Protos/
│   └── product.proto               # Definição dos serviços gRPC
├── Services/
│   └── ProductService.cs          # Implementação dos métodos gRPC
└── README.md

---

## 🛠️ Pré-requisitos

- [.NET SDK 7.0 ou superior](https://dotnet.microsoft.com/download)

Verifique se está instalado:

```bash
dotnet --version
```

---

## Como executar

1. **Clone este repositório**

```bash
git clone https://github.com/victorear05/T1_PSPD
cd moduloA
```

2. **Restaure as dependências**

```bash
dotnet restore GrpcServerA.csproj
```

3. **Execute o servidor**

```bash
dotnet run --project GrpcServerB.csproj
```

O servidor gRPC estará rodando em:

* `http://localhost:5000`
* `https://localhost:5001`

---

## Serviços gRPC disponíveis

### `ListProducts`

Retorna todos os produtos disponíveis no sistema.

**Entrada:** `EmptyRequest`
**Saída:** `ProductListResponse`

---

### `GetProductById`

Retorna os dados de um produto específico com base no ID.

**Entrada:** `ProductIdRequest`
**Saída:** `Product`

---

## 📡 Integração

Este servidor será consumido pelo módulo intermediário `P`, que atuará como gateway HTTP → gRPC.
Certifique-se de que os arquivos `.proto` estejam sincronizados entre os projetos `P`, `A` e `B`.

---
