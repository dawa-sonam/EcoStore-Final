import { useState } from "react";
import { TopNav } from "@/components/dashboard/TopNav";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { LocationCard } from "@/components/dashboard/LocationCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { DollarSign, MapPin, Users, AlertTriangle } from "lucide-react";

const locations = [
  {
    name: "Downtown Express",
    address: "123 Main St, Downtown",
    todaySales: 4250,
    cashVariance: 12.5,
    status: "good" as const,
  },
  {
    name: "Westside Mini Mart",
    address: "456 Oak Ave, Westside",
    todaySales: 3180,
    cashVariance: -15.5,
    status: "warning" as const,
  },
  {
    name: "Airport Quick Stop",
    address: "789 Terminal Blvd",
    todaySales: 5620,
    cashVariance: 0,
    status: "good" as const,
  },
  {
    name: "University Corner",
    address: "321 College Rd",
    todaySales: 2890,
    cashVariance: -45.25,
    status: "critical" as const,
  },
];

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("dashboard");
  const [selectedLocation, setSelectedLocation] = useState("all");

  return (
    <div className="min-h-screen bg-background">
      <TopNav
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeItem={activeNavItem}
          onItemClick={setActiveNavItem}
        />

        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Welcome back! Here's an overview of your stores.
              </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <SummaryCard
                title="Today's Total Sales"
                value="$15,940"
                change="+12% from yesterday"
                changeType="positive"
                icon={DollarSign}
                iconColor="bg-success/10 text-success"
                delay={0}
              />
              <SummaryCard
                title="Total Locations"
                value="4"
                change="All locations active"
                changeType="neutral"
                icon={MapPin}
                iconColor="bg-primary/10 text-primary"
                delay={100}
              />
              <SummaryCard
                title="Active Employees"
                value="12"
                change="3 on shift now"
                changeType="neutral"
                icon={Users}
                iconColor="bg-muted text-muted-foreground"
                delay={200}
              />
              <SummaryCard
                title="Active Alerts"
                value="3"
                change="2 require attention"
                changeType="negative"
                icon={AlertTriangle}
                iconColor="bg-warning/10 text-warning"
                delay={300}
              />
            </div>

            {/* Location Performance */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Location Performance
                </h2>
                <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                  View All Locations
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {locations.map((location, index) => (
                  <LocationCard
                    key={location.name}
                    {...location}
                    delay={100 + index * 100}
                  />
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <ActivityFeed />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
