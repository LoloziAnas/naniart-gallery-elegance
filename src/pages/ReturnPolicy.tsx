import { RefreshCw, CheckCircle, XCircle, Clock, Package, CreditCard, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ReturnPolicy = () => {
  const steps = [
    {
      number: 1,
      title: "Contactez-nous",
      description: "Envoyez-nous un email ou utilisez le chat en direct pour initier votre retour dans les 14 jours.",
      icon: Mail,
    },
    {
      number: 2,
      title: "Emballez l'œuvre",
      description: "Remettez l'œuvre dans son emballage d'origine avec tous les accessoires.",
      icon: Package,
    },
    {
      number: 3,
      title: "Expédition",
      description: "Nous organisons la collecte à votre domicile. Les frais de retour sont à notre charge.",
      icon: RefreshCw,
    },
    {
      number: 4,
      title: "Remboursement",
      description: "Vous recevez votre remboursement complet sous 5-7 jours après réception.",
      icon: CreditCard,
    },
  ];

  const conditions = [
    {
      title: "Produits éligibles",
      items: [
        "Toutes les œuvres d'art et reproductions",
        "Cadres et accessoires",
        "Collections standards et éditions limitées",
      ],
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      title: "Produits non éligibles",
      items: [
        "Œuvres personnalisées ou sur mesure",
        "Produits endommagés par le client",
        "Emballage d'origine manquant ou détérioré",
      ],
      icon: XCircle,
      color: "text-red-500",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 animate-fade-in max-w-3xl mx-auto">
            <RefreshCw className="h-16 w-16 text-primary mx-auto" />
            <h1 className="text-5xl md:text-6xl font-serif font-bold">
              Politique de Retour
            </h1>
            <p className="text-xl text-muted-foreground">
              Votre satisfaction est notre priorité. Retours gratuits sous 14 jours.
            </p>
            <Badge variant="secondary" className="text-base px-6 py-2">
              <Clock className="h-4 w-4 mr-2" />
              14 jours pour changer d'avis
            </Badge>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          {/* Overview */}
          <Card className="mb-12 border-2 border-primary/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold mb-4">Notre Engagement</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Chez Naniart, nous voulons que vous soyez totalement satisfait de votre achat. 
                Si pour une raison quelconque vous n'êtes pas entièrement satisfait de votre œuvre, 
                vous pouvez la retourner dans les <span className="font-semibold text-foreground">14 jours</span> suivant 
                la réception pour un remboursement complet.
              </p>
              <p className="text-muted-foreground">
                Les frais de retour sont <span className="font-semibold text-foreground">entièrement à notre charge</span>. 
                Nous organisons la collecte à votre domicile pour votre confort.
              </p>
            </CardContent>
          </Card>

          {/* Process Steps */}
          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">
              Comment Retourner un Produit ?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Card
                    key={step.number}
                    className="text-center hover:shadow-lg transition-shadow animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <div className="text-sm font-semibold text-primary mb-2">
                        Étape {step.number}
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

          {/* Conditions */}
          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">
              Conditions de Retour
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {conditions.map((condition, index) => {
                const Icon = condition.icon;
                return (
                  <Card
                    key={condition.title}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Icon className={`h-6 w-6 ${condition.color}`} />
                        <h3 className="font-semibold text-lg">{condition.title}</h3>
                      </div>
                      <ul className="space-y-2">
                        {condition.items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm">
                            <span className={`mt-1 ${condition.color}`}>•</span>
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Detailed Policy */}
          <Card className="mb-12">
            <CardContent className="p-8 space-y-6">
              <div>
                <h3 className="font-semibold text-xl mb-3">Délai de Retour</h3>
                <p className="text-muted-foreground">
                  Vous disposez de <strong>14 jours calendaires</strong> à compter de la date de réception 
                  de votre commande pour nous informer de votre souhait de retour. Le produit doit être 
                  retourné dans les 7 jours suivant votre demande.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-3">État du Produit</h3>
                <p className="text-muted-foreground mb-2">
                  Pour être éligible au retour, le produit doit :
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Être dans son état d'origine, non utilisé et non endommagé</li>
                  <li>Être dans son emballage d'origine avec toutes les étiquettes</li>
                  <li>Inclure tous les accessoires et documents fournis</li>
                  <li>Ne présenter aucun signe d'installation ou de montage</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-3">Frais de Retour</h3>
                <p className="text-muted-foreground">
                  Les frais de retour sont <strong>entièrement gratuits</strong>. Nous organisons la collecte 
                  à votre domicile via notre transporteur partenaire. Vous n'avez rien à payer.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-3">Remboursement</h3>
                <p className="text-muted-foreground mb-2">
                  Une fois votre retour reçu et inspecté, nous vous enverrons un email pour confirmer 
                  la réception. Le remboursement sera effectué dans les <strong>5-7 jours ouvrables</strong> sur 
                  votre moyen de paiement d'origine.
                </p>
                <p className="text-muted-foreground">
                  Si vous avez payé à la livraison, nous vous contacterons pour organiser le remboursement 
                  par virement bancaire.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-3">Échanges</h3>
                <p className="text-muted-foreground">
                  Nous n'effectuons pas d'échanges directs. Si vous souhaitez un produit différent, 
                  veuillez retourner l'article actuel pour un remboursement et passer une nouvelle commande.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-3">Produits Endommagés ou Défectueux</h3>
                <p className="text-muted-foreground">
                  Si vous recevez un produit endommagé ou défectueux, contactez-nous immédiatement avec 
                  des photos. Nous organiserons un remplacement ou un remboursement complet, y compris 
                  les frais de livraison initiaux.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-serif font-bold mb-4">
                Besoin d'Aide pour un Retour ?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Notre équipe est disponible pour vous accompagner dans votre démarche de retour. 
                Contactez-nous et nous traiterons votre demande rapidement.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg">
                  <Link to="/contact">Initier un Retour</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/faq">Consulter la FAQ</Link>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                Email : <a href="mailto:retours@naniart.ma" className="text-primary hover:underline">retours@naniart.ma</a>
                {" • "}
                Tél : <a href="tel:+212XXXXXXXXX" className="text-primary hover:underline">+212 5XX-XXXXXX</a>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ReturnPolicy;
