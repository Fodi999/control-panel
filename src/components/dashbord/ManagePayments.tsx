"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ManagePayments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="mr-2 h-4 w-4" />
          Управление платежами
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Невыплаченные счета</span>
            <span className="font-bold">5</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Общая сумма к оплате</span>
            <span className="font-bold">$2,500</span>
          </div>
          <Button className="w-full mt-2">Обработать платежи</Button>
        </div>
      </CardContent>
    </Card>
  );
}
