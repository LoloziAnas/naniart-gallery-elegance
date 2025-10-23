import { useState } from "react";
import { Search, ChevronDown, HelpCircle, Package, CreditCard, RefreshCw, Truck, Shield, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
}

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const categories = [
    { id: "all", label: "Toutes", icon: HelpCircle },
    { id: "commande", label: "Commande", icon: Package },
    { id: "paiement", label: "Paiement", icon: CreditCard },
    { id: "livraison", label: "Livraison", icon: Truck },
    { id: "retour", label: "Retours", icon: RefreshCw },
    { id: "produit", label: "Produits", icon: Shield },
  ];

  const faqs: FAQItem[] = [
    {
      id: "1",
      question: "Comment passer une commande ?",
      answer: "Pour passer commande, parcourez notre galerie, sélectionnez l'œuvre qui vous plaît, choisissez la taille et le cadre, puis cliquez sur 'Ajouter au Panier'. Suivez ensuite les étapes du processus de paiement. Vous recevrez une confirmation par email.",
      category: "commande",
      keywords: ["commander", "acheter", "panier", "achat"],
    },
    {
      id: "2",
      question: "Quels sont les modes de paiement acceptés ?",
      answer: "Nous acceptons les cartes bancaires (Visa, Mastercard), le paiement à la livraison (cash), et les virements bancaires. Tous les paiements en ligne sont sécurisés par cryptage SSL.",
      category: "paiement",
      keywords: ["payer", "carte", "cash", "virement", "sécurisé"],
    },
    {
      id: "3",
      question: "Quels sont les délais de livraison ?",
      answer: "La livraison prend généralement 2-5 jours ouvrables pour les grandes villes (Casablanca, Rabat, Marrakech) et 5-7 jours pour les autres régions du Maroc. Vous recevrez un numéro de suivi par email.",
      category: "livraison",
      keywords: ["délai", "expédition", "temps", "suivi"],
    },
    {
      id: "4",
      question: "La livraison est-elle gratuite ?",
      answer: "Oui ! La livraison est gratuite pour toute commande supérieure à 500 MAD. Pour les commandes inférieures, des frais de 50 MAD s'appliquent.",
      category: "livraison",
      keywords: ["gratuit", "frais", "coût livraison"],
    },
    {
      id: "5",
      question: "Puis-je retourner un produit ?",
      answer: "Oui, vous disposez de 14 jours pour retourner votre achat si vous n'êtes pas satisfait. L'œuvre doit être dans son état d'origine avec l'emballage. Les frais de retour sont à notre charge. Contactez-nous pour initier un retour.",
      category: "retour",
      keywords: ["retourner", "remboursement", "échange", "satisfait"],
    },
    {
      id: "6",
      question: "Comment sont emballées les œuvres ?",
      answer: "Chaque œuvre est soigneusement emballée avec du papier bulle, des coins de protection et un carton renforcé. Nous prenons toutes les précautions pour que votre œuvre arrive en parfait état.",
      category: "livraison",
      keywords: ["emballage", "protection", "colis", "sécurité"],
    },
    {
      id: "7",
      question: "Les œuvres sont-elles des originaux ?",
      answer: "Nos œuvres sont des reproductions d'art de haute qualité, imprimées sur toile ou papier premium. Certaines collections sont des éditions limitées signées par l'artiste. Les détails sont précisés sur chaque fiche produit.",
      category: "produit",
      keywords: ["original", "reproduction", "qualité", "authentique"],
    },
    {
      id: "8",
      question: "Puis-je personnaliser la taille ?",
      answer: "Nous proposons plusieurs tailles standard (30x40cm, 50x70cm, 80x100cm, etc.). Pour une taille personnalisée, contactez-nous via le chat ou par email avec vos dimensions souhaitées. Nous étudierons votre demande.",
      category: "produit",
      keywords: ["taille", "dimension", "personnaliser", "sur mesure"],
    },
    {
      id: "9",
      question: "Quelle est la différence entre les options de cadre ?",
      answer: "Toile tendue : œuvre montée sur châssis en bois, prête à accrocher. Cadre noir/bois/doré : œuvre encadrée avec passe-partout. Chaque option apporte un style différent. Consultez notre guide d'encadrement pour plus de détails.",
      category: "produit",
      keywords: ["cadre", "encadrement", "toile", "châssis"],
    },
    {
      id: "10",
      question: "Comment suivre ma commande ?",
      answer: "Après expédition, vous recevrez un email avec un numéro de suivi. Vous pouvez suivre votre colis en temps réel sur le site du transporteur. Vous pouvez aussi consulter l'état de votre commande dans votre compte client.",
      category: "commande",
      keywords: ["suivre", "tracking", "suivi", "où est"],
    },
    {
      id: "11",
      question: "Puis-je annuler ma commande ?",
      answer: "Vous pouvez annuler votre commande dans les 24h suivant la validation, avant l'expédition. Contactez-nous rapidement par chat ou email. Après expédition, vous devrez attendre la réception pour initier un retour.",
      category: "commande",
      keywords: ["annuler", "annulation", "modifier"],
    },
    {
      id: "12",
      question: "Proposez-vous un service d'installation ?",
      answer: "Actuellement, nous ne proposons pas de service d'installation. Cependant, nos œuvres sont livrées prêtes à accrocher avec le système de fixation inclus. Nous fournissons également un guide d'installation détaillé.",
      category: "produit",
      keywords: ["installer", "accrocher", "monter", "fixation"],
    },
    {
      id: "13",
      question: "Les couleurs sont-elles fidèles aux photos ?",
      answer: "Nous faisons de notre mieux pour représenter fidèlement les couleurs. Cependant, elles peuvent légèrement varier selon votre écran. Si vous n'êtes pas satisfait à la réception, notre politique de retour s'applique.",
      category: "produit",
      keywords: ["couleur", "photo", "réel", "différence"],
    },
    {
      id: "14",
      question: "Offrez-vous des cartes cadeaux ?",
      answer: "Oui ! Nous proposons des cartes cadeaux de 500 MAD à 5000 MAD. Parfait pour offrir le choix à vos proches. Contactez-nous pour commander une carte cadeau.",
      category: "commande",
      keywords: ["cadeau", "carte", "offrir", "bon"],
    },
    {
      id: "15",
      question: "Comment vous contacter ?",
      answer: "Vous pouvez nous contacter via le chat en direct (coin inférieur droit), par email à contact@naniart.ma, par téléphone au +212 5XX-XXXXXX, ou via notre formulaire de contact. Nous répondons sous 24h.",
      category: "commande",
      keywords: ["contact", "joindre", "téléphone", "email"],
    },
  ];

  const filteredFAQs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.keywords.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 animate-fade-in max-w-3xl mx-auto">
            <HelpCircle className="h-16 w-16 text-primary mx-auto" />
            <h1 className="text-5xl md:text-6xl font-serif font-bold">
              Questions Fréquentes
            </h1>
            <p className="text-xl text-muted-foreground">
              Trouvez rapidement les réponses à vos questions
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mt-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher une question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-base"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-border bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {category.label}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {filteredFAQs.length === 0 ? (
            <Card className="p-12 text-center">
              <HelpCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucun résultat trouvé</h3>
              <p className="text-muted-foreground mb-6">
                Essayez avec d'autres mots-clés ou parcourez toutes les catégories
              </p>
              <Button onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}>
                Réinitialiser la recherche
              </Button>
            </Card>
          ) : (
            <>
              <div className="mb-6 text-sm text-muted-foreground">
                {filteredFAQs.length} question{filteredFAQs.length > 1 ? "s" : ""} trouvée{filteredFAQs.length > 1 ? "s" : ""}
              </div>

              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <Card
                    key={faq.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-secondary/50 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                        {!expandedItems.includes(faq.id) && (
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {faq.answer}
                          </p>
                        )}
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform ${
                          expandedItems.includes(faq.id) ? "transform rotate-180" : ""
                        }`}
                      />
                    </button>

                    {expandedItems.includes(faq.id) && (
                      <CardContent className="px-6 pb-6 pt-0 animate-fade-in">
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-2xl mx-auto text-center p-8">
            <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold mb-2">
              Vous ne trouvez pas votre réponse ?
            </h2>
            <p className="text-muted-foreground mb-6">
              Notre équipe est là pour vous aider. Contactez-nous et nous vous répondrons rapidement.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/contact">Nous Contacter</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:+212XXXXXXXXX">Appeler Maintenant</a>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
