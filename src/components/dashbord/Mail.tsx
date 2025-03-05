"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function MailComponent() {
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-black text-gray-100 border border-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all">
      <CardHeader className="p-3 sm:p-4">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          Почта
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-gray-300">Непрочитанные письма</span>
            <span className="text-xs sm:text-sm font-bold text-gray-100">7</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-gray-300">Черновики</span>
            <span className="text-xs sm:text-sm font-bold text-gray-100">2</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder="Поиск писем..."
            className="flex-1 bg-gray-800 text-gray-100 border-gray-700 rounded-xl px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
          <Button className="bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-medium rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm transition-all shadow-md hover:shadow-lg">
            Поиск
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
