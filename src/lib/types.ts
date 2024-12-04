export interface DollarRate {
  name: string;
  code: string;
  buy_price: number;
  sell_price: number;
  last_update: string;
}

export interface CurrencyResponse {
  rates: DollarRate[];
  last_update: string;
}
