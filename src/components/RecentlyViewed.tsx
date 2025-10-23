import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import ArtworkCard from "./ArtworkCard";
import { Clock } from "lucide-react";

const RecentlyViewed = () => {
  const { items } = useRecentlyViewed();

  if (items.length === 0) return null;

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <Clock className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-serif font-bold">Récemment consultés</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.slice(0, 4).map((item, index) => (
            <ArtworkCard
              key={item.id}
              id={item.id}
              title={item.title}
              artist=""
              price={item.price}
              priceValue={item.priceValue}
              image={item.image}
              category={item.category}
              inStock={item.inStock}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;
