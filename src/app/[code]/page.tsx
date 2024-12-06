import CurrencyPage from "@/components/DollarPage";
import ErrorMessage from "@/components/error-message";
import { fetchDollarRates, fetchHistoricalRates } from "@/data/api";
import { getLastNDays } from "@/utils/date";

const PERIODS = {
  "1D": 2,
  "7D": 7,
  "1M": 30,
  "1Y": 365,
} as const;

export default async function Page({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const rates = await fetchDollarRates();
  const currentRate = rates.find((r) => r.code.toLowerCase() === code.toLowerCase());
  const period: keyof typeof PERIODS = "7D";

  if (!currentRate) {
    return <ErrorMessage message={"Tipo de dólar no encontrado"} />;
  }

  const dates = getLastNDays(PERIODS[period]);
  const casa = currentRate.code.toLowerCase();
  const history = await fetchHistoricalRates(casa, dates);

  return (
    <>
      <CurrencyPage
        code={code}
        historicalDataProp={history}
        periodProp={period}
        rateProp={currentRate}
      />
    </>
  );
}
