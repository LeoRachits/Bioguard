// src/components/ConfirmModal.js
"use client"
import { AlertTriangle, Info, X } from 'lucide-react';

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirmar", cancelText = "Cancelar", type = 'info' }) {
  if (!isOpen) return null;

  const styles = {
    danger: {
      icon: AlertTriangle,
      iconColor: 'text-red-600',
      bgColor: 'bg-red-100',
      btnColor: 'bg-red-600 hover:bg-red-700'
    },
    info: {
      icon: Info,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      btnColor: 'bg-[#004A8D] hover:bg-blue-900'
    }
  };

  const currentStyle = styles[type] || styles.info;
  const Icon = currentStyle.icon;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full border border-gray-100 animate-zoom-in">
        
        <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 p-1">
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className={`${currentStyle.bgColor} ${currentStyle.iconColor} p-4 rounded-full mb-6`}>
            <Icon size={32} />
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">{message}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={onClose} 
            className="flex-1 px-5 py-3 border border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            {cancelText}
          </button>
          <button 
            onClick={onConfirm} 
            className={`flex-1 px-5 py-3 ${currentStyle.btnColor} text-white rounded-xl font-bold transition-all transform active:scale-95 shadow-md`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}