"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";

export function NotificationSystem() {
  const { toast } = useToast();

  const notifyStaff = () => {
    toast({
      title: "Уведомление для персонала",
      description: "Поступило новое бронирование для стола 3",
    });
  };

  const notifyCustomer = () => {
    toast({
      title: "Уведомление для клиента",
      description: "Ваш стол готов. Пожалуйста, проходите в ресторан.",
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={notifyStaff}>Уведомить персонал</Button>
      <Button onClick={notifyCustomer}>Уведомить клиента</Button>
      <Toaster />
    </div>
  );
}

