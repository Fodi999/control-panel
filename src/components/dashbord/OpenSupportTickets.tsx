"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export function OpenSupportTickets() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Открытые заявки поддержки</CardTitle>
        <MessageSquare className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">15</div>
        <p className="text-xs text-muted-foreground">5 заявок высокого приоритета</p>
      </CardContent>
    </Card>
  );
}
