import { cn } from "@/lib/utils";
import { MapPin, TrendingUp, TrendingDown, AlertCircle, CheckCircle, User, Clock } from "lucide-react";
import { Location } from "@/types/location";
import { formatDistanceToNow } from "date-fns";

interface LocationCardProps extends Omit<Location, "hourlySales" | "employees" | "recentTransactions" | "inventory"> {
  delay?: number;
  onClick?: () => void;
}

export function LocationCard({
  name,
  address,
  todaySales,
  cashVariance,
  status,
  managerName,
  lastUpdated,
  delay = 0,
  onClick,
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
      className={cn(
        "dashboard-card p-5 opacity-0 animate-fade-in",
        onClick && "cursor-pointer hover:border-primary/50"
      )}
      style={{ animationDelay: `${delay}ms` }}
      onClick={onClick}
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

      <div className="grid grid-cols-2 gap-4 mb-3">
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
              {variancePositive ? "+" : ""}${Math.abs(cashVariance).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-border">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <User className="h-3 w-3" />
            <span>{managerName}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{formatDistanceToNow(lastUpdated, { addSuffix: true })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
