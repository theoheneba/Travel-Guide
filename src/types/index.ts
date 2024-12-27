export interface Place {
  id: string;
  name: string;
  type: 'attraction' | 'restaurant';
  address: string;
  rating?: number;
  photos?: string[];
  description?: string;
  latitude: number;
  longitude: number;
  priceLevel?: number;
}

export interface Location {
  name: string;
  latitude: number;
  longitude: number;
}