declare namespace google.maps.places {
  class AutocompleteService {
    getPlacePredictions(
      request: google.maps.places.AutocompletionRequest,
      callback: (
        results: google.maps.places.AutocompletePrediction[] | null,
        status: google.maps.places.PlacesServiceStatus
      ) => void
    ): void;
  }

  interface AutocompletionRequest {
    input: string;
    types?: string[];
  }

  interface AutocompletePrediction {
    place_id: string;
    description: string;
  }

  enum PlacesServiceStatus {
    OK,
    ZERO_RESULTS,
    OVER_QUERY_LIMIT,
    REQUEST_DENIED,
    INVALID_REQUEST,
  }
}