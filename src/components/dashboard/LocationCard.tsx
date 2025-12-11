import { cn } from "@/lib/utils";
import { MapPin, TrendingUp, TrendingDown, AlertCircle, CheckCircle } from "lucide-react";

interface LocationCardProps {
  name: string;
  address: string;
  todaySales: number;
  cashVariance: number;
  status: "good" | "warning" | "critical";
  delay?: number;
}

export function LocationCard({
  name,
  address,
  todaySales,
  cashVariance,
  status,
  delay = 0,
}: LocationCardProps) {
  const statusConfig = {
    good: {
      icon: CheckCircle,
      label: "On Track",
      className: "status-success",
    },
    warning: {
      icon: AlertCircle,
      label: "Attention Needed",
      className: "status-warning",
    },
    critical: {
      icon: AlertCircle,
      label: "Critical",
      className: "status-error",
    },
  };

  const StatusIcon = statusConfig[status].icon;
  const variancePositive = cashVariance >= 0;

  return (
    <div
      className="dashboard-card p-5 opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <MapPin className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{name}</h3>
            <p className="text-xs text-muted-foreground">{address}</p>
          </div>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
            statusConfig[status].className
          )}
        >
          <StatusIcon className="h-3 w-3" />
          {statusConfig[status].label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Today's Sales</p>
          <p className="text-lg font-bold text-foreground">
            ${todaySales.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Cash Variance</p>
          <div className="flex items-center gap-1">
            {variancePositive ? (
              <TrendingUp className="h-4 w-4 text-success" />
            ) : (
              <TrendingDown className="h-4 w-4 text-destructive" />
            )}
            <p
              className={cn(
                "text-lg font-bold",
                variancePositive ? "text-success" : "text-destructive"
              )}
            >
              {variancePositive ? "+" : ""}${cashVariance.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
