import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function ProductCardSkeleton() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
      </CardHeader>
      <CardContent>
        <div className="aspect-square relative mb-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse mt-2"></div>
      </CardContent>
      <CardFooter>
        <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
      </CardFooter>
    </Card>
  )
}
