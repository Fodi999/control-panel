"use client";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List, Activity, Clock, TrendingUp } from "lucide-react";

export function KitchenDashboard() {
  return (
    <Card className="w-full max-w-3xl mx-auto bg-gradient-to-br from-gray-900 to-black text-gray-100 border border-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all">
      <CardHeader className="p-3 sm:p-4">
        <CardTitle className="flex items-center gap-2 text-base sm:text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          <List className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          Панель кухни
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 space-y-4 sm:space-y-6">
        {/* Основные метрики */}
        <div className="space-y-2 sm:space-y-4">
          <div className="flex items-center gap-2">
            <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
            <span className="text-xs sm:text-sm font-medium text-gray-300">
              Текущая очередь:
            </span>
            <Badge className="text-[0.65rem] sm:text-base font-bold bg-gray-800 text-gray-100 border-gray-700">
              12 заказов
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
            <span className="text-xs sm:text-sm font-medium text-gray-300">
              Среднее время:
            </span>
            <Badge className="text-[0.65rem] sm:text-base font-bold bg-gray-800 text-gray-100 border-gray-700">
              15 минут
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-red-400" />
            <span className="text-xs sm:text-sm font-medium text-gray-300">
              Следующий заказ:
            </span>
            <Badge className="text-[0.65rem] sm:text-base font-bold bg-gray-800 text-gray-100 border-gray-700">
              №1023 — 5 мин
            </Badge>
          </div>
        </div>

        <Separator className="bg-gray-800" />

        {/* Вкладки */}
        <Tabs defaultValue="recipes" className="space-y-4">
          <TabsList className="flex gap-2 bg-transparent border-b border-gray-800 p-0">
            <TabsTrigger
              value="recipes"
              className="px-2 sm:px-4 py-1 rounded-t-lg text-xs sm:text-sm font-medium text-gray-300 transition-all hover:bg-gray-800 hover:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-700 data-[state=active]:to-gray-600 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              Рецепты
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className="px-2 sm:px-4 py-1 rounded-t-lg text-xs sm:text-sm font-medium text-gray-300 transition-all hover:bg-gray-800 hover:text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-700 data-[state=active]:to-gray-600 data-[state=active]:text-white data-[state=active]:shadow-md"
            >
              Продукты
            </TabsTrigger>
            <Link href="/recipes" className="ml-auto">
              <Button variant="link" className="p-0 text-[0.65rem] sm:text-sm text-gray-400 hover:text-gray-200">
                Подробнее
              </Button>
            </Link>
          </TabsList>

          <TabsContent value="recipes" className="space-y-2">
            <ul className="list-disc pl-4 text-[0.65rem] sm:text-sm text-gray-400">
              <li>
                <span className="font-medium text-gray-300">Паста Карбонара:</span> яйца,
                бекон, сливки, пармезан, спагетти
              </li>
              <li>
                <span className="font-medium text-gray-300">Салат Цезарь:</span> курица,
                романо, сухарики, пармезан, соус
              </li>
              <li>
                <span className="font-medium text-gray-300">Бургер:</span> говядина,
                булочка, сыр, овощи, соусы
              </li>
            </ul>
          </TabsContent>

          <TabsContent value="products" className="space-y-2">
            <ul className="list-disc pl-4 text-[0.65rem] sm:text-sm text-gray-400">
              <li>Яйца (10 шт.) — 50 руб.</li>
              <li>Бекон (200 г) — 150 руб.</li>
              <li>Сливки (200 мл) — 80 руб.</li>
              <li>Пармезан (100 г) — 200 руб.</li>
              <li>Спагетти (500 г) — 100 руб.</li>
              <li>Курица (1 кг) — 250 руб.</li>
            </ul>
          </TabsContent>
        </Tabs>

        <Separator className="bg-gray-800" />

        {/* Анализ загрузки кухни */}
        <div className="space-y-2">
          <h3 className="text-xs sm:text-md font-semibold text-gray-300">Анализ загрузки</h3>
          <p className="text-[0.65rem] sm:text-xs text-gray-400">
            Анализ загрузки кухни с графиками пиковых нагрузок, статистикой и рекомендациями
            по оптимизации.
          </p>
          <ul className="list-disc pl-4 text-[0.65rem] sm:text-xs text-gray-400">
            <li>
              <span className="font-medium text-gray-300">График:</span> Пиковые нагрузки
              за день
            </li>
            <li>
              <span className="font-medium text-gray-300">Статистика:</span> Время
              приготовления, заказы в час
            </li>
            <li>
              <span className="font-medium text-gray-300">Рекомендации:</span>{" "}
              Оптимизация процессов и меню
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

