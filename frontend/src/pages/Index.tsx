import { useState, useEffect } from "react";
import { TopNav } from "@/components/dashboard/TopNav";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { LocationCard } from "@/components/dashboard/LocationCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { LocationDetailView } from "@/components/dashboard/LocationDetailView";
import { AddLocationModal } from "@/components/dashboard/AddLocationModal";
import { DollarSign, MapPin, Users, AlertTriangle, Loader2 } from "lucide-react";
import { mockLocations, getLocationById, getAllLocations, getAggregatedData } from "@/data/mockLocations";
import { Location, LocationFormData } from "@/types/location";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("dashboard");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [locations, setLocations] = useState<Location[]>(mockLocations);
  const [isLoading, setIsLoading] = useState(false);
  const [addLocationModalOpen, setAddLocationModalOpen] = useState(false);

  // Simulate loading when switching locations
  useEffect(() => {
    if (selectedLocation !== "all") {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 300);
      return () => clearTimeout(timer);
    }
  }, [selectedLocation]);

  const handleLocationChange = (locationId: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedLocation(locationId);
      setIsLoading(false);
    }, 200);
  };

  const handleAddLocation = (formData: LocationFormData) => {
    // Create a new location with default values
    const newLocation: Location = {
      id: `store-${locations.length + 1}`,
      name: formData.name,
      address: formData.address,
      managerName: formData.managerName,
      todaySales: 0,
      cashVariance: 0,
      status: "good",
      lastUpdated: new Date(),
      hourlySales: [],
      employees: [],
      recentTransactions: [],
      inventory: [],
    };

    setLocations([...locations, newLocation]);
    setSelectedLocation(newLocation.id);
  };

  const currentLocation = selectedLocation !== "all" ? getLocationById(selectedLocation) : null;
  const aggregatedData = getAggregatedData(locations);

  return (
    <div className="min-h-screen bg-background">
      <TopNav
        selectedLocation={selectedLocation}
        onLocationChange={handleLocationChange}
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        onAddLocation={() => setAddLocationModalOpen(true)}
        locations={locations.map((loc) => ({ id: loc.id, name: loc.name }))}
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
            {isLoading ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-muted-foreground">Loading location data...</p>
                </div>
              </div>
            ) : selectedLocation === "all" ? (
              <>
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
                    value={`$${aggregatedData.totalSales.toLocaleString()}`}
                    change="+12% from yesterday"
                    changeType="positive"
                    icon={DollarSign}
                    iconColor="bg-success/10 text-success"
                    delay={0}
                  />
                  <SummaryCard
                    title="Total Locations"
                    value={aggregatedData.totalLocations.toString()}
                    change="All locations active"
                    changeType="neutral"
                    icon={MapPin}
                    iconColor="bg-primary/10 text-primary"
                    delay={100}
                  />
                  <SummaryCard
                    title="Active Employees"
                    value={aggregatedData.activeEmployees.toString()}
                    change={`${aggregatedData.activeEmployees} of ${aggregatedData.totalEmployees} on shift`}
                    changeType="neutral"
                    icon={Users}
                    iconColor="bg-muted text-muted-foreground"
                    delay={200}
                  />
                  <SummaryCard
                    title="Active Alerts"
                    value={aggregatedData.totalAlerts.toString()}
                    change={
                      aggregatedData.criticalLocations > 0
                        ? `${aggregatedData.criticalLocations} critical`
                        : aggregatedData.warningLocations > 0
                        ? `${aggregatedData.warningLocations} warnings`
                        : "All clear"
                    }
                    changeType={aggregatedData.totalAlerts > 0 ? "negative" : "neutral"}
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
                    <button
                      onClick={() => setAddLocationModalOpen(true)}
                      className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Add New Location
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {locations.map((location, index) => (
                      <LocationCard
                        key={location.id}
                        {...location}
                        delay={100 + index * 100}
                        onClick={() => handleLocationChange(location.id)}
                      />
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <ActivityFeed />
              </>
            ) : currentLocation ? (
              <>
                <LocationDetailView location={currentLocation} />
              </>
            ) : (
              <div className="flex items-center justify-center min-h-[400px]">
                <p className="text-muted-foreground">Location not found</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <AddLocationModal
        open={addLocationModalOpen}
        onOpenChange={setAddLocationModalOpen}
        onAddLocation={handleAddLocation}
      />
    </div>
  );
};

export default Index;
