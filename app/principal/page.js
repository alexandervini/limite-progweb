'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PrincipalPage() {
  const [registros, setRegistros] = useState([]);
  const [form, setForm] = useState({
    tipo: '',
    valor: ''
  });
  const [editando, setEditando] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [busca, setBusca] = useState('');
  const router = useRouter();

  useEffect(() => {
    carregarRegistros();
  }, []);

  const carregarRegistros = async () => {
    try {
      const res = await fetch('/api/registros');
      const data = await res.json();
      setRegistros(data);
    } catch (error) {
      alert('Erro ao carregar registros: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editando ? `/api/registros/${editando}` : '/api/registros';
      const method = editando ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        alert(editando ? 'Registro atualizado!' : 'Registro cadastrado!');
        setModalAberto(false);
        limparForm();
        carregarRegistros();
      } else {
        const error = await res.json();
        alert('Erro: ' + error.error);
      }
    } catch (error) {
      alert('Erro: ' + error.message);
    }
    setLoading(false);
  };

  const handleEditar = (registro) => {
    setForm({
      tipo: registro.tipo,
      valor: registro.valor
    });
    setEditando(registro.id);
    setModalAberto(true);
  };

  const handleDeletar = async (id) => {
    if (!confirm('Tem certeza que deseja deletar?')) return;

    try {
      const res = await fetch(`/api/registros/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('Registro deletado!');
        carregarRegistros();
      }
    } catch (error) {
      alert('Erro ao deletar: ' + error.message);
    }
  };

  const limparForm = () => {
    setModalAberto(false);
    setForm({
      tipo: '',
      valor: ''
    });
    setEditando(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F7ECE1]">
      <header className="bg-gradient-to-r from-[#1e1e2f] to-[#4a4a78] w-full mb-10">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-4xl font-bold text-white">
            Sistema de controle de gastos
          </h1>
          <button 
            onClick={() => router.push('/')} 
            className="cursor-pointer text-white p-2 rounded-lg transition border border-white duration-200 ease-in-out hover:ring-offset-1 hover:bg-white hover:text-black pl-4 pr-4"
          >
            Sair
          </button>
        </div>
      </header>

      <div className="flex-grow">
        <div className="max-w-6xl mx-auto">
          {/* Barra de Busca e Botão Novo */}
          <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar por tipo..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="w-full px-4 py-2 pl-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a4a78] focus:border-transparent focus:outline-none text-gray-700"
                  />
                </div>
              </div>
              <button
                onClick={() => { limparForm(); setModalAberto(true); }}
                className="bg-[#4a4a78] hover:bg-[#1e1e2f] text-white font-bold py-2 px-6 rounded-lg transition whitespace-nowrap cursor-pointer"
              >
                + Novo Registro
              </button>
            </div>
          </div>

          {/* Tabela */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-10">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-t from-[#1e1e2f] to-[#4a4a78] text-white">
                  <tr>
                    <th className="px-4 py-3 text-center">Ações</th>
                    <th className="px-4 py-3 text-left">Tipo</th>
                    <th className="px-4 py-3 text-left">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {registros
                    .filter(reg => reg.tipo.toLowerCase().includes(busca.toLowerCase()))
                    .length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-4 py-8 text-center text-gray-500">
                        {busca ? 'Nenhum registro encontrado' : 'Nenhum registro cadastrado ainda'}
                      </td>
                    </tr>
                  ) : (
                    registros
                      .filter(reg => reg.tipo.toLowerCase().includes(busca.toLowerCase()))
                      .map((registro, index) => (
                        <tr key={registro.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="px-4 py-3">
                            <div className="flex gap-2 justify-center">
                              <button
                                onClick={() => handleEditar(registro)}
                                className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded transition text-sm cursor-pointer"
                                title="Editar"
                              >
                                <img src="lapis.png" alt="Editar" className="w-4 h-4"></img>
                              </button>
                              <button
                                onClick={() => handleDeletar(registro.id)}
                                className="text-red-600 hover:text-red-800 px-3 py-1 rounded transition text-sm cursor-pointer"
                                title="Deletar"
                              >
                                <img src="lixo.png" alt="Editar" className="w-4 h-4"></img>
                              </button>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-700">{registro.tipo}</td>
                          <td className="px-4 py-3 text-gray-700">{registro.valor}</td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Cadastro/Edição */}
      {modalAberto && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-[2px] bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-auto max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-[#1e1e2f] to-[#4a4a78] text-white px-6 py-4 rounded-t-lg flex justify-between items-center sticky top-0 z-10">
              <h2 className="text-2xl font-semibold">
                {editando ? 'Editar registro' : 'Registrar gasto'}
              </h2>
              <button 
                onClick={() => { setModalAberto(false); limparForm(); }}
                className="text-white hover:text-gray-200 text-2xl font-bold cursor-pointer"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 gap-4">
                {/* Tipo */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Tipo *
                  </label>
                  <input 
                    type="text"
                    required
                    value={form.tipo}
                    onChange={(e) => setForm({...form, tipo: e.target.value})}
                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4a4a78] focus:border-transparent focus:outline-none"
                    placeholder="Ex: Limite, Gasto, etc."
                  />
                </div>

                {/* Valor */}
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Valor *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={form.valor}
                    onChange={(e) => setForm({...form, valor: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 text-gray-700 rounded-lg focus:ring-2 focus:ring-[#4a4a78] focus:border-transparent focus:outline-none"
                    placeholder="Ex: 1000.00"
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 hover:bg-[#1e1e2f] bg-[#4a4a78] text-white font-bold py-2 px-4 rounded-lg transition disabled:bg-gray-400 cursor-pointer"
                >
                  {loading ? 'Processando...' : (editando ? 'Atualizar' : 'Cadastrar')}
                </button>
                
                <button
                  type="button"
                  onClick={() => { setModalAberto(false); limparForm(); }}
                  className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition cursor-pointer"
                >
                  Cancelar
                </button>	
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}