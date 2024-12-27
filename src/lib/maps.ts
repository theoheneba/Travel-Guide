import { Place, Location } from '@/types';

const GOOGLE_MAPS_API_KEY = '**************************************';
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

export async function searchPlaces(query: string): Promise<Location> {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      query
    )}&key=${GOOGLE_MAPS_API_KEY}`
  );
  const data = await response.json();

  if (data.results && data.results.length > 0) {
    const location = data.results[0].geometry.location;
    return {
      name: data.results[0].formatted_address,
      latitude: location.lat,
      longitude: location.lng,
    };
  }
  throw new Error('Location not found');
}

export async function getNearbyPlaces(
  latitude: number,
  longitude: number,
  type: 'tourist_attraction' | 'restaurant'
): Promise<Place[]> {
  const response = await fetch(
    `${CORS_PROXY}https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=${type}&key=${GOOGLE_MAPS_API_KEY}`
  );
  const data = await response.json();

  if (!data.results) {
    return [];
  }

  return data.results.map((place: any) => ({
    id: place.place_id,
    name: place.name,
    type: type === 'tourist_attraction' ? 'attraction' : 'restaurant',
    address: place.vicinity,
    rating: place.rating,
    latitude: place.geometry.location.lat,
    longitude: place.geometry.location.lng,
    priceLevel: place.price_level,
    photos: place.photos?.map(
      (photo: any) =>
        `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${GOOGLE_MAPS_API_KEY}`
    ),
  }));
}