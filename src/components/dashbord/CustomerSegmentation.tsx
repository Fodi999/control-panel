"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

const customerData = [
  { segment: "Новые", value: 30, fill: "#22c55e" }, // Зеленый
  { segment: "Постоянные", value: 35, fill: "#3b82f6" }, // Синий
  { segment: "VIP", value: 10, fill: "#f59e0b" }, // Желтый
  { segment: "Неактивные", value: 15, fill: "#ef4444" }, // Красный
  { segment: "Потенциальные", value: 10, fill: "#8b5cf6" }, // Фиолетовый
];

const chartConfig = {
  value: { label: "Количество" },
  Новые: { label: "Новые", color: "#22c55e" },
  Постоянные: { label: "Постоянные", color: "#3b82f6" },
  VIP: { label: "VIP", color: "#f59e0b" },
  Неактивные: { label: "Неактивные", color: "#ef4444" },
  Потенциальные: { label: "Потенциальные", color: "#8b5cf6" },
};

export function CustomerSegmentation() {
  const totalCustomers = useMemo(() => {
    return customerData.reduce((acc, curr) => acc + curr.value, 0);
  }, []);

  // Варианты анимации для карточки
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // Варианты анимации для элементов легенды
  const legendItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3, ease: "easeOut" },
    }),
  };

  // Варианты анимации для сегментов пирога
  const pieSegmentVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="col-span-3"
    >
      <Card className="bg-gradient-to-br from-gray-900 to-black text-gray-100 border border-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all">
        <CardHeader className="p-3 sm:p-4">
          <CardTitle className="text-sm sm:text-base font-medium text-gray-300">
            Сегментация клиентов
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-gray-400">
            Распределение по категориям
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-4">
          <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[250px] sm:h-[300px]">
            <PieChart>
              <Tooltip
                content={({ payload }) => {
                  if (payload && payload[0]) {
                    return (
                      <div className="bg-gray-800 p-2 rounded-xl shadow-lg border border-gray-700 text-gray-100">
                        <p className="text-xs sm:text-sm">{`${payload[0].name}: ${payload[0].value}%`}</p>
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
                innerRadius={50}
                outerRadius={70}
                paddingAngle={2}
                animationBegin={0}
                animationDuration={800}
                animationEasing="ease-out"
              >
                {customerData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill}>
                    <motion.g
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={pieSegmentVariants}
                    />
                  </Cell>
                ))}
                <motion.text
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  <tspan x="50%" dy="-0.6em" className="fill-gray-100 text-xl sm:text-2xl font-semibold">
                    {totalCustomers}
                  </tspan>
                  <tspan x="50%" dy="1.2em" className="fill-gray-400 text-[0.65rem] sm:text-xs">
                    Всего клиентов
                  </tspan>
                </motion.text>
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2 sm:gap-4">
            {customerData.map((segment, index) => (
              <motion.div
                key={index}
                className="flex items-center"
                custom={index}
                initial="hidden"
                animate="visible"
                variants={legendItemVariants}
              >
                <div
                  className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-2"
                  style={{ backgroundColor: segment.fill }}
                />
                <span className="text-[0.65rem] sm:text-sm text-gray-300">
                  {segment.segment}: {segment.value}%
                </span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

