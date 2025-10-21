import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Package, Mail, Phone } from "lucide-react";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state;

  useEffect(() => {
    if (!orderData) {
      navigate("/");
    }
  }, [orderData, navigate]);

  if (!orderData) {
    return null;
  }

  const { orderNumber, total, formData } = orderData;

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8 space-y-4">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-serif font-bold">Commande confirmée !</h1>
            <p className="text-xl text-muted-foreground">
              Merci pour votre achat
            </p>
            <div className="inline-block px-6 py-3 bg-primary/10 rounded-lg">
              <p className="text-sm text-muted-foreground">Numéro de commande</p>
              <p className="text-2xl font-bold text-primary">#{orderNumber}</p>
            </div>
          </div>

          {/* Order Details */}
          <Card className="shadow-elegant mb-6">
            <CardContent className="p-8 space-y-6">
              <div>
                <h2 className="text-xl font-serif font-bold mb-4">Détails de la commande</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Package className="h-4 w-4 text-primary" />
                      Adresse de livraison
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}<br />
                      {formData.city}, {formData.postalCode}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Mail className="h-4 w-4 text-primary" />
                      Coordonnées
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {formData.email}<br />
                      {formData.phone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Montant total</span>
                  <span className="text-3xl font-bold text-primary">{total} MAD</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What's Next */}
          <Card className="shadow-elegant mb-6">
            <CardContent className="p-8">
              <h2 className="text-xl font-serif font-bold mb-4">Et maintenant ?</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-semibold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Confirmation par email</h3>
                    <p className="text-sm text-muted-foreground">
                      Vous recevrez un email de confirmation avec tous les détails de votre commande à{" "}
                      <span className="font-medium text-foreground">{formData.email}</span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-semibold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Préparation de votre commande</h3>
                    <p className="text-sm text-muted-foreground">
                      Nous préparons soigneusement vos œuvres d'art pour l'expédition
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-semibold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Livraison</h3>
                    <p className="text-sm text-muted-foreground">
                      Votre commande sera livrée sous 3-5 jours ouvrables
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Support */}
          <Card className="shadow-elegant mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">Besoin d'aide ?</h3>
                  <p className="text-sm text-muted-foreground">
                    Notre équipe est là pour vous aider
                  </p>
                </div>
                <div className="flex gap-2">
                  <a href="tel:+212771300358">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Phone className="h-4 w-4" />
                      Appeler
                    </Button>
                  </a>
                  <a href="mailto:contact@naniart.ma">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/gallery">
              <Button variant="hero" size="lg" className="w-full sm:w-auto">
                Continuer mes achats
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Retour à l'accueil
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Partagez votre expérience avec nous
            </p>
            <Link to="/reviews">
              <Button variant="link" className="text-primary">
                Laisser un avis →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
