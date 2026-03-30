"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

export default function NovaInstituicao() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    tipo: 'ONG',
    responsavel: '',
    local: '',
    telefone: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/instituicoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/instituicoes'); // Volta para o diretório após salvar
        router.refresh();
      }
    } catch (error) {
      alert("Erro ao cadastrar instituição");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <Link href="/instituicoes" className="flex items-center gap-2 text-[#004A8D] font-bold mb-6 hover:-translate-x-1 transition-transform">
        <ArrowLeft size={20} /> Voltar para o Diretório
      </Link>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <h1 className="text-2xl font-black text-[#004A8D] uppercase tracking-tighter mb-8">
          Cadastrar Nova <span className="text-[#FFD100]">Instituição</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-1">Nome da Instituição / ONG</label>
            <input 
              required
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#004A8D] outline-none transition-all"
              placeholder="Ex: Abrigo São Lázaro"
              onChange={(e) => setFormData({...formData, nome: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-1">Tipo</label>
              <select 
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#004A8D] outline-none"
                onChange={(e) => setFormData({...formData, tipo: e.target.value})}
              >
                <option value="ONG">ONG</option>
                <option value="CCZ">CCZ</option>
                <option value="CLÍNICA">Clínica Vet</option>
                <option value="PROTETOR">Protetor Independente</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-1">Telefone (WhatsApp)</label>
              <input 
                required
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#004A8D] outline-none"
                placeholder="(85) 9..."
                onChange={(e) => setFormData({...formData, telefone: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-1">Responsável</label>
            <input 
              required
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#004A8D] outline-none"
              placeholder="Nome do contato principal"
              onChange={(e) => setFormData({...formData, responsavel: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-black text-gray-400 uppercase mb-2 ml-1">Localização (Cidade/Bairro)</label>
            <input 
              required
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#004A8D] outline-none"
              placeholder="Ex: Maracanaú - CE"
              onChange={(e) => setFormData({...formData, local: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#004A8D] text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-900 transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
            <Save size={20} />
            {loading ? "Salvando..." : "Finalizar Cadastro"}
          </button>
        </form>
      </div>
    </div>
  );
}