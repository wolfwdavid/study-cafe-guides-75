
import { useState } from "react";
import Hero from "@/components/Hero";
import CafeCard from "@/components/CafeCard";
import AddCafeDialog from "@/components/AddCafeDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

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

interface Review {
  ratings: Rating;
  review: string;
  tips: string;
  timestamp: number;
}

interface Cafe {
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
  reviews: Review[];
  ratingCount: number;
}

const INITIAL_CAFES = [
  {
    id: 1,
    name: "The Study Brew",
    rating: 4.8,
    address: "123 College Ave, Campus District",
    features: ["Quiet Zone", "Fast Wi-Fi", "Power Outlets"],
    imageUrl: "/placeholder.svg",
    hours: {
      Monday: "7:00 AM - 10:00 PM",
      Tuesday: "7:00 AM - 10:00 PM",
      Wednesday: "7:00 AM - 10:00 PM",
      Thursday: "7:00 AM - 10:00 PM",
      Friday: "7:00 AM - 11:00 PM",
      Saturday: "8:00 AM - 11:00 PM",
      Sunday: "8:00 AM - 9:00 PM"
    },
    petFriendly: false,
    reviews: [],
    ratingCount: 5
  },
  {
    id: 2,
    name: "Creative Corner Café",
    rating: 4.6,
    address: "456 Innovation St, Tech Hub",
    features: ["Group Space", "Great Coffee", "Late Hours"],
    imageUrl: "/placeholder.svg",
    hours: {
      Monday: "6:00 AM - 11:00 PM",
      Tuesday: "6:00 AM - 11:00 PM",
      Wednesday: "6:00 AM - 11:00 PM",
      Thursday: "6:00 AM - 11:00 PM",
      Friday: "6:00 AM - 12:00 AM",
      Saturday: "7:00 AM - 12:00 AM",
      Sunday: "7:00 AM - 10:00 PM"
    },
    petFriendly: true,
    reviews: [],
    ratingCount: 8
  },
  {
    id: 3,
    name: "Focus & Grind",
    rating: 4.9,
    address: "789 Productivity Lane, Downtown",
    features: ["Private Booths", "Premium Coffee", "Study Music"],
    imageUrl: "/placeholder.svg",
    hours: {
      Monday: "8:00 AM - 9:00 PM",
      Tuesday: "8:00 AM - 9:00 PM",
      Wednesday: "8:00 AM - 9:00 PM",
      Thursday: "8:00 AM - 9:00 PM",
      Friday: "8:00 AM - 10:00 PM",
      Saturday: "9:00 AM - 10:00 PM",
      Sunday: "9:00 AM - 8:00 PM"
    },
    petFriendly: false,
    reviews: [],
    ratingCount: 12
  }
];

const Index = () => {
  const [cafes, setCafes] = useState<Cafe[]>(INITIAL_CAFES);
  const [email, setEmail] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddCafe = (newCafe: any) => {
    const cafeWithId = {
      ...newCafe,
      id: cafes.length + 1,
      rating: 0,
      ratingCount: 0,
      reviews: [],
      hours: {
        Monday: "9:00 AM - 5:00 PM",
        Tuesday: "9:00 AM - 5:00 PM",
        Wednesday: "9:00 AM - 5:00 PM",
        Thursday: "9:00 AM - 5:00 PM",
        Friday: "9:00 AM - 5:00 PM",
        Saturday: "10:00 AM - 4:00 PM",
        Sunday: "Closed"
      },
      petFriendly: false
    };
    setCafes([...cafes, cafeWithId]);
  };

  const handleRate = (cafeId: number, ratings: Rating, review: string, tips: string) => {
    setCafes(currentCafes => 
      currentCafes.map(cafe => {
        if (cafe.id === cafeId) {
          const newReview = {
            ratings,
            review,
            tips,
            timestamp: Date.now()
          };
          
          // Calculate new average rating based on all categories
          const categoryValues = Object.values(ratings);
          const categoryAverage = categoryValues.reduce((a, b) => a + b, 0) / categoryValues.length;
          
          const newCount = cafe.ratingCount + 1;
          const newAverage = ((cafe.rating * cafe.ratingCount) + categoryAverage) / newCount;

          return {
            ...cafe,
            rating: Number(newAverage.toFixed(1)),
            ratingCount: newCount,
            reviews: [...cafe.reviews, newReview]
          };
        }
        return cafe;
      })
    );
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
  };

  const filteredCafes = cafes.filter(cafe => {
    const searchLower = searchQuery.toLowerCase();
    return (
      cafe.name.toLowerCase().includes(searchLower) ||
      cafe.address.toLowerCase().includes(searchLower) ||
      cafe.features.some(feature => feature.toLowerCase().includes(searchLower)) ||
      (cafe.petFriendly && "pet friendly".includes(searchLower)) ||
      Object.entries(cafe.hours).some(([day, time]) => 
        day.toLowerCase().includes(searchLower) || 
        time.toLowerCase().includes(searchLower)
      ) ||
      cafe.reviews.some(review => 
        review.review.toLowerCase().includes(searchLower) ||
        review.tips.toLowerCase().includes(searchLower)
      )
    );
  });

  return (
    <div className="min-h-screen bg-cafe-100">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-cafe-900">Featured Study Spots</h2>
            <AddCafeDialog onAddCafe={handleAddCafe} />
          </div>
          
          <div className="relative">
            <Input
              type="text"
              placeholder="Search by name, features, hours, reviews, pet-friendly status..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCafes.map((cafe) => (
            <CafeCard 
              key={cafe.id} 
              {...cafe} 
              onRate={handleRate}
            />
          ))}
        </div>
      </div>

      {/* Email Signup Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-cafe-accent mb-2">The StudyBrew</h2>
            <p className="text-cafe-600 mb-8 max-w-2xl mx-auto">
              Join our community of study spot enthusiasts. Get weekly updates on new cafes, 
              study tips, and exclusive reviews.
            </p>
            <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto flex gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button type="submit" className="bg-cafe-accent hover:bg-cafe-accent/90 text-white">
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
