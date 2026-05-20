"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bell } from 'lucide-react';

export default function NotificationBell() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    async function buscarAlertas() {
      try {
        const res = await fetch('/api/ocorrencias');
        const data = await res.json();
        
        const ultimas = data.slice(0, 5).map(oc => ({
          id: oc.id,
          text: `Novo registro: ${oc.animal} (${oc.porte})`,
          time: new Date(oc.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        }));
        
        setAlerts(ultimas);
        setUnread(ultimas.length);
      } catch (error) {
        console.error("Erro ao carregar notificações:", error);
      }
    }

    buscarAlertas();
    const interval = setInterval(buscarAlertas, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleNotificationClick = (id) => {
    setOpen(false);
    router.push(`/ocorrencias/${id}`);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => { setOpen(!open); setUnread(0); }} 
        className={`relative p-2 rounded-full transition-all ${open ? 'bg-blue-50 text-[#004A8D]' : 'text-gray-500 hover:bg-gray-100'}`}
      >
        <Bell size={24} strokeWidth={2.5} />
        {unread > 0 && (
          <span className="absolute top-0 right-0 bg-[#FFD100] text-[#004A8D] text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)}></div>
          
          <div className="absolute right-0 mt-3 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in duration-200 origin-top-right">
            <div className="p-5 bg-[#004A8D] text-white font-black text-xs uppercase tracking-widest flex justify-between items-center">
              Alertas Recentes
              <span className="bg-blue-600 px-2 py-0.5 rounded text-[9px]">{alerts.length} NOVOS</span>
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              {alerts.length > 0 ? (
                alerts.map(alert => (
                  <div 
                    key={alert.id} 
                    onClick={() => handleNotificationClick(alert.id)}
                    className="p-4 border-b border-gray-50 hover:bg-blue-50 cursor-pointer transition-colors group"
                  >
                    <div className="flex gap-3">
                      <div className="w-2 h-2 bg-[#FFD100] rounded-full mt-1.5 shrink-0"></div>
                      <div>
                        <p className="text-sm text-gray-700 font-bold group-hover:text-[#004A8D]">{alert.text}</p>
                        <p className="text-[10px] text-gray-400 mt-1 font-black uppercase italic">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-400 text-xs italic font-medium">
                  Nenhuma atividade recente.
                </div>
              )}
            </div>
            
            <button className="w-full py-3 bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#004A8D] transition-colors border-t">
              Ver histórico completo
            </button>
          </div>
        </>
      )}
    </div>
  );
}