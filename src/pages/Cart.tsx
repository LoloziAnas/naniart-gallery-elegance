import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, getCartTotal, getCartCount } = useCart();

  const shippingCost = getCartTotal() >= 500 ? 0 : 50;
  const total = getCartTotal() + shippingCost;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <div className="w-24 h-24 mx-auto bg-secondary/30 rounded-full flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-serif font-bold">Votre panier est vide</h1>
          <p className="text-muted-foreground">
            Découvrez notre collection d'œuvres d'art et ajoutez vos favoris au panier
          </p>
          <Link to="/gallery">
            <Button variant="hero" size="lg" className="gap-2">
              <ShoppingBag className="h-5 w-5" />
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
            Continuer mes achats
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Panier</h1>
          <p className="text-muted-foreground mt-2">
            {getCartCount()} article{getCartCount() > 1 ? "s" : ""} dans votre panier
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* Image */}
                    <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-secondary/20">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-serif font-semibold text-lg mb-1">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{item.artist}</p>
                          {item.size && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Taille: {item.size}
                            </p>
                          )}
                          {item.frame && (
                            <p className="text-xs text-muted-foreground">
                              Cadre: {item.frame}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-destructive transition-smooth"
                          aria-label="Retirer du panier"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-smooth"
                            aria-label="Diminuer la quantité"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-12 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-smooth"
                            aria-label="Augmenter la quantité"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">
                            {item.priceValue * item.quantity} MAD
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-muted-foreground">
                              {item.priceValue} MAD / unité
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-elegant sticky top-24">
              <CardContent className="p-6 space-y-6">
                <h2 className="text-xl font-serif font-bold">Résumé de la commande</h2>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span className="font-medium">{getCartTotal()} MAD</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Livraison</span>
                    <span className="font-medium">
                      {shippingCost === 0 ? (
                        <span className="text-green-600">Gratuite</span>
                      ) : (
                        `${shippingCost} MAD`
                      )}
                    </span>
                  </div>
                  {getCartTotal() < 500 && (
                    <p className="text-xs text-muted-foreground">
                      Ajoutez {500 - getCartTotal()} MAD pour la livraison gratuite
                    </p>
                  )}
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        {total} MAD
                      </span>
                    </div>
                  </div>
                </div>

                <Link to="/checkout" className="block">
                  <Button variant="hero" size="lg" className="w-full">
                    Passer la commande
                  </Button>
                </Link>

                <Link to="/gallery">
                  <Button variant="outline" size="lg" className="w-full">
                    Continuer mes achats
                  </Button>
                </Link>

                {/* Trust Badges */}
                <div className="pt-6 border-t border-border space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary">✓</span>
                    </div>
                    <span className="text-muted-foreground">Paiement sécurisé</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary">✓</span>
                    </div>
                    <span className="text-muted-foreground">Livraison rapide</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary">✓</span>
                    </div>
                    <span className="text-muted-foreground">Retours sous 14 jours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
