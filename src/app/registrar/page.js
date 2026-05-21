'use client'
import { useState, useRef } from 'react'
import Toast from '../../components/Toast'

export default function RegistrarPage() {
  const [formData, setFormData] = useState({
    animal: '', porte: 'pequeno', localizacao: '',
    estado_aparente: '', latitude: null, longitude: null, foto_url: ''
  })
  const [fotoPreview, setFotoPreview] = useState(null)
  const [enviando, setEnviando] = useState(false)
  const [showToast, setShowToast] = useState(null)
  const cameraRef = useRef(null)
  const galeriaRef = useRef(null)

  const handleFoto = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setFotoPreview(reader.result)
      setFormData(prev => ({ ...prev, foto_url: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  const handleGetLocation = (e) => {
    e.preventDefault()
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setFormData(prev => ({
          ...prev,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          localizacao: `Coordenadas: ${pos.coords.latitude}, ${pos.coords.longitude}`
        }))
        setShowToast({ message: 'Localização capturada!', type: 'success' })
      })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setEnviando(true)
    try {
      const response = await fetch('/api/ocorrencias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setShowToast({ message: 'Ocorrência registrada com sucesso!', type: 'success' })
        setFormData({ animal: '', porte: 'pequeno', localizacao: '', estado_aparente: '', latitude: null, longitude: null, foto_url: '' })
        setFotoPreview(null)
      } else {
        setShowToast({ message: 'Erro ao salvar no banco.', type: 'error' })
      }
    } catch {
      setShowToast({ message: 'Falha na conexão com o servidor.', type: 'error' })
    } finally {
      setEnviando(false)
      setTimeout(() => setShowToast(null), 4000)
    }
  }

  return (
    <div className="max-w-xl mx-auto py-8">
      {showToast && <Toast message={showToast.message} type={showToast.type} onClose={() => setShowToast(null)} />}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-[#004A8D] p-6 text-white">
          <h2 className="text-xl font-bold">Registrar Nova Ocorrência</h2>
          <p className="text-blue-100 text-sm">Preencha os dados do animal encontrado em campo.</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Foto do Animal</label>
            {fotoPreview ? (
              <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200">
                <img src={fotoPreview} alt="Preview" className="w-full h-full object-cover" />
                <button type="button" onClick={() => { setFotoPreview(null); setFormData(p => ({...p, foto_url: ''})) }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold">✕</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => cameraRef.current.click()}
                  className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-[#004A8D] rounded-lg bg-blue-50 hover:bg-blue-100 transition-all">
                  <svg className="w-7 h-7 text-[#004A8D] mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-xs font-bold text-[#004A8D]">Tirar Foto</span>
                  <input ref={cameraRef} type="file" className="hidden" capture="environment" accept="image/*" onChange={handleFoto} />
                </button>
                <button type="button" onClick={() => galeriaRef.current.click()}
                  className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all">
                  <svg className="w-7 h-7 text-gray-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs font-bold text-gray-500">Galeria / PC</span>
                  <input ref={galeriaRef} type="file" className="hidden" accept="image/*" onChange={handleFoto} />
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Espécie</label>
              <select value={formData.animal} onChange={e => setFormData({...formData, animal: e.target.value})} required
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#004A8D] outline-none">
                <option value="">Selecione...</option>
                <option value="Cão">Cão</option>
                <option value="Gato">Gato</option>
                <option value="Silvestre">Silvestre</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-700">Porte</label>
              <select value={formData.porte} onChange={e => setFormData({...formData, porte: e.target.value})}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#004A8D] outline-none">
                <option value="pequeno">Pequeno</option>
                <option value="medio">Médio</option>
                <option value="grande">Grande</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Localização</label>
            <button onClick={handleGetLocation}
              className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg font-semibold transition-colors ${formData.latitude ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-[#004A8D] hover:bg-gray-200'}`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {formData.latitude ? 'Localização Capturada ✓' : 'Obter Localização Atual'}
            </button>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-gray-700">Estado Aparente</label>
            <textarea value={formData.estado_aparente} onChange={e => setFormData({...formData, estado_aparente: e.target.value})}
              placeholder="Descreva a situação do animal..." required
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg h-28 focus:ring-2 focus:ring-[#004A8D] outline-none"></textarea>
          </div>

          <button type="submit" disabled={enviando}
            className={`w-full font-black py-4 rounded-xl shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-3 ${enviando ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#FFD100] text-[#004A8D] hover:bg-yellow-400'}`}>
            {enviando ? 'PROCESSANDO...' : 'NOTIFICAR INSTITUIÇÃO'}
          </button>
        </form>
      </div>
    </div>
  )
}