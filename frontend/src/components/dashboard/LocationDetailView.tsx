import { Location } from "@/types/location";
import { HourlySalesChart } from "./HourlySalesChart";
import { EmployeeStatus } from "./EmployeeStatus";
import { RecentTransactions } from "./RecentTransactions";
import { InventoryLevels } from "./InventoryLevels";
import { MapPin, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface LocationDetailViewProps {
  location: Location;
}

export function LocationDetailView({ location }: LocationDetailViewProps) {
  const variancePositive = location.cashVariance >= 0;
  const statusConfig = {
    good: { label: "On Track", className: "bg-success/10 text-success border-success/20" },
    warning: { label: "Attention Needed", className: "bg-warning/10 text-warning border-warning/20" },
    critical: { label: "Critical", className: "bg-destructive/10 text-destructive border-destructive/20" },
  };

  return (
    <div className="space-y-6">
      {/* Location Header */}
      <div className="dashboard-card p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-1">{location.name}</h2>
              <p className="text-muted-foreground">{location.address}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Manager: {location.managerName}
              </p>
            </div>
          </div>
          <span
            className={cn(
              "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border",
              statusConfig[location.status].className
            )}
          >
            {statusConfig[location.status].label}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Today's Sales</p>
            <p className="text-2xl font-bold text-foreground">
              ${location.todaySales.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Cash Variance</p>
            <div className="flex items-center gap-2">
              {variancePositive ? (
                <TrendingUp className="h-5 w-5 text-success" />
              ) : (
                <TrendingDown className="h-5 w-5 text-destructive" />
              )}
              <p
                className={cn(
                  "text-2xl font-bold",
                  variancePositive ? "text-success" : "text-destructive"
                )}
              >
                {variancePositive ? "+" : ""}${Math.abs(location.cashVariance).toFixed(2)}
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Last Updated</p>
            <p className="text-lg font-medium text-foreground">
              {formatDistanceToNow(location.lastUpdated, { addSuffix: true })}
            </p>
          </div>
        </div>
      </div>

      {/* Charts and Data Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HourlySalesChart data={location.hourlySales} />
        <EmployeeStatus employees={location.employees} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentTransactions transactions={location.recentTransactions} />
        <InventoryLevels inventory={location.inventory} />
      </div>
    </div>
  );
}

