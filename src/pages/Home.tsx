import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-art.jpg";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";
import artwork4 from "@/assets/artwork-4.jpg";

const Home = () => {
  const featuredArtworks = [
    {
      id: 1,
      title: "Harmonie Terracotta",
      artist: "Amina Benali",
      price: "2,500 MAD",
      image: artwork1,
      tag: "Nouveau",
    },
    {
      id: 2,
      title: "Désert d'Or",
      artist: "Karim Essaoui",
      price: "3,200 MAD",
      image: artwork2,
      tag: "Populaire",
    },
    {
      id: 3,
      title: "Géométrie Marocaine",
      artist: "Layla Mansouri",
      price: "2,800 MAD",
      image: artwork3,
      tag: "Édition Limitée",
    },
    {
      id: 4,
      title: "Jardin Abstrait",
      artist: "Omar Tahiri",
      price: "3,500 MAD",
      image: artwork4,
      tag: "Nouveau",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center gradient-hero overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-tight">
              Sublimez Votre Intérieur avec l'Art Marocain
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Découvrez notre collection exclusive de tableaux décoratifs créés par des artistes marocains talentueux.
              Chaque œuvre raconte une histoire unique.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="hero" size="lg" className="text-base">
                <Link to="/gallery">
                  Explorer la Galerie <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base">
                <Link to="/about">En Savoir Plus</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="shadow-elegant hover:shadow-hover transition-smooth cursor-pointer group">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-serif font-semibold">Nouveautés</h3>
              <p className="text-muted-foreground">
                Découvrez nos dernières créations artistiques
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-elegant hover:shadow-hover transition-smooth cursor-pointer group">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-smooth">
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-2xl font-serif font-semibold">Bestsellers</h3>
              <p className="text-muted-foreground">
                Les œuvres les plus appréciées
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-elegant hover:shadow-hover transition-smooth cursor-pointer group">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center group-hover:bg-secondary transition-smooth">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-serif font-semibold">Éditions Limitées</h3>
              <p className="text-muted-foreground">
                Collections exclusives et uniques
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold">
              Œuvres Sélectionnées
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une sélection d'œuvres d'art exceptionnelles pour embellir votre espace
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredArtworks.map((artwork) => (
              <Link key={artwork.id} to={`/product/${artwork.id}`}>
                <Card className="overflow-hidden artwork-hover shadow-elegant group">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                        {artwork.tag}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-2">
                    <h3 className="font-serif font-semibold text-lg">{artwork.title}</h3>
                    <p className="text-sm text-muted-foreground">{artwork.artist}</p>
                    <p className="text-lg font-bold text-primary">{artwork.price}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="hero" size="lg">
              <Link to="/gallery">
                Voir Toute la Collection <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold">
            L'Art Marocain à Portée de Main
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Chez Naniart, nous croyons que chaque espace mérite d'être sublimé par l'art. Notre galerie en ligne 
            propose une collection soigneusement sélectionnée de tableaux décoratifs créés par des artistes marocains 
            de talent. Nous célébrons la richesse culturelle du Maroc à travers des œuvres contemporaines qui allient 
            tradition et modernité.
          </p>
          <Button asChild variant="outline" size="lg">
            <Link to="/about">Découvrir Notre Histoire</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
