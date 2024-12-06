import { DollarRate, DollarResponse, HistoricalRate } from "@/types/types";
import { headers, next } from "./api.config";
import { getDollarName } from "@/utils/price";

export async function fetchDollarRates(): Promise<DollarRate[]> {
  try {
    const url = "https://dolarapi.com/v1/dolares";
    const response = await fetch(url, { next, headers });

    if (!response.ok) throw new Error("Failed to fetch rates");

    const data: DollarResponse[] = await response.json();

    if (!Array.isArray(data)) throw new Error("Invalid data format");

    return getCleanDollarRate(data);
  } catch (error) {
    console.error("Error fetching dollar rates:", error);
    throw error;
  }
}

const getCleanDollarRate = (dolarResponse: DollarResponse[]) => {
  return dolarResponse.map((dollar) => ({
    currency: dollar.moneda,
    name: getDollarName(dollar.nombre),
    code: dollar.casa || "unknown",
    buy_price: dollar.compra || null,
    sell_price: dollar.venta || null,
    last_update: dollar.fechaActualizacion || new Date().toISOString(),
  }));
};

export async function fetchHistoricalRate(
  casa: string,
  date: string,
): Promise<HistoricalRate | null> {
  try {
    const [year, month, day] = date.split("-");
    const url = `https://api.argentinadatos.com/v1/cotizaciones/dolares/${casa}/${year}/${month}/${day}`;

    const response = await fetch(url, { headers });

    if (response.status === 404) return null;

    if (!response.ok) throw new Error("Failed to fetch historical rate");

    return await response.json();
  } catch (error) {
    console.error(`Error fetching historical rate for ${casa}:`, error);
    return null;
  }
}

export async function fetchHistoricalRates(
  casa: string,
  dates: string[],
): Promise<HistoricalRate[]> {
  const promises: Promise<HistoricalRate | null>[] = dates.map((date) =>
    fetchHistoricalRate(casa, date),
  );
  const results: (HistoricalRate | null)[] = await Promise.all(promises);

  return results.filter((result): result is NonNullable<typeof result> => result !== null);
}
