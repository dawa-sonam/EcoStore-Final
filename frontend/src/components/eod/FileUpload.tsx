import { useRef, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  label: string;
  accept?: string;
  multiple?: boolean;
  value: File | File[] | null;
  onChange: (files: File | File[] | null) => void;
  required?: boolean;
  maxSizeMB?: number;
}

export function FileUpload({
  label,
  accept = "image/*",
  multiple = false,
  value,
  onChange,
  required = false,
  maxSizeMB = 5,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      onChange(null);
      return;
    }

    // Validate file size
    const invalidFiles = Array.from(files).filter(
      (file) => file.size > maxSizeMB * 1024 * 1024
    );
    if (invalidFiles.length > 0) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return;
    }

    setError(null);
    if (multiple) {
      onChange(Array.from(files));
    } else {
      onChange(files[0]);
    }
  };

  const handleRemove = (index?: number) => {
    if (multiple && Array.isArray(value) && index !== undefined) {
      const newFiles = value.filter((_, i) => i !== index);
      onChange(newFiles.length > 0 ? newFiles : null);
    } else {
      onChange(null);
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const files = multiple && Array.isArray(value) ? value : value ? [value] : [];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>

      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 transition-colors",
          error
            ? "border-destructive bg-destructive/5"
            : "border-border hover:border-primary/50"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
        />

        {files.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <div className="text-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => inputRef.current?.click()}
                className="mb-2"
              >
                Choose File{multiple ? "s" : ""}
              </Button>
              <p className="text-xs text-muted-foreground">
                {accept.includes("image") ? "Images" : "Files"} up to {maxSizeMB}MB
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 bg-muted rounded-lg"
              >
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemove(index)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {multiple && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => inputRef.current?.click()}
                className="w-full"
              >
                Add More Files
              </Button>
            )}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

