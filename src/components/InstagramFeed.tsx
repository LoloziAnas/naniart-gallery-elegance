import { Instagram, Heart, MessageCircle, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import artwork1 from "@/assets/artwork-1.jpg";
import artwork2 from "@/assets/artwork-2.jpg";
import artwork3 from "@/assets/artwork-3.jpg";

interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  url: string;
  timestamp: string;
}

interface InstagramFeedProps {
  username?: string;
  maxPosts?: number;
}

const InstagramFeed = ({ username = "naniart.ma", maxPosts = 6 }: InstagramFeedProps) => {
  // Mock Instagram posts data
  const mockPosts: InstagramPost[] = [
    {
      id: "1",
      image: artwork1,
      caption: "Nouvelle collection abstraite 🎨 Découvrez nos dernières créations inspirées des couleurs du Maroc...",
      likes: 342,
      comments: 28,
      url: "https://instagram.com",
      timestamp: "2025-01-20",
    },
    {
      id: "2",
      image: artwork2,
      caption: "Coucher de soleil sur le désert 🌅 Une œuvre qui capture la magie du Sahara...",
      likes: 289,
      comments: 19,
      url: "https://instagram.com",
      timestamp: "2025-01-18",
    },
    {
      id: "3",
      image: artwork3,
      caption: "Géométrie et tradition ✨ L'art marocain revisité dans un style contemporain...",
      likes: 421,
      comments: 35,
      url: "https://instagram.com",
      timestamp: "2025-01-15",
    },
    {
      id: "4",
      image: artwork1,
      caption: "Harmonie des couleurs 🎨 Terracotta et or pour une ambiance chaleureuse...",
      likes: 198,
      comments: 12,
      url: "https://instagram.com",
      timestamp: "2025-01-12",
    },
    {
      id: "5",
      image: artwork2,
      caption: "Inspiration nature 🍃 Des œuvres qui apportent la sérénité dans votre intérieur...",
      likes: 267,
      comments: 21,
      url: "https://instagram.com",
      timestamp: "2025-01-10",
    },
    {
      id: "6",
      image: artwork3,
      caption: "Collection exclusive 💎 Édition limitée disponible maintenant...",
      likes: 512,
      comments: 43,
      url: "https://instagram.com",
      timestamp: "2025-01-08",
    },
  ];

  const posts = mockPosts.slice(0, maxPosts);

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-serif font-bold">Suivez-nous sur Instagram</h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Découvrez nos dernières créations, nos inspirations et l'univers Naniart
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="gap-2 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-transparent transition-all"
          >
            <a
              href={`https://instagram.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-5 w-5" />
              @{username}
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post, index) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <Heart className="h-5 w-5 fill-current" />
                      <span className="text-sm font-semibold">
                        {formatNumber(post.likes)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-5 w-5" />
                      <span className="text-sm font-semibold">
                        {formatNumber(post.comments)}
                      </span>
                    </div>
                  </div>

                  {/* Caption Preview */}
                  <p className="text-xs text-center line-clamp-2 opacity-90">
                    {post.caption}
                  </p>

                  {/* Instagram Icon */}
                  <Instagram className="h-6 w-6 mt-3 opacity-80" />
                </div>
              </div>

              {/* Instagram Badge */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 border-none">
                  <Instagram className="h-3 w-3" />
                </Badge>
              </div>
            </a>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Partagez vos créations avec <span className="font-semibold text-primary">#{username}</span>
          </p>
          <Button
            asChild
            size="lg"
            className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <a
              href={`https://instagram.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-5 w-5" />
              Suivre sur Instagram
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
