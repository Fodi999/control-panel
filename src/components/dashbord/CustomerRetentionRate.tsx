"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export function CustomerRetentionRate() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Процент удержания клиентов</CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">85%</div>
        <p className="text-xs text-muted-foreground">+2% по сравнению с предыдущим кварталом</p>
      </CardContent>
    </Card>
  );
}
