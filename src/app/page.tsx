import Home from "@/components/Home";
import { fetchDollarRates, fetchHistoricalRates } from "@/data/api";
import { getLastNDays } from "@/utils/date";

// TODO: Create calculator feature
// TODO: Fetch only the last day, not the whole week
const DAYS_TO_COMPARE = 7;

export default async function Page() {
  const currentRates = await fetchDollarRates();
  const dates = getLastNDays(DAYS_TO_COMPARE);
  const historicalPromises = currentRates.map(async (rate) => {
    const casa = rate.code.toLowerCase();
    const history = await fetchHistoricalRates(casa, dates);
    return [casa, history] as const;
  });

  const historicalResults = await Promise.all(historicalPromises);
  const historicalMap = Object.fromEntries(historicalResults);

  return (
    <div>
      <Home rates={currentRates} historicalData={historicalMap} />
    </div>
  );
}
