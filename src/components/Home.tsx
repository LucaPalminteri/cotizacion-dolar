"use client";

import { CurrencyHeader } from "@/components/currency-header";
import { CurrencyGrid } from "@/components/currency-grid";
import { DollarRate, HistoricalRate } from "@/types/types";

type Props = {
  rates: DollarRate[];
  historicalData: Record<string, HistoricalRate[]>;
};

export default function Home({ rates, historicalData }: Props) {
  const ratesWithHistory = rates.map((rate) => {
    const history = historicalData[rate.code.toLowerCase()] || [];
    const previousDay = history[0];
    const weekAgo = history[history.length - 1];

    return {
      ...rate,
      previous_buy_price: previousDay.compra,
      previous_sell_price: previousDay.venta,
      historical_data: history,
      daily_comparison: previousDay
        ? {
            date: previousDay.fecha,
            buy_price: previousDay.compra,
            sell_price: previousDay.venta,
          }
        : null,
      weekly_comparison: weekAgo
        ? {
            date: weekAgo.fecha,
            buy_price: weekAgo.compra,
            sell_price: weekAgo.venta,
          }
        : null,
    };
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-12">
        <CurrencyHeader />
        {/* <ErrorMessage message={error} /> */}
        <CurrencyGrid rates={ratesWithHistory} />

        <div className="mt-12 flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Datos proporcionados por <span className="text-primary font-medium">DolarAPI</span> y{" "}
            <span className="text-primary font-medium">ArgentinaDatos</span>
          </p>
        </div>
      </div>
    </main>
  );
}
