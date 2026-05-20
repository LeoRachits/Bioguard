"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutDashboard, Search, User, ShieldCheck } from 'lucide-react';
import LogoutButton from './LogoutButton';

export default function Navigation() {
  const pathname = usePathname();

const links = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Diretório', href: '/instituicoes', icon: Search },
    { name: 'Admin', href: '/admin', icon: ShieldCheck },
    { name: 'Perfil', href: '/perfil', icon: User },
  ];

  const isActive = (path) => pathname === path;

  return (
    <>
      <aside className="hidden md:flex flex-col w-64 bg-[#004A8D] h-screen sticky top-0 left-0 text-white p-6 shadow-xl">
        <div className="mb-10">
          <h2 className="text-2xl font-black tracking-tighter">BIOGUARD <span className="text-[#FFD100]">CIALNE</span></h2>
        </div>
        
        <nav className="flex-1 space-y-2">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`flex items-center gap-3 p-3 rounded-xl font-bold transition-all ${
                isActive(link.href) ? 'bg-[#FFD100] text-[#004A8D]' : 'hover:bg-blue-800 text-blue-100'
              }`}
            >
              <link.icon size={20} />
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="mb-4 pt-4 border-t border-blue-800">
          <LogoutButton />
        </div>
        
        <div className="pt-6 border-t border-blue-800 text-xs text-blue-300">
          Versão 1.0.4 - Estudo Leandro
        </div>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center p-3 z-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        {links.map((link) => (
          <Link 
            key={link.name} 
            href={link.href}
            className={`flex flex-col items-center gap-1 transition-all ${
              isActive(link.href) ? 'text-[#004A8D]' : 'text-gray-400'
            }`}
          >
            <link.icon size={22} strokeWidth={isActive(link.href) ? 3 : 2} />
            <span className="text-[10px] font-bold uppercase">{link.name}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}