import { Delivery } from "@/types/eod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeliveryFormProps {
  delivery: Delivery;
  onChange: (delivery: Delivery) => void;
  onRemove: () => void;
  index: number;
}

export function DeliveryForm({ delivery, onChange, onRemove, index }: DeliveryFormProps) {
  const handleChange = (field: keyof Delivery) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange({
      ...delivery,
      [field]: field === "amount" ? parseFloat(e.target.value) || 0 : e.target.value,
    });
  };

  return (
    <div className="p-4 border border-border rounded-lg space-y-4 bg-card">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-foreground">Delivery {index + 1}</h4>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onRemove}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`vendor-${delivery.id}`}>Vendor Name *</Label>
          <Input
            id={`vendor-${delivery.id}`}
            value={delivery.vendorName}
            onChange={handleChange("vendorName")}
            placeholder="e.g., Coca-Cola"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`invoice-${delivery.id}`}>Invoice Number *</Label>
          <Input
            id={`invoice-${delivery.id}`}
            value={delivery.invoiceNumber}
            onChange={handleChange("invoiceNumber")}
            placeholder="INV-12345"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`amount-${delivery.id}`}>Amount ($) *</Label>
        <Input
          id={`amount-${delivery.id}`}
          type="number"
          step="0.01"
          value={delivery.amount || ""}
          onChange={handleChange("amount")}
          placeholder="0.00"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`items-${delivery.id}`}>Items Received *</Label>
        <Textarea
          id={`items-${delivery.id}`}
          value={delivery.itemsReceived}
          onChange={handleChange("itemsReceived")}
          placeholder="List items received..."
          rows={3}
          required
        />
      </div>
    </div>
  );
}

