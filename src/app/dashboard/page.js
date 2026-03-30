"use client"
import { useState, useEffect } from 'react';
import StatusBadge from '../../components/StatusBadge';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const MapaOcorrencias = dynamic(() => import('../../components/MapaOcorrencias'), { 
  ssr: false,
  loading: () => <div className="h-80 bg-gray-100 animate-pulse rounded-xl flex items-center justify-center text-gray-400 font-bold uppercase">Carregando Mapa de Resgates...</div>
});

export default function DashboardPage() {
  const [ocorrencias, setOcorrencias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const response = await fetch('/api/ocorrencias');
        const data = await response.json();
        setOcorrencias(data);
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarDados();
  }, []);

  const stats = [
    { 
      label: 'Novos Alertas', 
      value: ocorrencias.filter(o => o.status === 'pendente').length, 
      color: 'border-yellow-400' 
    },
    { 
      label: 'Em Processo', 
      value: ocorrencias.filter(o => o.status === 'em andamento' || o.status === 'em atendimento').length, 
      color: 'border-blue-400' 
    },
    { 
      label: 'Total Resolvido', 
      value: ocorrencias.filter(o => o.status === 'resolvido').length, 
      color: 'border-green-400' 
    },
  ];

  if (loading) return <div className="p-10 text-center font-bold text-[#004A8D] animate-pulse">Sincronizando com o banco de dados...</div>;

  return (
    <div className="space-y-8 py-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#004A8D]">Dashboard Operacional</h1>
          <p className="text-gray-500 text-sm">Monitoramento geográfico de fauna em tempo real.</p>
        </div>
      </header>

      <MapaOcorrencias ocorrencias={ocorrencias} />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#004A8D]">Histórico de Ocorrências</h1>
          <p className="text-gray-500 text-sm">Gerencie os registros de fauna da Cialne em tempo real.</p>
        </div>

        <button className="bg-[#004A8D] text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-900 transition-all flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          Exportar Relatório
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item, i) => (
          <div key={i} className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${item.color}`}>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{item.label}</p>
            <p className="text-3xl font-black text-gray-800">{String(item.value).padStart(2, '0')}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Animal</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Localização</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Data</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Ações</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-50">
              {ocorrencias.length > 0 ? (
                ocorrencias.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="p-4 font-semibold text-gray-700">{item.animal}</td>
                    <td className="p-4 text-sm text-gray-600">{item.localizacao}</td>
                    <td className="p-4 text-sm text-gray-600">
                      {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="p-4">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="p-4">
                      <Link href={`/ocorrencias/${item.id}`} className="text-[#004A8D] text-sm font-bold hover:underline">
                        Detalhes
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-gray-400 italic">Nenhuma ocorrência registrada no banco.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}