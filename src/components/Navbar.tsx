import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, ChevronDown, Search, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const themeCategories = [
    { name: "ART ABSTRAIT", slug: "abstrait" },
    { name: "ART ISLAMIQUE", slug: "islamique" },
    { name: "NATURE & ANIMAUX", slug: "nature" },
    { name: "VILLES & MONUMENTS", slug: "villes" },
    { name: "PORTRAIT FIGURATIF", slug: "portrait" },
    { name: "CULTURE DU MAROC", slug: "maroc" },
    { name: "MUSIQUE", slug: "musique" },
    { name: "MINIMALISTE & ZEN", slug: "minimaliste" },
    { name: "VINTAGE & ANTIQUE", slug: "vintage" },
    { name: "NOIR ET BLANC", slug: "noir-blanc" },
    { name: "OEUVRES CÉLÈBRES", slug: "celebres" },
    { name: "MOTIVATION & BUSINESS", slug: "motivation" },
    { name: "CINÉMA & CÉLÉBRITÉS", slug: "cinema" },
    { name: "SPORT ET JEUX", slug: "sport" },
  ];

  const formats = [
    "Petit (30x40cm)", "Moyen (50x70cm)", "Grand (80x100cm)", "Panoramique"
  ];

  const colors = [
    "Terracotta", "Or", "Bleu", "Vert", "Noir & Blanc", "Multicolore"
  ];

  const interiors = [
    "Salon", "Chambre", "Bureau", "Cuisine", "Entrée", "Salle à manger"
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      {/* Top Bar */}
      <div className="border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10 text-xs">
            <div className="text-muted-foreground">
              Livraison gratuite à partir de 500 MAD
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-smooth">
                Contact
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-smooth">
                À Propos
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="text-xl font-serif font-bold text-foreground transition-smooth group-hover:text-primary">
              Naniart
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex flex-1 justify-center">
            <NavigationMenuList className="flex items-center space-x-1">
              <NavigationMenuItem>
                <Link to="/gallery?filter=nouveautes">
                  <NavigationMenuLink className="px-3 py-2 text-xs font-semibold text-foreground hover:text-primary transition-smooth uppercase tracking-wider">
                    NOUVEAUTÉS
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/gallery?filter=bestsellers">
                  <NavigationMenuLink className="px-3 py-2 text-xs font-semibold text-foreground hover:text-primary transition-smooth uppercase tracking-wider">
                    BESTSELLERS
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-xs font-semibold uppercase tracking-wider px-3">
                  THÈMES
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[900px] p-6 bg-white">
                    <div className="grid grid-cols-[1fr_2fr] gap-8">
                      {/* Left Column - Categories */}
                      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                        {themeCategories.map((category) => (
                          <Link
                            key={category.slug}
                            to={`/gallery?theme=${category.slug}`}
                            className="block select-none rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent/50 hover:text-primary"
                          >
                            <div className="text-xs font-semibold tracking-wide uppercase">
                              {category.name}
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Right Column - Featured Images */}
                      <div className="grid grid-cols-3 gap-4">
                        <Link
                          to="/gallery?theme=maroc"
                          className="relative group overflow-hidden rounded-lg aspect-[3/4]"
                        >
                          <img
                            src={artwork3}
                            alt="Maroc Authentique"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                            <h3 className="text-sm font-bold mb-1 text-center">MAROC</h3>
                            <p className="text-xs opacity-90 mb-3">Authentique</p>
                            <Button variant="secondary" size="sm" className="text-xs">
                              DÉCOUVRIR
                            </Button>
                          </div>
                        </Link>

                        <Link
                          to="/gallery?theme=abstrait"
                          className="relative group overflow-hidden rounded-lg aspect-[3/4]"
                        >
                          <img
                            src={artwork1}
                            alt="Art Abstrait"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                            <h3 className="text-sm font-bold mb-1 text-center">ABSTRAIT</h3>
                            <p className="text-xs opacity-90 mb-3">Libre</p>
                            <Button variant="secondary" size="sm" className="text-xs">
                              DÉCOUVRIR
                            </Button>
                          </div>
                        </Link>

                        <Link
                          to="/gallery?theme=celebres"
                          className="relative group overflow-hidden rounded-lg aspect-[3/4]"
                        >
                          <img
                            src={artwork2}
                            alt="Oeuvres Célèbres"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                            <h3 className="text-sm font-bold mb-1 text-center">OEUVRES</h3>
                            <p className="text-xs opacity-90 mb-3">Intemporelles</p>
                            <Button variant="secondary" size="sm" className="text-xs">
                              DÉCOUVRIR
                            </Button>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-xs font-semibold uppercase tracking-wider px-3">
                  FORMAT
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[600px] p-6 bg-white">
                    <div className="grid grid-cols-[1fr_2fr] gap-8">
                      {/* Left Column - Format Options */}
                      <div className="space-y-3">
                        <Link
                          to="/gallery?format=carre"
                          className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/50 hover:text-primary"
                        >
                          <div className="text-sm font-semibold uppercase tracking-wide">CARRÉ</div>
                        </Link>
                        <Link
                          to="/gallery?format=vertical"
                          className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/50 hover:text-primary"
                        >
                          <div className="text-sm font-semibold uppercase tracking-wide">VERTICAL</div>
                        </Link>
                        <Link
                          to="/gallery?format=triptyque"
                          className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/50 hover:text-primary"
                        >
                          <div className="text-sm font-semibold uppercase tracking-wide">TRIPTYQUE</div>
                        </Link>
                      </div>

                      {/* Right Column - Format Options */}
                      <div className="space-y-3">
                        <Link
                          to="/gallery?format=horizontal"
                          className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/50 hover:text-primary"
                        >
                          <div className="text-sm font-semibold uppercase tracking-wide">HORIZONTAL</div>
                        </Link>
                        <Link
                          to="/gallery?format=diptyque"
                          className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/50 hover:text-primary"
                        >
                          <div className="text-sm font-semibold uppercase tracking-wide">DIPTYQUE</div>
                        </Link>
                        <Link
                          to="/gallery?format=mur-de-cadre"
                          className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/50 hover:text-primary"
                        >
                          <div className="text-sm font-semibold uppercase tracking-wide">MUR DE CADRE</div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-xs font-semibold uppercase tracking-wider px-3">
                  COULEURS
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[600px] p-6 bg-white">
                    <div className="grid grid-cols-3 gap-x-8 gap-y-4">
                      {/* Column 1 */}
                      <div className="space-y-4">
                        <Link to="/gallery?color=beige" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                          <div className="w-6 h-6 rounded-full bg-[#D4C5B0] border border-border"></div>
                          <span className="text-sm font-medium">BEIGE</span>
                        </Link>
                        <Link to="/gallery?color=vert-sauge" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                          <div className="w-6 h-6 rounded-full bg-[#9CAF88] border border-border"></div>
                          <span className="text-sm font-medium">VERT SAUGE</span>
                        </Link>
                        <Link to="/gallery?color=blanc" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                          <div className="w-6 h-6 rounded-full bg-white border border-border"></div>
                          <span className="text-sm font-medium">BLANC</span>
                        </Link>
                        <Link to="/gallery?color=dore" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                          <div className="w-6 h-6 rounded-full bg-[#D4AF37] border border-border"></div>
                          <span className="text-sm font-medium">DORÉ</span>
                        </Link>
                        <Link to="/gallery?color=vert" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                          <div className="w-6 h-6 rounded-full bg-[#2D5016] border border-border"></div>
                          <span className="text-sm font-medium">VERT</span>
                        </Link>
                        <Link to="/gallery?color=turquois" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                          <div className="w-6 h-6 rounded-full bg-[#40E0D0] border border-border"></div>
                          <span className="text-sm font-medium">TURQUOIS</span>
                        </Link>
                        <Link to="/gallery?color=multicoleurs" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 border border-border"></div>
                          <span className="text-sm font-medium">MULTICOLEURS</span>
                        </Link>
                      </div>

                      {/* Column 2 */}
                      <div className="space-y-4">
                        <Link to="/gallery?color=taupe" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                          <div className="w-6 h-6 rounded-full bg-[#8B7E74] border border-border"></div>
                          <span className="text-sm font-medium">TAUPE</span>
                        </Link>
                        <Link to="/gallery?color=rose" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                          <div className="w-6 h-6 rounded-full bg-[#FFB6C1] border border-border"></div>
                          <span className="text-sm font-medium">ROSE</span>
                        </Link>
                        <Link to="/gallery?color=gris" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                          <div className="w-6 h-6 rounded-full bg-[#808080] border border-border"></div>
                          <span className="text-sm font-medium">GRIS</span>
                        </Link>
                        <Link to="/gallery?color=bleu" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                          <div className="w-6 h-6 rounded-full bg-[#0047AB] border border-border"></div>
                          <span className="text-sm font-medium">BLEU</span>
                        </Link>
                        <Link to="/gallery?color=jaune" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                          <div className="w-6 h-6 rounded-full bg-[#FFD700] border border-border"></div>
                          <span className="text-sm font-medium">JAUNE</span>
                        </Link>
                        <Link to="/gallery?color=moutarde" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                          <div className="w-6 h-6 rounded-full bg-[#E1AD01] border border-border"></div>
                          <span className="text-sm font-medium">MOUTARDE</span>
                        </Link>
                      </div>

                      {/* Column 3 */}
                      <div className="space-y-4">
                        <Link to="/gallery?color=terracotta" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                          <div className="w-6 h-6 rounded-full bg-[#E2725B] border border-border"></div>
                          <span className="text-sm font-medium">TERRACOTTA</span>
                        </Link>
                        <Link to="/gallery?color=marron" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                          <div className="w-6 h-6 rounded-full bg-[#654321] border border-border"></div>
                          <span className="text-sm font-medium">MARRON</span>
                        </Link>
                        <Link to="/gallery?color=noir" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                          <div className="w-6 h-6 rounded-full bg-black border border-border"></div>
                          <span className="text-sm font-medium">NOIR</span>
                        </Link>
                        <Link to="/gallery?color=rouge" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                          <div className="w-6 h-6 rounded-full bg-[#DC143C] border border-border"></div>
                          <span className="text-sm font-medium">ROUGE</span>
                        </Link>
                        <Link to="/gallery?color=mauve" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                          <div className="w-6 h-6 rounded-full bg-[#E0B0FF] border border-border"></div>
                          <span className="text-sm font-medium">MAUVE</span>
                        </Link>
                        <Link to="/gallery?color=bordeaux" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                          <div className="w-6 h-6 rounded-full bg-[#6D071A] border border-border"></div>
                          <span className="text-sm font-medium">BORDEAUX</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-xs font-semibold uppercase tracking-wider px-3">
                  INTÉRIEUR
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[600px] p-6 bg-white">
                    <div className="grid grid-cols-3 gap-x-8 gap-y-4">
                      {/* Column 1 */}
                      <div className="space-y-4">
                        <Link to="/gallery?interior=salon-moderne" className="block hover:text-primary transition-colors">
                          <span className="text-sm font-medium">SALON MODERNE</span>
                        </Link>
                        <Link to="/gallery?interior=salles-a-manger" className="block hover:text-primary transition-colors">
                          <span className="text-sm font-medium">SALLES À MANGER</span>
                        </Link>
                        <Link to="/gallery?interior=bureau-espace-pro" className="block hover:text-primary transition-colors">
                          <span className="text-sm font-medium">BUREAU & ESPACE PRO</span>
                        </Link>
                        <Link to="/gallery?interior=cabinet-medical" className="block hover:text-primary transition-colors">
                          <span className="text-sm font-medium">CABINET MÉDICAL</span>
                        </Link>
                      </div>

                      {/* Column 2 */}
                      <div className="space-y-4">
                        <Link to="/gallery?interior=salon-marocain" className="block hover:text-primary transition-colors">
                          <span className="text-sm font-medium">SALON MAROCAIN</span>
                        </Link>
                        <Link to="/gallery?interior=chambre-a-coucher" className="block hover:text-primary transition-colors">
                          <span className="text-sm font-medium">CHAMBRE À COUCHER</span>
                        </Link>
                        <Link to="/gallery?interior=hotel-airbnb" className="block hover:text-primary transition-colors">
                          <span className="text-sm font-medium">HÔTEL ET AIRBNB</span>
                        </Link>
                        <Link to="/gallery?interior=cuisine" className="block hover:text-primary transition-colors">
                          <span className="text-sm font-medium">CUISINE</span>
                        </Link>
                      </div>

                      {/* Column 3 */}
                      <div className="space-y-4">
                        <Link to="/gallery?interior=sejour-hall" className="block hover:text-primary transition-colors">
                          <span className="text-sm font-medium">SÉJOUR OU HALL</span>
                        </Link>
                        <Link to="/gallery?interior=chambre-enfants" className="block hover:text-primary transition-colors">
                          <span className="text-sm font-medium">CHAMBRE D'ENFANTS</span>
                        </Link>
                        <Link to="/gallery?interior=centre-beaute" className="block hover:text-primary transition-colors">
                          <span className="text-sm font-medium">CENTRE DE BEAUTÉ</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/tips">
                  <NavigationMenuLink className="px-3 py-2 text-xs font-semibold text-foreground hover:text-primary transition-smooth uppercase tracking-wider">
                    ARTISTES
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/contact">
                  <NavigationMenuLink className="px-3 py-2 text-xs font-semibold text-foreground hover:text-primary transition-smooth uppercase tracking-wider">
                    AVIS CLIENTS
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/gallery?filter=flash">
                  <NavigationMenuLink className="px-3 py-2 text-xs font-semibold text-destructive hover:text-destructive/80 transition-smooth uppercase tracking-wider">
                    VENTES FLASH
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Actions */}
          <div className="flex items-center space-x-1 flex-shrink-0">
            <Button variant="ghost" size="icon" className="hidden lg:flex h-9 w-9">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden lg:flex h-9 w-9">
              <User className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden lg:flex h-9 w-9">
              <Heart className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <ShoppingCart className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-semibold">
                0
              </span>
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-foreground ml-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 space-y-2 border-t border-border animate-fade-in">
            <Link
              to="/gallery?filter=nouveautes"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-smooth uppercase"
            >
              NOUVEAUTÉS
            </Link>
            <Link
              to="/gallery?filter=bestsellers"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-smooth uppercase"
            >
              BESTSELLERS
            </Link>
            <Link
              to="/gallery"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-smooth uppercase"
            >
              THÈMES
            </Link>
            <Link
              to="/tips"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-smooth uppercase"
            >
              ARTISTES
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-smooth uppercase"
            >
              AVIS CLIENTS
            </Link>
            <Link
              to="/gallery?filter=flash"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-sm font-medium text-destructive hover:text-destructive/80 transition-smooth uppercase"
            >
              VENTES FLASH
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
