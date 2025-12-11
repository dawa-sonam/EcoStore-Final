import { InventoryItem } from "@/types/location";
import { Package, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface InventoryLevelsProps {
  inventory: InventoryItem[];
}

export function InventoryLevels({ inventory }: InventoryLevelsProps) {
  const lowStockItems = inventory.filter((item) => item.currentStock <= item.lowStockThreshold);

  return (
    <div className="dashboard-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Inventory Levels</h3>
        {lowStockItems.length > 0 && (
          <span className="text-sm text-warning font-medium">
            {lowStockItems.length} low stock
          </span>
        )}
      </div>

      <div className="space-y-3">
        {inventory.map((item) => {
          const isLowStock = item.currentStock <= item.lowStockThreshold;
          const stockPercentage = (item.currentStock / (item.lowStockThreshold * 2)) * 100;

          return (
            <div
              key={item.id}
              className={cn(
                "p-3 rounded-lg border",
                isLowStock ? "border-warning/50 bg-warning/10" : "border-border"
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Package className={cn("h-4 w-4", isLowStock ? "text-warning" : "text-muted-foreground")} />
                  <div>
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  </div>
                </div>
                {isLowStock && (
                  <AlertTriangle className="h-4 w-4 text-warning" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Current Stock</span>
                    <span className={cn("font-medium", isLowStock ? "text-warning" : "text-foreground")}>
                      {item.currentStock} {item.unit}
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full transition-all",
                        isLowStock ? "bg-warning" : "bg-primary"
                      )}
                      style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Low stock threshold: {item.lowStockThreshold} {item.unit}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

