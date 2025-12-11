import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUpload } from "@/components/eod/FileUpload";
import { DeliveryForm } from "@/components/eod/DeliveryForm";
import { TopNav } from "@/components/dashboard/TopNav";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { EODFormData, Delivery } from "@/types/eod";
import { CalendarIcon, Loader2, Save, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockLocations } from "@/data/mockLocations";
import { useToast } from "@/hooks/use-toast";

const STORAGE_KEY = "eod_draft";
const AUTOSAVE_INTERVAL = 30000; // 30 seconds

export default function EODSubmission() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Get default location (in real app, this would come from auth context)
  const defaultLocation = mockLocations[0];
  const [selectedLocation, setSelectedLocation] = useState(defaultLocation.id);

  const [formData, setFormData] = useState<EODFormData>({
    locationId: defaultLocation.id,
    date: new Date(),
    shift: "Closing",
    registerSales: 0,
    fuelGallons: 0,
    fuelSales: 0,
    lotterySales: 0,
    atmFees: 0,
    startingCash: 0,
    expectedCash: 0,
    actualCash: 0,
    variance: 0,
    creditCardBatch: 0,
    depositAmount: 0,
    cleanedRestrooms: false,
    stockedShelves: false,
    checkedExpirationDates: false,
    completedTemperatureLogs: false,
    emptiedTrash: false,
    sweptMoppedFloors: false,
    operationsNotes: "",
    deliveries: [],
    zReportPhoto: null,
    cashCountPhoto: null,
    deliveryReceipts: [],
  });

  // Load draft from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Convert date string back to Date object
        parsed.date = new Date(parsed.date);
        setFormData(parsed);
        // Update selected location to match loaded draft
        if (parsed.locationId) {
          setSelectedLocation(parsed.locationId);
        }
        toast({
          title: "Draft loaded",
          description: "Your previous draft has been restored.",
        });
      } catch (error) {
        console.error("Failed to load draft:", error);
      }
    }
  }, [toast]);

  // Autosave functionality
  const saveDraft = useCallback(() => {
    setIsSaving(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      setLastSaved(new Date());
    } catch (error) {
      console.error("Failed to save draft:", error);
    } finally {
      setIsSaving(false);
    }
  }, [formData]);

  // Autosave on form data change
  useEffect(() => {
    const timer = setTimeout(() => {
      saveDraft();
    }, AUTOSAVE_INTERVAL);

    return () => clearTimeout(timer);
  }, [formData, saveDraft]);

  // Calculate expected cash and variance
  useEffect(() => {
    const expected =
      formData.startingCash +
      formData.registerSales +
      formData.fuelSales +
      formData.lotterySales +
      formData.atmFees -
      formData.creditCardBatch;

    const variance = formData.actualCash - expected;

    setFormData((prev) => ({
      ...prev,
      expectedCash: expected,
      variance: variance,
      depositAmount: formData.actualCash - formData.startingCash,
    }));
  }, [
    formData.startingCash,
    formData.registerSales,
    formData.fuelSales,
    formData.lotterySales,
    formData.atmFees,
    formData.creditCardBatch,
    formData.actualCash,
  ]);

  const handleChange = (field: keyof EODFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value =
      e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.type === "number"
        ? parseFloat(e.target.value) || 0
        : e.target.value;

    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSelectChange = (field: keyof EODFormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field: keyof EODFormData) => (
    files: File | File[] | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: files }));
  };

  const addDelivery = () => {
    const newDelivery: Delivery = {
      id: Date.now().toString(),
      vendorName: "",
      invoiceNumber: "",
      amount: 0,
      itemsReceived: "",
    };
    setFormData((prev) => ({
      ...prev,
      deliveries: [...prev.deliveries, newDelivery],
    }));
  };

  const updateDelivery = (id: string, delivery: Delivery) => {
    setFormData((prev) => ({
      ...prev,
      deliveries: prev.deliveries.map((d) => (d.id === id ? delivery : d)),
    }));
  };

  const removeDelivery = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      deliveries: prev.deliveries.filter((d) => d.id !== id),
    }));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const validateForm = (): string[] => {
    const errors: string[] = [];

    if (!formData.registerSales) errors.push("Register sales is required");
    if (!formData.actualCash) errors.push("Actual cash count is required");
    if (!formData.zReportPhoto) errors.push("Z-Report photo is required");
    if (!formData.cashCountPhoto) errors.push("Cash count photo is required");

    formData.deliveries.forEach((delivery, index) => {
      if (!delivery.vendorName) errors.push(`Delivery ${index + 1}: Vendor name is required`);
      if (!delivery.invoiceNumber) errors.push(`Delivery ${index + 1}: Invoice number is required`);
      if (!delivery.amount) errors.push(`Delivery ${index + 1}: Amount is required`);
      if (!delivery.itemsReceived) errors.push(`Delivery ${index + 1}: Items received is required`);
    });

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors.join(", "),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Clear draft
      localStorage.removeItem(STORAGE_KEY);

      toast({
        title: "Success!",
        description: "EOD report submitted successfully. Owner has been notified.",
      });

      // Reset form
      setFormData({
        ...formData,
        date: new Date(),
        registerSales: 0,
        fuelGallons: 0,
        fuelSales: 0,
        lotterySales: 0,
        atmFees: 0,
        startingCash: 0,
        actualCash: 0,
        creditCardBatch: 0,
        deliveries: [],
        zReportPhoto: null,
        cashCountPhoto: null,
        deliveryReceipts: [],
        operationsNotes: "",
      });

      // Navigate back to dashboard after a delay
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit EOD report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentLocation = mockLocations.find((loc) => loc.id === formData.locationId);

  // Update form location when location selector changes
  useEffect(() => {
    if (selectedLocation !== "all") {
      setFormData((prev) => ({ ...prev, locationId: selectedLocation }));
    }
  }, [selectedLocation]);

  return (
    <div className="min-h-screen bg-background">
      <TopNav
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        onAddLocation={() => {
          // Navigate to dashboard to add location
          navigate("/");
        }}
        locations={mockLocations.map((loc) => ({ id: loc.id, name: loc.name }))}
      />

      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeItem="eod"
          onItemClick={(item) => {
            if (item === "dashboard") {
              navigate("/");
            } else if (item === "eod") {
              navigate("/eod");
            }
          }}
        />

        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">End of Day Submission</h1>
          <p className="text-muted-foreground">
            Complete your daily report. Form auto-saves every 30 seconds.
          </p>
          {lastSaved && (
            <p className="text-xs text-muted-foreground mt-1">
              Last saved: {format(lastSaved, "h:mm:ss a")}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header Section */}
          <div className="dashboard-card p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Report Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Location</Label>
                <Input value={currentLocation?.name || ""} disabled />
              </div>

              <div className="space-y-2">
                <Label>Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => date && setFormData((prev) => ({ ...prev, date }))}
                      disabled={(date) => date > new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Shift *</Label>
                <Select value={formData.shift} onValueChange={handleSelectChange("shift")}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Opening">Opening</SelectItem>
                    <SelectItem value="Mid">Mid</SelectItem>
                    <SelectItem value="Closing">Closing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Sales Section */}
          <div className="dashboard-card p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Sales</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="registerSales">Total Register Sales ($) *</Label>
                <Input
                  id="registerSales"
                  type="number"
                  step="0.01"
                  value={formData.registerSales || ""}
                  onChange={handleChange("registerSales")}
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuelGallons">Fuel Sales - Gallons</Label>
                <Input
                  id="fuelGallons"
                  type="number"
                  step="0.01"
                  value={formData.fuelGallons || ""}
                  onChange={handleChange("fuelGallons")}
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuelSales">Fuel Sales - Amount ($)</Label>
                <Input
                  id="fuelSales"
                  type="number"
                  step="0.01"
                  value={formData.fuelSales || ""}
                  onChange={handleChange("fuelSales")}
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lotterySales">Lottery Sales ($)</Label>
                <Input
                  id="lotterySales"
                  type="number"
                  step="0.01"
                  value={formData.lotterySales || ""}
                  onChange={handleChange("lotterySales")}
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="atmFees">ATM Fees Collected ($)</Label>
                <Input
                  id="atmFees"
                  type="number"
                  step="0.01"
                  value={formData.atmFees || ""}
                  onChange={handleChange("atmFees")}
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Cash Reconciliation Section */}
          <div className="dashboard-card p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Cash Reconciliation</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startingCash">Starting Cash Amount ($)</Label>
                <Input
                  id="startingCash"
                  type="number"
                  step="0.01"
                  value={formData.startingCash || ""}
                  onChange={handleChange("startingCash")}
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label>Expected Cash ($)</Label>
                <Input
                  value={formatCurrency(formData.expectedCash)}
                  disabled
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="actualCash">Actual Cash Count ($) *</Label>
                <Input
                  id="actualCash"
                  type="number"
                  step="0.01"
                  value={formData.actualCash || ""}
                  onChange={handleChange("actualCash")}
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Variance ($)</Label>
                <Input
                  value={formatCurrency(formData.variance)}
                  disabled
                  className={cn(
                    "bg-muted",
                    Math.abs(formData.variance) > 50 && "text-destructive font-semibold"
                  )}
                />
                {Math.abs(formData.variance) > 50 && (
                  <p className="text-sm text-destructive">
                    Variance exceeds $50. Please verify cash count.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="creditCardBatch">Credit Card Batch Total ($)</Label>
                <Input
                  id="creditCardBatch"
                  type="number"
                  step="0.01"
                  value={formData.creditCardBatch || ""}
                  onChange={handleChange("creditCardBatch")}
                  placeholder="0.00"
                />
              </div>

              <div className="space-y-2">
                <Label>Deposit Amount ($)</Label>
                <Input
                  value={formatCurrency(formData.depositAmount)}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>
          </div>

          {/* Operations Checklist */}
          <div className="dashboard-card p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Operations Checklist</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cleanedRestrooms"
                  checked={formData.cleanedRestrooms}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, cleanedRestrooms: !!checked }))
                  }
                />
                <Label htmlFor="cleanedRestrooms" className="cursor-pointer">
                  Cleaned restrooms
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="stockedShelves"
                  checked={formData.stockedShelves}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, stockedShelves: !!checked }))
                  }
                />
                <Label htmlFor="stockedShelves" className="cursor-pointer">
                  Stocked shelves
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="checkedExpirationDates"
                  checked={formData.checkedExpirationDates}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, checkedExpirationDates: !!checked }))
                  }
                />
                <Label htmlFor="checkedExpirationDates" className="cursor-pointer">
                  Checked expiration dates
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="completedTemperatureLogs"
                  checked={formData.completedTemperatureLogs}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, completedTemperatureLogs: !!checked }))
                  }
                />
                <Label htmlFor="completedTemperatureLogs" className="cursor-pointer">
                  Completed temperature logs
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="emptiedTrash"
                  checked={formData.emptiedTrash}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, emptiedTrash: !!checked }))
                  }
                />
                <Label htmlFor="emptiedTrash" className="cursor-pointer">
                  Emptied trash
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sweptMoppedFloors"
                  checked={formData.sweptMoppedFloors}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, sweptMoppedFloors: !!checked }))
                  }
                />
                <Label htmlFor="sweptMoppedFloors" className="cursor-pointer">
                  Swept/mopped floors
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="operationsNotes">Notes / Issues</Label>
              <Textarea
                id="operationsNotes"
                value={formData.operationsNotes}
                onChange={handleChange("operationsNotes")}
                placeholder="Any issues or notes..."
                rows={3}
              />
            </div>
          </div>

          {/* Delivery Section */}
          <div className="dashboard-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Deliveries</h2>
              <Button type="button" variant="outline" onClick={addDelivery}>
                Add Delivery
              </Button>
            </div>

            {formData.deliveries.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No deliveries added. Click "Add Delivery" to add one.
              </p>
            ) : (
              <div className="space-y-4">
                {formData.deliveries.map((delivery, index) => (
                  <DeliveryForm
                    key={delivery.id}
                    delivery={delivery}
                    onChange={(updated) => updateDelivery(delivery.id, updated)}
                    onRemove={() => removeDelivery(delivery.id)}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Photo Uploads */}
          <div className="dashboard-card p-6 space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Photo Uploads</h2>

            <FileUpload
              label="Z-Report Photo"
              value={formData.zReportPhoto}
              onChange={handleFileChange("zReportPhoto")}
              required
            />

            <FileUpload
              label="Cash Count Photo"
              value={formData.cashCountPhoto}
              onChange={handleFileChange("cashCountPhoto")}
              required
            />

            <FileUpload
              label="Delivery Receipts"
              value={formData.deliveryReceipts}
              onChange={handleFileChange("deliveryReceipts")}
              multiple
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              {isSaving && (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Saving draft...</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={saveDraft}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button type="submit" disabled={isSubmitting} size="lg">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit EOD Report
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
          </div>
        </main>
      </div>
    </div>
  );
}

