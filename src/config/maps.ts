import { PlaceType, FoodType, SortOption } from '../types/maps';

export const MAPS_CONFIG = {
  defaultCenter: {
    lat: 48.8566,
    lng: 2.3522
  },
  defaultZoom: 15, // Zoom ajusté pour une meilleure vue des lieux
  searchRadius: 1000, // Rayon de recherche réduit pour plus de pertinence
  maxZoom: 18,
  minZoom: 10
};

export const MAPS_LIBRARIES: ("places" | "geometry" | "drawing")[] = ["places"];

export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const PLACE_TYPES: { value: PlaceType; label: string }[] = [
  { value: 'restaurant', label: 'Restaurants' },
  { value: 'cafe', label: 'Cafés' },
  { value: 'bar', label: 'Bars' },
  { value: 'bakery', label: 'Boulangeries' },
  { value: 'meal_takeaway', label: 'À emporter' },
  { value: 'meal_delivery', label: 'Livraison' },
  { value: 'food', label: 'Alimentation' },
  { value: 'convenience_store', label: 'Supérettes' },
  { value: 'supermarket', label: 'Supermarchés' },
  { value: 'fast_food', label: 'Fast-food' },
  { value: 'night_club', label: 'Boîtes de nuit' },
  { value: 'liquor_store', label: 'Cave à vins' }
];

export const FOOD_TYPES: { value: FoodType; label: string }[] = [
  { value: 'all', label: 'Tous types' },
  { value: 'french', label: 'Française' },
  { value: 'italian', label: 'Italienne' },
  { value: 'japanese', label: 'Japonaise' },
  { value: 'chinese', label: 'Chinoise' },
  { value: 'indian', label: 'Indienne' },
  { value: 'thai', label: 'Thaïlandaise' },
  { value: 'vietnamese', label: 'Vietnamienne' },
  { value: 'korean', label: 'Coréenne' },
  { value: 'mexican', label: 'Mexicaine' },
  { value: 'mediterranean', label: 'Méditerranéenne' },
  { value: 'lebanese', label: 'Libanaise' },
  { value: 'greek', label: 'Grecque' },
  { value: 'spanish', label: 'Espagnole' },
  { value: 'american', label: 'Américaine' },
  { value: 'burger', label: 'Burgers' },
  { value: 'pizza', label: 'Pizzas' },
  { value: 'sushi', label: 'Sushi' },
  { value: 'seafood', label: 'Fruits de mer' },
  { value: 'steakhouse', label: 'Steakhouse' },
  { value: 'vegetarian', label: 'Végétarien' },
  { value: 'vegan', label: 'Végan' },
  { value: 'halal', label: 'Halal' },
  { value: 'kosher', label: 'Casher' }
];

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'rating', label: 'Note moyenne' },
  { value: 'distance', label: 'Distance' },
  { value: 'price', label: 'Prix' },
  { value: 'popularity', label: 'Popularité' }
];

export const API_ERROR_MESSAGES = {
  NOT_ACTIVATED: "L'API Google Maps n'est pas activée. Veuillez activer l'API Places dans votre console Google Cloud.",
  INVALID_KEY: "La clé API Google Maps n'est pas valide.",
  GENERAL: "Une erreur est survenue lors de l'initialisation de Google Maps.",
  PLACES_ERROR: "Impossible de rechercher les lieux à proximité. Veuillez vérifier que l'API Places est activée.",
  NO_RESULTS: "Aucun établissement trouvé dans cette zone."
};