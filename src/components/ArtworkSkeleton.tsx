import { Card, CardContent } from "@/components/ui/card";

const ArtworkSkeleton = () => {
  return (
    <Card className="overflow-hidden shadow-elegant">
      <CardContent className="p-0">
        {/* Image Skeleton */}
        <div className="relative aspect-[3/4] bg-secondary/30 animate-shimmer">
          <div className="absolute top-3 right-3 w-10 h-10 bg-secondary/50 rounded-full" />
        </div>

        {/* Details Skeleton */}
        <div className="p-4 space-y-3">
          <div>
            {/* Title */}
            <div className="h-5 bg-secondary/30 rounded w-3/4 mb-2 animate-shimmer" />
            {/* Artist */}
            <div className="h-4 bg-secondary/20 rounded w-1/2 animate-shimmer" />
            {/* Category Badge */}
            <div className="h-5 bg-secondary/20 rounded w-20 mt-2 animate-shimmer" />
          </div>

          {/* Price */}
          <div className="pt-2 border-t border-border">
            <div className="h-6 bg-secondary/30 rounded w-24 animate-shimmer" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtworkSkeleton;
