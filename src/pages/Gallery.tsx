import { Link, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";
import artwork4 from "@/assets/artwork-4.jpg";

const Gallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const filter = searchParams.get("filter");
  const theme = searchParams.get("theme");
  const format = searchParams.get("format");
  const color = searchParams.get("color");
  const interior = searchParams.get("interior");

  const allArtworks = [
    {
      id: 1,
      title: "Harmonie Terracotta",
      artist: "Amina Benali",
      price: "2,500 MAD",
      image: artwork1,
      category: "Abstrait",
      themeSlug: "abstrait",
      isNew: true,
      isBestseller: false,
      isFlash: false,
      format: "moyen (50x70cm)",
      color: "terracotta",
      interior: "salon",
    },
    {
      id: 2,
      title: "Désert d'Or",
      artist: "Karim Essaoui",
      price: "3,200 MAD",
      image: artwork2,
      category: "Paysage",
      themeSlug: "nature",
      isNew: false,
      isBestseller: true,
      isFlash: false,
      format: "grand (80x100cm)",
      color: "or",
      interior: "salon",
    },
    {
      id: 3,
      title: "Géométrie Marocaine",
      artist: "Layla Mansouri",
      price: "2,800 MAD",
      image: artwork3,
      category: "Géométrique",
      themeSlug: "maroc",
      isNew: false,
      isBestseller: true,
      isFlash: false,
      format: "moyen (50x70cm)",
      color: "bleu",
      interior: "bureau",
    },
    {
      id: 4,
      title: "Jardin Abstrait",
      artist: "Omar Tahiri",
      price: "3,500 MAD",
      image: artwork4,
      category: "Botanique",
      themeSlug: "nature",
      isNew: true,
      isBestseller: false,
      isFlash: false,
      format: "grand (80x100cm)",
      color: "vert",
      interior: "chambre",
    },
    {
      id: 5,
      title: "Lumière du Sahara",
      artist: "Fatima Zahra",
      price: "2,900 MAD",
      image: artwork2,
      category: "Paysage",
      themeSlug: "nature",
      isNew: false,
      isBestseller: false,
      isFlash: true,
      format: "panoramique",
      color: "or",
      interior: "salon",
    },
    {
      id: 6,
      title: "Rythme Oriental",
      artist: "Hassan Alaoui",
      price: "3,100 MAD",
      image: artwork1,
      category: "Abstrait",
      themeSlug: "abstrait",
      isNew: false,
      isBestseller: true,
      isFlash: false,
      format: "moyen (50x70cm)",
      color: "multicolore",
      interior: "entrée",
    },
    {
      id: 7,
      title: "Mosaïque de Fès",
      artist: "Nadia Berrada",
      price: "2,700 MAD",
      image: artwork3,
      category: "Géométrique",
      themeSlug: "maroc",
      isNew: true,
      isBestseller: false,
      isFlash: false,
      format: "petit (30x40cm)",
      color: "bleu",
      interior: "cuisine",
    },
    {
      id: 8,
      title: "Fleurs du Printemps",
      artist: "Mehdi Bennani",
      price: "3,300 MAD",
      image: artwork4,
      category: "Botanique",
      themeSlug: "nature",
      isNew: false,
      isBestseller: false,
      isFlash: true,
      format: "grand (80x100cm)",
      color: "multicolore",
      interior: "chambre",
    },
  ];

  // Filter artworks based on URL parameters
  const filteredArtworks = allArtworks.filter((artwork) => {
    if (filter === "nouveautes" && !artwork.isNew) return false;
    if (filter === "bestsellers" && !artwork.isBestseller) return false;
    if (filter === "flash" && !artwork.isFlash) return false;
    if (theme && artwork.themeSlug !== theme) return false;
    if (format && artwork.format !== format) return false;
    if (color && artwork.color !== color) return false;
    if (interior && artwork.interior !== interior) return false;
    return true;
  });

  const clearFilters = () => {
    setSearchParams({});
  };

  const getActiveFilterLabel = () => {
    if (filter === "nouveautes") return "Nouveautés";
    if (filter === "bestsellers") return "Bestsellers";
    if (filter === "flash") return "Ventes Flash";
    if (theme) return `Thème: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`;
    if (format) return `Format: ${format}`;
    if (color) return `Couleur: ${color.charAt(0).toUpperCase() + color.slice(1)}`;
    if (interior) return `Intérieur: ${interior.charAt(0).toUpperCase() + interior.slice(1)}`;
    return null;
  };

  const activeFilter = getActiveFilterLabel();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-serif font-bold">
              {activeFilter || "Notre Galerie"}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explorez notre collection exclusive d'œuvres d'art créées par des artistes marocains de talent
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      {activeFilter && (
        <section className="py-4 border-b border-border">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filtre actif:</span>
                <Badge variant="secondary" className="text-sm">
                  {activeFilter}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-sm"
              >
                <X className="h-4 w-4 mr-2" />
                Effacer les filtres
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Artworks Grid */}
      <section className="py-16 container mx-auto px-4 sm:px-6 lg:px-8">
        {filteredArtworks.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              Aucune œuvre ne correspond à vos critères de recherche.
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={clearFilters}
              className="mt-6"
            >
              Voir toutes les œuvres
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-6 text-sm text-muted-foreground">
              {filteredArtworks.length} œuvre{filteredArtworks.length > 1 ? "s" : ""} trouvée{filteredArtworks.length > 1 ? "s" : ""}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredArtworks.map((artwork, index) => (
                <Link
                  key={artwork.id}
                  to={`/product/${artwork.id}`}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Card className="overflow-hidden artwork-hover shadow-elegant group">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={artwork.image}
                        alt={artwork.title}
                        className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                      />
                      {artwork.isFlash && (
                        <div className="absolute top-4 left-4">
                          <Badge variant="destructive" className="text-xs font-medium">
                            VENTE FLASH
                          </Badge>
                        </div>
                      )}
                      {artwork.isNew && (
                        <div className="absolute top-4 left-4">
                          <Badge variant="default" className="text-xs font-medium">
                            NOUVEAU
                          </Badge>
                        </div>
                      )}
                      {artwork.isBestseller && (
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary" className="text-xs font-medium bg-accent text-accent-foreground">
                            BESTSELLER
                          </Badge>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-end p-6">
                        <Button variant="secondary" size="sm">
                          Voir Détails
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-6 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-primary font-medium">
                          {artwork.category}
                        </span>
                      </div>
                      <h3 className="font-serif font-semibold text-lg">{artwork.title}</h3>
                      <p className="text-sm text-muted-foreground">{artwork.artist}</p>
                      <p className="text-lg font-bold text-primary">{artwork.price}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Gallery;
