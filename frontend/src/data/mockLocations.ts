import { Location } from "@/types/location";

export const mockLocations: Location[] = [
  {
    id: "store-1",
    name: "Downtown Express",
    address: "123 Main St, Downtown",
    managerName: "Sarah Johnson",
    todaySales: 4250,
    cashVariance: 12.5,
    status: "good",
    lastUpdated: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    hourlySales: [
      { hour: 6, sales: 120, transactions: 8 },
      { hour: 7, sales: 180, transactions: 12 },
      { hour: 8, sales: 250, transactions: 18 },
      { hour: 9, sales: 320, transactions: 22 },
      { hour: 10, sales: 380, transactions: 25 },
      { hour: 11, sales: 420, transactions: 28 },
      { hour: 12, sales: 550, transactions: 35 },
      { hour: 13, sales: 480, transactions: 32 },
      { hour: 14, sales: 420, transactions: 28 },
      { hour: 15, sales: 380, transactions: 25 },
      { hour: 16, sales: 350, transactions: 23 },
      { hour: 17, sales: 320, transactions: 21 },
    ],
    employees: [
      { id: "emp-1", name: "Mike Chen", role: "Cashier", clockedIn: true, clockInTime: new Date(Date.now() - 2 * 60 * 60 * 1000), shiftStart: new Date(), shiftEnd: new Date(Date.now() + 6 * 60 * 60 * 1000) },
      { id: "emp-2", name: "Lisa Park", role: "Manager", clockedIn: true, clockInTime: new Date(Date.now() - 4 * 60 * 60 * 1000), shiftStart: new Date(), shiftEnd: new Date(Date.now() + 4 * 60 * 60 * 1000) },
      { id: "emp-3", name: "Tom Wilson", role: "Stock Clerk", clockedIn: false },
    ],
    recentTransactions: [
      { id: "txn-1", timestamp: new Date(Date.now() - 2 * 60 * 1000), amount: 24.50, items: 3, paymentMethod: "card", employeeName: "Mike Chen" },
      { id: "txn-2", timestamp: new Date(Date.now() - 5 * 60 * 1000), amount: 12.75, items: 2, paymentMethod: "cash", employeeName: "Mike Chen" },
      { id: "txn-3", timestamp: new Date(Date.now() - 8 * 60 * 1000), amount: 45.20, items: 5, paymentMethod: "card", employeeName: "Lisa Park" },
      { id: "txn-4", timestamp: new Date(Date.now() - 12 * 60 * 1000), amount: 8.99, items: 1, paymentMethod: "mobile", employeeName: "Mike Chen" },
      { id: "txn-5", timestamp: new Date(Date.now() - 15 * 60 * 1000), amount: 67.30, items: 8, paymentMethod: "card", employeeName: "Lisa Park" },
    ],
    inventory: [
      { id: "inv-1", name: "Energy Drinks", category: "Beverages", currentStock: 45, lowStockThreshold: 20, unit: "units" },
      { id: "inv-2", name: "Snack Bars", category: "Snacks", currentStock: 120, lowStockThreshold: 50, unit: "units" },
      { id: "inv-3", name: "Bottled Water", category: "Beverages", currentStock: 15, lowStockThreshold: 30, unit: "cases" },
      { id: "inv-4", name: "Cigarettes", category: "Tobacco", currentStock: 85, lowStockThreshold: 40, unit: "packs" },
    ],
  },
  {
    id: "store-2",
    name: "Westside Mini Mart",
    address: "456 Oak Ave, Westside",
    managerName: "David Martinez",
    todaySales: 3180,
    cashVariance: -15.5,
    status: "warning",
    lastUpdated: new Date(Date.now() - 12 * 60 * 1000), // 12 minutes ago
    hourlySales: [
      { hour: 6, sales: 90, transactions: 6 },
      { hour: 7, sales: 140, transactions: 10 },
      { hour: 8, sales: 200, transactions: 14 },
      { hour: 9, sales: 280, transactions: 19 },
      { hour: 10, sales: 320, transactions: 22 },
      { hour: 11, sales: 380, transactions: 26 },
      { hour: 12, sales: 450, transactions: 30 },
      { hour: 13, sales: 400, transactions: 27 },
      { hour: 14, sales: 350, transactions: 24 },
      { hour: 15, sales: 320, transactions: 22 },
      { hour: 16, sales: 280, transactions: 19 },
      { hour: 17, sales: 240, transactions: 16 },
    ],
    employees: [
      { id: "emp-4", name: "Emma Brown", role: "Cashier", clockedIn: true, clockInTime: new Date(Date.now() - 3 * 60 * 60 * 1000), shiftStart: new Date(), shiftEnd: new Date(Date.now() + 5 * 60 * 60 * 1000) },
      { id: "emp-5", name: "David Martinez", role: "Manager", clockedIn: true, clockInTime: new Date(Date.now() - 6 * 60 * 60 * 1000), shiftStart: new Date(), shiftEnd: new Date(Date.now() + 2 * 60 * 60 * 1000) },
    ],
    recentTransactions: [
      { id: "txn-6", timestamp: new Date(Date.now() - 3 * 60 * 1000), amount: 18.25, items: 2, paymentMethod: "cash", employeeName: "Emma Brown" },
      { id: "txn-7", timestamp: new Date(Date.now() - 7 * 60 * 1000), amount: 32.40, items: 4, paymentMethod: "card", employeeName: "David Martinez" },
      { id: "txn-8", timestamp: new Date(Date.now() - 10 * 60 * 1000), amount: 9.99, items: 1, paymentMethod: "mobile", employeeName: "Emma Brown" },
    ],
    inventory: [
      { id: "inv-5", name: "Coffee", category: "Beverages", currentStock: 25, lowStockThreshold: 15, unit: "bags" },
      { id: "inv-6", name: "Chips", category: "Snacks", currentStock: 8, lowStockThreshold: 20, unit: "cases" },
      { id: "inv-7", name: "Soda", category: "Beverages", currentStock: 35, lowStockThreshold: 25, unit: "cases" },
    ],
  },
  {
    id: "store-3",
    name: "Airport Quick Stop",
    address: "789 Terminal Blvd",
    managerName: "Jennifer Lee",
    todaySales: 5620,
    cashVariance: 0,
    status: "good",
    lastUpdated: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    hourlySales: [
      { hour: 6, sales: 200, transactions: 15 },
      { hour: 7, sales: 280, transactions: 20 },
      { hour: 8, sales: 350, transactions: 25 },
      { hour: 9, sales: 420, transactions: 30 },
      { hour: 10, sales: 480, transactions: 35 },
      { hour: 11, sales: 520, transactions: 38 },
      { hour: 12, sales: 600, transactions: 42 },
      { hour: 13, sales: 580, transactions: 40 },
      { hour: 14, sales: 540, transactions: 38 },
      { hour: 15, sales: 500, transactions: 35 },
      { hour: 16, sales: 460, transactions: 32 },
      { hour: 17, sales: 410, transactions: 29 },
    ],
    employees: [
      { id: "emp-6", name: "Robert Kim", role: "Cashier", clockedIn: true, clockInTime: new Date(Date.now() - 1 * 60 * 60 * 1000), shiftStart: new Date(), shiftEnd: new Date(Date.now() + 7 * 60 * 60 * 1000) },
      { id: "emp-7", name: "Jennifer Lee", role: "Manager", clockedIn: true, clockInTime: new Date(Date.now() - 5 * 60 * 60 * 1000), shiftStart: new Date(), shiftEnd: new Date(Date.now() + 3 * 60 * 60 * 1000) },
      { id: "emp-8", name: "Alex Rivera", role: "Cashier", clockedIn: true, clockInTime: new Date(Date.now() - 2 * 60 * 60 * 1000), shiftStart: new Date(), shiftEnd: new Date(Date.now() + 6 * 60 * 60 * 1000) },
    ],
    recentTransactions: [
      { id: "txn-9", timestamp: new Date(Date.now() - 1 * 60 * 1000), amount: 56.80, items: 7, paymentMethod: "card", employeeName: "Robert Kim" },
      { id: "txn-10", timestamp: new Date(Date.now() - 4 * 60 * 1000), amount: 23.45, items: 3, paymentMethod: "card", employeeName: "Alex Rivera" },
      { id: "txn-11", timestamp: new Date(Date.now() - 6 * 60 * 1000), amount: 12.30, items: 2, paymentMethod: "cash", employeeName: "Robert Kim" },
      { id: "txn-12", timestamp: new Date(Date.now() - 9 * 60 * 1000), amount: 89.50, items: 10, paymentMethod: "card", employeeName: "Jennifer Lee" },
    ],
    inventory: [
      { id: "inv-8", name: "Travel Snacks", category: "Snacks", currentStock: 150, lowStockThreshold: 60, unit: "units" },
      { id: "inv-9", name: "Magazines", category: "Media", currentStock: 45, lowStockThreshold: 20, unit: "units" },
      { id: "inv-10", name: "Souvenirs", category: "Merchandise", currentStock: 30, lowStockThreshold: 15, unit: "units" },
    ],
  },
  {
    id: "store-4",
    name: "University Corner",
    address: "321 College Rd",
    managerName: "Michael Thompson",
    todaySales: 2890,
    cashVariance: -45.25,
    status: "critical",
    lastUpdated: new Date(Date.now() - 20 * 60 * 1000), // 20 minutes ago
    hourlySales: [
      { hour: 6, sales: 80, transactions: 5 },
      { hour: 7, sales: 120, transactions: 8 },
      { hour: 8, sales: 180, transactions: 12 },
      { hour: 9, sales: 240, transactions: 16 },
      { hour: 10, sales: 280, transactions: 19 },
      { hour: 11, sales: 320, transactions: 22 },
      { hour: 12, sales: 380, transactions: 26 },
      { hour: 13, sales: 350, transactions: 24 },
      { hour: 14, sales: 300, transactions: 21 },
      { hour: 15, sales: 280, transactions: 19 },
      { hour: 16, sales: 250, transactions: 17 },
      { hour: 17, sales: 220, transactions: 15 },
    ],
    employees: [
      { id: "emp-9", name: "Jessica White", role: "Cashier", clockedIn: true, clockInTime: new Date(Date.now() - 4 * 60 * 60 * 1000), shiftStart: new Date(), shiftEnd: new Date(Date.now() + 4 * 60 * 60 * 1000) },
      { id: "emp-10", name: "Michael Thompson", role: "Manager", clockedIn: false },
    ],
    recentTransactions: [
      { id: "txn-13", timestamp: new Date(Date.now() - 6 * 60 * 1000), amount: 15.60, items: 2, paymentMethod: "card", employeeName: "Jessica White" },
      { id: "txn-14", timestamp: new Date(Date.now() - 11 * 60 * 1000), amount: 7.25, items: 1, paymentMethod: "cash", employeeName: "Jessica White" },
    ],
    inventory: [
      { id: "inv-11", name: "Textbooks", category: "Books", currentStock: 5, lowStockThreshold: 10, unit: "units" },
      { id: "inv-12", name: "Notebooks", category: "Supplies", currentStock: 12, lowStockThreshold: 25, unit: "units" },
      { id: "inv-13", name: "Pens", category: "Supplies", currentStock: 8, lowStockThreshold: 20, unit: "boxes" },
    ],
  },
];

export function getLocationById(id: string): Location | undefined {
  return mockLocations.find((loc) => loc.id === id);
}

export function getAllLocations(): Location[] {
  return mockLocations;
}

export function getAggregatedData(locations: Location[]) {
  const totalSales = locations.reduce((sum, loc) => sum + loc.todaySales, 0);
  const totalVariance = locations.reduce((sum, loc) => sum + loc.cashVariance, 0);
  const activeEmployees = locations.reduce((sum, loc) => sum + loc.employees.filter((e) => e.clockedIn).length, 0);
  const totalEmployees = locations.reduce((sum, loc) => sum + loc.employees.length, 0);
  const criticalLocations = locations.filter((loc) => loc.status === "critical").length;
  const warningLocations = locations.filter((loc) => loc.status === "warning").length;

  return {
    totalSales,
    totalVariance,
    activeEmployees,
    totalEmployees,
    totalLocations: locations.length,
    criticalLocations,
    warningLocations,
    totalAlerts: criticalLocations + warningLocations,
  };
}

