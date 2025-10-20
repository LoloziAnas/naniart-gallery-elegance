import { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone, Send, Twitter, Youtube, CreditCard, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Inscription réussie!",
        description: "Merci de vous être inscrit à notre newsletter.",
      });
      setEmail("");
    }
  };
  
  return (
    <footer className="bg-gradient-to-b from-secondary/20 to-secondary/40 border-t border-border mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Newsletter Section */}
        <div className="mb-12 pb-12 border-b border-border">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <h3 className="text-2xl md:text-3xl font-serif font-bold">Restez Informé</h3>
            <p className="text-muted-foreground">
              Inscrivez-vous à notre newsletter pour recevoir nos dernières créations et offres exclusives
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                required
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button type="submit" variant="hero" size="lg" className="gap-2">
                <Send className="h-4 w-4" />
                S'inscrire
              </Button>
            </form>
          </div>
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand & Description */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <h3 className="text-3xl font-serif font-bold text-primary">Naniart</h3>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Galerie d'art en ligne spécialisée dans les tableaux décoratifs et l'art mural au Maroc. 
              Nous célébrons la créativité marocaine à travers des œuvres uniques et authentiques.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
                aria-label="Youtube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Boutique</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/gallery" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Toutes les Œuvres
                </Link>
              </li>
              <li>
                <Link to="/gallery?filter=nouveautes" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Nouveautés
                </Link>
              </li>
              <li>
                <Link to="/gallery?filter=bestsellers" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link to="/gallery?filter=flash" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Ventes Flash
                </Link>
              </li>
              <li>
                <Link to="/gallery?theme=abstrait" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Art Abstrait
                </Link>
              </li>
              <li>
                <Link to="/gallery?theme=maroc" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Art Marocain
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Info Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Informations</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  À Propos
                </Link>
              </li>
              <li>
                <Link to="/tips" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Conseils Déco
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Livraison
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  Retours
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:contact@naniart.ma" className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-smooth group">
                  <Mail className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>contact@naniart.ma</span>
                </a>
              </li>
              <li>
                <a href="tel:+212771300358" className="flex items-start gap-3 text-sm text-muted-foreground hover:text-primary transition-smooth group">
                  <Phone className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>+212 7 71 30 03 58</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>Marrakesh, Maroc</span>
              </li>
            </ul>
            <div className="mt-6">
              <h5 className="text-xs font-semibold text-muted-foreground mb-2">HORAIRES</h5>
              <p className="text-sm text-muted-foreground">
                Lun - Sam: 9h - 18h<br />
                Dimanche: Fermé
              </p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-border pt-8 pb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h5 className="text-xs font-semibold text-muted-foreground mb-3">MOYENS DE PAIEMENT</h5>
              <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
                <div className="flex items-center gap-2 px-3 py-2 bg-background rounded border border-border">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium">Carte Bancaire</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-background rounded border border-border">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <span className="text-xs font-medium">Paiement Mobile</span>
                </div>
                <div className="px-3 py-2 bg-background rounded border border-border">
                  <span className="text-xs font-medium">Virement Bancaire</span>
                </div>
                <div className="px-3 py-2 bg-background rounded border border-border">
                  <span className="text-xs font-medium">Cash à la Livraison</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 bg-background rounded border border-border flex items-center justify-center">
                <span className="text-xs font-bold text-primary">VISA</span>
              </div>
              <div className="w-12 h-8 bg-background rounded border border-border flex items-center justify-center">
                <span className="text-xs font-bold text-accent">MC</span>
              </div>
              <div className="w-12 h-8 bg-background rounded border border-border flex items-center justify-center">
                <span className="text-xs font-bold">CMI</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Naniart. Tous droits réservés.</p>
            <div className="flex items-center gap-6">
              <Link to="#" className="hover:text-primary transition-smooth">
                Conditions Générales
              </Link>
              <Link to="#" className="hover:text-primary transition-smooth">
                Politique de Confidentialité
              </Link>
              <Link to="#" className="hover:text-primary transition-smooth">
                Mentions Légales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
