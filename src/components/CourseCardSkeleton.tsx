import { Skeleton } from "@/components/ui/skeleton";

export const CourseCardSkeleton = () => {
    return (
        <div className="group relative bg-card rounded-2xl overflow-hidden shadow-lg transition-all duration-500 flex flex-col h-full">
            {/* Image skeleton */}
            <Skeleton className="w-full h-[180px]" />

            {/* Content skeleton */}
            <div className="relative p-5 flex flex-col flex-grow space-y-3">
                {/* Badge skeleton */}
                <Skeleton className="h-6 w-20" />

                {/* Title skeleton */}
                <Skeleton className="h-6 w-full" />

                {/* Description skeleton */}
                <div className="space-y-2 flex-grow">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                </div>

                {/* Metadata skeleton */}
                <div className="flex items-center gap-4 mt-auto">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                </div>
            </div>
        </div>
    );
};

export default CourseCardSkeleton;
