import { useState } from 'react';
import './App.css';

function App() {
  const [produto_id, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [cep, setCep] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [resultadoPagamento, setResultadoPagamento] = useState(null);
  const [resultadoFrete, setResultadoFrete] = useState(null);

  const listarProdutos = async () => {
    try {
      const resposta = await fetch('http://192.168.100.10:3000/produtos');
      if (!resposta.ok) {
        throw new Error(`HTTP error! status: ${resposta.status}`);
      }
      const dados = await resposta.json();
      setProdutos(dados);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  const obterProduto = async (id) => {
    try {
      const resposta = await fetch(`http://192.168.100.10:3000/produtos/${id}`);
      const produto = await resposta.json();
      setProdutoSelecionado(produto);
    } catch (error) {
    }
  };

  const handleCalcularDesconto = async (e) => {
    e.preventDefault();
    setResultadoPagamento(null);

    try {
      const resposta = await fetch('http://192.168.100.10:3000/comprar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          valor: produtos[produto_id-1].Price,
          quantidade: parseInt(quantidade)
        })
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.error || 'Erro ao calcular desconto');
      }

      setResultadoPagamento(dados);
    } catch (error) {
      console.error('Erro no cálculo de desconto:', error);
    }
  };

  const handleCalcularFrete = async (e) => {
    e.preventDefault();
    setResultadoFrete(null);

    try {
      const resposta = await fetch('http://192.168.100.10:3000/frete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cep: cep.replace(/\D/g, '')
        })
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.error || 'Erro ao calcular frete');
      }
      setResultadoFrete(dados);
    } catch (error) {
      console.error('Erro no cálculo de frete:', error);
    }
  };

  return (
    <div className="App">
      <h1>Sistema de Compras Distribuído</h1>

      <section>
        <h2>Produtos Disponíveis</h2>
        <button onClick={listarProdutos}>Carregar Produtos</button>
        <ul>
          {produtos.map(produto => (
            <li className='produto-disponivel' key={produto.Id} onClick={() => obterProduto(produto.Id)}>
              {produto.Name} - R$ {produto.Price}
            </li>
          ))}
        </ul>

        {produtoSelecionado && (
          <div className="produto-detalhes">
            <h3>{produtoSelecionado.Name}</h3>
            <p>Categoria: {produtoSelecionado.Category}</p>
            <p>Preço: R$ {produtoSelecionado.Price}</p>
            <p>Estoque: {produtoSelecionado.Stock_quantity} unidades</p>
          </div>
        )}
      </section>

      <section>
        <h2>Calcular Desconto</h2>
        <form onSubmit={handleCalcularDesconto}>
          <label htmlFor="produto">Produto:</label>
          <select
            id="produto"
            value={produto_id}
            onChange={(e) => {
              setProdutoId(e.target.value)
              setResultadoPagamento(null)
            }}
            required
          >
            <option value="">Selecione um produto</option>
            {produtos.map(prod => (
              <option key={prod.Id} value={prod.Id}>
                {prod.Name} - R$ {prod.Price}
              </option>
            ))}
          </select>
          <label>Quantidade:</label>
          <input
            type="number"
            min="1"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            required
          />
          <button type="submit">Calcular Desconto</button>
        </form>

        {resultadoPagamento && (
          <div className="resultado">
            <h3>Resultado do Pagamento</h3>
            <p>Preço Total: R$ {resultadoPagamento.preco_total}</p>
            <p>Desconto: R$ {resultadoPagamento.desconto}</p>
            <p>Preço Final: R$ {resultadoPagamento.preco_final}</p>
          </div>
        )}
      </section>

      <section>
        <h2>Calcular Frete</h2>
        <form onSubmit={handleCalcularFrete}>
          <label>CEP:</label>
          <input
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            placeholder="Digite o CEP (ex: 70000-000)"
            required
          />

          <button type="submit">Calcular Frete</button>
        </form>

        {resultadoFrete && (
          <div className="resultado">
            <h3>Resultado do Frete</h3>
            <p>Valor do Frete: R$ {resultadoFrete.valor_frete}</p>
            <p>Valor Total com Frete: R$ {resultadoPagamento.preco_final + resultadoFrete.valor_frete}</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;