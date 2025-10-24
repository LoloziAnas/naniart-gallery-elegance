import { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Filter, X, ChevronDown, SlidersHorizontal, Search, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import ArtworkCard from "@/components/ArtworkCard";
import ArtworkGridSkeleton from "@/components/ArtworkGridSkeleton";
import { useProducts, useProductSearch, useProductsByCategory } from "@/hooks/useProducts";
import { Product } from "@/lib/api";
import artwork1 from "@/assets/artwork-1.jpg";

const Gallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  
  const filter = searchParams.get("filter");
  
  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(0); // Reset to first page on search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  // Fetch data based on search or category
  const { data: searchData, isLoading: searchLoading } = useProductSearch(
    debouncedSearch,
    page,
    20
  );
  
  const { data: categoryData, isLoading: categoryLoading } = useProductsByCategory(
    selectedCategory,
    page,
    20
  );
  
  const { data: allData, isLoading: allLoading } = useProducts(
    page,
    20,
    sortBy,
    sortDir
  );
  
  // Determine which data to use
  const isLoading = debouncedSearch ? searchLoading : selectedCategory ? categoryLoading : allLoading;
  const data = debouncedSearch ? searchData : selectedCategory ? categoryData : allData;
  const products = data?.content || [];
  const totalPages = data?.totalPages || 0;
  const totalElements = data?.totalElements || 0;

  // Convert backend products to component format
  const convertProduct = (product: Product) => {
    let badge = "";
    if (product.newArrival) badge = "NOUVEAU";
    else if (product.bestseller) badge = "BESTSELLER";
    else if (product.limitedEdition) badge = "ÉDITION LIMITÉE";
    else if (product.flashSale) badge = "VENTE FLASH";

    return {
      id: product.id.toString(),
      title: product.title,
      artist: "Artiste",
      price: `${product.price.toLocaleString()} MAD`,
      priceValue: product.price,
      image: product.images[0] || artwork1,
      category: product.category,
      badge,
      inStock: product.inStock,
    };
  };

  const displayProducts = products.map(convertProduct);

  // Categories for filtering
  const categories = [
    "Tous",
    "abstract",
    "geometric", 
    "landscape",
    "cultural",
    "urban",
    "nature"
  ];

  // Handle sort change
  const handleSortChange = (value: string) => {
    const [newSort, newDir] = value.split("-");
    setSortBy(newSort);
    setSortDir(newDir);
    setPage(0);
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === "Tous" ? "" : category);
    setPage(0);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-serif font-bold">
              {filter === "nouveautes" ? "Nouveautés" : filter === "bestsellers" ? "Bestsellers" : filter === "flash" ? "Ventes Flash" : selectedCategory ? selectedCategory : searchQuery ? `Recherche: ${searchQuery}` : "Notre Galerie"}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explorez notre collection exclusive d'œuvres d'art créées par des artistes marocains de talent
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Bar */}
      <section className="py-6 border-b border-border bg-background/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative max-w-xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher par titre, artiste ou catégorie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-6 text-base"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:bg-secondary rounded-full p-1 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filtres {showFilters ? "▲" : "▼"}
              </Button>
              
              {/* Active filters display */}
              {(searchQuery || selectedCategory || filter) && (
                <>
                  <div className="h-6 w-px bg-border" />
                  <div className="flex items-center gap-2 flex-wrap">
                    {searchQuery && (
                      <Badge variant="secondary" className="gap-2">
                        Recherche: {searchQuery}
                      </Badge>
                    )}
                    {selectedCategory && (
                      <Badge variant="secondary" className="gap-2">
                        Catégorie: {selectedCategory}
                      </Badge>
                    )}
                    {filter && (
                      <Badge variant="secondary" className="gap-2">
                        {filter === "nouveautes" ? "Nouveautés" : filter === "bestsellers" ? "Bestsellers" : "Ventes Flash"}
                      </Badge>
                    )}
                  </div>
                </>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:inline">Trier par:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-border rounded-md px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-smooth"
              >
                <option value="default">Par défaut</option>
                <option value="popularity">Popularité</option>
                <option value="newest">Plus récent</option>
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

                  {/* Price Range Filter */}
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium mb-3">Fourchette de prix</h4>
                    <div className="space-y-4">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={5000}
                        min={0}
                        step={100}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{priceRange[0].toLocaleString()} MAD</span>
                        <span>{priceRange[1].toLocaleString()} MAD</span>
                      </div>
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="border-t pt-4">
                    <h4 className="text-sm font-medium mb-3">Catégories</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <label key={category} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="category"
                            checked={selectedCategory === category || (category === "Tous" && !selectedCategory)}
                            onChange={() => handleCategoryChange(category)}
                            className="rounded border-border text-primary focus:ring-primary"
                          />
                          <span className="text-sm">{category}</span>
                        </label>
                      ))}
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
            {/* Loading State */}
            {isLoading ? (
              <ArtworkGridSkeleton count={8} />
            ) : displayProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground mb-2">
                  Aucune œuvre ne correspond à vos critères de recherche.
                </p>
                {searchQuery && (
                  <p className="text-sm text-muted-foreground mb-6">
                    Essayez de modifier votre recherche ou vos filtres
                  </p>
                )}
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("");
                    setPage(0);
                  }}
                  className="mt-6"
                >
                  Réinitialiser tous les filtres
                </Button>
              </div>
            ) : (
              <>
                {/* Results Count - Backend Data */}
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground">
                    {totalElements} produit{totalElements > 1 ? "s" : ""} trouvé{totalElements > 1 ? "s" : ""}
                    {searchQuery && <span className="font-medium"> pour "{searchQuery}"</span>}
                    {selectedCategory && <span className="font-medium"> dans {selectedCategory}</span>}
                  </p>
                </div>

                {/* Artwork Grid - Backend Integration */}
                {isLoading ? (
                  <ArtworkGridSkeleton />
                ) : displayProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground">Aucun produit trouvé</p>
                    {(searchQuery || selectedCategory) && (
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => {
                          setSearchQuery("");
                          setSelectedCategory("");
                          setPage(0);
                        }}
                      >
                        Réinitialiser les filtres
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayProducts.map((artwork, index) => (
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
                )}

                {/* Pagination - Backend Integration */}
                {!isLoading && totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setPage(p => Math.max(0, p - 1))}
                      disabled={page === 0}
                      className="gap-2"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Précédent
                    </Button>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Page {page + 1} sur {totalPages}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({totalElements} produits)
                      </span>
                    </div>
                    
                    <Button
                      variant="outline"
                      onClick={() => setPage(p => p + 1)}
                      disabled={page >= totalPages - 1}
                      className="gap-2"
                    >
                      Suivant
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
