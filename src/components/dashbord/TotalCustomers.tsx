"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

export function TotalCustomers() {
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    async function fetchTotal() {
      try {
        const res = await fetch("https://go-robot-670748333372.us-central1.run.app/api/total-customers");


        if (!res.ok) {
          throw new Error("Не удалось загрузить количество клиентов");
        }
        const data = await res.json();
        setTotal(data.total);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTotal();
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Всего клиентов</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{total}</div>
        <p className="text-xs text-muted-foreground">+10.1% по сравнению с прошлым месяцем</p>
      </CardContent>
    </Card>
  );
}
