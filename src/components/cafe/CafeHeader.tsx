
import { MapPin, Star, Clock, ChevronUp, ChevronDown } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface CafeHeaderProps {
  name: string;
  address: string;
  rating: number;
  hours: {
    [key: string]: string;
  };
  petFriendly: boolean;
  isHoursExpanded: boolean;
  onToggleHours: () => void;
}

export const CafeHeader = ({
  name,
  address,
  rating,
  hours,
  petFriendly,
  isHoursExpanded,
  onToggleHours,
}: CafeHeaderProps) => {
  return (
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
      
      <div className="mt-4">
        <Button
          variant="ghost"
          size="sm"
          className="w-full flex items-center justify-between"
          onClick={onToggleHours}
        >
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cafe-500" />
            <span className="text-sm font-medium">Hours</span>
          </div>
          {isHoursExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
        
        {isHoursExpanded && (
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm animate-in fade-in slide-in-from-top-1">
            {Object.entries(hours).map(([day, time]) => (
              <div key={day} className="flex justify-between">
                <span className="font-medium">{day}</span>
                <span>{time}</span>
              </div>
            ))}
          </div>
        )}
        
        {petFriendly && (
          <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-200">
            Pet Friendly
          </Badge>
        )}
      </div>
    </CardHeader>
  );
};
