
import Hero from "@/components/Hero";
import CafeCard from "@/components/CafeCard";

const FEATURED_CAFES = [
  {
    name: "The Study Brew",
    rating: 4.8,
    address: "123 College Ave, Campus District",
    features: ["Quiet Zone", "Fast Wi-Fi", "Power Outlets"],
    imageUrl: "/placeholder.svg",
  },
  {
    name: "Creative Corner Café",
    rating: 4.6,
    address: "456 Innovation St, Tech Hub",
    features: ["Group Space", "Great Coffee", "Late Hours"],
    imageUrl: "/placeholder.svg",
  },
  {
    name: "Focus & Grind",
    rating: 4.9,
    address: "789 Productivity Lane, Downtown",
    features: ["Private Booths", "Premium Coffee", "Study Music"],
    imageUrl: "/placeholder.svg",
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-cafe-100">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-cafe-900 mb-8">Featured Study Spots</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_CAFES.map((cafe, index) => (
            <CafeCard key={index} {...cafe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
