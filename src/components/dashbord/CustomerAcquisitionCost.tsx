"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react";

export function CustomerAcquisitionCost() {
  return (
    <Card className="bg-gradient-to-br from-gray-900 to-black text-gray-100 border border-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 sm:p-4">
        <CardTitle className="text-xs sm:text-sm font-medium text-gray-300">
          Стоимость клиента
        </CardTitle>
        <UserPlus className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
      </CardHeader>
      <CardContent className="p-3 sm:p-4 pt-0">
        <div className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          $50
        </div>
        <p className="text-[0.65rem] sm:text-xs text-gray-400 mt-1">
          -10% к прошлому кварталу
        </p>
      </CardContent>
    </Card>
  );
}
