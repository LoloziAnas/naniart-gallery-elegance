import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, Share2, ArrowLeft, ZoomIn, Minus, Plus, Check, Truck, Shield, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  // State management
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("moyen");
  const [selectedFormat, setSelectedFormat] = useState("toile");
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  // Mock product data with multiple images
  const product = {
    id: id,
    title: "Harmonie Terracotta",
    artist: "Amina Benali",
    basePrice: 2500,
    images: [artwork1, artwork2, artwork3, artwork1],
    description:
      "Cette œuvre abstraite capture l'essence du Maroc à travers une palette chaleureuse de terracotta et d'or. Les formes géométriques s'entrelacent pour créer une composition harmonieuse qui évoque les traditions artisanales marocaines tout en adoptant une esthétique résolument contemporaine.",
    medium: "Acrylique sur toile",
    year: "2024",
    category: "Abstrait",
    inStock: true,
    stockCount: 5,
  };
  
  // Size options with prices
  const sizeOptions = [
    { id: "petit", label: "Petit", dimensions: "30 x 40 cm", priceMultiplier: 0.6 },
    { id: "moyen", label: "Moyen", dimensions: "50 x 70 cm", priceMultiplier: 1 },
    { id: "grand", label: "Grand", dimensions: "80 x 100 cm", priceMultiplier: 1.5 },
    { id: "tres-grand", label: "Très Grand", dimensions: "120 x 150 cm", priceMultiplier: 2.2 },
  ];
  
  // Format options
  const formatOptions = [
    { id: "toile", label: "Toile tendue", priceAdd: 0 },
    { id: "cadre-noir", label: "Cadre noir", priceAdd: 200 },
    { id: "cadre-bois", label: "Cadre bois", priceAdd: 300 },
    { id: "cadre-dore", label: "Cadre doré", priceAdd: 400 },
  ];
  
  // Calculate final price
  const selectedSizeOption = sizeOptions.find(s => s.id === selectedSize);
  const selectedFormatOption = formatOptions.find(f => f.id === selectedFormat);
  const finalPrice = Math.round(
    product.basePrice * (selectedSizeOption?.priceMultiplier || 1) + (selectedFormatOption?.priceAdd || 0)
  );

  const similarProducts = [
    { id: 2, title: "Désert d'Or", artist: "Karim Essaoui", price: "3,200 MAD", image: artwork2 },
    { id: 3, title: "Géométrie Marocaine", artist: "Layla Mansouri", price: "2,800 MAD", image: artwork3 },
  ];

  const handleAddToCart = () => {
    // Extract numeric price value
    const priceValue = finalPrice;
    
    // Add each quantity as separate items or handle in cart
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: `${product.id}-${selectedSize}-${selectedFormat}-${Date.now()}-${i}`,
        title: product.title,
        artist: product.artist,
        price: `${priceValue.toLocaleString()} MAD`,
        priceValue: priceValue,
        image: product.images[0],
        size: selectedSizeOption?.label,
        frame: selectedFormatOption?.label,
      });
    }
  };
  
  const handleToggleFavorite = () => {
    toggleWishlist({
      id: product.id || '',
      title: product.title,
      artist: product.artist,
      price: `${finalPrice.toLocaleString()} MAD`,
      priceValue: finalPrice,
      image: product.images[0],
      category: product.category,
      inStock: product.inStock,
    });
  };
  
  const isFavorite = isInWishlist(product.id || '');
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Lien copié",
      description: "Le lien du produit a été copié dans le presse-papiers.",
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
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg shadow-elegant group">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className={`w-full h-full object-cover transition-transform duration-300 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`}
                onClick={() => setIsZoomed(!isZoomed)}
              />
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <Badge variant="destructive" className="text-lg px-6 py-2">
                    Épuisé
                  </Badge>
                </div>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index
                      ? 'border-primary ring-2 ring-primary ring-offset-2'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} - Vue ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{product.category}</Badge>
                {product.inStock && product.stockCount <= 5 && (
                  <Badge variant="destructive">Dernières pièces</Badge>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mt-2">{product.title}</h1>
              <p className="text-xl text-muted-foreground mt-2">Par {product.artist}</p>
            </div>

            <div className="flex items-baseline space-x-4">
              <span className="text-4xl font-bold text-primary">{finalPrice.toLocaleString()} MAD</span>
              {selectedSizeOption?.priceMultiplier !== 1 && (
                <span className="text-lg text-muted-foreground line-through">
                  {product.basePrice.toLocaleString()} MAD
                </span>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Taille</h3>
              <div className="grid grid-cols-2 gap-3">
                {sizeOptions.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size.id)}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      selectedSize === size.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="font-semibold text-sm">{size.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">{size.dimensions}</div>
                    <div className="text-sm font-medium text-primary mt-2">
                      {Math.round(product.basePrice * size.priceMultiplier).toLocaleString()} MAD
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Format Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Format</h3>
              <div className="space-y-2">
                {formatOptions.map((format) => (
                  <button
                    key={format.id}
                    onClick={() => setSelectedFormat(format.id)}
                    className={`w-full p-3 border-2 rounded-lg flex items-center justify-between transition-all ${
                      selectedFormat === format.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {selectedFormat === format.id && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                      <span className="font-medium text-sm">{format.label}</span>
                    </div>
                    {format.priceAdd > 0 && (
                      <span className="text-sm text-primary">+{format.priceAdd} MAD</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Quantité</h3>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  disabled={quantity >= product.stockCount}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground">
                  {product.stockCount} disponible{product.stockCount > 1 ? 's' : ''}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4">
              <Button
                variant="hero"
                size="lg"
                className="w-full text-base"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.inStock ? 'Ajouter au Panier' : 'Épuisé'}
              </Button>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={handleToggleFavorite}
                >
                  <Heart className={`mr-2 h-5 w-5 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
                  Favoris
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={handleShare}
                >
                  <Share2 className="mr-2 h-5 w-5" />
                  Partager
                </Button>
              </div>
            </div>
            
            {/* Features */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium text-sm">Livraison gratuite</div>
                  <div className="text-xs text-muted-foreground">Pour toute commande supérieure à 500 MAD</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium text-sm">Paiement sécurisé</div>
                  <div className="text-xs text-muted-foreground">Vos données sont protégées</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RefreshCw className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium text-sm">Retour sous 14 jours</div>
                  <div className="text-xs text-muted-foreground">Satisfait ou remboursé</div>
                </div>
              </div>
            </div>
            
            {/* Specifications */}
            <div className="border-t pt-6 space-y-3">
              <h3 className="font-semibold">Spécifications</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dimensions</span>
                  <span className="font-medium">{selectedSizeOption?.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Médium</span>
                  <span className="font-medium">{product.medium}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Année</span>
                  <span className="font-medium">{product.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Format</span>
                  <span className="font-medium">{selectedFormatOption?.label}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif font-bold">Œuvres Similaires</h2>
            <Link to="/gallery" className="text-primary hover:underline text-sm font-medium">
              Voir tout
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((item) => (
              <Link key={item.id} to={`/product/${item.id}`} className="group">
                <Card className="overflow-hidden artwork-hover shadow-elegant">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-end p-4">
                      <Button variant="secondary" size="sm" className="w-full">
                        Voir Détails
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-2">
                    <h3 className="font-serif font-semibold">{item.title}</h3>
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
