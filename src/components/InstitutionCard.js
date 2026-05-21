import Link from 'next/link';
export default function InstitutionCard({ institution }) {
  if (!institution) return null;
  const whatsappLink = 'https://wa.me/55' + (institution.telefone?.replace(/\\D/g, '') || '') + '?text=Ola, vim pelo BioGuard!';
  const tipoColor = institution.tipo === 'ONG' ? '#25D366' : institution.tipo === 'CCZ' ? '#004A8D' : '#F59E0B';
  return (
    <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group'>
      <div className='p-6'>
        <div className='flex items-center gap-2 mb-2'>
          <span style={{background: tipoColor}} className='text-white text-xs font-bold px-2 py-1 rounded-full'>{institution.tipo}</span>
          {institution.status_validacao && <span className='text-xs text-green-600 font-semibold'>Validada</span>}
        </div>
        <h3 className='font-bold text-gray-800 text-base mb-1'>{institution.nome}</h3>
        {institution.responsavel && <p className='text-xs text-gray-500 mb-1'>Resp: {institution.responsavel}</p>}
        <p className='text-xs text-gray-500 mb-1'>{institution.local}</p>
        <p className='text-xs text-gray-400 mb-4'>{institution.telefone}</p>
        <div className='flex gap-2 mt-2'>
          <a href={whatsappLink} target='_blank' className='flex-1 bg-[#25D366] text-white text-center py-3 rounded-xl text-xs font-black uppercase hover:bg-green-600 transition-all flex items-center justify-center'>WhatsApp</a>
          <a href={'/instituicoes/' + institution.id} className='flex-1 border-2 border-gray-100 text-gray-400 py-3 rounded-xl font-black text-xs uppercase hover:border-[#004A8D] hover:text-[#004A8D] transition-all flex items-center justify-center text-center'>Perfil</a>
        </div>
      </div>
    </div>
  );
}
