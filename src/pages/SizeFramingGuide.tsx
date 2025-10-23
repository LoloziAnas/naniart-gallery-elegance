import { Ruler, Frame, Home, Maximize2, Eye, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import artwork1 from "@/assets/artwork-1.jpg";

const SizeFramingGuide = () => {
  const sizes = [
    {
      name: "Petit",
      dimensions: "30 x 40 cm",
      description: "Parfait pour les petits espaces ou les compositions murales",
      rooms: ["Cuisine", "Salle de bain", "Couloir", "Bureau"],
      price: "À partir de 1,500 MAD",
      scale: 0.3,
    },
    {
      name: "Moyen",
      dimensions: "50 x 70 cm",
      description: "Format polyvalent, idéal pour la plupart des pièces",
      rooms: ["Chambre", "Bureau", "Salon", "Entrée"],
      price: "À partir de 2,500 MAD",
      scale: 0.5,
      popular: true,
    },
    {
      name: "Grand",
      dimensions: "80 x 100 cm",
      description: "Format imposant pour créer un point focal",
      rooms: ["Salon", "Salle à manger", "Chambre principale"],
      price: "À partir de 3,750 MAD",
      scale: 0.7,
    },
    {
      name: "Panoramique",
      dimensions: "120 x 40 cm",
      description: "Format horizontal, parfait au-dessus d'un canapé",
      rooms: ["Salon", "Chambre", "Bureau"],
      price: "À partir de 3,200 MAD",
      scale: 0.4,
    },
    {
      name: "Carré",
      dimensions: "60 x 60 cm",
      description: "Format équilibré pour compositions symétriques",
      rooms: ["Entrée", "Bureau", "Chambre"],
      price: "À partir de 2,800 MAD",
      scale: 0.45,
    },
    {
      name: "XXL",
      dimensions: "120 x 150 cm",
      description: "Format monumental pour les grands espaces",
      rooms: ["Grand salon", "Hall d'entrée", "Loft"],
      price: "À partir de 5,500 MAD",
      scale: 0.9,
    },
  ];

  const framingOptions = [
    {
      name: "Toile Tendue",
      description: "Œuvre montée sur châssis en bois, prête à accrocher",
      features: [
        "Style moderne et épuré",
        "Pas de cadre visible",
        "Profondeur 2-3 cm",
        "Système d'accrochage inclus",
      ],
      price: "+0 MAD",
      image: artwork1,
      recommended: "Style contemporain",
    },
    {
      name: "Cadre Noir",
      description: "Cadre en bois noir mat avec passe-partout blanc",
      features: [
        "Élégant et intemporel",
        "Met en valeur l'œuvre",
        "Largeur du cadre : 2 cm",
        "Verre anti-reflet inclus",
      ],
      price: "+200 MAD",
      image: artwork1,
      recommended: "Tous styles",
    },
    {
      name: "Cadre Bois",
      description: "Cadre en bois naturel avec passe-partout crème",
      features: [
        "Chaleureux et naturel",
        "Finition vernie",
        "Largeur du cadre : 3 cm",
        "Verre anti-reflet inclus",
      ],
      price: "+300 MAD",
      image: artwork1,
      recommended: "Style scandinave/bohème",
    },
    {
      name: "Cadre Doré",
      description: "Cadre doré avec passe-partout ivoire",
      features: [
        "Luxueux et raffiné",
        "Finition dorée mate",
        "Largeur du cadre : 4 cm",
        "Verre anti-reflet inclus",
      ],
      price: "+400 MAD",
      image: artwork1,
      recommended: "Style classique/élégant",
    },
  ];

  const placementTips = [
    {
      icon: Eye,
      title: "Hauteur Idéale",
      description: "Le centre de l'œuvre doit être à hauteur des yeux, soit environ 145-150 cm du sol.",
    },
    {
      icon: Ruler,
      title: "Proportions",
      description: "L'œuvre devrait occuper 2/3 à 3/4 de la largeur du meuble en dessous (canapé, console, lit).",
    },
    {
      icon: Maximize2,
      title: "Espacement",
      description: "Laissez 15-20 cm entre le haut du meuble et le bas de l'œuvre pour un équilibre visuel.",
    },
    {
      icon: Home,
      title: "Murs Vides",
      description: "Sur un mur vide, l'œuvre peut occuper jusqu'à 60-75% de la largeur du mur pour un impact maximal.",
    },
    {
      icon: Lightbulb,
      title: "Éclairage",
      description: "Évitez la lumière directe du soleil. Un éclairage indirect ou des spots orientables sont idéaux.",
    },
    {
      icon: Frame,
      title: "Compositions",
      description: "Pour un mur galerie, espacez les œuvres de 5-10 cm et alignez-les sur un axe central.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 animate-fade-in max-w-3xl mx-auto">
            <Ruler className="h-16 w-16 text-primary mx-auto" />
            <h1 className="text-5xl md:text-6xl font-serif font-bold">
              Guide des Tailles & Encadrement
            </h1>
            <p className="text-xl text-muted-foreground">
              Trouvez la taille et le cadre parfaits pour votre espace
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          {/* Size Comparison Visual */}
          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">
              Comparaison des Formats
            </h2>
            <Card className="p-8 bg-secondary/30">
              <div className="flex items-end justify-center gap-6 flex-wrap min-h-[300px]">
                {sizes.slice(0, 4).map((size) => (
                  <div key={size.name} className="text-center">
                    <div
                      className="bg-primary/20 border-2 border-primary rounded mx-auto mb-3 flex items-center justify-center relative group hover:bg-primary/30 transition-colors"
                      style={{
                        width: `${size.scale * 200}px`,
                        height: `${size.scale * 250}px`,
                      }}
                    >
                      <span className="text-xs font-medium text-primary">
                        {size.dimensions}
                      </span>
                      {size.popular && (
                        <Badge className="absolute -top-2 -right-2">Populaire</Badge>
                      )}
                    </div>
                    <p className="text-sm font-semibold">{size.name}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Size Details */}
          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">
              Détails des Formats
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sizes.map((size, index) => (
                <Card
                  key={size.name}
                  className="hover:shadow-lg transition-shadow animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-xl">{size.name}</h3>
                      {size.popular && <Badge>Populaire</Badge>}
                    </div>
                    <Badge variant="secondary" className="mb-3">
                      {size.dimensions}
                    </Badge>
                    <p className="text-sm text-muted-foreground mb-4">
                      {size.description}
                    </p>
                    <div className="mb-4">
                      <p className="text-xs font-semibold mb-2">Idéal pour :</p>
                      <div className="flex flex-wrap gap-1">
                        {size.rooms.map((room) => (
                          <Badge key={room} variant="outline" className="text-xs">
                            {room}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-primary">{size.price}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Framing Options */}
          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">
              Options d'Encadrement
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {framingOptions.map((option, index) => (
                <Card
                  key={option.name}
                  className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-video bg-secondary relative overflow-hidden">
                    <img
                      src={option.image}
                      alt={option.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 right-3">{option.price}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-xl mb-2">{option.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {option.description}
                    </p>
                    <ul className="space-y-2 mb-4">
                      {option.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-1">✓</span>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Badge variant="secondary" className="w-full justify-center">
                      Recommandé : {option.recommended}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Placement Tips */}
          <div className="mb-16">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">
              Conseils de Placement
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {placementTips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <Card
                    key={tip.title}
                    className="hover:shadow-lg transition-shadow animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{tip.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {tip.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Additional Information */}
          <Card className="mb-12">
            <CardContent className="p-8 space-y-6">
              <div>
                <h3 className="font-semibold text-xl mb-3">Comment Mesurer votre Espace ?</h3>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Mesurez la largeur et la hauteur du mur disponible</li>
                  <li>Si l'œuvre sera au-dessus d'un meuble, mesurez sa largeur</li>
                  <li>Prenez en compte les prises électriques et interrupteurs</li>
                  <li>Utilisez du ruban adhésif pour visualiser l'emplacement</li>
                  <li>Prenez du recul pour évaluer les proportions</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-3">Compositions Murales</h3>
                <p className="text-muted-foreground mb-3">
                  Pour créer un mur galerie harmonieux :
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Commencez par la pièce centrale (la plus grande)</li>
                  <li>Disposez les autres œuvres autour en maintenant un espacement régulier</li>
                  <li>Alignez les œuvres sur un axe horizontal imaginaire</li>
                  <li>Mélangez les tailles pour créer du dynamisme</li>
                  <li>Gardez un espacement de 5-10 cm entre chaque œuvre</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-xl mb-3">Installation</h3>
                <p className="text-muted-foreground">
                  Toutes nos œuvres sont livrées avec le système d'accrochage approprié. 
                  Pour les œuvres lourdes ({'>'}5kg), nous recommandons d'utiliser des chevilles 
                  adaptées à votre type de mur. Un guide d'installation détaillé est inclus 
                  avec chaque commande.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-serif font-bold mb-4">
                Besoin de Conseils Personnalisés ?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Notre équipe d'experts est disponible pour vous aider à choisir la taille 
                et l'encadrement parfaits pour votre espace.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg">
                  <Link to="/contact">Demander Conseil</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/gallery">Parcourir la Galerie</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default SizeFramingGuide;
