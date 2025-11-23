'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [usuarioErro, setUsuarioErro] = useState(false);
  const [senhaErro, setSenhaErro] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUsuarioErro(false);
    setSenhaErro(false);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, senha }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('auth_token', data.token);
        router.push('/principal');
      } else {
        setUsuarioErro(true);
        setSenhaErro(true);
      }
    } catch (err) {
      setUsuarioErro(true);
      setSenhaErro(true);
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
            Login
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
              autoComplete="off"
            />
            {usuarioErro && (
              <div className="text-[#ff0000] text-[8px] pl-[5px]">
                Usuário ou senha incorreto.
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
              autoComplete="off"
            />
            {senhaErro && (
              <div className="text-[#ff0000] text-[8px] pl-[5px]">
                Usuário ou senha incorreto.
              </div>
            )}
          </div>

          {/* Botão de Login */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[50px] bg-white border-none rounded-[40px] cursor-pointer text-base text-black font-semibold shadow-[0_0_10px_rgba(0,0,0,0.1)] mt-[10px] ml-1 outline-none hover:text-[#0000005b] hover:bg-[#ffffff63] hover:border-[0.1px] hover:border-[#3b3a385e] transition-all duration-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Acessando...' : 'Acessar'}
          </button>

          {/* Link de Registro */}
          <div className="text-xs font-medium text-center mt-[10px]">
            <p className="text-black">
              Ainda não possui uma conta?{' '}
              <a 
                href="/cadastro" 
                className="text-black no-underline hover:underline hover:decoration-black"
              >
                Cadastre-se
              </a>
            </p>
          </div>
          
        </form>
      </main>
    </div>
  );
}