import { Skeleton } from "@/components/ui/skeleton";

export const ProductCardSkeleton = () => {
    return (
        <div className="arch-card" style={{ minWidth: 220, maxWidth: 260 }}>
            {/* Image skeleton */}
            <Skeleton className="w-full h-full rounded-t-full" />

            {/* Decorative arch overlay */}
            <div className="arch-decor" />

            {/* Title skeleton */}
            <div className="absolute bottom-4 left-4 right-4 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
