import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, ShoppingBag, MapPin, TrendingUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SocialProofNotification {
  id: string;
  type: "purchase" | "view" | "trending";
  message: string;
  location?: string;
  time: string;
  productTitle?: string;
  image?: string;
}

interface SocialProofProps {
  productId?: string;
  viewCount?: number;
  recentPurchases?: number;
}

const SocialProof = ({ productId, viewCount = 0, recentPurchases = 0 }: SocialProofProps) => {
  const [notifications, setNotifications] = useState<SocialProofNotification[]>([]);
  const [currentNotification, setCurrentNotification] = useState<SocialProofNotification | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Mock notifications data
  const mockNotifications: SocialProofNotification[] = [
    {
      id: "1",
      type: "purchase",
      message: "Sarah de Casablanca vient d'acheter",
      location: "Casablanca",
      time: "Il y a 5 minutes",
      productTitle: "Harmonie Terracotta",
    },
    {
      id: "2",
      type: "view",
      message: "12 personnes consultent ce produit",
      time: "Maintenant",
    },
    {
      id: "3",
      type: "purchase",
      message: "Ahmed de Rabat vient d'acheter",
      location: "Rabat",
      time: "Il y a 15 minutes",
      productTitle: "Désert d'Or",
    },
    {
      id: "4",
      type: "trending",
      message: "Produit populaire - 47 vues aujourd'hui",
      time: "Aujourd'hui",
    },
    {
      id: "5",
      type: "purchase",
      message: "Leila de Marrakech vient d'acheter",
      location: "Marrakech",
      time: "Il y a 1 heure",
      productTitle: "Géométrie Marocaine",
    },
  ];

  useEffect(() => {
    // Show notifications periodically
    const showNotification = () => {
      const randomNotification = mockNotifications[Math.floor(Math.random() * mockNotifications.length)];
      setCurrentNotification(randomNotification);
      setIsVisible(true);

      // Hide after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    };

    // Show first notification after 3 seconds
    const initialTimer = setTimeout(showNotification, 3000);

    // Show subsequent notifications every 15 seconds
    const interval = setInterval(showNotification, 15000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "purchase":
        return <ShoppingBag className="h-4 w-4 text-green-500" />;
      case "view":
        return <Eye className="h-4 w-4 text-blue-500" />;
      case "trending":
        return <TrendingUp className="h-4 w-4 text-orange-500" />;
      default:
        return <ShoppingBag className="h-4 w-4" />;
    }
  };

  return (
    <>
      {/* Floating Notification */}
      {isVisible && currentNotification && (
        <div className="fixed bottom-6 left-6 z-50 animate-slide-in-left">
          <Card className="p-4 shadow-2xl border-2 border-primary/20 bg-background/95 backdrop-blur-sm max-w-sm">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {getIcon(currentNotification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {currentNotification.message}
                </p>
                {currentNotification.productTitle && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {currentNotification.productTitle}
                  </p>
                )}
                {currentNotification.location && (
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {currentNotification.location}
                    </span>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {currentNotification.time}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 flex-shrink-0"
                onClick={handleClose}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Stats Display (for product page) */}
      {(viewCount > 0 || recentPurchases > 0) && (
        <div className="flex flex-wrap items-center gap-4 py-4 border-y border-border">
          {viewCount > 0 && (
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                <span className="font-semibold text-foreground">{viewCount}</span>
                <span className="text-muted-foreground"> vues aujourd'hui</span>
              </span>
            </div>
          )}
          {recentPurchases > 0 && (
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-green-500" />
              <span className="text-sm">
                <span className="font-semibold text-foreground">{recentPurchases}</span>
                <span className="text-muted-foreground"> achats cette semaine</span>
              </span>
            </div>
          )}
          {viewCount > 30 && (
            <Badge variant="secondary" className="gap-1">
              <TrendingUp className="h-3 w-3" />
              Populaire
            </Badge>
          )}
        </div>
      )}
    </>
  );
};

export default SocialProof;
