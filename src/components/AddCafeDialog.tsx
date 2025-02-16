
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Coffee, Plus } from "lucide-react";
import { useState } from "react";

const AddCafeDialog = ({ onAddCafe }: { onAddCafe: (cafe: any) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newCafe = {
      name: formData.get('name'),
      address: formData.get('address'),
      features: (formData.get('features') as string).split(',').map(f => f.trim()),
      rating: 0,
      imageUrl: '/placeholder.svg'
    };

    onAddCafe(newCafe);
    setIsOpen(false);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="bg-cafe-accent hover:bg-cafe-accent/90 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Cafe
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Study Cafe</DialogTitle>
          <DialogDescription>
            Enter the details of the cafe you'd like to add to our directory.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Cafe Name</label>
            <Input id="name" name="name" placeholder="Enter cafe name" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium">Address</label>
            <Input id="address" name="address" placeholder="Enter cafe address" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="features" className="text-sm font-medium">Features</label>
            <Textarea 
              id="features" 
              name="features" 
              placeholder="Enter features separated by commas (e.g., Quiet Zone, Fast Wi-Fi, Power Outlets)"
              required 
            />
          </div>
          <Button type="submit" className="w-full">
            <Coffee className="w-4 h-4 mr-2" />
            Add Cafe
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCafeDialog;
