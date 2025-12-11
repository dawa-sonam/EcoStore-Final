export interface Location {
  id: string;
  name: string;
  address: string;
  managerName: string;
  todaySales: number;
  cashVariance: number;
  status: "good" | "warning" | "critical";
  lastUpdated: Date;
  hourlySales: HourlySale[];
  employees: Employee[];
  recentTransactions: Transaction[];
  inventory: InventoryItem[];
}

export interface HourlySale {
  hour: number;
  sales: number;
  transactions: number;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  clockedIn: boolean;
  clockInTime?: Date;
  shiftStart?: Date;
  shiftEnd?: Date;
}

export interface Transaction {
  id: string;
  timestamp: Date;
  amount: number;
  items: number;
  paymentMethod: "cash" | "card" | "mobile";
  employeeName: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  lowStockThreshold: number;
  unit: string;
}

export interface LocationFormData {
  name: string;
  address: string;
  managerName: string;
  phone: string;
  email: string;
}

