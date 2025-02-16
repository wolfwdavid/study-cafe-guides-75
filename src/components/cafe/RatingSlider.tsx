
import { Slider } from "@/components/ui/slider";

interface RatingSliderProps {
  category: {
    key: string;
    label: string;
    description: string;
  };
  value: number;
  onChange: (value: number[]) => void;
}

export const RatingSlider = ({ category, value, onChange }: RatingSliderProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-cafe-900">
          {category.label}
          <span className="text-xs text-cafe-500 block">
            {category.description}
          </span>
        </label>
        <span className="text-sm text-cafe-600">
          {value}/10
        </span>
      </div>
      <Slider
        value={[value]}
        min={1}
        max={10}
        step={1}
        onValueChange={onChange}
        className="w-full"
      />
    </div>
  );
};
