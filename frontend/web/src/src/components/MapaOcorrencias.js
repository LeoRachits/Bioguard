"use client"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

export default function MapaOcorrencias({ ocorrencias }) {
  const center = [-3.7319, -38.5267]; 

  return (
    <div className="h-80 w-full rounded-xl overflow-hidden border border-gray-100 shadow-sm z-0">
      <MapContainer center={center} zoom={11} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        {ocorrencias.map((item) => (
          item.latitude && item.longitude && (
            <Marker key={item.id} position={[item.latitude, item.longitude]} icon={icon}>
              <Popup>
                <div className="text-sm">
                  <strong className="text-[#004A8D] uppercase">{item.animal}</strong>
                  <p className="text-gray-500 m-0">Porte: {item.porte}</p>
                  <p className="font-bold m-0">{item.localizacao}</p>
                </div>
              </Popup>
            </Marker>
          )
        ))}
      </MapContainer>
    </div>
  );
}