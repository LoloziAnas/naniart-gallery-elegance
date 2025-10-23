import { Truck, MapPin, Package, Clock, Shield, CheckCircle, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ShippingInfo = () => {
  const deliveryZones = [
    {
      zone: "Grandes Villes",
      cities: ["Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir"],
      delay: "2-3 jours ouvrables",
      icon: "🏙️",
    },
    {
      zone: "Villes Moyennes",
      cities: ["Meknès", "Oujda", "Tétouan", "Safi", "El Jadida", "Kenitra"],
      delay: "3-5 jours ouvrables",
      icon: "🏘️",
    },
    {
      zone: "Autres Régions",
      cities: ["Toutes les autres villes du Maroc"],
      delay: "5-7 jours ouvrables",
      icon: "🗺️",
    },
  ];

  const packagingSteps = [
    {
      title: "Protection Premium",
      description: "Chaque œuvre est enveloppée dans du papier bulle de qualité professionnelle",
      icon: Shield,
    },
    {
      title: "Coins Renforcés",
      description: "Des protections d'angle en carton rigide protègent les coins vulnérables",
      icon: Package,
    },
    {
      title: "Carton Double Épaisseur",
      description: "Emballage dans un carton renforcé spécialement conçu pour les œuvres d'art",
      icon: CheckCircle,
    },
  ];

  const features = [
    {
      title: "Livraison Gratuite",
      description: "Pour toute commande supérieure à 500 MAD",
      icon: DollarSign,
      color: "text-green-500",
    },
    {
      title: "Suivi en Temps Réel",
      description: "Numéro de tracking fourni par email",
      icon: MapPin,
      color: "text-blue-500",
    },
    {
      title: "Livraison Rapide",
      description: "2-7 jours selon votre localisation",
      icon: Clock,
      color: "text-orange-500",
    },
    {
      title: "Emballage Sécurisé",
      description: "Protection maximale garantie",
      icon: Shield,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 animate-fade-in max-w-3xl mx-auto">
            <Truck className="h-16 w-16 text-primary mx-auto" />
            <h1 className="text-5xl md:text-6xl font-serif font-bold">
              Informations de Livraison
            </h1>
            <p className="text-xl text-muted-foreground">
              Livraison rapide et sécurisée dans tout le Maroc
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="text-center hover:shadow-lg transition-shadow animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <Icon className={`h-12 w-12 ${feature.color} mx-auto mb-4`} />
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          {/* Delivery Zones */}
          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">
              Délais de Livraison par Zone
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {deliveryZones.map((zone, index) => (
                <Card
                  key={zone.zone}
                  className="hover:shadow-lg transition-shadow animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4 text-center">{zone.icon}</div>
                    <h3 className="font-semibold text-xl mb-3 text-center">
                      {zone.zone}
                    </h3>
                    <Badge className="w-full justify-center mb-4" variant="secondary">
                      <Clock className="h-3 w-3 mr-1" />
                      {zone.delay}
                    </Badge>
                    <div className="space-y-1">
                      {zone.cities.map((city) => (
                        <p key={city} className="text-sm text-muted-foreground text-center">
                          {city}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6">
              * Les délais sont donnés à titre indicatif et peuvent varier selon les conditions
            </p>
          </div>

          {/* Shipping Costs */}
          <Card className="mb-16 border-2 border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-6 text-center">
                Frais de Livraison
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-center p-6 bg-green-50 dark:bg-green-950/20 rounded-lg border-2 border-green-200 dark:border-green-900">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold text-xl mb-2">Livraison Gratuite</h3>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    0 MAD
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Pour les commandes ≥ 500 MAD
                  </p>
                </div>
                <div className="text-center p-6 bg-secondary rounded-lg border-2 border-border">
                  <Truck className="h-12 w-12 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold text-xl mb-2">Livraison Standard</h3>
                  <p className="text-3xl font-bold text-primary mb-2">50 MAD</p>
                  <p className="text-sm text-muted-foreground">
                    Pour les commandes {'<'} 500 MAD
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Packaging Process */}
          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">
              Notre Processus d'Emballage
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {packagingSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Card
                    key={step.title}
                    className="text-center hover:shadow-lg transition-shadow animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Detailed Information */}
          <Card className="mb-12">
            <CardContent className="p-8 space-y-6">
              <div>
                <h3 className="font-semibold text-xl mb-3">Transporteurs Partenaires</h3>
                <p className="text-muted-foreground">
                  Nous travaillons avec les meilleurs transporteurs du Maroc (Amana, CTM, DHL) 
                  pour garantir une livraison rapide et sécurisée de vos œuvres d'art.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-3">Suivi de Commande</h3>
                <p className="text-muted-foreground mb-2">
                  Dès l'expédition de votre commande, vous recevrez :
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Un email de confirmation avec le numéro de suivi</li>
                  <li>Un lien pour suivre votre colis en temps réel</li>
                  <li>Des notifications SMS aux étapes clés de la livraison</li>
                  <li>La possibilité de contacter le livreur directement</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-3">Réception de votre Commande</h3>
                <p className="text-muted-foreground mb-2">
                  À la livraison :
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Vérifiez l'état du colis avant de signer</li>
                  <li>En cas de dommage visible, refusez le colis et contactez-nous</li>
                  <li>Conservez l'emballage pendant 48h en cas de problème</li>
                  <li>Déballez avec précaution et conservez tous les éléments</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-3">Livraison Manquée</h3>
                <p className="text-muted-foreground">
                  Si vous êtes absent lors de la livraison, le transporteur laissera un avis de passage 
                  et tentera une nouvelle livraison le lendemain. Vous pouvez également contacter le 
                  transporteur pour organiser une nouvelle tentative ou un retrait en point relais.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-3">Délais de Traitement</h3>
                <p className="text-muted-foreground">
                  Les commandes passées avant 14h sont traitées le jour même. Les commandes passées 
                  après 14h ou le week-end sont traitées le jour ouvrable suivant. Le délai de livraison 
                  commence à partir de l'expédition.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-3">Livraisons Spéciales</h3>
                <p className="text-muted-foreground">
                  Pour les œuvres de grande taille ({'>'} 120cm) ou les commandes importantes, nous proposons 
                  une livraison premium avec rendez-vous. Contactez-nous pour plus d'informations.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-serif font-bold mb-4">
                Questions sur la Livraison ?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Notre équipe est disponible pour répondre à toutes vos questions concernant 
                la livraison de votre commande.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg">
                  <Link to="/contact">Nous Contacter</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/faq">Consulter la FAQ</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ShippingInfo;
