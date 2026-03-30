"use client"
import { useState } from "react"
import Toast from "../../components/Toast"

export default function HomePage() {
    const [formData, setFormData] = useState({
        animal: "",
        porte: "pequeno",
        localizacao: "",
        estado_aparente: "",
        latitude: null,
        longitude: null
    })

    const [enviando, setEnviando] = useState(false)
    const [showToast, setShowToast] = useState(null)

    const handleGetLocation = (e) => {
        e.preventDefault();
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setFormData(prev => ({
                    ...prev,
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    localizacao: `Coordenadas: ${pos.coords.latitude}, ${pos.coords.longitude}`
                }));
                setShowToast({ message: "Localização capturada!", type: "success" });
            });
        }
    };

    const handleNotify = async (event) => {
        event.preventDefault()
        setEnviando(true)

        try {
            const response = await fetch('/api/ocorrencias', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setShowToast({ message: "Notificação enviada com sucesso!", type: "success" })
                setFormData({ animal: "", porte: "pequeno", localizacao: "", estado_aparente: "", latitude: null, longitude: null })
            } else {
                setShowToast({ message: "Erro ao salvar no banco de dados.", type: "error" })
            }
        } catch (error) {
            setShowToast({ message: "Falha na conexão com o servidor.", type: "error" })
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

                <form onSubmit={handleNotify} className="p-6 space-y-5">
                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700">Foto do Animal</label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <p className="text-sm text-gray-500 font-medium">Toque para tirar foto</p>
                                </div>
                                <input type="file" className="hidden" capture="environment" accept="image/*" />
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700">Espécie</label>
                            <select 
                                value={formData.animal}
                                onChange={e => setFormData({...formData, animal: e.target.value})}
                                required
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#004A8D] outline-none transition-all"
                            >
                                <option value="">Selecione...</option>
                                <option value="Cão">Cão</option>
                                <option value="Gato">Gato</option>
                                <option value="Silvestre">Silvestre</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700">Porte</label>
                            <select 
                                value={formData.porte}
                                onChange={e => setFormData({...formData, porte: e.target.value})}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#004A8D] outline-none"
                            >
                                <option value="pequeno">Pequeno</option>
                                <option value="medio">Médio</option>
                                <option value="grande">Grande</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700">Localização</label>
                        <button 
                            onClick={handleGetLocation}
                            className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg font-semibold transition-colors ${formData.latitude ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-[#004A8D] hover:bg-gray-200'}`}
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {formData.latitude ? 'Localização Capturada ✓' : 'Obter Localização Atual'}
                        </button>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-bold text-gray-700">Estado Aparente</label>
                        <textarea 
                            value={formData.estado_aparente}
                            onChange={e => setFormData({...formData, estado_aparente: e.target.value})}
                            placeholder="Descreva a situação do animal..."
                            required
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg h-28 focus:ring-2 focus:ring-[#004A8D] outline-none"
                        ></textarea>
                    </div>
                
                    <button 
                        type="submit"
                        disabled={enviando}
                        className={`w-full font-black py-4 rounded-xl shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-3
                        ${enviando ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#FFD100] text-[#004A8D] hover:bg-yellow-400'}`}
                    >
                        {enviando ? (
                            <>
                                <div className="w-5 h-5 border-4 border-t-transparent border-[#004A8D] rounded-full animate-spin"></div>
                                PROCESSANDO...
                            </>
                        ) : (
                            'NOTIFICAR INSTITUIÇÃO'
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}