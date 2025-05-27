import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PostSkeleton() {
  return (
    <Card className="h-full border">
      <CardHeader className="pb-3">
        <Skeleton className="h-6 w-full" />
      </CardHeader>
      <CardContent className="pb-3 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
      <CardFooter className="pt-0">
        <Skeleton className="h-4 w-24" />
      </CardFooter>
    </Card>
  );
}

export function PostSkeletonList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    </div>
  );
}