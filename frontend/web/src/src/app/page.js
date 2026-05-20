"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  AlertCircle, 
  Clock, 
  CheckCircle2, 
  PlusCircle, 
  ArrowRight, 
  Map as MapIcon, 
  ShieldCheck,
  BarChart3
} from 'lucide-react';
import EspeciesChart from '../components/EspeciesChart';

export default function HomePage() {
  const [stats, setStats] = useState({ pendente: 0, em_andamento: 0, concluido: 0 });
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const [resStats, resChart] = await Promise.all([
          fetch('/api/stats/home'),
          fetch('/api/stats/especies')
        ]);

        const dataStats = await resStats.json();
        const dataChart = await resChart.json();

        setStats(dataStats);
        setChartData(dataChart);
      } catch (error) {
        console.error("Erro ao carregar dados da Home:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, []);

  return (
    <div className="space-y-10 py-6 animate-in fade-in duration-700">
      
      <section className="bg-[#004A8D] rounded-[40px] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600 rounded-full -mr-20 -mt-20 opacity-30 blur-3xl"></div>
        
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-4">
            Olá, Leandro! <br />
            <span className="text-[#FFD100]">BioGuard está ON.</span>
          </h1>
          <p className="text-blue-100 text-lg font-medium mb-8 max-w-md">
            O monitoramento da fauna na Cialne está ativo. No momento, temos <span className="underline decoration-[#FFD100] decoration-4 font-black">{stats.pendente} casos</span> aguardando triagem.
          </p>
          
          <Link 
            href="/registrar" 
            className="inline-flex items-center gap-3 bg-[#FFD100] text-[#004A8D] px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:scale-105 transition-all transform active:scale-95 shadow-lg"
          >
            <PlusCircle size={24} /> Registrar Ocorrência
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-red-50 shadow-sm flex flex-col justify-between h-48 group hover:border-red-200 transition-all">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-red-50 text-red-500 rounded-2xl group-hover:scale-110 transition-transform">
              <AlertCircle size={28} />
            </div>
            <span className={`text-4xl font-black text-gray-800 ${loading && 'animate-pulse'}`}>
              {loading ? '...' : stats.pendente}
            </span>
          </div>
          <p className="font-black text-gray-400 uppercase text-[10px] tracking-[0.2em]">Aguardando Resgate</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-blue-50 shadow-sm flex flex-col justify-between h-48 group hover:border-blue-200 transition-all">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-blue-50 text-[#004A8D] rounded-2xl group-hover:scale-110 transition-transform">
              <Clock size={28} />
            </div>
            <span className={`text-4xl font-black text-gray-800 ${loading && 'animate-pulse'}`}>
              {loading ? '...' : stats.em_andamento}
            </span>
          </div>
          <p className="font-black text-gray-400 uppercase text-[10px] tracking-[0.2em]">Em Atendimento</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-green-50 shadow-sm flex flex-col justify-between h-48 group hover:border-green-200 transition-all">
          <div className="flex justify-between items-start">
            <div className="p-3 bg-green-50 text-green-500 rounded-2xl group-hover:scale-110 transition-transform">
              <CheckCircle2 size={28} />
            </div>
            <span className={`text-4xl font-black text-gray-800 ${loading && 'animate-pulse'}`}>
              {loading ? '...' : stats.concluido}
            </span>
          </div>
          <p className="font-black text-gray-400 uppercase text-[10px] tracking-[0.2em]">Casos Finalizados</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-blue-50 text-[#004A8D] rounded-lg">
            <BarChart3 size={20} />
          </div>
          <h3 className="text-xl font-black text-[#004A8D] uppercase tracking-tighter">
            Distribuição de Ocorrências por Espécie
          </h3>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:w-2/3 h-75">
            <EspeciesChart data={chartData} />
          </div>
          
          <div className="w-full lg:w-1/3 bg-gray-50 p-6 rounded-3xl border border-gray-100">
            <h4 className="font-bold text-gray-800 mb-4">Resumo Analítico</h4>
            <div className="space-y-4">
              {chartData.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">{item.name}</span>
                  <span className="text-sm font-black text-[#004A8D]">{item.value}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-tight">
              Dados atualizados em tempo real conforme registros de campo.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/dashboard" className="flex items-center justify-between bg-gray-900 p-6 rounded-3xl text-white group hover:bg-[#004A8D] transition-all shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-[#FFD100]">
              <MapIcon size={24} />
            </div>
            <div>
              <p className="font-bold">Painel de Monitoramento</p>
              <p className="text-xs text-gray-400 group-hover:text-blue-200 transition-colors italic">Ver localização no mapa</p>
            </div>
          </div>
          <ArrowRight className="group-hover:translate-x-2 transition-transform" />
        </Link>

        <Link href="/instituicoes" className="flex items-center justify-between bg-white p-6 rounded-3xl border border-gray-100 group hover:border-[#004A8D] transition-all shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-[#004A8D]">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="font-bold text-gray-800">Diretório de ONGs</p>
              <p className="text-xs text-gray-500 italic">Contatos de emergência</p>
            </div>
          </div>
          <ArrowRight className="text-[#004A8D] group-hover:translate-x-2 transition-transform" />
        </Link>
      </div>

    </div>
  );
}