import { Phone, Mail, MapPin, ShieldCheck, WhatsappIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function InstitutionCard({ institution }) {
  if (!institution) return null;

  const whatsappLink = `https://wa.me/55${institution.telefone?.replace(/\D/g, '')}?text=Olá...`;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group">

      <div className="p-6">
        <div className="flex gap-2 mt-6">
          <a 
            href={whatsappLink}
            target="_blank"
            className="flex-1 bg-[#25D366] text-white text-center py-3 rounded-xl text-xs font-black uppercase hover:bg-green-600 transition-all flex items-center justify-center"
          >
            WhatsApp
          </a>
      
          <Link 
            href={`/instituicoes/${institution.id}`}
            className="flex-1 border-2 border-gray-100 text-gray-400 py-3 rounded-xl font-black text-xs uppercase hover:border-[#004A8D] hover:text-[#004A8D] transition-all flex items-center justify-center text-center"
          >
            Perfil
          </Link>
        </div>
      </div>
    </div>
  );
}