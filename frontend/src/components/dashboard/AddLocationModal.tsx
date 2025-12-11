import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LocationFormData } from "@/types/location";

interface AddLocationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddLocation: (data: LocationFormData) => void;
}

export function AddLocationModal({ open, onOpenChange, onAddLocation }: AddLocationModalProps) {
  const [formData, setFormData] = useState<LocationFormData>({
    name: "",
    address: "",
    managerName: "",
    phone: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    onAddLocation(formData);
    setIsSubmitting(false);
    setFormData({
      name: "",
      address: "",
      managerName: "",
      phone: "",
      email: "",
    });
    onOpenChange(false);
  };

  const handleChange = (field: keyof LocationFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Location</DialogTitle>
          <DialogDescription>
            Add a new store location to your dashboard. Fill in all the required information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Store Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Station A"
                value={formData.name}
                onChange={handleChange("name")}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                placeholder="123 Main St, City, State ZIP"
                value={formData.address}
                onChange={handleChange("address")}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="managerName">Manager Name *</Label>
              <Input
                id="managerName"
                placeholder="John Doe"
                value={formData.managerName}
                onChange={handleChange("managerName")}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={handleChange("phone")}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="manager@store.com"
                value={formData.email}
                onChange={handleChange("email")}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Location"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

