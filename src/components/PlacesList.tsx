import { Place } from '@/types';
import { PlaceCard } from '@/components/PlaceCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Landmark, UtensilsCrossed } from 'lucide-react';

interface PlacesListProps {
  places: Place[];
}

export function PlacesList({ places }: PlacesListProps) {
  const attractions = places.filter((place) => place.type === 'attraction');
  const restaurants = places.filter((place) => place.type === 'restaurant');

  return (
    <Tabs defaultValue="attractions" className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-2">
        <TabsTrigger value="attractions" className="flex items-center gap-2">
          <Landmark className="h-4 w-4" />
          Attractions ({attractions.length})
        </TabsTrigger>
        <TabsTrigger value="restaurants" className="flex items-center gap-2">
          <UtensilsCrossed className="h-4 w-4" />
          Restaurants ({restaurants.length})
        </TabsTrigger>
      </TabsList>
      <TabsContent value="attractions">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {attractions.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="restaurants">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {restaurants.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}