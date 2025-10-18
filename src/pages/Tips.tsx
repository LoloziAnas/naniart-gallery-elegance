import { Card, CardContent } from "@/components/ui/card";
import { Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";

const Tips = () => {
  const articles = [
    {
      id: 1,
      title: "Comment Choisir l'Art Parfait pour Votre Salon",
      excerpt:
        "Découvrez nos conseils d'experts pour sélectionner l'œuvre d'art qui transformera votre salon en un espace élégant et personnalisé.",
      image: artwork1,
      readTime: "5 min",
      category: "Conseils",
    },
    {
      id: 2,
      title: "L'Art Marocain dans la Décoration Moderne",
      excerpt:
        "Comment intégrer harmonieusement l'art traditionnel marocain dans un intérieur contemporain pour un résultat sophistiqué.",
      image: artwork2,
      readTime: "7 min",
      category: "Style",
    },
    {
      id: 3,
      title: "Placer et Mettre en Valeur Vos Tableaux",
      excerpt:
        "Les règles essentielles de hauteur, d'éclairage et d'agencement pour sublimer vos œuvres d'art murales.",
      image: artwork3,
      readTime: "6 min",
      category: "Installation",
    },
    {
      id: 4,
      title: "Créer une Galerie Murale Harmonieuse",
      excerpt:
        "Apprenez à composer un mur de galerie équilibré qui raconte votre histoire à travers l'art.",
      image: artwork1,
      readTime: "8 min",
      category: "Composition",
    },
    {
      id: 5,
      title: "Les Couleurs dans l'Art et la Décoration",
      excerpt:
        "Comment utiliser la psychologie des couleurs pour créer l'ambiance parfaite dans chaque pièce.",
      image: artwork2,
      readTime: "5 min",
      category: "Couleur",
    },
    {
      id: 6,
      title: "Entretenir et Préserver Vos Œuvres d'Art",
      excerpt:
        "Conseils pratiques pour maintenir vos tableaux en parfait état au fil des années.",
      image: artwork3,
      readTime: "4 min",
      category: "Entretien",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-serif font-bold">
              Conseils Déco
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Inspirations et guides pratiques pour sublimer votre intérieur avec l'art
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <Card
              key={article.id}
              className="overflow-hidden artwork-hover shadow-elegant group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    {article.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  {article.readTime} de lecture
                </div>
                <h3 className="font-serif font-semibold text-xl group-hover:text-primary transition-smooth">
                  {article.title}
                </h3>
                <p className="text-muted-foreground">{article.excerpt}</p>
                <Link
                  to="#"
                  className="inline-flex items-center text-primary font-medium hover:text-accent transition-smooth"
                >
                  Lire l'article <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Tips;
