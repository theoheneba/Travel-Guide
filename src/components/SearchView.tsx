import { Place, Location } from '@/types';
import { SearchBar } from './SearchBar';
import { PlacesList } from './PlacesList';
import { MapView } from './MapView';
import { Card } from '@/components/ui/card';

interface SearchViewProps {
  location: Location | null;
  places: Place[];
  isLoading: boolean;
  error: string | null;
  onSearch: (query: string) => void;
}

export function SearchView({
  location,
  places,
  isLoading,
  error,
  onSearch,
}: SearchViewProps) {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="w-full bg-white shadow-sm py-12 mb-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Discover Your Next Destination
          </h2>
          <div className="max-w-2xl mx-auto">
            <SearchBar onSearch={onSearch} isLoading={isLoading} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        {error ? (
          <Card className="p-8 text-center text-destructive bg-destructive/10">
            {error}
          </Card>
        ) : location ? (
          <div className="space-y-12">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">
                Exploring {location.name}
              </h2>
              <p className="text-muted-foreground">
                Discover the best attractions and restaurants in this area
              </p>
            </div>
            
            <MapView
              places={places}
              center={{ lat: location.latitude, lng: location.longitude }}
            />
            
            <PlacesList places={places} />
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            Enter a city or country name to start exploring
          </div>
        )}
      </div>
    </div>
  );
}