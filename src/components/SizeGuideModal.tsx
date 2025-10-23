import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Ruler, Home, Maximize2 } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SizeGuideModal = ({ isOpen, onClose }: SizeGuideModalProps) => {
  const sizes = [
    {
      name: "Petit",
      dimensions: "30 x 40 cm",
      description: "Idéal pour les petits espaces, entrées, ou compositions murales",
      rooms: ["Cuisine", "Salle de bain", "Couloir"],
    },
    {
      name: "Moyen",
      dimensions: "50 x 70 cm",
      description: "Format polyvalent, parfait pour la plupart des pièces",
      rooms: ["Chambre", "Bureau", "Salon"],
    },
    {
      name: "Grand",
      dimensions: "80 x 100 cm",
      description: "Format imposant pour créer un point focal dans la pièce",
      rooms: ["Salon", "Salle à manger", "Chambre principale"],
    },
    {
      name: "Panoramique",
      dimensions: "120 x 40 cm",
      description: "Format horizontal idéal au-dessus d'un canapé ou d'un lit",
      rooms: ["Salon", "Chambre", "Bureau"],
    },
    {
      name: "Carré",
      dimensions: "60 x 60 cm",
      description: "Format équilibré, parfait pour les compositions symétriques",
      rooms: ["Entrée", "Bureau", "Chambre"],
    },
    {
      name: "XXL",
      dimensions: "120 x 150 cm",
      description: "Format monumental pour les grands espaces",
      rooms: ["Grand salon", "Hall d'entrée", "Loft"],
    },
  ];

  const tips = [
    {
      icon: Ruler,
      title: "Mesurez votre espace",
      description: "Prenez les dimensions du mur et marquez l'emplacement avec du ruban adhésif pour visualiser.",
    },
    {
      icon: Home,
      title: "Hauteur idéale",
      description: "Le centre de l'œuvre doit être à hauteur des yeux (environ 145-150 cm du sol).",
    },
    {
      icon: Maximize2,
      title: "Proportions",
      description: "L'œuvre devrait occuper 2/3 à 3/4 de la largeur du meuble en dessous.",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">Guide des Tailles</DialogTitle>
        </DialogHeader>

        <div className="space-y-8 py-4">
          {/* Size Comparison Visual */}
          <div className="bg-secondary/30 p-8 rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Comparaison des formats
            </h3>
            <div className="flex items-end justify-center gap-4 flex-wrap">
              {sizes.slice(0, 4).map((size, index) => {
                const scale = [0.3, 0.5, 0.7, 0.4][index];
                return (
                  <div key={size.name} className="text-center">
                    <div
                      className="bg-primary/20 border-2 border-primary rounded mx-auto mb-2 flex items-center justify-center"
                      style={{
                        width: `${scale * 200}px`,
                        height: `${scale * 250}px`,
                      }}
                    >
                      <span className="text-xs font-medium text-primary">
                        {size.dimensions}
                      </span>
                    </div>
                    <p className="text-xs font-medium">{size.name}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Size Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Détails des formats</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {sizes.map((size) => (
                <div
                  key={size.name}
                  className="border border-border rounded-lg p-4 hover:border-primary transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-lg">{size.name}</h4>
                    <span className="text-sm font-mono bg-secondary px-2 py-1 rounded">
                      {size.dimensions}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {size.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {size.rooms.map((room) => (
                      <span
                        key={room}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                      >
                        {room}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Conseils de placement</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {tips.map((tip) => {
                const Icon = tip.icon;
                return (
                  <div
                    key={tip.title}
                    className="border border-border rounded-lg p-4 text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">{tip.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {tip.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <Ruler className="h-5 w-5 text-primary" />
              Besoin d'aide ?
            </h4>
            <p className="text-sm text-muted-foreground">
              Notre équipe est disponible pour vous conseiller sur le choix du format
              idéal pour votre espace. Contactez-nous via WhatsApp ou par email.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SizeGuideModal;
