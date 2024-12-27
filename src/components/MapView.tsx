import { useEffect, useRef } from 'react';
import { Place } from '@/types';
import { Card } from '@/components/ui/card';

interface MapViewProps {
  places: Place[];
  center: { lat: number; lng: number };
}

declare global {
  interface Window {
    google: any;
  }
}

export function MapView({ places, center }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        zoom: 13,
        center,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
      });
    } else {
      mapInstanceRef.current.setCenter(center);
    }

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    places.forEach((place) => {
      const marker = new window.google.maps.Marker({
        position: { lat: place.latitude, lng: place.longitude },
        map: mapInstanceRef.current,
        title: place.name,
        icon: {
          url: place.type === 'attraction' 
            ? 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            : 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
        },
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="font-semibold">${place.name}</h3>
            <p class="text-sm">${place.address}</p>
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(mapInstanceRef.current, marker);
      });

      markersRef.current.push(marker);
    });
  }, [places, center]);

  return (
    <Card className="w-full h-[400px] overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
    </Card>
  );
}