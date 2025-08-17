"use client";

import { useEffect, useRef, useState } from 'react';

interface CityMapProps {
  cityName: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

// Composant de carte rendu côté client uniquement
const CityMapClient = ({ cityName, coordinates }: CityMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  // Coordonnées du Clos des Rossignols (fixes)
  const closDesRossignolsCoords = { lat: 47.344553, lng: 1.477508 };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Import dynamique de Leaflet
    const initMap = async () => {
      const L = await import('leaflet');
      // Charger les styles CSS de Leaflet
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      if (!mapRef.current || mapInstanceRef.current) return;

      // Initialiser la carte centrée entre les deux points
      const centerLat = (coordinates.lat + closDesRossignolsCoords.lat) / 2;
      const centerLng = (coordinates.lng + closDesRossignolsCoords.lng) / 2;
      const map = L.map(mapRef.current).setView([centerLat, centerLng], 10);
      mapInstanceRef.current = map;

      // Ajouter la couche de tuiles OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      // Marqueur pour Le Clos des Rossignols avec le logo
      const closDesRossignolsIcon = L.divIcon({
        className: 'clos-des-rossignols-marker',
        html: `
          <div class="bg-white rounded-full p-2 shadow-xl border-4 border-custom-color transform rotate-12 hover:scale-110 transition-transform duration-300">
            <img src="/logo.png" alt="Le Clos des Rossignols" class="w-8 h-8 object-contain" />
          </div>
        `,
        iconSize: [56, 56],
        iconAnchor: [28, 56],
        popupAnchor: [0, -56],
      });

      const closDesRossignolsMarker = L.marker([closDesRossignolsCoords.lat, closDesRossignolsCoords.lng], { 
        icon: closDesRossignolsIcon 
      }).addTo(map);
      
      // Popup pour Le Clos des Rossignols
      closDesRossignolsMarker.bindPopup(`
        <div class="text-center p-2">
          <div class="font-bold text-custom-color text-lg mb-2">🏰 Le Clos des Rossignols</div>
          <div class="text-sm text-gray-600">Complexe d'hébergement thématique</div>
          <div class="text-xs text-gray-500 mt-1">Val de Loire, France</div>
          <div class="mt-3">
            <a href="https://www.leclosdesrossignols.fr/fr" 
               class="inline-block bg-custom-color text-white px-3 py-1 rounded-full text-xs hover:bg-custom-color/90 transition-colors">
              Réserver maintenant
            </a>
          </div>
        </div>
      `);

      // Marqueur pour la ville visitée
      const cityIcon = L.divIcon({
        className: 'city-marker',
        html: `
          <div class="bg-custom-color text-custom-color-2 rounded-full p-3 shadow-xl border-4 border-white hover:scale-110 transition-transform duration-300">
            <div class="w-8 h-8 flex items-center justify-center">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        `,
        iconSize: [56, 56],
        iconAnchor: [28, 56],
        popupAnchor: [0, -56],
      });

      const cityMarker = L.marker([coordinates.lat, coordinates.lng], { 
        icon: cityIcon 
      }).addTo(map);
      
      // Popup pour la ville
      cityMarker.bindPopup(`
        <div class="text-center p-2">
          <div class="font-bold text-blue-500 text-lg mb-2">📍 ${cityName}</div>
          <div class="text-sm text-gray-600">Ville du Val de Loire</div>
          <div class="text-xs text-gray-500 mt-1">France</div>
        </div>
      `);

      // Ajuster la vue pour inclure les deux points
      const bounds = L.latLngBounds([
        [closDesRossignolsCoords.lat, closDesRossignolsCoords.lng],
        [coordinates.lat, coordinates.lng]
      ]);
      map.fitBounds(bounds, { padding: [50, 50] });
    };

    initMap();

    // Nettoyage lors du démontage
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [coordinates.lat, coordinates.lng, cityName]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="w-full h-full">
      <div 
        ref={mapRef} 
        className="w-full h-[400px] rounded-xl shadow-lg"
        style={{ zIndex: 1 }}
      />
    </div>
  );
};

// Composant principal avec gestion du rendu côté client
export function CityMap(props: CityMapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-[400px] rounded-xl shadow-lg bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Chargement de la carte...</div>
      </div>
    );
  }

  return <CityMapClient {...props} />;
} 