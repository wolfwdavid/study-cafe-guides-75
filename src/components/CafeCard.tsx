
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { CafeHeader } from './cafe/CafeHeader';
import { ReviewForm } from './cafe/ReviewForm';
import { Rating, Review } from '@/types/cafe';

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
  ratingCount: number;
  onRate: (cafeId: number, ratings: Rating, review: string, tips: string, tags: string[]) => void;
}

const CafeCard = ({ 
  id, 
  name, 
  rating, 
  address, 
  features, 
  hours, 
  petFriendly,
  ratingCount,
  onRate 
}: CafeCardProps) => {
  const [isRatingExpanded, setIsRatingExpanded] = useState(false);
  const [isHoursExpanded, setIsHoursExpanded] = useState(false);
  const [review, setReview] = useState("");
  const [tips, setTips] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [canRate, setCanRate] = useState(true);
  const { toast } = useToast();
  const [ratings, setRatings] = useState<Rating>({
    aesthetics: 5,
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

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(current => {
      if (current.includes(tagId)) {
        return current.filter(id => id !== tagId);
      }
      return [...current, tagId];
    });
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

    onRate(id, ratings, review, tips, selectedTags);
    localStorage.setItem(`cafe-${id}-last-rating`, Date.now().toString());
    setCanRate(false);
    setIsRatingExpanded(false);
    setReview("");
    setTips("");
    setSelectedTags([]);
    setRatings({
      aesthetics: 5,
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
      <CafeHeader
        name={name}
        address={address}
        rating={rating}
        hours={hours}
        petFriendly={petFriendly}
        isHoursExpanded={isHoursExpanded}
        onToggleHours={() => setIsHoursExpanded(!isHoursExpanded)}
        ratingCount={ratingCount}
      />

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
          <ReviewForm
            ratings={ratings}
            onRatingChange={handleRatingChange}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            review={review}
            onReviewChange={setReview}
            tips={tips}
            onTipsChange={setTips}
            onSubmit={handleSubmitRating}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default CafeCard;
