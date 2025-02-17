"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Messages() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="mr-2 h-4 w-4" />
          Сообщения
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Непрочитанные сообщения</span>
            <span className="font-bold">3</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Всего разговоров</span>
            <span className="font-bold">12</span>
          </div>
          <Button className="w-full mt-2">Открыть входящие</Button>
        </div>
      </CardContent>
    </Card>
  );
}
