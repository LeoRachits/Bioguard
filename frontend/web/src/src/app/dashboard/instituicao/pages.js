"use client"
import { useState } from 'react';
import StatusBadge from '../../../components/StatusBadge';
import ConfirmModal from '../../../components/ConfirmModal';
import useModal from '@/hooks/useModal';

export default function InstitutionDashboard() {
    const confirmResolveModal = useModal()

  const [ocorrencias, setOcorrencias] = useState([
    { id: 101, animal: 'Gato Ferido', local: 'Galpão A-3', data: '23/03/2026', status: 'pendente', relator: 'Leandro' },
    { id: 102, animal: 'Cão Desorientado', local: 'Portaria Principal', data: '23/03/2026', status: 'em andamento', relator: 'Marcos Silva' },
  ]);

  const alterarStatus = (id, novoStatus) => {
    setOcorrencias(prev => prev.map(o => o.id === id ? { ...o, status: novoStatus } : o));
  };

  const confirmarResolucao = () => {
    const ocorrenciaId = confirmResolveModal.data;
    if (ocorrenciaId) {
      alterarStatus(ocorrenciaId, 'resolvido');
    }
    confirmResolveModal.closeModal();
  };

  return (
    <div className="py-6 space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#004A8D]">Painel da Instituição</h1>
          <p className="text-gray-500 text-sm font-medium">ONG Patinhas Felizes • Fila de Atendimento</p>
        </div>
        <div className="bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
          <span className="text-blue-800 font-bold text-sm">Disponível para Resgates</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-gray-700 flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
            Novas Solicitações
          </h2>
          
          <div className="space-y-4">
            {ocorrencias.filter(o => o.status === 'pendente').map(o => (
              <div key={o.id} className="bg-white border-2 border-yellow-100 p-5 rounded-xl shadow-sm">
                <div className="flex justify-between mb-3">
                  <h3 className="font-bold text-lg">{o.animal}</h3>
                  <span className="text-xs text-gray-400 font-mono">ID: #{o.id}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4 italic">{o.local}</p>
                <p className="text-xs text-gray-500 mb-4">Relatado por: <strong>{o.relator}</strong></p>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => alterarStatus(o.id, 'em andamento')}
                    className="flex-1 bg-[#004A8D] text-white py-2 rounded-lg font-bold text-sm hover:bg-blue-900 transition-all"
                  >
                    Aceitar Resgate
                  </button>
                  <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 text-sm">
                    Recusar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-gray-700">Ocorrências em Curso</h2>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {ocorrencias.filter(o => o.status === 'em andamento').map(o => (
              <div key={o.id} className="p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-800">{o.animal}</p>
                    <p className="text-xs text-gray-500">{o.local}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <StatusBadge status={o.status} />
                    <button 
                      onClick={() => confirmResolveModal.openModal(o.id)}
                      className="text-xs font-bold text-green-600 hover:underline"
                    >
                      Marcar como Resolvido
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <ConfirmModal 
        isOpen={confirmResolveModal.isOpen}
        onClose={confirmResolveModal.closeModal}
        onConfirm={confirmarResolucao}
        title="Finalizar Resgate?"
        message="Confirme que o animal foi acolhido. Isso encerrará a ocorrência no sistema."
        confirmText="Confirmar"
        type="info"
      />
    </div>
  );
}