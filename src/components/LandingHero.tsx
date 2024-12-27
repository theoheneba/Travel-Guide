import { Compass, Map, Utensils, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LandingHeroProps {
  onExplore: () => void;
}

export function LandingHero({ onExplore }: LandingHeroProps) {
  return (
    <div className="relative min-h-[80vh] flex items-center">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <Compass className="h-12 w-12" />
            <h1 className="text-5xl font-bold">TravelGuide</h1>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-medium mb-6">
            Discover the world's most amazing places
          </h2>
          
          <p className="text-xl text-gray-200 mb-8">
            Explore local attractions, find the best restaurants, and plan your perfect trip with our comprehensive travel guide.
          </p>
          
          <Button
            size="lg"
            onClick={onExplore}
            className="text-lg px-8 py-6"
          >
            Start Exploring
          </Button>

          <div className="grid grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: Map,
                title: 'Tourist Spots',
                description: 'Find the best attractions',
              },
              {
                icon: Utensils,
                title: 'Local Cuisine',
                description: 'Discover amazing restaurants',
              },
              {
                icon: Camera,
                title: 'Photo Spots',
                description: 'Capture perfect moments',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="text-center p-6 rounded-lg bg-white/10 backdrop-blur-sm"
              >
                <feature.icon className="h-8 w-8 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}