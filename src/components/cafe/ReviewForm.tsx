
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RatingSlider } from "./RatingSlider";
import { PurposeTags } from "./PurposeTags";
import { Rating } from "@/types/cafe";

export const ratingCategories = [
  { key: 'aesthetics', label: 'Aesthetics', description: 'Visual appeal and Instagram-worthiness' },
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

interface ReviewFormProps {
  ratings: Rating;
  onRatingChange: (key: keyof Rating, value: number[]) => void;
  selectedTags: string[];
  onTagToggle: (tagId: string) => void;
  review: string;
  onReviewChange: (value: string) => void;
  tips: string;
  onTipsChange: (value: string) => void;
  onSubmit: () => void;
}

export const ReviewForm = ({
  ratings,
  onRatingChange,
  selectedTags,
  onTagToggle,
  review,
  onReviewChange,
  tips,
  onTipsChange,
  onSubmit
}: ReviewFormProps) => {
  return (
    <div className="mt-4 space-y-4">
      {ratingCategories.map((category) => (
        <RatingSlider
          key={category.key}
          category={category}
          value={ratings[category.key as keyof Rating]}
          onChange={(value) => onRatingChange(category.key as keyof Rating, value)}
        />
      ))}

      <PurposeTags
        selectedTags={selectedTags}
        onTagToggle={onTagToggle}
      />

      <div className="space-y-2">
        <label className="text-sm font-medium text-cafe-900">
          Your Review
          <span className="text-xs text-cafe-500 block">
            Share your thoughts and tips with others
          </span>
        </label>
        <Textarea
          value={review}
          onChange={(e) => onReviewChange(e.target.value)}
          className="min-h-[100px] resize-none"
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
        <Textarea
          value={tips}
          onChange={(e) => onTipsChange(e.target.value)}
          className="min-h-[100px] resize-none"
          placeholder="E.g., Best times to find seating, quiet hours, etc..."
        />
      </div>

      <Button
        className="w-full bg-cafe-accent hover:bg-cafe-accent/90 text-white"
        onClick={onSubmit}
      >
        Submit Rating
      </Button>
    </div>
  );
};
