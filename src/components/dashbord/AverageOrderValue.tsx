"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

export function AverageOrderValue() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Средний чек заказа</CardTitle>
        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$250</div>
        <p className="text-xs text-muted-foreground">+5% по сравнению с прошлым месяцем</p>
      </CardContent>
    </Card>
  );
}
