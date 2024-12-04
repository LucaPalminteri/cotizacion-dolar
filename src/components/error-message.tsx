"use client";

import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string | null;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 text-destructive mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
      <AlertCircle className="h-5 w-5" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
