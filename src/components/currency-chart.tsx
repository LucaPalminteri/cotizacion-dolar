"use client";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Card, CardContent } from "./ui/card";
import { HistoricalRate } from "@/types/types";
import { formatDateShort } from "@/utils/date";
import { formatPrice } from "@/utils/price";

interface CurrencyChartProps {
  data: HistoricalRate[];
  loading?: boolean;
  period: string;
}

export function CurrencyChart({ data, loading }: CurrencyChartProps) {
  if (loading) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <div className="text-muted-foreground">Cargando datos...</div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="h-[400px] flex items-center justify-center">
        <div className="text-muted-foreground">No hay datos disponibles</div>
      </div>
    );
  }

  const chartData = [...data].reverse().map((item) => ({
    fecha: formatDateShort(item.fecha),
    compra: item.compra,
    venta: item.venta,
  }));

  const firstValue = chartData[0];
  const lastValue = chartData[chartData.length - 1];
  const priceDifference = lastValue.venta - firstValue.venta;
  const percentageChange = (priceDifference / firstValue.venta) * 100;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              Variación en el período
            </h3>
            <div className="text-2xl font-bold text-primary">
              AR$ {formatPrice(Math.abs(priceDifference))}
              <span
                className={`text-sm ml-2 ${priceDifference >= 0 ? "text-emerald-500" : "text-red-500"}`}
              >
                ({priceDifference >= 0 ? "+" : ""}
                {percentageChange.toFixed(2)}%)
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Rango de precios</h3>
            <div className="text-lg font-medium">
              <span className="text-primary">
                AR$ {formatPrice(Math.min(...chartData.map((d) => d.venta)))}
              </span>
              {" → "}
              <span className="text-primary">
                AR$ {formatPrice(Math.max(...chartData.map((d) => d.venta)))}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorCompra" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorVenta" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.1} />
                <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
            <XAxis dataKey="fecha" className="text-xs text-muted-foreground" />
            <YAxis
              className="text-xs text-muted-foreground"
              tickFormatter={(value) => `$${formatPrice(value)}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "hsl(var(--muted-foreground))" }}
            />
            <Area
              type="monotone"
              dataKey="compra"
              name="Compra"
              stroke="hsl(var(--primary))"
              fill="url(#colorCompra)"
              strokeWidth={2}
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="venta"
              name="Venta"
              stroke="hsl(var(--destructive))"
              fill="url(#colorVenta)"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
