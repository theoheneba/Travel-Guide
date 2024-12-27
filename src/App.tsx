import { useState } from 'react';
import { LandingHero } from '@/components/LandingHero';
import { SearchView } from '@/components/SearchView';
import { Place, Location } from '@/types';
import { searchPlaces, getNearbyPlaces } from '@/lib/maps';
import { Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function App() {
  const [showSearch, setShowSearch] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(query: string) {
    try {
      setIsLoading(true);
      setError(null);

      const locationData = await searchPlaces(query);
      setLocation(locationData);

      const [attractions, restaurants] = await Promise.all([
        getNearbyPlaces(
          locationData.latitude,
          locationData.longitude,
          'tourist_attraction'
        ),
        getNearbyPlaces(
          locationData.latitude,
          locationData.longitude,
          'restaurant'
        ),
      ]);

      setPlaces([...attractions, ...restaurants]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An error occurred while searching'
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="h-16 border-b bg-white/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowSearch(false)}>
              <Compass className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">TravelGuide</h1>
            </div>
            {!showSearch && (
              <Button onClick={() => setShowSearch(true)}>
                Start Exploring
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="pt-16">
        {!showSearch ? (
          <LandingHero onExplore={() => setShowSearch(true)} />
        ) : (
          <SearchView
            location={location}
            places={places}
            isLoading={isLoading}
            error={error}
            onSearch={handleSearch}
          />
        )}
      </main>
    </div>
  );
}