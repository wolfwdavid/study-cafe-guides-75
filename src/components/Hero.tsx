
import { Coffee, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-cafe-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Find the perfect</span>{' '}
                <span className="block text-cafe-accent xl:inline">study café</span>
              </h1>
              <p className="mt-3 text-base text-cafe-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Discover and rate cafes perfect for studying, working, or meeting up. 
                Filtered by your needs, rated by the community.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <div className="relative rounded-md shadow-sm flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-cafe-400" />
                  </div>
                  <Input 
                    type="text"
                    placeholder="Search cafes..."
                    className="pl-10 w-full"
                  />
                </div>
                <Button 
                  size="lg"
                  className="bg-cafe-accent hover:bg-cafe-accent/90 text-white"
                >
                  <Coffee className="mr-2 h-5 w-5" />
                  Find Cafes
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Hero;
