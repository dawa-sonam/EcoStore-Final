import { Clock, User, CheckCircle2, XCircle } from "lucide-react";
import { Employee } from "@/types/location";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface EmployeeStatusProps {
  employees: Employee[];
}

export function EmployeeStatus({ employees }: EmployeeStatusProps) {
  const clockedInEmployees = employees.filter((emp) => emp.clockedIn);
  const clockedOutEmployees = employees.filter((emp) => !emp.clockedIn);

  return (
    <div className="dashboard-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Employee Status</h3>
        <span className="text-sm text-muted-foreground">
          {clockedInEmployees.length} of {employees.length} on shift
        </span>
      </div>

      <div className="space-y-3">
        {clockedInEmployees.map((employee) => (
          <div
            key={employee.id}
            className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/20"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-success/20">
                <CheckCircle2 className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="font-medium text-foreground">{employee.name}</p>
                <p className="text-xs text-muted-foreground">{employee.role}</p>
              </div>
            </div>
            {employee.clockInTime && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>
                  {formatDistanceToNow(employee.clockInTime, { addSuffix: true })}
                </span>
              </div>
            )}
          </div>
        ))}

        {clockedOutEmployees.map((employee) => (
          <div
            key={employee.id}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-muted">
                <XCircle className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">{employee.name}</p>
                <p className="text-xs text-muted-foreground">{employee.role}</p>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">Off duty</span>
          </div>
        ))}
      </div>
    </div>
  );
}

