"use client";

import { DollarRate } from "@/types/types";
import { CurrencyCard } from "./currency-card";

interface CurrencyGridProps {
  rates: DollarRate[];
}

export function CurrencyGrid({ rates }: CurrencyGridProps) {
  if (!rates.length) {
    return <div className="text-center text-muted-foreground py-8">No hay datos disponibles</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {rates.map((rate) => (
        <CurrencyCard
          key={rate.code}
          code={rate.code}
          name={rate.name}
          buyPrice={rate.buy_price}
          sellPrice={rate.sell_price}
          lastUpdate={rate.last_update}
          previousBuyPrice={rate.previous_buy_price}
          previousSellPrice={rate.previous_sell_price}
        />
      ))}
    </div>
  );
}
