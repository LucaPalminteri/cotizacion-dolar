import { formatPrice } from "@/utils/price";
import { Dot, TrendingDown, TrendingUp } from "lucide-react";

export default function PriceChange({
  current,
  previous,
}: {
  current: number | null | undefined;
  previous: number | null | undefined;
}) {
  if (!current || !previous) return null;

  const difference = current - previous;
  const percentageChange = ((current - previous) / previous) * 100;
  const Icon = difference > 0 ? TrendingUp : TrendingDown;
  const color = difference > 0 ? "text-emerald-500" : "text-red-500";

  return (
    <div className={`flex items-center ${color} text-xs`}>
      <div className="flex items-center">
        <Icon className="h-3 w-3 mr-1" />
        <span className="font-medium">{Math.abs(percentageChange).toFixed(2)}%</span>
      </div>
      <Dot />
      <span className="font-medium">
        {difference > 0 ? "+" : ""}${formatPrice(difference)}
      </span>
    </div>
  );
}
