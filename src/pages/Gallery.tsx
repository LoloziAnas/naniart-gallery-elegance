import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";
import artwork4 from "@/assets/artwork-4.jpg";

const Gallery = () => {
  const allArtworks = [
    {
      id: 1,
      title: "Harmonie Terracotta",
      artist: "Amina Benali",
      price: "2,500 MAD",
      image: artwork1,
      category: "Abstrait",
    },
    {
      id: 2,
      title: "Désert d'Or",
      artist: "Karim Essaoui",
      price: "3,200 MAD",
      image: artwork2,
      category: "Paysage",
    },
    {
      id: 3,
      title: "Géométrie Marocaine",
      artist: "Layla Mansouri",
      price: "2,800 MAD",
      image: artwork3,
      category: "Géométrique",
    },
    {
      id: 4,
      title: "Jardin Abstrait",
      artist: "Omar Tahiri",
      price: "3,500 MAD",
      image: artwork4,
      category: "Botanique",
    },
    {
      id: 5,
      title: "Lumière du Sahara",
      artist: "Fatima Zahra",
      price: "2,900 MAD",
      image: artwork2,
      category: "Paysage",
    },
    {
      id: 6,
      title: "Rythme Oriental",
      artist: "Hassan Alaoui",
      price: "3,100 MAD",
      image: artwork1,
      category: "Abstrait",
    },
    {
      id: 7,
      title: "Mosaïque de Fès",
      artist: "Nadia Berrada",
      price: "2,700 MAD",
      image: artwork3,
      category: "Géométrique",
    },
    {
      id: 8,
      title: "Fleurs du Printemps",
      artist: "Mehdi Bennani",
      price: "3,300 MAD",
      image: artwork4,
      category: "Botanique",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-serif font-bold">
              Notre Galerie
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explorez notre collection exclusive d'œuvres d'art créées par des artistes marocains de talent
            </p>
          </div>
        </div>
      </section>

      {/* Artworks Grid */}
      <section className="py-16 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {allArtworks.map((artwork, index) => (
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
      </section>
    </div>
  );
};

export default Gallery;
