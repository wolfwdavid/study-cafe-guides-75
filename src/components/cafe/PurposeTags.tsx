
import { Checkbox } from "@/components/ui/checkbox";

export const purposeTags = [
  { id: 'group-meetups', label: 'Group Meetups' },
  { id: 'solo-study', label: 'Solo Study' },
  { id: 'date-spot', label: 'Date Spot' },
  { id: 'quick-coffee', label: 'Quick Coffee' },
  { id: 'long-sessions', label: 'Long Study Sessions' },
  { id: 'meetings', label: 'Professional Meetings' },
  { id: 'creative-work', label: 'Creative Work' },
  { id: 'networking', label: 'Networking' },
];

interface PurposeTagsProps {
  selectedTags: string[];
  onTagToggle: (tagId: string) => void;
}

export const PurposeTags = ({ selectedTags, onTagToggle }: PurposeTagsProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-cafe-900">
        What is this cafe good for?
        <span className="text-xs text-cafe-500 block">
          Select all that apply
        </span>
      </label>
      <div className="grid grid-cols-2 gap-2">
        {purposeTags.map((tag) => (
          <div key={tag.id} className="flex items-center space-x-2">
            <Checkbox
              id={`tag-${tag.id}`}
              checked={selectedTags.includes(tag.id)}
              onCheckedChange={() => onTagToggle(tag.id)}
            />
            <label
              htmlFor={`tag-${tag.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {tag.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
