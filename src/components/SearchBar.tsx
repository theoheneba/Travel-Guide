import { PlacesAutocomplete } from './PlacesAutocomplete';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const handlePlaceSelect = ({ name }: { name: string; placeId: string }) => {
    if (name.trim()) {
      onSearch(name.trim());
    }
  };

  return (
    <div className="flex w-full gap-2">
      <PlacesAutocomplete onPlaceSelect={handlePlaceSelect} isLoading={isLoading} />
      <Button size="lg" className="px-6" disabled={isLoading}>
        {isLoading ? (
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
        ) : (
          <Search className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
}