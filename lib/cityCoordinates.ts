export interface CityCoordinates {
  lat: number;
  lng: number;
}

export const cityCoordinates: Record<string, CityCoordinates> = {
  // Villes du script create-cities.js
  'st-aignan-sur-cher': { lat: 47.2689, lng: 1.3767 },
  'thesee': { lat: 47.3333, lng: 1.3000 },
  'noyer-sur-cher': { lat: 47.2833, lng: 1.4000 },
  'selles-sur-cher': { lat: 47.2789, lng: 1.5539 },
  'seigy': { lat: 47.2500, lng: 1.6500 },
  'contres': { lat: 47.4167, lng: 1.4167 },
  'cheverny': { lat: 47.5022, lng: 1.4583 },
  'chambord': { lat: 47.6164, lng: 1.5172 },
  'chenonceaux': { lat: 47.3244, lng: 1.0703 },
  'bracieux': { lat: 47.5500, lng: 1.5333 },
  'soings-en-sologne': { lat: 47.4500, lng: 1.5167 },
  'fontaine-en-sologne': { lat: 47.5167, lng: 1.5333 },
  'romorantin': { lat: 47.3589, lng: 1.7439 },
  'mareuil-sur-cher': { lat: 47.2833, lng: 1.3333 },
  'blois': { lat: 47.5861, lng: 1.3359 },
  'celettes': { lat: 47.5333, lng: 1.3833 },
  'cormeray': { lat: 47.5667, lng: 1.4000 },
  'st-romain-sur-cher': { lat: 47.3167, lng: 1.4000 },
  'couddes': { lat: 47.4667, lng: 1.3833 },
  
  // Ville ajoutée manuellement
  'chemery': { lat: 47.3500, lng: 1.4500 },
  
  // Coordonnées par défaut (Tours)
  'default': { lat: 47.2184, lng: 0.7055 }
};

export function getCityCoordinates(cityName: string): CityCoordinates {
  // Normaliser le nom de la ville pour la recherche
  const normalizedCityName = cityName.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Chercher dans les coordonnées exactes
  for (const [key, coords] of Object.entries(cityCoordinates)) {
    if (key === normalizedCityName) {
      return coords;
    }
  }
  
  // Si pas trouvé, retourner les coordonnées par défaut
  return cityCoordinates.default;
} 