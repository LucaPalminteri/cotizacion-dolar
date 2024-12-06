"use client";

import { Card, CardContent } from "@/components/ui/card";
import PriceChange from "./price-change";
import { DollarRate } from "@/types/types";
import { formatDate } from "@/utils/date";
import { formatPrice } from "@/utils/price";

interface CurrencyDetailProps {
  rate: DollarRate;
}

export function CurrencyDetail({ rate }: CurrencyDetailProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          {rate.name}
        </h1>
        <p className="text-muted-foreground mt-2">
          Última actualización: {formatDate(rate.last_update)}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Precio de Compra</h3>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-primary">
                  AR$ {formatPrice(rate.buy_price)}
                </span>
                <PriceChange current={rate.buy_price} previous={rate.previous_buy_price} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Precio de Venta</h3>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-primary">
                  AR$ {formatPrice(rate.sell_price)}
                </span>
                <PriceChange current={rate.sell_price} previous={rate.previous_sell_price} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
