"use client"
import { useState, useEffect } from 'react';

export default function AdminMasterPage() {
  const [abaAtiva, setAbaAtiva] = useState('empresas');
  const [instituicoes, setInstituicoes] = useState([]); // Estado para os dados do banco
  const [loading, setLoading] = useState(true);

  // Busca os dados das Instituições do Banco de Dados
  useEffect(() => {
    async function carregarInstituicoes() {
      try {
        const response = await fetch('/api/instituicoes');
        const data = await response.json();
        setInstituicoes(data);
      } catch (error) {
        console.error("Erro ao carregar instituições:", error);
      } finally {
        setLoading(false);
      }
    }
    carregarInstituicoes();
  }, []);

  // Dados mockados para empresas (ainda fixos até criarmos essa tabela)
  const empresas = [
    { id: 1, nome: 'Cialne - Unidade 1', cnpj: '00.000.000/0001-01', local: 'Fortaleza', status: 'Ativo' },
    { id: 2, nome: 'Cialne - Logística', cnpj: '00.000.000/0002-02', local: 'Caucaia', status: 'Ativo' },
  ];

  return (
    <div className="py-6 space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-[#004A8D] uppercase tracking-tighter">
            Admin <span className="text-[#FFD100]">Master</span>
          </h1>
          <p className="text-sm text-gray-500 font-medium">Gestão global de parceiros e unidades.</p>
        </div>
        <button className="bg-[#004A8D] text-white px-5 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-transform">
          + Novo Cadastro
        </button>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button 
          onClick={() => setAbaAtiva('empresas')}
          className={`px-6 py-3 font-bold text-sm transition-all ${abaAtiva === 'empresas' ? 'border-b-4 border-[#004A8D] text-[#004A8D]' : 'text-gray-400'}`}
        >
          EMPRESAS
        </button>
        <button 
          onClick={() => setAbaAtiva('instituicoes')}
          className={`px-6 py-3 font-bold text-sm transition-all ${abaAtiva === 'instituicoes' ? 'border-b-4 border-[#004A8D] text-[#004A8D]' : 'text-gray-400'}`}
        >
          INSTITUIÇÕES
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            {abaAtiva === 'empresas' ? (
              <tr>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Unidade</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">CNPJ</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Local</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Ações</th>
              </tr>
            ) : (
              <tr>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Nome da ONG</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Responsável</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Contato</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Ações</th>
              </tr>
            )}
          </thead>

          <tbody className="divide-y divide-gray-50 text-sm">
            {abaAtiva === 'empresas' ? (
              empresas.map(e => (
                <tr key={e.id} className="hover:bg-gray-50">
                  <td className="p-4 font-bold text-gray-700">{e.nome}</td>
                  <td className="p-4 text-gray-500">{e.cnpj}</td>
                  <td className="p-4 text-gray-500">{e.local}</td>
                  <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-md text-[10px] font-black uppercase">{e.status}</span></td>
                  <td className="p-4 text-right flex justify-end gap-3 text-gray-400">
                    <button className="hover:text-blue-600">Editar</button>
                    <button className="hover:text-red-600">Excluir</button>
                  </td>
                </tr>
              ))
            ) : (
              // EXIBIÇÃO DOS DADOS DO PRISMA
              loading ? (
                <tr><td colSpan="5" className="p-10 text-center text-gray-400">Carregando dados do banco...</td></tr>
              ) : (
                instituicoes.map(i => (
                  <tr key={i.id} className="hover:bg-gray-50">
                    <td className="p-4 font-bold text-gray-700">{i.nome}</td>
                    <td className="p-4 text-gray-500">{i.responsavel}</td>
                    <td className="p-4 text-gray-500">{i.telefone}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${i.status_validacao ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {i.status_validacao ? 'Validado' : 'Pendente'}
                      </span>
                    </td>
                    <td className="p-4 text-right flex justify-end gap-3 text-gray-400">
                      <button className="hover:text-blue-600">Validar</button>
                      <button className="hover:text-red-600">Remover</button>
                    </td>
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
      </div>

      <blockquote className="border-l-4 border-[#FFD100] bg-blue-50 p-4 text-xs text-blue-900 italic">
        Atenção: Todas as alterações realizadas neste painel são registradas para fins de auditoria ambiental.
      </blockquote>
    </div>
  );
}