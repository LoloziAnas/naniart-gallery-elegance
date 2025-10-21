import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";

interface ArtworkCardProps {
  id: string;
  title: string;
  artist: string;
  price: string;
  priceValue: number;
  image: string;
  category?: string;
  badge?: string;
  inStock?: boolean;
  index?: number;
}

const ArtworkCard = ({
  id,
  title,
  artist,
  price,
  priceValue,
  image,
  category,
  badge,
  inStock = true,
  index = 0,
}: ArtworkCardProps) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFavorite = isInWishlist(id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist({
      id,
      title,
      artist,
      price,
      priceValue,
      image,
      category,
      inStock,
    });
  };

  return (
    <Card
      className="group overflow-hidden shadow-elegant hover:shadow-2xl transition-all duration-300 animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardContent className="p-0">
        {/* Image */}
        <Link to={`/product/${id}`} className="block relative aspect-[3/4] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {badge && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
              {badge}
            </Badge>
          )}
          {!inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Badge variant="destructive" className="text-sm">
                Épuisé
              </Badge>
            </div>
          )}
          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${
              isFavorite
                ? "bg-red-500 text-white"
                : "bg-white/90 backdrop-blur-sm text-foreground hover:bg-white"
            }`}
            aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>
        </Link>

        {/* Details */}
        <div className="p-4 space-y-2">
          <div>
            <Link to={`/product/${id}`}>
              <h3 className="font-serif font-semibold text-lg hover:text-primary transition-smooth line-clamp-1">
                {title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground">{artist}</p>
            {category && (
              <Badge variant="secondary" className="mt-2 text-xs">
                {category}
              </Badge>
            )}
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="text-xl font-bold text-primary">{price}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtworkCard;
