import { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search } from 'lucide-react';

interface Suggestion {
  place_id: string;
  description: string;
}

interface PlacesAutocompleteProps {
  onPlaceSelect: (place: { name: string; placeId: string }) => void;
  isLoading?: boolean;
}

export function PlacesAutocomplete({ onPlaceSelect, isLoading }: PlacesAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null);

  useEffect(() => {
    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
  }, []);

  const getSuggestions = async (input: string) => {
    if (!input || !autocompleteService.current) return;

    try {
      const response = await new Promise<google.maps.places.AutocompletePrediction[]>(
        (resolve, reject) => {
          autocompleteService.current?.getPlacePredictions(
            { input, types: ['(cities)'] },
            (results, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                resolve(results);
              } else {
                reject(status);
              }
            }
          );
        }
      );

      setSuggestions(
        response.map((result) => ({
          place_id: result.place_id,
          description: result.description,
        }))
      );
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    }
  };

  const handleInputChange = (newValue: string) => {
    setValue(newValue);
    setOpen(true);
    if (newValue.length >= 2) {
      getSuggestions(newValue);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (suggestion: Suggestion) => {
    setValue(suggestion.description);
    setOpen(false);
    onPlaceSelect({
      name: suggestion.description,
      placeId: suggestion.place_id,
    });
  };

  return (
    <Popover open={open && suggestions.length > 0} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex w-full gap-2">
          <Input
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Enter a city or country name..."
            className="h-12 text-lg shadow-sm"
            disabled={isLoading}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[calc(100vw-2rem)] sm:w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandGroup>
            {suggestions.map((suggestion) => (
              <CommandItem
                key={suggestion.place_id}
                onSelect={() => handleSelect(suggestion)}
                className="flex items-center gap-2 px-4 py-2 cursor-pointer"
              >
                <Search className="h-4 w-4 text-muted-foreground" />
                {suggestion.description}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}