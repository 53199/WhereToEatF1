import {
  Utensils,
  Coffee,
  Beer,
  Pizza,
  Sandwich,
  ShoppingBag,
  Truck,
  Store,
  Wine,
  Music,
  Building,
  LucideIcon
} from 'lucide-react';

interface PlaceTypeIcon {
  icon: LucideIcon;
  color: string;
}

const PLACE_TYPE_ICONS: Record<string, PlaceTypeIcon> = {
  restaurant: { icon: Utensils, color: '#ef4444' },
  bakery: { icon: Coffee, color: '#f59e0b' },
  cafe: { icon: Coffee, color: '#10b981' },
  bar: { icon: Beer, color: '#8b5cf6' },
  meal_takeaway: { icon: ShoppingBag, color: '#6366f1' },
  meal_delivery: { icon: Truck, color: '#8b5cf6' },
  supermarket: { icon: Store, color: '#ec4899' },
  night_club: { icon: Music, color: '#9333ea' },
  food: { icon: Pizza, color: '#f97316' },
  fast_food: { icon: Sandwich, color: '#f43f5e' },
  liquor_store: { icon: Wine, color: '#7c3aed' },
  default: { icon: Building, color: '#6b7280' }
};

export function getPlaceTypeIcon(type: string): PlaceTypeIcon {
  return PLACE_TYPE_ICONS[type] || PLACE_TYPE_ICONS.default;
}