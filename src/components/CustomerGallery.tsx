import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Heart, MapPin, Star, ChevronLeft, ChevronRight } from "lucide-react";
import ImageLightbox from "./ImageLightbox";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";

interface CustomerPhoto {
  id: string;
  image: string;
  customerName: string;
  location: string;
  productTitle: string;
  rating: number;
  comment: string;
  likes: number;
  date: string;
  verified: boolean;
}

interface CustomerGalleryProps {
  productId?: string;
  showAll?: boolean;
}

const CustomerGallery = ({ productId, showAll = false }: CustomerGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  // Mock customer photos data
  const mockPhotos: CustomerPhoto[] = [
    {
      id: "1",
      image: artwork1,
      customerName: "Sarah M.",
      location: "Casablanca",
      productTitle: "Harmonie Terracotta",
      rating: 5,
      comment: "Magnifique dans mon salon ! Les couleurs sont parfaites et la qualité exceptionnelle. 🎨",
      likes: 24,
      date: "2025-01-18",
      verified: true,
    },
    {
      id: "2",
      image: artwork2,
      customerName: "Ahmed K.",
      location: "Rabat",
      productTitle: "Désert d'Or",
      rating: 5,
      comment: "Superbe rendu au-dessus de mon canapé. Tout le monde me demande où je l'ai acheté !",
      likes: 31,
      date: "2025-01-15",
      verified: true,
    },
    {
      id: "3",
      image: artwork3,
      customerName: "Leila B.",
      location: "Marrakech",
      productTitle: "Géométrie Marocaine",
      rating: 5,
      comment: "Parfait pour ma chambre. L'ambiance est complètement transformée ! ✨",
      likes: 19,
      date: "2025-01-12",
      verified: true,
    },
    {
      id: "4",
      image: artwork1,
      customerName: "Karim E.",
      location: "Tanger",
      productTitle: "Harmonie Terracotta",
      rating: 4,
      comment: "Très belle œuvre, livraison rapide et emballage soigné. Je recommande !",
      likes: 15,
      date: "2025-01-10",
      verified: true,
    },
    {
      id: "5",
      image: artwork2,
      customerName: "Fatima Z.",
      location: "Fès",
      productTitle: "Lumière du Sahara",
      rating: 5,
      comment: "Coup de cœur absolu ! L'œuvre apporte tellement de chaleur à mon bureau. 💛",
      likes: 28,
      date: "2025-01-08",
      verified: true,
    },
    {
      id: "6",
      image: artwork3,
      customerName: "Youssef A.",
      location: "Agadir",
      productTitle: "Mosaïque de Fès",
      rating: 5,
      comment: "Qualité premium, exactement comme sur les photos. Très satisfait de mon achat !",
      likes: 22,
      date: "2025-01-05",
      verified: true,
    },
  ];

  const photos = showAll ? mockPhotos : mockPhotos.slice(0, 6);
  const totalPages = Math.ceil(photos.length / itemsPerPage);
  const currentPhotos = photos.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const allImages = photos.map(photo => photo.image);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-serif font-bold">Photos de nos Clients</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez comment nos clients ont intégré nos œuvres dans leur intérieur
          </p>
          <Badge variant="secondary" className="mt-4">
            {photos.length} photos partagées
          </Badge>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentPhotos.map((photo, index) => (
            <Card
              key={photo.id}
              className="group overflow-hidden hover:shadow-xl transition-all cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleImageClick(currentPage * itemsPerPage + index)}
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={photo.image}
                  alt={`Photo de ${photo.customerName}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Verified Badge */}
                {photo.verified && (
                  <Badge className="absolute top-3 left-3 bg-green-500 border-none">
                    ✓ Achat vérifié
                  </Badge>
                )}

                {/* Likes */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs">
                  <Heart className="h-3 w-3 fill-current" />
                  {photo.likes}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="h-12 w-12 text-white" />
                </div>
              </div>

              {/* Details */}
              <CardContent className="p-4 space-y-3">
                {/* Customer Info */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-sm">{photo.customerName}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      {photo.location}
                    </div>
                  </div>
                  {renderStars(photo.rating)}
                </div>

                {/* Product Title */}
                <p className="text-xs font-medium text-primary">
                  {photo.productTitle}
                </p>

                {/* Comment */}
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {photo.comment}
                </p>

                {/* Date */}
                <p className="text-xs text-muted-foreground">
                  {new Date(photo.date).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage + 1} sur {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center bg-secondary/30 rounded-lg p-8">
          <Camera className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-serif font-bold mb-2">
            Partagez votre photo !
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Vous avez acheté une de nos œuvres ? Partagez une photo de votre intérieur
            et inspirez notre communauté ! Utilisez le hashtag <span className="font-semibold text-primary">#NaniartMaison</span>
          </p>
          <Button size="lg" className="gap-2">
            <Camera className="h-5 w-5" />
            Partager ma photo
          </Button>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <ImageLightbox
          images={allImages}
          currentIndex={selectedImage}
          isOpen={selectedImage !== null}
          onClose={() => setSelectedImage(null)}
          onNavigate={setSelectedImage}
        />
      )}
    </section>
  );
};

export default CustomerGallery;
