import { Link } from "react-router-dom";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";

const Wishlist = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item: any) => {
    const productId = typeof item.id === 'string' ? parseInt(item.id) : item.id;
    addToCart({
      id: `${item.id}-standard-standard-${Date.now()}`,
      productId: productId,
      title: item.title,
      artist: item.artist,
      price: item.price,
      priceValue: item.priceValue,
      image: item.image,
    });
  };

  const handleAddAllToCart = () => {
    items.forEach((item) => {
      const productId = typeof item.id === 'string' ? parseInt(item.id) : item.id;
      addToCart({
        id: `${item.id}-standard-standard-${Date.now()}`,
        productId: productId,
        title: item.title,
        artist: item.artist,
        price: item.price,
        priceValue: item.priceValue,
        image: item.image,
      });
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <div className="w-24 h-24 mx-auto bg-secondary/30 rounded-full flex items-center justify-center">
            <Heart className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-serif font-bold">Vos favoris sont vides</h1>
          <p className="text-muted-foreground">
            Explorez notre galerie et ajoutez vos œuvres préférées à vos favoris
          </p>
          <Link to="/gallery">
            <Button variant="hero" size="lg" className="gap-2">
              <Heart className="h-5 w-5" />
              Découvrir la galerie
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à la galerie
          </Link>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold flex items-center gap-3">
                <Heart className="h-10 w-10 text-primary fill-current" />
                Mes Favoris
              </h1>
              <p className="text-muted-foreground mt-2">
                {items.length} œuvre{items.length > 1 ? "s" : ""} dans vos favoris
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleAddAllToCart}
                variant="hero"
                size="lg"
                className="gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Tout ajouter au panier
              </Button>
              <Button
                onClick={clearWishlist}
                variant="outline"
                size="lg"
                className="gap-2"
              >
                <Trash2 className="h-5 w-5" />
                Vider les favoris
              </Button>
            </div>
          </div>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <Card
              key={item.id}
              className="group overflow-hidden shadow-elegant hover:shadow-2xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                {/* Image */}
                <Link to={`/product/${item.id}`} className="block relative aspect-[3/4] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {item.inStock === false && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Badge variant="destructive" className="text-sm">
                        Épuisé
                      </Badge>
                    </div>
                  )}
                  {/* Remove from Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeFromWishlist(item.id);
                    }}
                    className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                    aria-label="Retirer des favoris"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </button>
                </Link>

                {/* Details */}
                <div className="p-4 space-y-3">
                  <div>
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-serif font-semibold text-lg hover:text-primary transition-smooth line-clamp-1">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">{item.artist}</p>
                    {item.category && (
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {item.category}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-xl font-bold text-primary">{item.price}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAddToCart(item)}
                      variant="hero"
                      size="sm"
                      className="flex-1 gap-2"
                      disabled={item.inStock === false}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Ajouter au panier
                    </Button>
                    <Button
                      onClick={() => removeFromWishlist(item.id)}
                      variant="outline"
                      size="sm"
                      className="gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Continue Shopping */}
        <div className="mt-12 text-center">
          <Link to="/gallery">
            <Button variant="outline" size="lg" className="gap-2">
              Continuer mes achats
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
