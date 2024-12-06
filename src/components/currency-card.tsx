"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import PriceChange from "./price-change";
import { HistoricalComparison } from "@/types/types";
import { formatDate } from "@/utils/date";
import { formatPrice } from "@/utils/price";

interface CurrencyCardProps {
  name: string;
  code: string;
  buyPrice: number | null;
  sellPrice: number | null;
  lastUpdate: string;
  previousBuyPrice?: number | null;
  previousSellPrice?: number | null;
  weeklyComparison?: HistoricalComparison | null;
}

export function CurrencyCard({
  name,
  code,
  buyPrice,
  sellPrice,
  lastUpdate,
  previousBuyPrice,
  previousSellPrice,
}: CurrencyCardProps) {
  return (
    <Link href={`/${code.toLowerCase()}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:scale-102 bg-gradient-to-br from-card to-card/95">
        <CardContent className="p-6">
          <div className="mb-6">
            <h3 className="font-semibold text-lg text-center">{name}</h3>
            <div className="mt-2 text-center">
              <span className="text-xs text-muted-foreground">{formatDate(lastUpdate)}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <span className="text-sm font-medium">Compra</span>
              <div className="flex flex-col items-end gap-1">
                <span className="text-lg font-bold text-primary">AR$ {formatPrice(buyPrice)}</span>
                <PriceChange current={buyPrice} previous={previousBuyPrice} />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <span className="text-sm font-medium">Venta</span>
              <div className="flex flex-col items-end gap-1">
                <span className="text-lg font-bold text-primary">AR$ {formatPrice(sellPrice)}</span>
                <PriceChange current={sellPrice} previous={previousSellPrice} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
