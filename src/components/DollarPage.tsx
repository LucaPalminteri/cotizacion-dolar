"use client";

import { useEffect, useState } from "react";
import { CurrencyChart } from "@/components/currency-chart";
import { CurrencyDetail } from "@/components/currency-detail";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getLastNDays } from "@/utils/date";
import { DollarRate, HistoricalRate } from "@/types/types";
import { fetchDollarRates, fetchHistoricalRates } from "@/data/api";
import ErrorMessage from "./error-message";

const PERIODS = {
  "1D": 2,
  "7D": 7,
  "1M": 30,
  "1Y": 365,
} as const;

type Props = {
  code: string;
  rateProp: DollarRate;
  historicalDataProp: HistoricalRate[];
  periodProp: keyof typeof PERIODS;
};

export default function CurrencyPage({ code, historicalDataProp, periodProp, rateProp }: Props) {
  // const params = useParams();
  // const code = params.code as string;

  const [rate, setRate] = useState<DollarRate | null>(rateProp);
  const [historicalData, setHistoricalData] = useState<HistoricalRate[]>(historicalDataProp);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<keyof typeof PERIODS>(periodProp);

  const fetchData = async () => {
    try {
      setLoading(true);
      const rates = await fetchDollarRates();
      const currentRate = rates.find((r) => r.code.toLowerCase() === code.toLowerCase());

      if (!currentRate) {
        setError("Tipo de dólar no encontrado");
        return;
      }

      const dates = getLastNDays(PERIODS[period]);
      const casa = currentRate.code.toLowerCase();
      const history = await fetchHistoricalRates(casa, dates);

      setRate(currentRate);
      setHistoricalData(history);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error al cargar los datos. Por favor, intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [code, period]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <ErrorMessage message={error} />
        <Link href="/" className="text-primary hover:underline mt-4 inline-block">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
          </Link>
          {rate && <CurrencyDetail rate={rate} />}
        </div>

        <div className="space-y-6">
          <Tabs value={period} onValueChange={(v) => setPeriod(v as keyof typeof PERIODS)}>
            <TabsList>
              {Object.keys(PERIODS).map((key) => (
                <TabsTrigger key={key} value={key}>
                  {key}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="bg-card rounded-lg md:p-6">
            <CurrencyChart data={historicalData} loading={loading} period={period} />
          </div>
        </div>
      </div>
    </main>
  );
}
