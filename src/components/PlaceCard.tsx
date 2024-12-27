import { Place } from '@/types';
import { Card } from '@/components/ui/card';
import { Star, MapPin, DollarSign } from 'lucide-react';

interface PlaceCardProps {
  place: Place;
}

export function PlaceCard({ place }: PlaceCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
      {place.photos?.[0] ? (
        <div className="relative h-48 overflow-hidden">
          <img
            src={place.photos[0]}
            alt={place.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      ) : (
        <div className="h-48 bg-muted flex items-center justify-center">
          <MapPin className="h-8 w-8 text-muted-foreground" />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{place.name}</h3>
        <div className="flex items-center gap-2 text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm line-clamp-1">{place.address}</span>
        </div>
        <div className="flex items-center gap-4">
          {place.rating && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{place.rating.toFixed(1)}</span>
            </div>
          )}
          {place.priceLevel && (
            <div className="flex items-center gap-1">
              {Array.from({ length: place.priceLevel }).map((_, i) => (
                <DollarSign
                  key={i}
                  className="h-4 w-4 fill-green-600 text-green-600"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}