"use client";

import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { TrendingUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";

const revenueData = [
  { month: "Янв", revenue: 5000 },
  { month: "Фев", revenue: -2000 },
  { month: "Мар", revenue: 3000 },
  { month: "Апр", revenue: 1000 },
  { month: "Май", revenue: -500 },
  { month: "Июн", revenue: 4000 },
];

const chartConfig: ChartConfig = {
  revenue: { label: "Доход" },
};

export function RevenueOverview() {
  const totalRevenue = revenueData.reduce((sum, data) => sum + data.revenue, 0);

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Обзор доходов</CardTitle>
        <CardDescription>Динамика доходов за последние 6 месяцев</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          {/* Оборачиваем всё в единый div */}
          <div>
            {/* Контейнер для графика с адаптивной высотой */}
            <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={revenueData}
                  margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel hideIndicator />}
                  />
                  <Bar dataKey="revenue" radius={4}>
                    <LabelList
                      dataKey="revenue"
                      position="top"
                      formatter={(value: number) => `${value} ₽`}
                    />
                    {revenueData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.revenue >= 0
                            ? "hsl(var(--chart-1))" // зеленый для положительного дохода
                            : "hsl(var(--chart-2))" // красный для отрицательного дохода
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Отдельный блок для подписей месяцев под графиком */}
            <div className="flex justify-around mt-2">
              {revenueData.map((entry, index) => (
                <span
                  key={index}
                  className="text-xs font-medium text-center w-full"
                >
                  {entry.month}
                </span>
              ))}
            </div>
          </div>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium">
          <TrendingUp className="h-4 w-4" />
          <span>
            {totalRevenue >= 0
              ? "Общий доход положительный"
              : "Общий доход отрицательный"}
          </span>
        </div>
        <span className="text-muted-foreground">
          Общий итог: {totalRevenue} ₽
        </span>
      </CardFooter>
    </Card>
  );
}






