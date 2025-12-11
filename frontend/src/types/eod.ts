export interface EODFormData {
  // Header
  locationId: string;
  date: Date;
  shift: "Opening" | "Mid" | "Closing";

  // Sales
  registerSales: number;
  fuelGallons: number;
  fuelSales: number;
  lotterySales: number;
  atmFees: number;

  // Cash Reconciliation
  startingCash: number;
  expectedCash: number;
  actualCash: number;
  variance: number;
  creditCardBatch: number;
  depositAmount: number;

  // Operations Checklist
  cleanedRestrooms: boolean;
  stockedShelves: boolean;
  checkedExpirationDates: boolean;
  completedTemperatureLogs: boolean;
  emptiedTrash: boolean;
  sweptMoppedFloors: boolean;
  operationsNotes: string;

  // Deliveries
  deliveries: Delivery[];

  // Photos
  zReportPhoto: File | null;
  cashCountPhoto: File | null;
  deliveryReceipts: File[];
}

export interface Delivery {
  id: string;
  vendorName: string;
  invoiceNumber: string;
  amount: number;
  itemsReceived: string;
}

export interface EODSubmissionResponse {
  success: boolean;
  message: string;
  submissionId?: string;
}

