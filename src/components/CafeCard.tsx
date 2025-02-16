
import React, { useState, useEffect } from 'react';
import { Star, MapPin, ChevronDown, ChevronUp, Clock } from 'lucide-react';
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
import { useToast } from "@/components/ui/use-toast";

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
  bathroom: number;
}

interface CafeCardProps {
  id: number;
  name: string;
  rating: number;
  address: string;
  features: string[];
  imageUrl: string;
  hours: {
    [key: string]: string;
  };
  petFriendly: boolean;
  onRate: (cafeId: number, ratings: Rating, review: string, tips: string) => void;
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
  { key: 'accessibility', label: 'Accessibility', description: 'Ease of access and navigation' },
  { key: 'bathroom', label: 'Bathroom', description: 'Cleanliness and availability of restrooms' }
];

const CafeCard = ({ id, name, rating, address, features, hours, petFriendly, onRate }: CafeCardProps) => {
  const [isRatingExpanded, setIsRatingExpanded] = useState(false);
  const [review, setReview] = useState("");
  const [tips, setTips] = useState("");
  const [canRate, setCanRate] = useState(true);
  const { toast } = useToast();
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
    accessibility: 5,
    bathroom: 5
  });

  useEffect(() => {
    const checkRatingEligibility = () => {
      const lastRating = localStorage.getItem(`cafe-${id}-last-rating`);
      if (lastRating) {
        const lastRatingDate = new Date(parseInt(lastRating));
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        if (lastRatingDate > oneWeekAgo) {
          setCanRate(false);
          const nextEligibleDate = new Date(lastRatingDate);
          nextEligibleDate.setDate(nextEligibleDate.getDate() + 7);
          return nextEligibleDate;
        }
      }
      return null;
    };

    const nextEligibleDate = checkRatingEligibility();
    if (nextEligibleDate) {
      toast({
        title: "Rating limit reached",
        description: `You can rate this cafe again on ${nextEligibleDate.toLocaleDateString()}`,
      });
    }
  }, [id, toast]);

  const handleRatingChange = (category: keyof Rating, value: number[]) => {
    setRatings(prev => ({
      ...prev,
      [category]: value[0]
    }));
  };

  const handleSubmitRating = () => {
    if (!canRate) {
      toast({
        title: "Unable to rate",
        description: "You can only rate each cafe once per week",
        variant: "destructive",
      });
      return;
    }

    onRate(id, ratings, review, tips);
    localStorage.setItem(`cafe-${id}-last-rating`, Date.now().toString());
    setCanRate(false);
    setIsRatingExpanded(false);
    setReview("");
    setTips("");
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
      accessibility: 5,
      bathroom: 5
    });

    toast({
      title: "Rating submitted",
      description: "Thank you for your feedback! You can rate this cafe again in one week.",
    });
  };

  return (
    <Card className="transition-all duration-300 hover:shadow-lg animate-fadeIn">
      <CardHeader className="pt-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-semibold text-cafe-900">{name}</CardTitle>
            <CardDescription className="flex items-center text-cafe-500">
              <MapPin className="w-4 h-4 mr-1" />
              {address}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-cafe-100 text-cafe-900">
            <Star className="w-4 h-4 mr-1 text-cafe-accent" />
            {rating.toFixed(1)}
          </Badge>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cafe-500" />
            <span className="text-sm font-medium">Hours</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {Object.entries(hours).map(([day, time]) => (
              <div key={day} className="flex justify-between">
                <span className="font-medium">{day}</span>
                <span>{time}</span>
              </div>
            ))}
          </div>
          {petFriendly && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Pet Friendly
            </Badge>
          )}
        </div>
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
          onClick={() => {
            if (!canRate) {
              toast({
                title: "Rating limit reached",
                description: "You can only rate each cafe once per week",
                variant: "destructive",
              });
              return;
            }
            setIsRatingExpanded(!isRatingExpanded);
          }}
          disabled={!canRate}
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

        {isRatingExpanded && canRate && (
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
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                placeholder="Write your review here..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-cafe-900">
                Tips & Best Times
                <span className="text-xs text-cafe-500 block">
                  Share tips about best times to visit, seating availability, or any other helpful information
                </span>
              </label>
              <textarea
                value={tips}
                onChange={(e) => setTips(e.target.value)}
                className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                placeholder="E.g., Best times to find seating, quiet hours, etc..."
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
