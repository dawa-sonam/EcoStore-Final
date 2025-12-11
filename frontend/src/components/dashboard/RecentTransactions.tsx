import { Transaction } from "@/types/location";
import { formatDistanceToNow } from "date-fns";
import { CreditCard, DollarSign, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const paymentMethodIcons = {
  cash: DollarSign,
  card: CreditCard,
  mobile: Smartphone,
};

const paymentMethodLabels = {
  cash: "Cash",
  card: "Card",
  mobile: "Mobile",
};

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <div className="dashboard-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {transactions.map((transaction) => {
          const PaymentIcon = paymentMethodIcons[transaction.paymentMethod];
          return (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <PaymentIcon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    ${transaction.amount.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{transaction.items} items</span>
                    <span>•</span>
                    <span>{paymentMethodLabels[transaction.paymentMethod]}</span>
                    <span>•</span>
                    <span>{transaction.employeeName}</span>
                  </div>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(transaction.timestamp, { addSuffix: true })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

