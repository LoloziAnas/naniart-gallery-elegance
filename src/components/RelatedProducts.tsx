import ArtworkCard from "./ArtworkCard";
import { Sparkles } from "lucide-react";

interface Product {
  id: string;
  title: string;
  price: string;
  priceValue: number;
  image: string;
  category?: string;
  inStock?: boolean;
}

interface RelatedProductsProps {
  currentProductId: string;
  category?: string;
  allProducts: Product[];
}

const RelatedProducts = ({ currentProductId, category, allProducts }: RelatedProductsProps) => {
  // Filter products by same category, excluding current product
  const relatedProducts = allProducts
    .filter((product) => 
      product.id !== currentProductId && 
      (!category || product.category === category)
    )
    .slice(0, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="py-16 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-serif font-bold">Vous aimerez aussi</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {relatedProducts.map((product, index) => (
            <ArtworkCard
              key={product.id}
              id={product.id}
              title={product.title}
              artist=""
              price={product.price}
              priceValue={product.priceValue}
              image={product.image}
              category={product.category}
              inStock={product.inStock}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
