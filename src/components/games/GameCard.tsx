
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

interface GameCardProps {
  id: string | number;
  title: string;
  image: string;
  price?: string | number;
  discount?: number;
  category: string;
  rating: number;
  className?: string;
}

export function GameCard({ 
  id, 
  title, 
  image, 
  price, 
  discount, 
  category, 
  rating, 
  className 
}: GameCardProps) {
  // Calculate discounted price if discount exists
  const finalPrice = discount ? 
    typeof price === 'number' ? 
      (price - (price * discount / 100)).toFixed(2) : 
      price : 
    price;

  return (
    <div className={cn("game-card group", className)}>
      <div className="relative overflow-hidden rounded-lg aspect-[3/4]">
        {/* Game Image */}
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
        
        {/* Discount Badge */}
        {discount && (
          <Badge className="absolute top-2 right-2 bg-gaming-accent font-semibold">
            -{discount}%
          </Badge>
        )}
        
        {/* Wishlist Button */}
        <button className="absolute top-2 left-2 text-white/70 hover:text-gaming-accent transition-colors">
          <Heart className="h-5 w-5" />
        </button>
        
        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col">
          <div className="flex justify-between items-center mb-1">
            <Badge variant="outline" className="bg-background/30 backdrop-blur-sm text-xs">
              {category}
            </Badge>
            <div className="flex items-center space-x-1">
              <span className="text-yellow-400">★</span>
              <span className="text-xs font-medium text-white">{rating}</span>
            </div>
          </div>
          
          <h3 className="font-bold text-white truncate">{title}</h3>
          
          {/* Price Information */}
          <div className="mt-1 flex items-center space-x-2">
            {discount ? (
              <>
                <span className="text-sm font-bold text-white">${finalPrice}</span>
                <span className="text-xs line-through text-white/60">${price}</span>
              </>
            ) : (
              <span className="text-sm font-bold text-white">
                {price === 0 || price === "0" || price === "Free" ? "Free" : `$${price}`}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
