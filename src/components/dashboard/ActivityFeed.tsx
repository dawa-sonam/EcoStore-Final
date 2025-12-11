import { cn } from "@/lib/utils";
import {
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Package,
  User,
} from "lucide-react";

interface ActivityItem {
  id: string;
  type: "sale" | "alert" | "submission" | "inventory" | "employee";
  title: string;
  description: string;
  time: string;
  location?: string;
}

const activities: ActivityItem[] = [
  {
    id: "1",
    type: "sale",
    title: "Shift Report Submitted",
    description: "Morning shift closed with $2,450 in sales",
    time: "5 min ago",
    location: "Downtown Express",
  },
  {
    id: "2",
    type: "alert",
    title: "Cash Variance Detected",
    description: "Variance of -$15.50 requires review",
    time: "12 min ago",
    location: "Westside Mini Mart",
  },
  {
    id: "3",
    type: "inventory",
    title: "Low Stock Alert",
    description: "Energy drinks running low (15 units remaining)",
    time: "25 min ago",
    location: "Airport Quick Stop",
  },
  {
    id: "4",
    type: "employee",
    title: "Employee Clocked In",
    description: "Sarah M. started afternoon shift",
    time: "1 hour ago",
    location: "University Corner",
  },
  {
    id: "5",
    type: "submission",
    title: "Daily Audit Completed",
    description: "All registers verified and balanced",
    time: "2 hours ago",
    location: "Downtown Express",
  },
];

const iconMap = {
  sale: { icon: DollarSign, className: "bg-success/10 text-success" },
  alert: { icon: AlertTriangle, className: "bg-warning/10 text-warning" },
  submission: { icon: CheckCircle, className: "bg-primary/10 text-primary" },
  inventory: { icon: Package, className: "bg-muted text-muted-foreground" },
  employee: { icon: User, className: "bg-muted text-muted-foreground" },
};

export function ActivityFeed() {
  return (
    <div className="dashboard-card p-6 opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const { icon: Icon, className } = iconMap[activity.type];

          return (
            <div
              key={activity.id}
              className="flex gap-4 opacity-0 animate-slide-in"
              style={{ animationDelay: `${500 + index * 100}ms` }}
            >
              <div className={cn("p-2 rounded-lg h-fit flex-shrink-0", className)}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    {activity.location && (
                      <p className="text-xs text-muted-foreground mt-1">{activity.location}</p>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
