import { useState } from 'react';
import './App.css';

function App() {
  const [produto_id, setProdutoId] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [metodo_pagamento, setMetodoPagamento] = useState('pix');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('Processando...');

    const resposta = await fetch('http://localhost:3000/comprar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ produto_id, quantidade: parseInt(quantidade), metodo_pagamento })
    });

    const dados = await resposta.json();
    setMensagem(dados.mensagem || dados.erro);
  };

  return (
    <div className="App">
      <h1>Sistema de Compras</h1>
      <form onSubmit={handleSubmit}>
        <label>Produto ID:</label>
        <input value={produto_id} onChange={(e) => setProdutoId(e.target.value)} required />

        <label>Quantidade:</label>
        <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required />

        <label>Método de Pagamento:</label>
        <select value={metodo_pagamento} onChange={(e) => setMetodoPagamento(e.target.value)}>
          <option value="pix">Pix</option>
          <option value="credito">Crédito</option>
          <option value="debito">Débito</option>
        </select>

        <button type="submit">Comprar</button>
      </form>

      {mensagem && <p><strong>{mensagem}</strong></p>}
    </div>
  );
}

export default App;
