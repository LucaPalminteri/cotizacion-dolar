import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PERIODS = {
  "1D": 2,
  "7D": 7,
  "1M": 30,
  "1Y": 365,
} as const;

const Loading = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-12">
        <div className="">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>
        </div>

        <CurrencyDetailLoading />

        <div className="space-y-6">
          <Tabs value="7D">
            <TabsList>
              {Object.keys(PERIODS).map((key) => (
                <TabsTrigger key={key} value={key}>
                  {key}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="bg-card rounded-lg md:p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Variación en el período
                    </h3>
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Rango de precios
                    </h3>
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              </div>

              <div className="h-[400px] w-full">
                <Skeleton className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Loading;

const CurrencyDetailLoading = () => {
  return (
    <div className="space-y-6 mb-8">
      <div>
        <Skeleton className="h-12 w-3/4 mb-2" />
        <Skeleton className="h-6 w-1/2" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <Skeleton className="h-6 w-1/2 mb-2" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-1/3" />
                <Skeleton className="h-6 w-1/4" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <Skeleton className="h-6 w-1/2 mb-2" />
              <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-1/3" />
                <Skeleton className="h-6 w-1/4" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
