import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Star, ThumbsUp, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Review as APIReview } from "@/lib/api";

// Extended review type with local state
interface Review extends Omit<APIReview, 'id' | 'productId' | 'title'> {
  id: string;
  date: string;
  helpful: number;
}

interface ProductReviewsProps {
  productId: string;
  reviews?: APIReview[];
}

const ProductReviews = ({ productId, reviews: initialReviews = [] }: ProductReviewsProps) => {
  // Transform API reviews to component format
  const transformedReviews: Review[] = initialReviews.map(review => ({
    ...review,
    id: review.id.toString(),
    date: review.createdAt,
    helpful: 0, // Initialize helpful count
  }));
  
  const [reviews, setReviews] = useState<Review[]>(transformedReviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [userName, setUserName] = useState("");
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: reviews.length > 0 
      ? (reviews.filter(r => r.rating === star).length / reviews.length) * 100 
      : 0
  }));

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userName.trim() || !comment.trim() || rating === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs et donner une note.",
        variant: "destructive",
      });
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      userName: userName.trim(),
      rating,
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      comment: comment.trim(),
      helpful: 0,
      verified: false,
    };

    setReviews([newReview, ...reviews]);
    setShowReviewForm(false);
    setRating(0);
    setUserName("");
    setComment("");

    toast({
      title: "Avis envoyé !",
      description: "Merci pour votre avis. Il sera publié après vérification.",
    });
  };

  const handleHelpful = (reviewId: string) => {
    setReviews(reviews.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
  };

  const renderStars = (rating: number, interactive = false, size = "h-5 w-5") => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && setRating(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            className={`${interactive ? "cursor-pointer" : "cursor-default"} transition-colors`}
          >
            <Star
              className={`${size} ${
                star <= (interactive ? (hoverRating || rating) : rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Average Rating */}
            <div className="text-center space-y-4">
              <div>
                <div className="text-5xl font-bold text-primary mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex justify-center mb-2">
                  {renderStars(Math.round(averageRating))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Basé sur {reviews.length} avis
                </p>
              </div>
              <Button
                onClick={() => setShowReviewForm(!showReviewForm)}
                variant="outline"
                className="w-full"
              >
                {showReviewForm ? "Annuler" : "Écrire un avis"}
              </Button>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {ratingDistribution.map(({ star, count, percentage }) => (
                <div key={star} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-medium">{star}</span>
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Review Form */}
      {showReviewForm && (
        <Card className="animate-fade-in">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Écrire un avis</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Votre note *
                </label>
                {renderStars(rating, true, "h-8 w-8")}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Votre nom *
                </label>
                <Input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Entrez votre nom"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Votre avis *
                </label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Partagez votre expérience avec ce produit..."
                  rows={5}
                  required
                />
              </div>

              <div className="flex gap-3">
                <Button type="submit" className="flex-1">
                  Publier l'avis
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowReviewForm(false)}
                >
                  Annuler
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold">
          Avis clients ({reviews.length})
        </h3>

        {reviews.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">
                Aucun avis pour le moment. Soyez le premier à donner votre avis !
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id} className="animate-fade-in">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <User className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{review.userName}</span>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Achat vérifié
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {renderStars(review.rating, false, "h-4 w-4")}
                            <span className="text-sm text-muted-foreground">
                              {formatDate(review.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed">{review.comment}</p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleHelpful(review.id)}
                          className="gap-2 text-muted-foreground hover:text-foreground"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          Utile ({review.helpful})
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;
