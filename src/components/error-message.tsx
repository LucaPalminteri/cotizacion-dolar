"use client";
import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ErrorMessageProps {
  message: string;
  details?: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, details, onRetry }) => {
  const router = useRouter();

  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center text-center p-6">
      <div className="bg-card rounded-lg border p-8 max-w-md w-full space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <AlertCircle className="h-16 w-16 text-destructive mb-4" strokeWidth={1.5} />
          <h2 className="text-2xl font-bold text-foreground">{message}</h2>
          {details && <p className="text-muted-foreground text-sm">{details}</p>}
        </div>

        <div className="flex flex-col space-y-4">
          <Button onClick={() => router.back()} variant="outline" className="w-full">
            Volver atrás
          </Button>

          {onRetry && (
            <Button onClick={onRetry} className="w-full">
              Reintentar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
