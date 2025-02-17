"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function MailComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Mail className="mr-2 h-4 w-4" />
          Почта
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Непрочитанные письма</span>
            <span className="font-bold">7</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Черновики</span>
            <span className="font-bold">2</span>
          </div>
          <div className="flex items-center space-x-2 mt-2">
            <Input placeholder="Искать письма..." className="flex-grow" />
            <Button>Поиск</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
