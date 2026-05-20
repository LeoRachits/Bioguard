"use client"
import { useState, useEffect } from 'react';
import { User, Award, ClipboardList, Settings, LogOut, ShieldAlert } from 'lucide-react';
import LogoutButton from '../../components/LogoutButton';

export default function PerfilPage() {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const res = await fetch('/api/perfil');
        const data = await res.json();
        setDados(data);
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      }
    }
    carregar();
  }, []);

  if (!dados) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-pulse text-[#004A8D] font-black uppercase tracking-tighter">
        Carregando Perfil do Guardião...
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      
      <div className="bg-[#004A8D] rounded-3xl p-8 text-white flex flex-col md:flex-row items-center gap-8 shadow-xl relative overflow-hidden">
        {/* Efeito visual de fundo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-700 rounded-full -mr-20 -mt-20 opacity-40 blur-3xl"></div>
        
        <div className="w-32 h-32 bg-[#FFD100] rounded-full flex items-center justify-center text-[#004A8D] text-4xl font-black border-4 border-white shadow-lg z-10 shrink-0">
          {dados.user.nome.substring(0, 2).toUpperCase()}
        </div>

        <div className="text-center md:text-left z-10">
          <h1 className="text-3xl font-black uppercase tracking-tighter">{dados.user.nome}</h1>
          <p className="text-blue-200 font-medium">{dados.user.email}</p>
          <div className="mt-4 inline-flex items-center gap-2 bg-blue-800/50 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-500/30">
            <Award size={14} className="text-[#FFD100]" /> Guardião de Ouro
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="p-4 bg-yellow-50 rounded-2xl text-[#FFD100]">
            <ClipboardList size={32} />
          </div>
          <div>
            <p className="text-3xl font-black text-gray-800 leading-none">{dados.stats.total}</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-tight mt-1">Resgates Reportados</p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6 group hover:border-[#004A8D] transition-all cursor-pointer">
          <div className="p-4 bg-blue-50 rounded-2xl text-[#004A8D]">
            <Settings size={32} />
          </div>
          <div>
            <p className="text-xl font-black text-gray-800">Configurações</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">Gerenciar Minha Conta</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100">
        <h3 className="font-black text-[#004A8D] uppercase tracking-tighter mb-2 flex items-center gap-2">
           Dica de Guardião
        </h3>
        <p className="text-sm text-blue-800 leading-relaxed">
          {dados.user.nome.split(' ')[0]}, você já ajudou o BioGuard a identificar **{dados.stats.total} animais** em risco. Continue alimentando o sistema para que as ONGs parceiras possam atuar cada vez mais rápido!
        </p>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-red-50 shadow-sm">
        <div className="flex items-center gap-2 mb-4 ml-2">
          <ShieldAlert size={16} className="text-red-400" />
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Sessão e Segurança</h3>
        </div>
        
        <div className="bg-red-50/50 p-2 rounded-2xl border border-red-100">
           <LogoutButton />
        </div>
        
        <p className="text-[10px] text-gray-400 mt-4 text-center italic font-medium uppercase tracking-wider">
          Versão do Sistema: 1.0.4 | Unidade Cialne Fortaleza
        </p>
      </div>

    </div>
  );
}