
import { useState } from "react";
import Hero from "@/components/Hero";
import CafeCard from "@/components/CafeCard";
import AddCafeDialog from "@/components/AddCafeDialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const INITIAL_CAFES = [
  {
    id: 1,
    name: "The Study Brew",
    rating: 4.8,
    address: "123 College Ave, Campus District",
    features: ["Quiet Zone", "Fast Wi-Fi", "Power Outlets"],
    imageUrl: "/placeholder.svg",
    ratingCount: 5
  },
  {
    id: 2,
    name: "Creative Corner Café",
    rating: 4.6,
    address: "456 Innovation St, Tech Hub",
    features: ["Group Space", "Great Coffee", "Late Hours"],
    imageUrl: "/placeholder.svg",
    ratingCount: 8
  },
  {
    id: 3,
    name: "Focus & Grind",
    rating: 4.9,
    address: "789 Productivity Lane, Downtown",
    features: ["Private Booths", "Premium Coffee", "Study Music"],
    imageUrl: "/placeholder.svg",
    ratingCount: 12
  }
];

const Index = () => {
  const [cafes, setCafes] = useState(INITIAL_CAFES);
  const [email, setEmail] = useState("");

  const handleAddCafe = (newCafe: any) => {
    const cafeWithId = {
      ...newCafe,
      id: cafes.length + 1,
      rating: 0,
      ratingCount: 0
    };
    setCafes([...cafes, cafeWithId]);
  };

  const handleRate = (cafeId: number, newRating: number) => {
    setCafes(currentCafes => 
      currentCafes.map(cafe => {
        if (cafe.id === cafeId) {
          const newCount = cafe.ratingCount + 1;
          const newAverage = ((cafe.rating * cafe.ratingCount) + newRating) / newCount;
          return {
            ...cafe,
            rating: Number(newAverage.toFixed(1)),
            ratingCount: newCount
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

  return (
    <div className="min-h-screen bg-cafe-100">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-cafe-900">Featured Study Spots</h2>
          <AddCafeDialog onAddCafe={handleAddCafe} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cafes.map((cafe) => (
            <CafeCard 
              key={cafe.id} 
              {...cafe} 
              onRate={(rating) => handleRate(cafe.id, rating)}
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
