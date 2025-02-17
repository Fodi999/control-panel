"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { PieChart } from "lucide-react";

export function CustomerLifetimeValue() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Пожизненная ценность клиента</CardTitle>
        <PieChart className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$1,200</div>
        <p className="text-xs text-muted-foreground">+8% по сравнению с прошлым годом</p>
      </CardContent>
    </Card>
  );
}
