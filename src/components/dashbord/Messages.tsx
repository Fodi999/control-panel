"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Messages() {
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-black text-gray-100 border border-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all">
      <CardHeader className="p-3 sm:p-4">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          Сообщения
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-gray-300">Непрочитанные</span>
            <span className="text-xs sm:text-sm font-bold text-gray-100">3</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs sm:text-sm text-gray-300">Всего разговоров</span>
            <span className="text-xs sm:text-sm font-bold text-gray-100">12</span>
          </div>
        </div>
        <Button className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-medium rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm transition-all shadow-md hover:shadow-lg">
          Входящие
        </Button>
      </CardContent>
    </Card>
  );
}
