"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export function TotalRevenue() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Общий доход</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$54,321</div>
        <p className="text-xs text-muted-foreground">+2.5% по сравнению с прошлым месяцем</p>
      </CardContent>
    </Card>
  );
}
