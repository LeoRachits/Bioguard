"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(false);
  const router = useRouter();

const handleLogin = async (event) => {
  event.preventDefault();
  setLoading(true);

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      window.location.href = '/dashboard'; 
    } else {
      setLoading(false);
      alert("Credenciais inválidas para o BioGuard!");
    }
  } catch (error) {
    setLoading(false);
    console.error("Erro no login:", error);
  }
};

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        
        <div className="hidden md:flex md:w-1/2 bg-[#004A8D] p-12 flex-col justify-center text-white relative">
          <div className="z-10">
            <h2 className="text-4xl font-black mb-4 tracking-tighter">
              BEM-VINDO AO <br />
              <span className="text-[#FFD100]">BIOGUARD</span>
            </h2>
            <p className="text-blue-100 text-lg">
              Plataforma interna para gestão ambiental e proteção da fauna local.
            </p>
          </div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-800 rounded-full opacity-50 blur-3xl"></div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-800">Acesse sua conta</h3>
            <p className="text-gray-500 text-sm">Entre com suas credenciais corporativas.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">E-mail Corporativo</label>
              <input 
                type="email" 
                required
                className={`w-full p-4 bg-gray-50 border ${erro ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#004A8D] outline-none transition-all`}
                placeholder="exemplo@cialne.com.br"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-gray-700">Senha</label>
                <Link href="#" className="text-xs text-[#004A8D] hover:underline font-semibold">Esqueceu a senha?</Link>
              </div>
              <input 
                type="password" 
                required
                className={`w-full p-4 bg-gray-50 border ${erro ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#004A8D] outline-none transition-all`}
                placeholder="••••••••"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {erro && <p className="text-red-500 text-xs mt-2 font-bold uppercase tracking-tighter">Acesso negado: E-mail ou senha inválidos.</p>}
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full bg-[#FFD100] text-[#004A8D] font-black py-4 rounded-xl shadow-lg transform active:scale-[0.98] transition-all uppercase tracking-widest flex justify-center items-center gap-2
                ${loading ? 'opacity-70 cursor-wait' : 'hover:bg-yellow-400 hover:shadow-xl'}`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-4 border-t-transparent border-[#004A8D] rounded-full animate-spin"></div>
                  VALIDANDO...
                </>
              ) : 'Entrar no Sistema'}
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-400 font-bold uppercase tracking-widest">
            Acesso exclusivo Cialne
          </p>
        </div>
      </div>
    </div>
  );
}