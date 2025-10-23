import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, TrendingUp, Award, Palette, Home as HomeIcon, Leaf, Zap, ShoppingBag, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ArtworkCard from "@/components/ArtworkCard";
import InstagramFeed from "@/components/InstagramFeed";
import SocialProof from "@/components/SocialProof";
import heroImage from "@/assets/hero-art.jpg";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";
import artwork4 from "@/assets/artwork-4.jpg";

const Home = () => {
  // Theme categories with images
  const themeCategories = [
    {
      id: 1,
      name: "Abstrait",
      slug: "abstrait",
      description: "Formes et couleurs contemporaines",
      image: artwork1,
      count: 24,
      icon: Palette,
    },
    {
      id: 2,
      name: "Nature",
      slug: "nature",
      description: "Paysages et botanique",
      image: artwork4,
      count: 18,
      icon: Leaf,
    },
    {
      id: 3,
      name: "Maroc",
      slug: "maroc",
      description: "Patrimoine et tradition",
      image: artwork3,
      count: 32,
      icon: HomeIcon,
    },
  ];
  
  const featuredArtworks = [
    {
      id: "1",
      title: "Harmonie Terracotta",
      artist: "Amina Benali",
      price: "2,500 MAD",
      priceValue: 2500,
      image: artwork1,
      category: "Abstrait",
      badge: "NOUVEAU",
      inStock: true,
    },
    {
      id: "2",
      title: "Désert d'Or",
      artist: "Karim Essaoui",
      price: "3,200 MAD",
      priceValue: 3200,
      image: artwork2,
      category: "Paysage",
      badge: "BESTSELLER",
      inStock: true,
    },
    {
      id: "3",
      title: "Géométrie Marocaine",
      artist: "Layla Mansouri",
      price: "2,800 MAD",
      priceValue: 2800,
      image: artwork3,
      category: "Géométrique",
      badge: "ÉDITION LIMITÉE",
      inStock: true,
    },
    {
      id: "4",
      title: "Jardin Abstrait",
      artist: "Omar Tahiri",
      price: "3,500 MAD",
      priceValue: 3500,
      image: artwork4,
      category: "Botanique",
      badge: "NOUVEAU",
      inStock: true,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative min-h-[85vh] flex items-center gradient-hero overflow-hidden">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Nouvelle Collection 2025</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-tight">
                Sublimez Votre Intérieur avec l'Art Marocain
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
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
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
                <div>
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Oeuvres</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Artistes</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">2000+</div>
                  <div className="text-sm text-muted-foreground">Clients</div>
                </div>
              </div>
            </div>
            
            {/* Right: Featured Image Grid */}
            <div className="hidden lg:grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-elegant">
                  <img src={artwork1} alt="Featured" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden shadow-elegant">
                  <img src={artwork3} alt="Featured" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-lg overflow-hidden shadow-elegant">
                  <img src={artwork2} alt="Featured" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-elegant">
                  <img src={artwork4} alt="Featured" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Promotional Banner */}
      <section className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              <span>Livraison gratuite dès 500 MAD</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Paiement 100% sécurisé</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span>Ventes Flash chaque semaine</span>
            </div>
          </div>
        </div>
      </section>

      {/* Theme Categories with Images */}
      <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold">
            Explorez par Thème
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez nos collections organisées par thèmes artistiques
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {themeCategories.map((category, index) => (
            <Link
              key={category.id}
              to={`/gallery?theme=${category.slug}`}
              className="group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="overflow-hidden shadow-elegant hover:shadow-hover transition-smooth">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <category.icon className="h-5 w-5" />
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        {category.count} œuvres
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-serif font-bold mb-1">{category.name}</h3>
                    <p className="text-sm text-white/90">{category.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Collection Showcases */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Nouveautés */}
            <Link to="/gallery?filter=nouveautes" className="group">
              <Card className="shadow-elegant hover:shadow-hover transition-smooth overflow-hidden">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={artwork1}
                    alt="Nouveautés"
                    className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Nouveau
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <h3 className="text-3xl font-serif font-bold mb-2">Nouveautés</h3>
                    <p className="text-sm text-white/90 mb-4">
                      Découvrez nos dernières créations
                    </p>
                    <Button variant="secondary" size="sm" className="group-hover:bg-white group-hover:text-primary">
                      Découvrir <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
            
            {/* Bestsellers */}
            <Link to="/gallery?filter=bestsellers" className="group">
              <Card className="shadow-elegant hover:shadow-hover transition-smooth overflow-hidden">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={artwork2}
                    alt="Bestsellers"
                    className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-accent text-accent-foreground">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Populaire
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <h3 className="text-3xl font-serif font-bold mb-2">Bestsellers</h3>
                    <p className="text-sm text-white/90 mb-4">
                      Les œuvres les plus appréciées
                    </p>
                    <Button variant="secondary" size="sm" className="group-hover:bg-white group-hover:text-primary">
                      Découvrir <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
            
            {/* Ventes Flash */}
            <Link to="/gallery?filter=flash" className="group">
              <Card className="shadow-elegant hover:shadow-hover transition-smooth overflow-hidden">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={artwork3}
                    alt="Ventes Flash"
                    className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="destructive">
                      <Zap className="h-3 w-3 mr-1" />
                      -30%
                    </Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-6 w-6" />
                    </div>
                    <h3 className="text-3xl font-serif font-bold mb-2">Ventes Flash</h3>
                    <p className="text-sm text-white/90 mb-4">
                      Offres limitées cette semaine
                    </p>
                    <Button variant="secondary" size="sm" className="group-hover:bg-white group-hover:text-primary">
                      Découvrir <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
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
            {featuredArtworks.map((artwork, index) => (
              <ArtworkCard
                key={artwork.id}
                id={artwork.id}
                title={artwork.title}
                artist={artwork.artist}
                price={artwork.price}
                priceValue={artwork.priceValue}
                image={artwork.image}
                category={artwork.category}
                badge={artwork.badge}
                inStock={artwork.inStock}
                index={index}
              />
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

      {/* Promotional Banner - Special Offer */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge className="bg-primary text-primary-foreground text-sm px-4 py-1">
              Offre Spéciale
            </Badge>
            <h2 className="text-4xl md:text-5xl font-serif font-bold">
              -20% sur Votre Première Commande
            </h2>
            <p className="text-xl text-muted-foreground">
              Inscrivez-vous à notre newsletter et recevez immédiatement votre code promo
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-3 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="hero" size="lg">
                S'inscrire
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* About Preview */}
      <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-serif font-bold">
              L'Art Marocain à Portée de Main
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Chez Naniart, nous croyons que chaque espace mérite d'être sublimé par l'art. Notre galerie en ligne 
              propose une collection soigneusement sélectionnée de tableaux décoratifs créés par des artistes marocains 
              de talent.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Qualité Premium</h4>
                  <p className="text-sm text-muted-foreground">
                    Chaque œuvre est soigneusement sélectionnée pour sa qualité exceptionnelle
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Palette className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Artistes Talentueux</h4>
                  <p className="text-sm text-muted-foreground">
                    Nous collaborons avec les meilleurs artistes marocains
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Livraison Rapide</h4>
                  <p className="text-sm text-muted-foreground">
                    Recevez vos œuvres en toute sécurité partout au Maroc
                  </p>
                </div>
              </div>
            </div>
            <Button asChild variant="outline" size="lg">
              <Link to="/about">Découvrir Notre Histoire</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden shadow-elegant">
                <img src={artwork1} alt="Gallery" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-elegant">
                <img src={artwork3} alt="Gallery" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-elegant">
                <img src={artwork2} alt="Gallery" className="w-full h-full object-cover" />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden shadow-elegant">
                <img src={artwork4} alt="Gallery" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <InstagramFeed username="naniart.ma" maxPosts={6} />

      {/* Social Proof Notifications */}
      <SocialProof />
    </div>
  );
};

export default Home;
