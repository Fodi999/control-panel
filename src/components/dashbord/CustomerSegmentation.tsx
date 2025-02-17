"use client";

import * as React from "react";
import { PieChart, Pie, Cell, Label, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

const customerData = [
  { segment: "Новые", value: 30, fill: "hsl(var(--chart-1))" },
  { segment: "Постоянные", value: 35, fill: "hsl(var(--chart-2))" },
  { segment: "VIP", value: 10, fill: "hsl(var(--chart-3))" },
  { segment: "Неактивные", value: 15, fill: "hsl(var(--chart-4))" },
  { segment: "Потенциальные", value: 10, fill: "hsl(var(--chart-5))" },
];

const chartConfig = {
  value: { label: "Количество" },
  Новые: { label: "Новые", color: "hsl(var(--chart-1))" },
  Постоянные: { label: "Постоянные", color: "hsl(var(--chart-2))" },
  VIP: { label: "VIP", color: "hsl(var(--chart-3))" },
  Неактивные: { label: "Неактивные", color: "hsl(var(--chart-4))" },
  Потенциальные: { label: "Потенциальные", color: "hsl(var(--chart-5))" },
};

export function CustomerSegmentation() {
  const totalCustomers = React.useMemo(() => {
    return customerData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Сегментация клиентов</CardTitle>
        <CardDescription>Распределение клиентов по категориям</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[300px]">
          <PieChart>
            <Tooltip
              content={({ payload }) => {
                if (payload && payload[0]) {
                  return (
                    <div className="bg-background p-2 rounded shadow">
                      <p className="text-sm">{`${payload[0].name}: ${payload[0].value}%`}</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Pie
              data={customerData}
              dataKey="value"
              nameKey="segment"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
            >
              {customerData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (
                    viewBox &&
                    "cx" in viewBox &&
                    "cy" in viewBox &&
                    typeof viewBox.cx === "number" &&
                    typeof viewBox.cy === "number"
                  ) {
                    const { cx, cy } = viewBox;
                    return (
                      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={cx} y={cy - 10} className="fill-foreground text-2xl font-bold">
                          {totalCustomers}
                        </tspan>
                        <tspan x={cx} y={cy + 15} className="fill-muted-foreground text-sm">
                          Всего клиентов
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {customerData.map((segment, index) => (
            <div key={index} className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: segment.fill }}></div>
              <span className="text-sm">
                {segment.segment}: {segment.value}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

