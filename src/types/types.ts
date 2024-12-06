export interface DollarRate {
  currency: string;
  name: string;
  code: string;
  buy_price: number | null;
  sell_price: number | null;
  last_update: string;
  previous_buy_price?: number | null;
  previous_sell_price?: number | null;
  historical_data?: HistoricalRate[];
  daily_comparison?: HistoricalComparison | null;
  weekly_comparison?: HistoricalComparison | null;
}

export type DollarResponse = {
  moneda: string;
  casa: string;
  nombre: string;
  compra: number;
  venta: number;
  fechaActualizacion: string;
};

export interface HistoricalRate {
  casa: string;
  compra: number;
  venta: number;
  fecha: string;
}

export interface HistoricalComparison {
  date: string;
  buy_price: number;
  sell_price: number;
}

export interface PriceComparison {
  current: number;
  previous: number;
  difference: number;
  percentageChange: number;
}
