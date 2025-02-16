
import React, { useState } from 'react';
import { Star, Wifi, Coffee, MapPin, X } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CafeCardProps {
  name: string;
  rating: number;
  address: string;
  features: string[];
  imageUrl: string;
}

const CafeCard = ({ name, rating, address, features, imageUrl }: CafeCardProps) => {
  const [showFullImage, setShowFullImage] = useState(false);

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-fadeIn">
      <div className="aspect-video relative overflow-hidden cursor-pointer" onClick={() => setShowFullImage(true)}>
        <img
          src={imageUrl}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105 blur-sm hover:blur-none"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-cafe-900 bg-white/80 px-4 py-2 rounded-full text-sm font-medium">
            Click to view image
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-white/90 text-cafe-900">
            <Star className="w-4 h-4 mr-1 text-cafe-accent" />
            {rating.toFixed(1)}
          </Badge>
        </div>
      </div>

      <Dialog open={showFullImage} onOpenChange={setShowFullImage}>
        <DialogContent className="max-w-4xl p-0">
          <div className="relative">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => setShowFullImage(false)}
              className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <CardHeader className="pt-4">
        <CardTitle className="text-xl font-semibold text-cafe-900">{name}</CardTitle>
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
