import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Menggunakan custom icon dari CDN untuk menghindari isu import marker Vite
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function ContactMap() {
  const position: [number, number] = [1.2847, 103.8440]; // Chinatown, Singapore

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden z-10 relative">
      <MapContainer 
        center={position} 
        zoom={15} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%', zIndex: 10 }}
      >
        {/* CartoDB Dark Matter tile layer (Gratis, Tanpa API Key, Dark Mode mirip GTA V) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            <div className="text-gray-900 font-sans">
              <strong>Lokasi Kami</strong><br/>
              Chinatown, Singapore
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
