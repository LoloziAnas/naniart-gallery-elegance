import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Heart, Share2, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";

const Product = () => {
  const { id } = useParams();
  const { toast } = useToast();

  // Mock product data
  const product = {
    id: id,
    title: "Harmonie Terracotta",
    artist: "Amina Benali",
    price: "2,500 MAD",
    image: artwork1,
    description:
      "Cette œuvre abstraite capture l'essence du Maroc à travers une palette chaleureuse de terracotta et d'or. Les formes géométriques s'entrelacent pour créer une composition harmonieuse qui évoque les traditions artisanales marocaines tout en adoptant une esthétique résolument contemporaine.",
    dimensions: "80 x 100 cm",
    medium: "Acrylique sur toile",
    year: "2024",
    category: "Abstrait",
  };

  const similarProducts = [
    { id: 2, title: "Désert d'Or", artist: "Karim Essaoui", price: "3,200 MAD", image: artwork2 },
    { id: 3, title: "Géométrie Marocaine", artist: "Layla Mansouri", price: "2,800 MAD", image: artwork3 },
  ];

  const handleAddToCart = () => {
    toast({
      title: "Ajouté au panier",
      description: `${product.title} a été ajouté à votre panier.`,
    });
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          to="/gallery"
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-smooth mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la galerie
        </Link>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image */}
          <div className="space-y-4">
            <div className="aspect-[4/5] overflow-hidden rounded-lg shadow-elegant">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-8">
            <div>
              <span className="text-sm text-primary font-medium">{product.category}</span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mt-2">{product.title}</h1>
              <p className="text-xl text-muted-foreground mt-2">Par {product.artist}</p>
            </div>

            <div className="flex items-baseline space-x-4">
              <span className="text-4xl font-bold text-primary">{product.price}</span>
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Specifications */}
            <div className="border-t border-b border-border py-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dimensions</span>
                <span className="font-medium">{product.dimensions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Médium</span>
                <span className="font-medium">{product.medium}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Année</span>
                <span className="font-medium">{product.year}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <Button
                variant="hero"
                size="lg"
                className="w-full text-base"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Ajouter au Panier
              </Button>
              <div className="flex space-x-4">
                <Button variant="outline" size="lg" className="flex-1">
                  <Heart className="mr-2 h-5 w-5" />
                  Favoris
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  <Share2 className="mr-2 h-5 w-5" />
                  Partager
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <section>
          <h2 className="text-3xl font-serif font-bold mb-8">Œuvres Similaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {similarProducts.map((item) => (
              <Link key={item.id} to={`/product/${item.id}`}>
                <Card className="overflow-hidden artwork-hover shadow-elegant group">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-6 space-y-2">
                    <h3 className="font-serif font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.artist}</p>
                    <p className="text-lg font-bold text-primary">{item.price}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Product;
