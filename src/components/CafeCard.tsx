
import React, { useState } from 'react';
import { Star, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface Rating {
  ambience: number;
  vibes: number;
  lightStudy: number;
  focusedStudy: number;
  socialAtmosphere: number;
  creativeEnvironment: number;
  wifiPower: number;
  coffeeQuality: number;
  seatingComfort: number;
  noiseLevel: number;
  lighting: number;
  accessibility: number;
}

interface CafeCardProps {
  id: number;
  name: string;
  rating: number;
  address: string;
  features: string[];
  imageUrl: string;
  onRate: (cafeId: number, ratings: Rating, review: string) => void;
}

const ratingCategories = [
  { key: 'ambience', label: 'Ambience', description: 'How comfortable and conducive the environment is' },
  { key: 'vibes', label: 'Vibes', description: 'Overall mood or energy of the space' },
  { key: 'lightStudy', label: 'Light Study', description: 'Suitability for casual study sessions' },
  { key: 'focusedStudy', label: 'Focused Study', description: 'Quietness and ability to concentrate' },
  { key: 'socialAtmosphere', label: 'Social Atmosphere', description: 'Good for socializing or group work' },
  { key: 'creativeEnvironment', label: 'Creative Environment', description: 'Sparks creativity and brainstorming' },
  { key: 'wifiPower', label: 'Wi-Fi and Power', description: 'Remote work/study convenience' },
  { key: 'coffeeQuality', label: 'Coffee Quality', description: 'Quality of drinks' },
  { key: 'seatingComfort', label: 'Seating Comfort', description: 'Comfort of seats and table availability' },
  { key: 'noiseLevel', label: 'Noise Level', description: 'From very quiet to very loud' },
  { key: 'lighting', label: 'Lighting', description: 'Brightness for long study hours' },
  { key: 'accessibility', label: 'Accessibility', description: 'Ease of access and navigation' }
];

const CafeCard = ({ id, name, rating, address, features, onRate }: CafeCardProps) => {
  const [isRatingExpanded, setIsRatingExpanded] = useState(false);
  const [review, setReview] = useState("");
  const [ratings, setRatings] = useState<Rating>({
    ambience: 5,
    vibes: 5,
    lightStudy: 5,
    focusedStudy: 5,
    socialAtmosphere: 5,
    creativeEnvironment: 5,
    wifiPower: 5,
    coffeeQuality: 5,
    seatingComfort: 5,
    noiseLevel: 5,
    lighting: 5,
    accessibility: 5
  });

  const handleRatingChange = (category: keyof Rating, value: number[]) => {
    setRatings(prev => ({
      ...prev,
      [category]: value[0]
    }));
  };

  const handleSubmitRating = () => {
    onRate(id, ratings, review);
    setIsRatingExpanded(false);
    setReview("");
    setRatings({
      ambience: 5,
      vibes: 5,
      lightStudy: 5,
      focusedStudy: 5,
      socialAtmosphere: 5,
      creativeEnvironment: 5,
      wifiPower: 5,
      coffeeQuality: 5,
      seatingComfort: 5,
      noiseLevel: 5,
      lighting: 5,
      accessibility: 5
    });
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg animate-fadeIn">
      <CardHeader className="pt-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold text-cafe-900">{name}</CardTitle>
          <div className="flex items-center gap-1">
            <Badge variant="secondary" className="bg-cafe-100 text-cafe-900">
              <Star className="w-4 h-4 mr-1 text-cafe-accent" />
              {rating.toFixed(1)}
            </Badge>
          </div>
        </div>
        <CardDescription className="flex items-center text-cafe-500">
          <MapPin className="w-4 h-4 mr-1" />
          {address}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {features.map((feature, index) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-cafe-100 text-cafe-600 border-cafe-200"
            >
              {feature}
            </Badge>
          ))}
        </div>
        
        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={() => setIsRatingExpanded(!isRatingExpanded)}
        >
          {isRatingExpanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-2" />
              Hide Rating Form
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-2" />
              Rate This Location
            </>
          )}
        </Button>

        {isRatingExpanded && (
          <div className="mt-4 space-y-4">
            {ratingCategories.map(({ key, label, description }) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-cafe-900">
                    {label}
                    <span className="text-xs text-cafe-500 block">
                      {description}
                    </span>
                  </label>
                  <span className="text-sm text-cafe-600">
                    {ratings[key as keyof Rating]}/10
                  </span>
                </div>
                <Slider
                  value={[ratings[key as keyof Rating]]}
                  min={1}
                  max={10}
                  step={1}
                  onValueChange={(value) => handleRatingChange(key as keyof Rating, value)}
                  className="w-full"
                />
              </div>
            ))}

            <div className="space-y-2">
              <label className="text-sm font-medium text-cafe-900">
                Your Review
                <span className="text-xs text-cafe-500 block">
                  Share your thoughts and tips with others
                </span>
              </label>
              <Input
                as="textarea"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="min-h-[100px] resize-none"
                placeholder="Write your review here..."
              />
            </div>

            <Button
              className="w-full bg-cafe-accent hover:bg-cafe-accent/90 text-white"
              onClick={handleSubmitRating}
            >
              Submit Rating
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CafeCard;
