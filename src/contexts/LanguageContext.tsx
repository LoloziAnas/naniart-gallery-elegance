import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "fr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.gallery": "Galerie",
    "nav.tips": "Conseils",
    "nav.about": "À Propos",
    "nav.contact": "Contact",
    "nav.cart": "Panier",
    "nav.wishlist": "Favoris",
    
    // Common
    "common.search": "Rechercher",
    "common.filter": "Filtrer",
    "common.sort": "Trier",
    "common.price": "Prix",
    "common.add_to_cart": "Ajouter au Panier",
    "common.buy_now": "Acheter Maintenant",
    "common.view_details": "Voir Détails",
    "common.learn_more": "En Savoir Plus",
    "common.contact_us": "Nous Contacter",
    "common.read_more": "Lire Plus",
    "common.show_more": "Afficher Plus",
    "common.show_less": "Afficher Moins",
    "common.loading": "Chargement...",
    "common.error": "Erreur",
    "common.success": "Succès",
    "common.cancel": "Annuler",
    "common.confirm": "Confirmer",
    "common.close": "Fermer",
    "common.save": "Enregistrer",
    "common.delete": "Supprimer",
    "common.edit": "Modifier",
    
    // Home Page
    "home.hero.title": "Découvrez l'Art Marocain",
    "home.hero.subtitle": "Collection exclusive de tableaux décoratifs",
    "home.hero.cta": "Explorer la Galerie",
    "home.featured": "Œuvres Sélectionnées",
    "home.new_arrivals": "Nouveautés",
    "home.bestsellers": "Bestsellers",
    "home.limited_edition": "Éditions Limitées",
    
    // Gallery
    "gallery.title": "Notre Galerie",
    "gallery.filter.all": "Toutes",
    "gallery.filter.new": "Nouveautés",
    "gallery.filter.bestsellers": "Bestsellers",
    "gallery.filter.flash": "Ventes Flash",
    "gallery.sort.default": "Par défaut",
    "gallery.sort.price_asc": "Prix croissant",
    "gallery.sort.price_desc": "Prix décroissant",
    "gallery.sort.name": "Nom A-Z",
    "gallery.sort.popularity": "Popularité",
    "gallery.sort.newest": "Plus récent",
    "gallery.results": "œuvres trouvées",
    "gallery.no_results": "Aucune œuvre ne correspond à vos critères",
    
    // Product
    "product.in_stock": "En stock",
    "product.out_of_stock": "Épuisé",
    "product.size": "Taille",
    "product.frame": "Cadre",
    "product.quantity": "Quantité",
    "product.share": "Partager",
    "product.add_to_wishlist": "Ajouter aux Favoris",
    "product.free_shipping": "Livraison gratuite",
    "product.secure_payment": "Paiement sécurisé",
    "product.easy_returns": "Retours faciles",
    
    // Footer
    "footer.newsletter.title": "Restez Informé",
    "footer.newsletter.description": "Inscrivez-vous à notre newsletter",
    "footer.newsletter.placeholder": "Votre adresse email",
    "footer.newsletter.subscribe": "S'inscrire",
    "footer.shop": "Boutique",
    "footer.info": "Informations",
    "footer.contact": "Contact",
    "footer.payment_methods": "Moyens de Paiement",
    "footer.copyright": "Tous droits réservés",
    
    // FAQ
    "faq.title": "Questions Fréquentes",
    "faq.search_placeholder": "Rechercher une question...",
    "faq.no_results": "Aucun résultat trouvé",
    "faq.categories.all": "Toutes",
    "faq.categories.order": "Commande",
    "faq.categories.payment": "Paiement",
    "faq.categories.shipping": "Livraison",
    "faq.categories.returns": "Retours",
    "faq.categories.products": "Produits",
    
    // Shipping
    "shipping.title": "Informations de Livraison",
    "shipping.free": "Livraison Gratuite",
    "shipping.standard": "Livraison Standard",
    "shipping.tracking": "Suivi en Temps Réel",
    "shipping.fast": "Livraison Rapide",
    "shipping.secure": "Emballage Sécurisé",
    
    // Returns
    "returns.title": "Politique de Retour",
    "returns.period": "14 jours pour changer d'avis",
    "returns.free": "Retours gratuits",
    "returns.refund": "Remboursement complet",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.gallery": "Gallery",
    "nav.tips": "Tips",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.cart": "Cart",
    "nav.wishlist": "Wishlist",
    
    // Common
    "common.search": "Search",
    "common.filter": "Filter",
    "common.sort": "Sort",
    "common.price": "Price",
    "common.add_to_cart": "Add to Cart",
    "common.buy_now": "Buy Now",
    "common.view_details": "View Details",
    "common.learn_more": "Learn More",
    "common.contact_us": "Contact Us",
    "common.read_more": "Read More",
    "common.show_more": "Show More",
    "common.show_less": "Show Less",
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.cancel": "Cancel",
    "common.confirm": "Confirm",
    "common.close": "Close",
    "common.save": "Save",
    "common.delete": "Delete",
    "common.edit": "Edit",
    
    // Home Page
    "home.hero.title": "Discover Moroccan Art",
    "home.hero.subtitle": "Exclusive collection of decorative paintings",
    "home.hero.cta": "Explore Gallery",
    "home.featured": "Featured Artworks",
    "home.new_arrivals": "New Arrivals",
    "home.bestsellers": "Bestsellers",
    "home.limited_edition": "Limited Edition",
    
    // Gallery
    "gallery.title": "Our Gallery",
    "gallery.filter.all": "All",
    "gallery.filter.new": "New",
    "gallery.filter.bestsellers": "Bestsellers",
    "gallery.filter.flash": "Flash Sales",
    "gallery.sort.default": "Default",
    "gallery.sort.price_asc": "Price: Low to High",
    "gallery.sort.price_desc": "Price: High to Low",
    "gallery.sort.name": "Name A-Z",
    "gallery.sort.popularity": "Popularity",
    "gallery.sort.newest": "Newest",
    "gallery.results": "artworks found",
    "gallery.no_results": "No artworks match your criteria",
    
    // Product
    "product.in_stock": "In Stock",
    "product.out_of_stock": "Out of Stock",
    "product.size": "Size",
    "product.frame": "Frame",
    "product.quantity": "Quantity",
    "product.share": "Share",
    "product.add_to_wishlist": "Add to Wishlist",
    "product.free_shipping": "Free Shipping",
    "product.secure_payment": "Secure Payment",
    "product.easy_returns": "Easy Returns",
    
    // Footer
    "footer.newsletter.title": "Stay Informed",
    "footer.newsletter.description": "Subscribe to our newsletter",
    "footer.newsletter.placeholder": "Your email address",
    "footer.newsletter.subscribe": "Subscribe",
    "footer.shop": "Shop",
    "footer.info": "Information",
    "footer.contact": "Contact",
    "footer.payment_methods": "Payment Methods",
    "footer.copyright": "All rights reserved",
    
    // FAQ
    "faq.title": "Frequently Asked Questions",
    "faq.search_placeholder": "Search for a question...",
    "faq.no_results": "No results found",
    "faq.categories.all": "All",
    "faq.categories.order": "Orders",
    "faq.categories.payment": "Payment",
    "faq.categories.shipping": "Shipping",
    "faq.categories.returns": "Returns",
    "faq.categories.products": "Products",
    
    // Shipping
    "shipping.title": "Shipping Information",
    "shipping.free": "Free Shipping",
    "shipping.standard": "Standard Shipping",
    "shipping.tracking": "Real-time Tracking",
    "shipping.fast": "Fast Delivery",
    "shipping.secure": "Secure Packaging",
    
    // Returns
    "returns.title": "Return Policy",
    "returns.period": "14 days to change your mind",
    "returns.free": "Free returns",
    "returns.refund": "Full refund",
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("fr");

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("naniart-language") as Language;
    if (savedLanguage && (savedLanguage === "fr" || savedLanguage === "en")) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("naniart-language", lang);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
