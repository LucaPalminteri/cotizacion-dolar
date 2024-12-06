import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw } from "lucide-react";

export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center space-x-3 mb-4">
            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Cotización del Dólar
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => (
            <Card
              key={index}
              className="overflow-hidden transition-all hover:shadow-lg hover:scale-102 bg-gradient-to-br from-card to-card/95"
            >
              <div className="p-6">
                <div className="mb-6 text-center">
                  <Skeleton className="h-6 w-32 mx-auto mb-2" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <Skeleton className="h-5 w-16" />
                    <div className="flex flex-col items-end gap-1">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <Skeleton className="h-5 w-16" />
                    <div className="flex flex-col items-end gap-1">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />
            <Skeleton className="h-10 w-48" />
          </div>
          <Skeleton className="h-4 w-64" />
        </div>
      </div>
    </main>
  );
}
