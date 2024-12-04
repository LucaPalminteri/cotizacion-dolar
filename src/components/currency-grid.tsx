"use client";

import { DollarRate } from "@/lib/types";
import { CurrencyCard } from "@/components/ui/currency-card";

interface CurrencyGridProps {
  rates: DollarRate[];
}

export function CurrencyGrid({ rates }: CurrencyGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {rates.map((rate, i) => (
        <CurrencyCard
          key={i}
          name={rate.name}
          buyPrice={rate.buy_price}
          sellPrice={rate.sell_price}
          lastUpdate={rate.last_update}
        />
      ))}
    </div>
  );
}
