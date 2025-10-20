import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, X, ChevronDown, SlidersHorizontal } from "lucide-react";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";
import artwork4 from "@/assets/artwork-4.jpg";

const Gallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  
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
  let filteredArtworks = allArtworks.filter((artwork) => {
    if (filter === "nouveautes" && !artwork.isNew) return false;
    if (filter === "bestsellers" && !artwork.isBestseller) return false;
    if (filter === "flash" && !artwork.isFlash) return false;
    if (theme && artwork.themeSlug !== theme) return false;
    
    // Improved format matching
    if (format) {
      const artworkFormat = artwork.format.toLowerCase();
      const searchFormat = format.toLowerCase();
      if (!artworkFormat.includes(searchFormat) && artworkFormat !== searchFormat) return false;
    }
    
    // Improved color matching
    if (color) {
      const artworkColor = artwork.color.toLowerCase();
      const searchColor = color.toLowerCase();
      if (artworkColor !== searchColor && !artworkColor.includes(searchColor)) return false;
    }
    
    // Improved interior matching
    if (interior) {
      const artworkInterior = artwork.interior.toLowerCase();
      const searchInterior = interior.toLowerCase();
      if (!artworkInterior.includes(searchInterior) && artworkInterior !== searchInterior) return false;
    }
    
    return true;
  });
  
  // Sort artworks
  if (sortBy === "price-asc") {
    filteredArtworks = [...filteredArtworks].sort((a, b) => {
      const priceA = parseInt(a.price.replace(/[^0-9]/g, ""));
      const priceB = parseInt(b.price.replace(/[^0-9]/g, ""));
      return priceA - priceB;
    });
  } else if (sortBy === "price-desc") {
    filteredArtworks = [...filteredArtworks].sort((a, b) => {
      const priceA = parseInt(a.price.replace(/[^0-9]/g, ""));
      const priceB = parseInt(b.price.replace(/[^0-9]/g, ""));
      return priceB - priceA;
    });
  } else if (sortBy === "name") {
    filteredArtworks = [...filteredArtworks].sort((a, b) => a.title.localeCompare(b.title));
  }

  const clearFilters = () => {
    setSearchParams({});
  };

  const getActiveFilters = () => {
    const filters = [];
    if (filter === "nouveautes") filters.push({ key: "filter", label: "Nouveautés", value: filter });
    if (filter === "bestsellers") filters.push({ key: "filter", label: "Bestsellers", value: filter });
    if (filter === "flash") filters.push({ key: "filter", label: "Ventes Flash", value: filter });
    if (theme) filters.push({ key: "theme", label: `Thème: ${theme.charAt(0).toUpperCase() + theme.slice(1)}`, value: theme });
    if (format) filters.push({ key: "format", label: `Format: ${format}`, value: format });
    if (color) filters.push({ key: "color", label: `Couleur: ${color.charAt(0).toUpperCase() + color.slice(1)}`, value: color });
    if (interior) filters.push({ key: "interior", label: `Intérieur: ${interior}`, value: interior });
    return filters;
  };

  const activeFilters = getActiveFilters();
  
  const removeFilter = (key: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-serif font-bold">
              {activeFilters.length > 0 ? activeFilters[0].label : "Notre Galerie"}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explorez notre collection exclusive d'œuvres d'art créées par des artistes marocains de talent
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-4 border-b border-border bg-background/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filtres
              </Button>
              
              {activeFilters.length > 0 && (
                <>
                  <div className="h-6 w-px bg-border" />
                  <div className="flex items-center gap-2 flex-wrap">
                    {activeFilters.map((filter) => (
                      <Badge
                        key={filter.key}
                        variant="secondary"
                        className="gap-2 pr-1"
                      >
                        {filter.label}
                        <button
                          onClick={() => removeFilter(filter.key)}
                          className="hover:bg-background/50 rounded-full p-0.5 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-xs h-7"
                    >
                      Tout effacer
                    </Button>
                  </div>
                </>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Trier par:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-border rounded-md px-3 py-1.5 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="default">Par défaut</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="name">Nom A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Artworks Grid */}
      <section className="py-12 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          {showFilters && (
            <aside className="w-64 flex-shrink-0 space-y-6 animate-fade-in">
              <div className="sticky top-24">
                <h3 className="font-semibold text-lg mb-4">Filtres</h3>
                
                {/* Quick Filters */}
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Collection</h4>
                    <div className="space-y-2">
                      <Link
                        to="/gallery?filter=nouveautes"
                        className="block text-sm hover:text-primary transition-colors"
                      >
                        Nouveautés
                      </Link>
                      <Link
                        to="/gallery?filter=bestsellers"
                        className="block text-sm hover:text-primary transition-colors"
                      >
                        Bestsellers
                      </Link>
                      <Link
                        to="/gallery?filter=flash"
                        className="block text-sm hover:text-primary transition-colors"
                      >
                        Ventes Flash
                      </Link>
                    </div>
                  </div>
                  
                  {/* Couleurs Filter */}
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium mb-3">Couleurs</h4>
                    <div className="grid grid-cols-6 gap-2">
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set("color", "noir");
                          setSearchParams(params);
                        }}
                        className={`w-8 h-8 rounded-full bg-black border-2 transition-all hover:scale-110 ${color === "noir" ? "border-primary ring-2 ring-primary ring-offset-2" : "border-border"}`}
                        title="Noir"
                      />
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set("color", "blanc");
                          setSearchParams(params);
                        }}
                        className={`w-8 h-8 rounded-full bg-white border-2 transition-all hover:scale-110 ${color === "blanc" ? "border-primary ring-2 ring-primary ring-offset-2" : "border-border"}`}
                        title="Blanc"
                      />
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set("color", "beige");
                          setSearchParams(params);
                        }}
                        className={`w-8 h-8 rounded-full bg-[#D4C5B0] border-2 transition-all hover:scale-110 ${color === "beige" ? "border-primary ring-2 ring-primary ring-offset-2" : "border-border"}`}
                        title="Beige"
                      />
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set("color", "dore");
                          setSearchParams(params);
                        }}
                        className={`w-8 h-8 rounded-full bg-[#D4AF37] border-2 transition-all hover:scale-110 ${color === "dore" ? "border-primary ring-2 ring-primary ring-offset-2" : "border-border"}`}
                        title="Doré"
                      />
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set("color", "terracotta");
                          setSearchParams(params);
                        }}
                        className={`w-8 h-8 rounded-full bg-[#E2725B] border-2 transition-all hover:scale-110 ${color === "terracotta" ? "border-primary ring-2 ring-primary ring-offset-2" : "border-border"}`}
                        title="Terracotta"
                      />
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set("color", "bleu");
                          setSearchParams(params);
                        }}
                        className={`w-8 h-8 rounded-full bg-[#0047AB] border-2 transition-all hover:scale-110 ${color === "bleu" ? "border-primary ring-2 ring-primary ring-offset-2" : "border-border"}`}
                        title="Bleu"
                      />
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set("color", "vert");
                          setSearchParams(params);
                        }}
                        className={`w-8 h-8 rounded-full bg-[#2D5016] border-2 transition-all hover:scale-110 ${color === "vert" ? "border-primary ring-2 ring-primary ring-offset-2" : "border-border"}`}
                        title="Vert"
                      />
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set("color", "taupe");
                          setSearchParams(params);
                        }}
                        className={`w-8 h-8 rounded-full bg-[#8B7E74] border-2 transition-all hover:scale-110 ${color === "taupe" ? "border-primary ring-2 ring-primary ring-offset-2" : "border-border"}`}
                        title="Taupe"
                      />
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set("color", "rose");
                          setSearchParams(params);
                        }}
                        className={`w-8 h-8 rounded-full bg-[#FFB6C1] border-2 transition-all hover:scale-110 ${color === "rose" ? "border-primary ring-2 ring-primary ring-offset-2" : "border-border"}`}
                        title="Rose"
                      />
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set("color", "jaune");
                          setSearchParams(params);
                        }}
                        className={`w-8 h-8 rounded-full bg-[#FFD700] border-2 transition-all hover:scale-110 ${color === "jaune" ? "border-primary ring-2 ring-primary ring-offset-2" : "border-border"}`}
                        title="Jaune"
                      />
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set("color", "marron");
                          setSearchParams(params);
                        }}
                        className={`w-8 h-8 rounded-full bg-[#654321] border-2 transition-all hover:scale-110 ${color === "marron" ? "border-primary ring-2 ring-primary ring-offset-2" : "border-border"}`}
                        title="Marron"
                      />
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set("color", "rouge");
                          setSearchParams(params);
                        }}
                        className={`w-8 h-8 rounded-full bg-[#DC143C] border-2 transition-all hover:scale-110 ${color === "rouge" ? "border-primary ring-2 ring-primary ring-offset-2" : "border-border"}`}
                        title="Rouge"
                      />
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set("color", "gris");
                          setSearchParams(params);
                        }}
                        className={`w-8 h-8 rounded-full bg-[#808080] border-2 transition-all hover:scale-110 ${color === "gris" ? "border-primary ring-2 ring-primary ring-offset-2" : "border-border"}`}
                        title="Gris"
                      />
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set("color", "bordeaux");
                          setSearchParams(params);
                        }}
                        className={`w-8 h-8 rounded-full bg-[#6D071A] border-2 transition-all hover:scale-110 ${color === "bordeaux" ? "border-primary ring-2 ring-primary ring-offset-2" : "border-border"}`}
                        title="Bordeaux"
                      />
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set("color", "mauve");
                          setSearchParams(params);
                        }}
                        className={`w-8 h-8 rounded-full bg-[#E0B0FF] border-2 transition-all hover:scale-110 ${color === "mauve" ? "border-primary ring-2 ring-primary ring-offset-2" : "border-border"}`}
                        title="Mauve"
                      />
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set("color", "turquois");
                          setSearchParams(params);
                        }}
                        className={`w-8 h-8 rounded-full bg-[#40E0D0] border-2 transition-all hover:scale-110 ${color === "turquois" ? "border-primary ring-2 ring-primary ring-offset-2" : "border-border"}`}
                        title="Turquois"
                      />
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set("color", "moutarde");
                          setSearchParams(params);
                        }}
                        className={`w-8 h-8 rounded-full bg-[#E1AD01] border-2 transition-all hover:scale-110 ${color === "moutarde" ? "border-primary ring-2 ring-primary ring-offset-2" : "border-border"}`}
                        title="Moutarde"
                      />
                    </div>
                  </div>
                  
                  {/* Format Filter */}
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium mb-3">Format</h4>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set("format", "vertical");
                          setSearchParams(params);
                        }}
                        className={`px-3 py-1.5 text-xs rounded-full border transition-all hover:border-primary ${format === "vertical" ? "bg-primary text-primary-foreground border-primary" : "border-border bg-background"}`}
                      >
                        Vertical
                      </button>
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set("format", "horizontal");
                          setSearchParams(params);
                        }}
                        className={`px-3 py-1.5 text-xs rounded-full border transition-all hover:border-primary ${format === "horizontal" ? "bg-primary text-primary-foreground border-primary" : "border-border bg-background"}`}
                      >
                        Horizontal
                      </button>
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set("format", "carre");
                          setSearchParams(params);
                        }}
                        className={`px-3 py-1.5 text-xs rounded-full border transition-all hover:border-primary ${format === "carre" ? "bg-primary text-primary-foreground border-primary" : "border-border bg-background"}`}
                      >
                        Carré
                      </button>
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set("format", "diptyque");
                          setSearchParams(params);
                        }}
                        className={`px-3 py-1.5 text-xs rounded-full border transition-all hover:border-primary ${format === "diptyque" ? "bg-primary text-primary-foreground border-primary" : "border-border bg-background"}`}
                      >
                        Diptyque
                      </button>
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set("format", "triptyque");
                          setSearchParams(params);
                        }}
                        className={`px-3 py-1.5 text-xs rounded-full border transition-all hover:border-primary ${format === "triptyque" ? "bg-primary text-primary-foreground border-primary" : "border-border bg-background"}`}
                      >
                        Triptyque
                      </button>
                      <button
                        onClick={() => {
                          const params = new URLSearchParams(searchParams);
                          params.set("format", "mur-de-cadre");
                          setSearchParams(params);
                        }}
                        className={`px-3 py-1.5 text-xs rounded-full border transition-all hover:border-primary ${format === "mur-de-cadre" ? "bg-primary text-primary-foreground border-primary" : "border-border bg-background"}`}
                      >
                        Mur de cadres
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          )}
          
          {/* Main Content */}
          <div className="flex-1">
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
