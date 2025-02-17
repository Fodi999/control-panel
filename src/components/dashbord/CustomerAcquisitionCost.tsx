"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react";

export function CustomerAcquisitionCost() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Стоимость привлечения клиента</CardTitle>
        <UserPlus className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$50</div>
        <p className="text-xs text-muted-foreground">-10% по сравнению с предыдущим кварталом</p>
      </CardContent>
    </Card>
  );
}
