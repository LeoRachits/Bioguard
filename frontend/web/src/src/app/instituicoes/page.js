"use client"
import { useState, useEffect } from 'react';
import InstitutionCard from '../../components/InstitutionCard';
import { Search, Plus } from 'lucide-react';
import Link from 'next/link';

export default function DiretórioInstituicoes() {
  const [instituicoes, setInstituicoes] = useState([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    async function carregar() {
      const res = await fetch('/api/instituicoes');
      const data = await res.json();
      setInstituicoes(data);
    }
    carregar();
  }, []);

  const filtradas = instituicoes.filter(inst => 
    inst.nome.toLowerCase().includes(busca.toLowerCase()) ||
    inst.tipo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="space-y-8 py-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#004A8D] uppercase tracking-tighter">
            Diretório de <span className="text-[#FFD100]">Instituições</span>
          </h1>
          <p className="text-gray-500 text-sm font-medium italic">
            Rede credenciada para resgate e cuidados da fauna Cialne.
          </p>
        </div>

        <Link
          href="/admin/instituicoes/nova"
          className="flex items-center gap-2 bg-[#004A8D] text-white px-5 py-3 rounded-xl font-bold text-sm hover:bg-blue-900 transition-all shadow-lg"
        >
          <Plus size={18} /> Cadastrar Nova
        </Link>
      </header>

      <div className="relative max-w-xl">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Pesquisar ONG, Clínica ou Protetor..."
          className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#004A8D] outline-none transition-all"
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtradas.length > 0 ? (
          filtradas.map((inst) => (
            <InstitutionCard
              key={inst.id}
              institution={inst}
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-400 font-medium italic border-2 border-dashed border-gray-100 rounded-3xl">
            Nenhuma instituição encontrada com esses critérios.
          </div>
        )}
      </div>
    </div>
  );
}