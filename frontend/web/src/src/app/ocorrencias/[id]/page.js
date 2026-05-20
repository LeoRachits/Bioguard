"use client"
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import StatusBadge from '../../../components/StatusBadge';
import Image from 'next/image';
import Link from 'next/link';

export default function OcorrenciaDetalhes() {
  const { id } = useParams();
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDetalhes() {
      try {
        const response = await fetch(`/api/ocorrencias/${id}`);
        if (response.ok) {
          const data = await response.json();
          setDados(data);
        }
      } catch (error) {
        console.error("Erro ao carregar:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) carregarDetalhes();
  }, [id]);

  if (loading) return <div className="p-20 text-center font-bold text-[#004A8D] animate-pulse uppercase tracking-widest">Sincronizando dados do resgate...</div>;
  if (!dados) return <div className="p-20 text-center text-red-500 font-bold">⚠️ Ocorrência #{id} não encontrada no banco da Cialne.</div>;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <Link className="mb-6 text-[#004A8D] font-bold flex items-center gap-2 hover:translate-x-[-4px] transition-transform" href="/dashboard">
        ← Voltar para o Monitoramento
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="relative w-full h-96 bg-gray-100">
              <Image
                src={dados.foto || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80"}
                alt={dados.animal}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-4xl font-black text-gray-800 uppercase tracking-tighter">{dados.animal}</h1>
                  <p className="text-[#004A8D] font-bold uppercase text-xs tracking-widest mt-1">Porte {dados.porte}</p>
                </div>
                <StatusBadge status={dados.status} />
              </div>

              <div className="bg-blue-50/50 p-6 rounded-2xl border-l-4 border-[#FFD100]">
                <p className="text-gray-700 leading-relaxed italic font-medium">
                  {dados.estado_aparente}
                </p>
              </div>
            </div>
          </div>

          {/* MAPA (Simulado por enquanto) */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-black text-[#004A8D] uppercase text-xs tracking-widest mb-4 flex items-center gap-2">
              📍 Localização Registrada
            </h3>
            <div className="w-full h-48 bg-gray-50 rounded-2xl border border-dashed border-gray-200 flex items-center justify-center text-gray-400 font-bold text-sm">
               {dados.localizacao || "Coordenadas não disponíveis"}
            </div>
          </div>
        </div>

        <div className="space-y-6">
           {/* Card de Status */}
           <div className="bg-[#004A8D] p-8 rounded-[32px] text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <p className="text-[10px] uppercase font-black text-blue-300 mb-2 tracking-[0.2em]">Status Atual</p>
                <h4 className="text-3xl font-black mb-6 uppercase italic tracking-tighter">{dados.status}</h4>
                <button className="w-full bg-[#FFD100] text-[#004A8D] py-4 rounded-2xl font-black text-xs uppercase hover:bg-white transition-all shadow-lg active:scale-95">
                  Falar com Responsável
                </button>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
           </div>

           {/* Timeline */}
           <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
              <h3 className="font-black text-gray-800 uppercase text-xs tracking-widest mb-8 border-b pb-4">Histórico</h3>
              <div className="relative pl-8 border-l-2 border-gray-100 space-y-8">
                <div className="relative">
                  <div className="absolute -left-[41px] w-5 h-5 rounded-full border-4 border-white shadow-sm bg-[#004A8D]"></div>
                  <p className="text-[10px] text-gray-400 font-black uppercase mb-1">
                    {new Date(dados.createdAt).toLocaleDateString('pt-BR')} às {new Date(dados.createdAt).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
                  </p>
                  <p className="text-sm font-bold text-gray-800 leading-tight">Ocorrência registrada no BioGuard</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Por: {dados.user?.nome || 'Sistema'}</p>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}