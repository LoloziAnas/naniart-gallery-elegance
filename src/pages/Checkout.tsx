import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard, Smartphone, Banknote, ShoppingBag, Check, User as UserIcon, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AuthModal from "@/components/AuthModal";
import { useCreateOrder } from "@/hooks/useOrders";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const createOrder = useCreateOrder();
  const [step, setStep] = useState(1);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [formData, setFormData] = useState({
    // Shipping Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    // Payment
    paymentMethod: "card",
    // Terms
    acceptTerms: false,
  });

  // Pre-fill form with user data if authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || prev.firstName,
        lastName: user.lastName || prev.lastName,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        address: user.address || prev.address,
        city: user.city || prev.city,
        postalCode: user.postalCode || prev.postalCode,
      }));
    }
  }, [isAuthenticated, user]);

  // Show auth prompt on mount if not authenticated
  useEffect(() => {
    if (!isAuthenticated && items.length > 0) {
      setShowAuthPrompt(true);
    }
  }, []);

  const shippingCost = getCartTotal() >= 500 ? 0 : 50;
  const total = getCartTotal() + shippingCost;

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentMethodChange = (value: string) => {
    setFormData({
      ...formData,
      paymentMethod: value,
    });
  };

  const validateStep1 = () => {
    const { firstName, lastName, email, phone, address, city, postalCode } = formData;
    if (!firstName || !lastName || !email || !phone || !address || !city || !postalCode) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && !validateStep1()) return;
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmitOrder = async () => {
    if (!formData.acceptTerms) {
      toast({
        title: "Conditions non acceptées",
        description: "Veuillez accepter les conditions générales de vente",
        variant: "destructive",
      });
      return;
    }

    // Check if user is authenticated for backend order creation
    if (!isAuthenticated) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour finaliser votre commande",
        variant: "destructive",
      });
      setShowAuthModal(true);
      return;
    }

    try {
      // Prepare order data for backend
      const orderData = {
        items: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
        paymentMethod: formData.paymentMethod === 'card' ? 'CREDIT_CARD' as const :
                       formData.paymentMethod === 'mobile' ? 'MOBILE_PAYMENT' as const :
                       formData.paymentMethod === 'bank' ? 'BANK_TRANSFER' as const :
                       'CASH_ON_DELIVERY' as const,
        shippingFirstName: formData.firstName,
        shippingLastName: formData.lastName,
        shippingEmail: formData.email,
        shippingPhone: formData.phone,
        shippingAddress: formData.address,
        shippingCity: formData.city,
        shippingPostalCode: formData.postalCode,
        shippingCountry: 'Maroc',
        notes: '',
      };

      // Create order via backend
      const response = await createOrder.mutateAsync(orderData);
      
      // Clear cart and navigate to confirmation
      clearCart();
      navigate("/order-confirmation", {
        state: {
          orderNumber: response.orderNumber,
          total: response.totalAmount,
          formData,
        },
      });
    } catch (error) {
      // Error is handled by the mutation
      console.error('Order creation failed:', error);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Authentication Prompt */}
        {showAuthPrompt && !isAuthenticated && (
          <div className="max-w-6xl mx-auto mb-6">
            <Card className="border-primary/50 bg-primary/5">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <UserIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">
                      Connectez-vous pour une expérience optimale
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      En vous connectant, vos informations seront automatiquement remplies et vous pourrez suivre votre commande.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        onClick={() => {
                          setShowAuthModal(true);
                          setShowAuthPrompt(false);
                        }}
                        className="gap-2"
                      >
                        <LogIn className="h-4 w-4" />
                        Se connecter
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowAuthPrompt(false)}
                      >
                        Continuer sans compte
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* User Info Display for Authenticated Users */}
        {isAuthenticated && user && (
          <div className="max-w-6xl mx-auto mb-6">
            <Card className="border-green-500/50 bg-green-50/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">
                      Connecté en tant que {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {step > 1 ? <Check className="h-5 w-5" /> : "1"}
              </div>
              <span className={`text-sm font-medium ${step >= 1 ? "text-foreground" : "text-muted-foreground"}`}>
                Livraison
              </span>
            </div>
            <div className="flex-1 h-0.5 bg-border mx-4" />
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= 2
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {step > 2 ? <Check className="h-5 w-5" /> : "2"}
              </div>
              <span className={`text-sm font-medium ${step >= 2 ? "text-foreground" : "text-muted-foreground"}`}>
                Paiement
              </span>
            </div>
            <div className="flex-1 h-0.5 bg-border mx-4" />
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= 3
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                3
              </div>
              <span className={`text-sm font-medium ${step >= 3 ? "text-foreground" : "text-muted-foreground"}`}>
                Confirmation
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="shadow-elegant">
              <CardContent className="p-8">
                {/* Step 1: Shipping Information */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-serif font-bold">Informations de livraison</h2>
                      {isAuthenticated && (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <Check className="h-4 w-4" />
                          <span>Informations pré-remplies</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Votre prénom"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Votre nom"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="votre@email.com"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Téléphone *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+212 6XX XXX XXX"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Adresse *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Numéro et nom de rue"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">Ville *</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Ville"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Code postal *</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          placeholder="Code postal"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button onClick={handleNextStep} variant="hero" size="lg">
                        Continuer vers le paiement
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Payment Method */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-serif font-bold">Mode de paiement</h2>
                    
                    <RadioGroup value={formData.paymentMethod} onValueChange={handlePaymentMethodChange}>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:border-primary transition-smooth cursor-pointer">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                            <CreditCard className="h-5 w-5 text-primary" />
                            <div>
                              <div className="font-medium">Carte bancaire</div>
                              <div className="text-xs text-muted-foreground">Visa, Mastercard, CMI</div>
                            </div>
                          </Label>
                        </div>

                        <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:border-primary transition-smooth cursor-pointer">
                          <RadioGroupItem value="mobile" id="mobile" />
                          <Label htmlFor="mobile" className="flex items-center gap-3 cursor-pointer flex-1">
                            <Smartphone className="h-5 w-5 text-primary" />
                            <div>
                              <div className="font-medium">Paiement mobile</div>
                              <div className="text-xs text-muted-foreground">Orange Money, Maroc Telecom</div>
                            </div>
                          </Label>
                        </div>

                        <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:border-primary transition-smooth cursor-pointer">
                          <RadioGroupItem value="cash" id="cash" />
                          <Label htmlFor="cash" className="flex items-center gap-3 cursor-pointer flex-1">
                            <Banknote className="h-5 w-5 text-primary" />
                            <div>
                              <div className="font-medium">Cash à la livraison</div>
                              <div className="text-xs text-muted-foreground">Paiement en espèces</div>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>

                    <div className="flex justify-between pt-4">
                      <Button onClick={handlePreviousStep} variant="outline" size="lg">
                        Retour
                      </Button>
                      <Button onClick={handleNextStep} variant="hero" size="lg">
                        Continuer
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Order Review */}
                {step === 3 && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-serif font-bold">Vérification de la commande</h2>
                    
                    {/* Shipping Info Review */}
                    <div className="p-4 bg-secondary/20 rounded-lg">
                      <h3 className="font-semibold mb-3">Adresse de livraison</h3>
                      <p className="text-sm text-muted-foreground">
                        {formData.firstName} {formData.lastName}<br />
                        {formData.address}<br />
                        {formData.city}, {formData.postalCode}<br />
                        {formData.phone}<br />
                        {formData.email}
                      </p>
                      <Button
                        onClick={() => setStep(1)}
                        variant="link"
                        size="sm"
                        className="mt-2 p-0 h-auto"
                      >
                        Modifier
                      </Button>
                    </div>

                    {/* Payment Method Review */}
                    <div className="p-4 bg-secondary/20 rounded-lg">
                      <h3 className="font-semibold mb-3">Mode de paiement</h3>
                      <p className="text-sm text-muted-foreground">
                        {formData.paymentMethod === "card" && "Carte bancaire"}
                        {formData.paymentMethod === "mobile" && "Paiement mobile"}
                        {formData.paymentMethod === "cash" && "Cash à la livraison"}
                      </p>
                      <Button
                        onClick={() => setStep(2)}
                        variant="link"
                        size="sm"
                        className="mt-2 p-0 h-auto"
                      >
                        Modifier
                      </Button>
                    </div>

                    {/* Terms */}
                    <div className="flex items-start space-x-3 p-4 border border-border rounded-lg">
                      <Checkbox
                        id="terms"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, acceptTerms: checked as boolean })
                        }
                      />
                      <Label htmlFor="terms" className="text-sm cursor-pointer">
                        J'accepte les{" "}
                        <a href="#" className="text-primary hover:underline">
                          conditions générales de vente
                        </a>{" "}
                        et la{" "}
                        <a href="#" className="text-primary hover:underline">
                          politique de confidentialité
                        </a>
                      </Label>
                    </div>

                    <div className="flex justify-between pt-4">
                      <Button onClick={handlePreviousStep} variant="outline" size="lg">
                        Retour
                      </Button>
                      <Button
                        onClick={handleSubmitOrder}
                        variant="hero"
                        size="lg"
                        disabled={!formData.acceptTerms}
                      >
                        Confirmer la commande
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="shadow-elegant sticky top-24">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-serif font-bold text-lg">Résumé</h3>
                
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded bg-secondary/20 flex-shrink-0 overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.title}</p>
                        <p className="text-xs text-muted-foreground">Qté: {item.quantity}</p>
                        <p className="text-sm font-semibold text-primary">
                          {item.priceValue * item.quantity} MAD
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2">
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
                  <div className="flex justify-between pt-2 border-t border-border">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold text-primary">{total} MAD</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultTab="login"
      />
    </div>
  );
};

export default Checkout;
