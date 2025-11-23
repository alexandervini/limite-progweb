'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CadastroPage() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirmar, setSenhaConfirmar] = useState('');
  const [loading, setLoading] = useState(false);
  const [usuarioErro, setUsuarioErro] = useState(false);
  const [senhaErro, setSenhaErro] = useState(false);
  const [senhaConfirmarErro, setSenhaConfirmarErro] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsuarioErro(false);
    setSenhaErro(false);
    setSenhaConfirmarErro(false);

    let valido = true;

    // Validação do usuário
    if (usuario.trim().length < 5) {
      setUsuarioErro(true);
      valido = false;
    }

    // Validação da senha
    if (senha.trim().length < 6) {
      setSenhaErro(true);
      valido = false;
    }

    // Validação da confirmação de senha
    if (senhaConfirmar !== senha || senhaConfirmar === '') {
      setSenhaConfirmarErro(true);
      valido = false;
    }

    if (!valido) return;

    setLoading(true);

    try {
      const res = await fetch('/api/cadastros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, senha }),
      });

      if (res.ok) {
        alert('Cadastro realizado com sucesso!');
        router.push('/');
      } else {
        const data = await res.json();
        alert(data.error || 'Erro ao realizar cadastro');
      }
    } catch (err) {
      alert('Erro de conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#1e1e2f] to-[#4a4a78]">
      <main className="w-[420px] font-medium bg-[#d7d2cc] rounded-[10px] text-black px-10 py-4 shadow-[0_0_10px_rgba(0,0,0,0.2)]">
        
        <form onSubmit={handleSubmit}>
          
          {/* Título */}
          <h1 className="text-center text-3xl font-medium my-4">
            Cadastro
          </h1>

          {/* Campo Usuário */}
          <div className="my-2">
            <input
              id="campoUsuario"
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full border-none py-[2px] px-1 my-[5px] text-xs outline-none focus:border focus:border-[#3b3a385e] text-black placeholder-[#c5c5c5] bg-white"
              placeholder="Usuário"
            />
            {usuarioErro && (
              <div className="text-[#ff0000] text-[8px] pl-[5px]">
                O usuário precisa ter pelo menos 5 caracteres.
              </div>
            )}
          </div>

          {/* Campo Senha */}
          <div className="my-2">
            <input
              id="campoSenha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full border-none py-[2px] px-1 my-[5px] text-xs outline-none focus:border focus:border-[#3b3a385e] text-black placeholder-[#c5c5c5] bg-white"
              placeholder="Senha"
            />
            {senhaErro && (
              <div className="text-[#ff0000] text-[8px] pl-[5px]">
                A senha deve ter no mínimo 6 caracteres
              </div>
            )}
          </div>

          {/* Campo Confirmar Senha */}
          <div className="my-2">
            <input
              id="campoSenhaConfirmar"
              type="password"
              value={senhaConfirmar}
              onChange={(e) => setSenhaConfirmar(e.target.value)}
              className="w-full border-none py-[2px] px-1 my-[5px] text-xs outline-none focus:border focus:border-[#3b3a385e] text-black placeholder-[#c5c5c5] bg-white"
              placeholder="Insira a senha novamente"
            />
            {senhaConfirmarErro && (
              <div className="text-[#ff0000] text-[8px] pl-[5px]">
                A senha repetida está incorreta
              </div>
            )}
          </div>

          {/* Botão de Cadastro */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[50px] bg-white border-none rounded-[40px] cursor-pointer text-base text-black font-semibold shadow-[0_0_10px_rgba(0,0,0,0.1)] mt-[10px] ml-1 outline-none hover:text-[#0000005b] hover:bg-[#ffffff63] hover:border-[0.1px] hover:border-[#3b3a385e] transition-all duration-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>

          {/* Link de Login */}
          <div className="text-xs font-medium text-center mt-[10px]">
            <p className="text-black">
              Já possui uma conta?{' '}
              <a 
                href="/" 
                className="text-black no-underline hover:underline hover:decoration-black"
              >
                Entrar
              </a>
            </p>
          </div>
          
        </form>
      </main>
    </div>
  );
}