"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { fetchDollarRates } from "@/lib/api";
import { DollarRate } from "@/lib/types";
import { CurrencyHeader } from "@/components/currency-header";
import { CurrencyGrid } from "@/components/currency-grid";
import { ErrorMessage } from "@/components/error-message";

export default function Home() {
  const [rates, setRates] = useState<DollarRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = async () => {
    try {
      setLoading(true);
      const data = await fetchDollarRates();
      setRates(data);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Error al cargar los datos. Por favor, intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <main className="flex-grow container mx-auto px-4 py-12">
        <CurrencyHeader />
        <ErrorMessage message={error} />

        {loading ? (
          <div className="flex justify-center items-center mt-24">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
        ) : (
          <CurrencyGrid rates={rates} />
        )}
      </main>

      <footer className="mt-auto py-6 text-center">
        <p className="text-sm text-muted-foreground">
          Datos proporcionados por{" "}
          <a href="https://dolarapi.com/docs/" target="blank" className="text-primary font-medium">
            DolarAPI
          </a>
        </p>
      </footer>
    </div>
  );
}
