
import React from 'react';
import { Star, MapPin } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CafeCardProps {
  name: string;
  rating: number;
  address: string;
  features: string[];
  imageUrl: string;
}

const CafeCard = ({ name, rating, address, features }: CafeCardProps) => {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg animate-fadeIn">
      <CardHeader className="pt-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold text-cafe-900">{name}</CardTitle>
          <Badge variant="secondary" className="bg-cafe-100 text-cafe-900">
            <Star className="w-4 h-4 mr-1 text-cafe-accent" />
            {rating.toFixed(1)}
          </Badge>
        </div>
        <CardDescription className="flex items-center text-cafe-500">
          <MapPin className="w-4 h-4 mr-1" />
          {address}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
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
      </CardContent>
    </Card>
  );
};

export default CafeCard;
