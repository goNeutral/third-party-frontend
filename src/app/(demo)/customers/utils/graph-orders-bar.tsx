"use client";

import React from "react";
import { Bar, BarChart } from "recharts";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartData = [
    { month: "January", sales: 186, purchase: 80 },
    { month: "February", sales: 305, purchase: 200 },
    { month: "March", sales: 237, purchase: 120 },
    { month: "April", sales: 73, purchase: 190 },
    { month: "May", sales: 209, purchase: 130 },
    { month: "June", sales: 214, purchase: 140 },
];

const chartConfig = {
    sales: {
      label: "Sales",
      color: "#2563eb",
    },
    purchase: {
      label: "Purchase",
      color: "#60a5fa",
    },
  } satisfies ChartConfig

const MyChart = (): JSX.Element => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] border border-red-400 md:col-span-3">
      <BarChart width={500} height={300} data={chartData}>
        <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
        <Bar dataKey="purchase" fill="var(--color-purchase)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
};

export default MyChart;