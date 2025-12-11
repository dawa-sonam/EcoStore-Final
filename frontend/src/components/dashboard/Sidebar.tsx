import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  MapPin,
  BarChart3,
  Users,
  Package,
  AlertTriangle,
  Settings,
  X,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem: string;
  onItemClick: (item: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { id: "eod", label: "EOD Submission", icon: FileText, path: "/eod" },
  { id: "locations", label: "Locations", icon: MapPin, path: "/" },
  { id: "reports", label: "Reports", icon: BarChart3, path: "/" },
  { id: "employees", label: "Employees", icon: Users, path: "/" },
  { id: "inventory", label: "Inventory", icon: Package, path: "/" },
  { id: "alerts", label: "Alerts", icon: AlertTriangle, badge: 3, path: "/" },
  { id: "settings", label: "Settings", icon: Settings, path: "/" },
];

export function Sidebar({ isOpen, onClose, activeItem, onItemClick }: SidebarProps) {
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border",
          "transform transition-transform duration-200 ease-in-out lg:transform-none",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Mobile close button */}
          <div className="flex items-center justify-end p-4 lg:hidden">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onItemClick(item.id);
                    if (item.path) {
                      navigate(item.path);
                    }
                    onClose();
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={cn(
                        "ml-auto px-2 py-0.5 text-xs rounded-full",
                        isActive
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-destructive/10 text-destructive"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="dashboard-card p-3">
              <p className="text-xs font-medium text-foreground">Need help?</p>
              <p className="text-xs text-muted-foreground mt-1">
                Check our documentation or contact support.
              </p>
              <Button variant="link" className="h-auto p-0 mt-2 text-xs text-primary">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
