import { useState } from "react";
import { Star, Quote, ThumbsUp, MessageSquare, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Reviews = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState<"all" | "5" | "4" | "3">("all");
  const [sortBy, setSortBy] = useState<"recent" | "helpful">("recent");

  const reviews = [
    {
      id: 1,
      name: "Fatima El Amrani",
      location: "Casablanca",
      rating: 5,
      date: "15 Octobre 2024",
      verified: true,
      product: "Harmonie Terracotta",
      review: "Absolument magnifique ! La qualité de la toile est exceptionnelle et les couleurs sont encore plus belles en vrai. Le service client a été très réactif et la livraison rapide. Je recommande vivement Naniart pour tous vos besoins en décoration.",
      helpful: 24,
      images: true,
    },
    {
      id: 2,
      name: "Karim Benjelloun",
      location: "Marrakech",
      rating: 5,
      date: "10 Octobre 2024",
      verified: true,
      product: "Désert d'Or",
      review: "J'ai commandé plusieurs tableaux pour mon salon et je suis ravi du résultat. Les œuvres sont de très haute qualité et apportent une touche d'élégance à mon intérieur. L'emballage était soigné et la livraison impeccable.",
      helpful: 18,
      images: false,
    },
    {
      id: 3,
      name: "Leila Mansouri",
      location: "Rabat",
      rating: 5,
      date: "5 Octobre 2024",
      verified: true,
      product: "Géométrie Marocaine",
      review: "Une découverte incroyable ! Les artistes marocains présentés sur Naniart sont talentueux. J'ai acheté une œuvre abstraite qui sublime mon bureau. Le rapport qualité-prix est excellent.",
      helpful: 15,
      images: true,
    },
    {
      id: 4,
      name: "Omar Tazi",
      location: "Tanger",
      rating: 4,
      date: "28 Septembre 2024",
      verified: true,
      product: "Jardin Abstrait",
      review: "Très satisfait de mon achat. Le tableau correspond parfaitement à la description. Seul petit bémol : le délai de livraison était un peu long, mais le résultat en vaut la peine. Je recommande !",
      helpful: 12,
      images: false,
    },
    {
      id: 5,
      name: "Amina Chraibi",
      location: "Fès",
      rating: 5,
      date: "20 Septembre 2024",
      verified: true,
      product: "Harmonie Terracotta",
      review: "Service impeccable du début à la fin. L'équipe m'a aidée à choisir le tableau parfait pour ma chambre. La qualité est au rendez-vous et le prix est très raisonnable. Merci Naniart !",
      helpful: 20,
      images: true,
    },
    {
      id: 6,
      name: "Youssef Alaoui",
      location: "Agadir",
      rating: 5,
      date: "15 Septembre 2024",
      verified: true,
      product: "Désert d'Or",
      review: "Première commande sur Naniart et certainement pas la dernière ! Les tableaux sont magnifiques et l'art marocain est mis en valeur. Livraison soignée et rapide. Bravo !",
      helpful: 16,
      images: false,
    },
    {
      id: 7,
      name: "Salma Bennani",
      location: "Casablanca",
      rating: 4,
      date: "8 Septembre 2024",
      verified: true,
      product: "Géométrie Marocaine",
      review: "Bonne expérience dans l'ensemble. Le tableau est de qualité et les finitions sont soignées. J'aurais aimé plus de choix dans les formats, mais je suis satisfaite de mon achat.",
      helpful: 9,
      images: true,
    },
    {
      id: 8,
      name: "Mehdi Lahlou",
      location: "Marrakech",
      rating: 5,
      date: "1 Septembre 2024",
      verified: true,
      product: "Jardin Abstrait",
      review: "Excellente qualité ! J'ai offert ce tableau à ma mère et elle est ravie. Les couleurs sont vibrantes et la toile est bien tendue. Le service client est très professionnel. Je recommande à 100% !",
      helpful: 22,
      images: false,
    },
  ];

  const stats = {
    totalReviews: 247,
    averageRating: 4.8,
    ratings: {
      5: 198,
      4: 38,
      3: 8,
      2: 2,
      1: 1,
    },
  };

  const filteredReviews = reviews.filter((review) => {
    if (filter === "all") return true;
    return review.rating === parseInt(filter);
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === "helpful") {
      return b.helpful - a.helpful;
    }
    return 0; // Already sorted by recent
  });

  const handleHelpful = (reviewId: number) => {
    toast({
      title: "Merci !",
      description: "Votre avis a été pris en compte.",
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating
                ? "fill-primary text-primary"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>
    );
  };

  const getRatingPercentage = (rating: number) => {
    return ((stats.ratings[rating as keyof typeof stats.ratings] / stats.totalReviews) * 100).toFixed(0);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-serif font-bold">
              Avis Clients
            </h1>
            <p className="text-xl text-muted-foreground">
              Découvrez ce que nos clients pensent de leurs achats chez Naniart
            </p>
            <div className="flex items-center justify-center gap-8 pt-4">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary">{stats.averageRating}</div>
                <div className="flex justify-center mt-2">
                  {renderStars(5)}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Basé sur {stats.totalReviews} avis
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rating Breakdown */}
      <section className="py-12 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="max-w-4xl mx-auto shadow-elegant">
            <CardContent className="p-8">
              <h3 className="text-xl font-serif font-bold mb-6">Répartition des Notes</h3>
              <div className="space-y-4">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-4">
                    <div className="flex items-center gap-2 w-24">
                      <span className="text-sm font-medium">{rating}</span>
                      <Star className="h-4 w-4 fill-primary text-primary" />
                    </div>
                    <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${getRatingPercentage(rating)}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-16 text-right">
                      {getRatingPercentage(rating)}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Filters and Reviews */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3 flex-wrap">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("all")}
                >
                  Tous les avis
                </Button>
                <Button
                  variant={filter === "5" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("5")}
                >
                  5 étoiles
                </Button>
                <Button
                  variant={filter === "4" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("4")}
                >
                  4 étoiles
                </Button>
                <Button
                  variant={filter === "3" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("3")}
                >
                  3 étoiles
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Trier par:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "recent" | "helpful")}
                  className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="recent">Plus récents</option>
                  <option value="helpful">Plus utiles</option>
                </select>
              </div>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {sortedReviews.map((review, index) => (
                <Card
                  key={review.id}
                  className="shadow-elegant hover:shadow-hover transition-smooth animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-lg font-semibold text-primary">
                            {review.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{review.name}</h4>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Achat vérifié
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {review.location} • {review.date}
                          </p>
                        </div>
                      </div>
                      {renderStars(review.rating)}
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        Produit: <span className="font-medium text-foreground">{review.product}</span>
                      </p>
                      <div className="relative">
                        <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/20" />
                        <p className="text-foreground leading-relaxed pl-6">
                          {review.review}
                        </p>
                      </div>
                    </div>

                    {review.images && (
                      <div className="mb-4">
                        <Badge variant="outline" className="text-xs">
                          📷 Photos du client
                        </Badge>
                      </div>
                    )}

                    <div className="flex items-center gap-4 pt-4 border-t border-border">
                      <button
                        onClick={() => handleHelpful(review.id)}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>Utile ({review.helpful})</span>
                      </button>
                      <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth">
                        <MessageSquare className="h-4 w-4" />
                        <span>Répondre</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Voir plus d'avis
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              Vous avez acheté chez nous ?
            </h2>
            <p className="text-lg text-muted-foreground">
              Partagez votre expérience et aidez d'autres clients à faire leur choix
            </p>
            <Button variant="hero" size="lg">
              Laisser un avis
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
