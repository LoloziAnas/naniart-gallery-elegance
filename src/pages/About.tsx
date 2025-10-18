import { Card, CardContent } from "@/components/ui/card";
import { Heart, Palette, Users, Award } from "lucide-react";
import heroImage from "@/assets/hero-art.jpg";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion pour l'Art",
      description: "Nous croyons que l'art transforme les espaces et enrichit les vies.",
    },
    {
      icon: Palette,
      title: "Artisanat Marocain",
      description: "Célébrer et promouvoir le talent des artistes marocains contemporains.",
    },
    {
      icon: Users,
      title: "Communauté",
      description: "Créer des liens entre les artistes et les amateurs d'art.",
    },
    {
      icon: Award,
      title: "Qualité Premium",
      description: "Offrir des œuvres d'art de haute qualité, soigneusement sélectionnées.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-serif font-bold">
              À Propos de Naniart
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Votre destination pour l'art décoratif marocain contemporain
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-4xl font-serif font-bold">Notre Histoire</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Naniart est née d'une passion profonde pour l'art marocain et d'une vision claire : 
                rendre l'art décoratif de qualité accessible à tous les amateurs de beauté et de culture.
              </p>
              <p>
                Fondée au cœur du Maroc, notre galerie en ligne met en lumière le talent d'artistes 
                marocains contemporains qui revisitent les traditions artistiques du pays avec un regard 
                moderne et innovant.
              </p>
              <p>
                Chaque œuvre que nous présentons est soigneusement sélectionnée pour sa qualité, son 
                originalité et sa capacité à transformer un espace en lieu de vie inspirant. Nous croyons 
                que l'art n'est pas seulement une décoration, mais une expression de l'identité et une 
                source quotidienne d'émerveillement.
              </p>
            </div>
          </div>
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-elegant">
            <img
              src={heroImage}
              alt="Galerie Naniart"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold">
              Nos Valeurs
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Les principes qui guident notre mission
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="shadow-elegant hover:shadow-hover transition-smooth animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="pt-8 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-serif font-semibold text-xl">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold">
            Notre Mission
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Naniart s'engage à promouvoir l'art marocain contemporain en offrant une plateforme qui 
            connecte les artistes talentueux avec des amateurs d'art passionnés. Nous facilitons 
            l'accès à des œuvres authentiques, de haute qualité, tout en soutenant la communauté 
            artistique locale.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Notre objectif est de transformer chaque intérieur en un espace unique qui reflète la 
            personnalité de ses habitants et célèbre la richesse culturelle du Maroc. Nous croyons 
            que l'art a le pouvoir d'inspirer, d'émouvoir et de créer des connexions profondes 
            entre les personnes et les lieux qu'elles habitent.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
