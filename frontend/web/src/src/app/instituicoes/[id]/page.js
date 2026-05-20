"use client"
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Phone, MapPin, User, ShieldCheck, ArrowLeft, MessageCircle } from 'lucide-react';

export default function PerfilInstituicao() {
  const { id } = useParams();
  const router = useRouter();
  const [inst, setInst] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const res = await fetch(`/api/instituicoes/${id}`);
        if (res.ok) {
          const data = await res.json();
          setInst(data);
        }
      } catch (error) {
        console.error("Erro ao carregar perfil:", error);
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, [id]);

  if (loading) return <div className="p-20 text-center font-black text-[#004A8D] animate-pulse">CARREGANDO...</div>;
  if (!inst) return <div className="p-20 text-center text-red-500">Instituição não encontrada.</div>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-[#004A8D] font-bold hover:-translate-x-1 transition-transform">
        <ArrowLeft size={20} /> Voltar ao Diretório
      </button>

      <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 overflow-hidden">
        <div className="h-40 bg-[#004A8D] relative">
          <div className="absolute -bottom-10 left-10 w-28 h-28 bg-[#FFD100] rounded-3xl border-4 border-white flex items-center justify-center text-[#004A8D] text-4xl font-black">
            {inst.nome.charAt(0)}
          </div>
        </div>
        <div className="pt-14 pb-8 px-10">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter flex items-center gap-3">
                {inst.nome}
                {inst.status_validacao && <ShieldCheck className="text-blue-500" size={24} />}
              </h1>
              <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-1">{inst.tipo} • {inst.local}</p>
            </div>
            <a 
              href={`https://wa.me/55${inst.telefone?.replace(/\D/g, '')}`} 
              target="_blank"
              className="bg-[#25D366] text-white px-6 py-3 rounded-2xl font-black uppercase text-xs flex items-center gap-2 hover:scale-105 transition-transform shadow-lg"
            >
              <MessageCircle size={18} /> Contato Direto
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="font-black text-[#004A8D] uppercase text-xs tracking-widest border-b pb-4">Dados Cadastrais</h3>
          
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 text-[#004A8D] rounded-xl"><User size={20} /></div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase">Responsável</p>
              <p className="font-bold text-gray-800">{inst.responsavel}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 text-[#004A8D] rounded-xl"><MapPin size={20} /></div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase">Localização</p>
              <p className="font-bold text-gray-800">{inst.local}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#004A8D] p-8 rounded-3xl text-white flex flex-col justify-center">
          <p className="text-4xl font-black">100%</p>
          <p className="text-xs font-bold uppercase tracking-widest opacity-70">Taxa de Resposta</p>
          <div className="mt-6 h-2 bg-blue-900 rounded-full overflow-hidden">
            <div className="w-full h-full bg-[#FFD100]"></div>
          </div>
          <p className="mt-4 text-xs italic text-blue-200">Parceira ativa no ecossistema BioGuard Cialne.</p>
        </div>
      </div>
    </div>
  );
}