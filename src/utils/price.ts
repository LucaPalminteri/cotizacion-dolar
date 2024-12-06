export function formatPrice(price: number | null) {
  if (price === null || price === undefined) return "N/A";
  return (
    // "$" +
    price.toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
}

export function calculatePriceChange(
  current: number | null,
  previous: number | null,
): number | null {
  if (!current || !previous) return null;
  return ((current - previous) / previous) * 100;
}

export function getWeeklyComparison(
  currentRate: number | null,
  historicalRates: { compra: number; venta: number; fecha: string }[],
) {
  if (!currentRate || !historicalRates.length) return null;

  const weekAgoRate = historicalRates[0];
  if (!weekAgoRate) return null;

  const difference = currentRate - weekAgoRate.venta;
  const percentageChange = (difference / weekAgoRate.venta) * 100;

  return {
    current: currentRate,
    previous: weekAgoRate.venta,
    difference,
    percentageChange,
  };
}

export const getDollarName = (name: string): string => {
  if (typeof name !== "string" || name === "") return "Desconocido";
  if (name === "Contado con liquidación") return "Dólar con liqui";
  if (name === "Bolsa") return "Dólar MEP/Bolsa";
  return `Dólar ${name.toLowerCase()}`;
};
