"use client"
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', { method: 'POST' });

      if (response.ok) {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <button 
    onClick={handleLogout}
    className="flex items-center gap-3 w-full p-3 rounded-xl font-bold text-blue-100 hover:bg-red-500/20 hover:text-red-400 transition-all"
  >
    <LogOut size={20} />
    Sair do Sistema
  </button>
  );
}