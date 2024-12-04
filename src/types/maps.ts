export interface Location {
  lat: number;
  lng: number;
}

export interface Geometry {
  location: Location;
}

export interface Photo {
  height: number;
  width: number;
  html_attributions: string[];
  photo_reference: string;
}

export interface Place {
  id: string;
  name: string;
  vicinity: string;
  geometry: Geometry;
  types: string[];
  place_id?: string;
  rating?: number;
  price_level?: number;
  user_ratings_total?: number;
  photos?: Photo[];
  opening_hours?: {
    isOpen: boolean;
    periods?: google.maps.places.PlaceOpeningHours['periods'];
    weekday_text?: string[];
  };
  reviews?: google.maps.places.PlaceReview[];
  website?: string;
  formatted_phone_number?: string;
}

export type PlaceType = 
  | 'restaurant'
  | 'cafe'
  | 'bar'
  | 'bakery'
  | 'meal_takeaway'
  | 'meal_delivery'
  | 'food'
  | 'convenience_store'
  | 'supermarket'
  | 'fast_food'
  | 'night_club'
  | 'liquor_store';

export type FoodType = 
  | 'all'
  | 'french'
  | 'italian'
  | 'japanese'
  | 'chinese'
  | 'indian'
  | 'thai'
  | 'vietnamese'
  | 'korean'
  | 'mexican'
  | 'mediterranean'
  | 'lebanese'
  | 'greek'
  | 'spanish'
  | 'american'
  | 'burger'
  | 'pizza'
  | 'sushi'
  | 'seafood'
  | 'steakhouse'
  | 'vegetarian'
  | 'vegan'
  | 'halal'
  | 'kosher';

export type SortOption = 
  | 'rating'
  | 'distance'
  | 'price'
  | 'popularity';

export interface PlacesFilters {
  placeType: PlaceType;
  foodType: FoodType;
  sortBy: SortOption;
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string;
}

export interface PlacesSearchRequest extends Partial<google.maps.places.PlaceSearchRequest> {
  location: Location;
  radius: number;
}