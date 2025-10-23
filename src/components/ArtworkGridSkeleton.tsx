import ArtworkSkeleton from "./ArtworkSkeleton";

interface ArtworkGridSkeletonProps {
  count?: number;
}

const ArtworkGridSkeleton = ({ count = 8 }: ArtworkGridSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <ArtworkSkeleton key={index} />
      ))}
    </div>
  );
};

export default ArtworkGridSkeleton;
