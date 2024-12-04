"use client";

import { Card, CardContent } from "@/components/ui/card";

interface CurrencyCardProps {
  name: string;
  buyPrice: number | null;
  sellPrice: number | null;
  lastUpdate: string;
}

export function CurrencyCard({ name, buyPrice, sellPrice, lastUpdate }: CurrencyCardProps) {
  const formatPrice = (price: number | null) => {
    if (price === null || price === undefined) return "N/A";
    return price.toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

      if (diffMinutes < 1) return "Hace unos segundos";
      if (diffMinutes < 60) return `Hace ${diffMinutes} minutos`;
      if (diffMinutes < 120) return "Hace 1 hora";
      if (diffMinutes < 1440) return `Hace ${Math.floor(diffMinutes / 60)} horas`;

      return date.toLocaleDateString("es-AR", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.log(error);
      return "Fecha no disponible";
    }
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:scale-102 bg-gradient-to-br from-card to-card/95">
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="font-semibold text-lg text-center">Dólar {name.toLowerCase()}</h3>
          <div className="mt-2 text-center">
            <span className="text-xs text-muted-foreground">{formatDate(lastUpdate)}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <span className="text-sm font-medium">Compra</span>
            <div className="flex flex-col items-end gap-1">
              <span className="text-lg font-bold text-primary">
                {buyPrice !== null ? `AR$ ${formatPrice(buyPrice)}` : "N/A"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
            <span className="text-sm font-medium">Venta</span>
            <div className="flex flex-col items-end gap-1">
              <span className="text-lg font-bold text-primary">
                {sellPrice !== null ? `AR$ ${formatPrice(sellPrice)}` : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
