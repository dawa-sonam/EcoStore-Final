import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { HourlySale } from "@/types/location";

interface HourlySalesChartProps {
  data: HourlySale[];
}

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--primary))",
  },
};

export function HourlySalesChart({ data }: HourlySalesChartProps) {
  const chartData = data.map((item) => ({
    hour: `${item.hour}:00`,
    sales: item.sales,
    transactions: item.transactions,
  }));

  return (
    <div className="dashboard-card p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Hourly Sales Today</h3>
      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="hour"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            className="text-xs"
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dashed" />}
          />
          <Bar
            dataKey="sales"
            fill="var(--color-sales)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

