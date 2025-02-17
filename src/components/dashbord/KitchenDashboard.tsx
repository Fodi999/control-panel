"use client";

import Link from "next/link";
// Удалены неиспользуемые импорты: Table, TableBody, TableCell, TableHead, TableHeader, TableRow
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { List, Activity, Clock, TrendingUp } from "lucide-react";

export function KitchenDashboard() {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <List className="h-5 w-5 text-orange-600" />
          Панель кухни
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Основные метрики */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-600" />
              <span className="font-medium">Текущая очередь:</span>
              <Badge variant="secondary" className="text-lg font-bold">
                12 заказов
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="font-medium">Среднее время подготовки:</span>
              <Badge variant="secondary" className="text-lg font-bold">
                15 минут
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-red-500" />
              <span className="font-medium">Следующий заказ:</span>
              <Badge variant="secondary" className="text-lg font-bold">
                Заказ №1023 — осталось 5 минут
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Перечень блюд и рецептов */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-bold">Рецепты блюд</h3>
              <Link href="/recipes">
                <Button variant="link" className="p-0 text-sm">
                  Подробнее
                </Button>
              </Link>
            </div>
            <ul className="list-disc pl-4 text-sm">
              <li>
                <strong>Паста Карбонара:</strong> яйца, бекон, сливки, пармезан,
                спагетти.
              </li>
              <li>
                <strong>Салат Цезарь:</strong> курица, романо, сухарики, пармезан,
                соус Цезарь.
              </li>
              <li>
                <strong>Бургер:</strong> говяжья котлета, булочка, сыр, овощи, соусы.
              </li>
            </ul>
          </div>

          <Separator />

          {/* Перечень продуктов и их стоимость */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-bold">Продукты и стоимость</h3>
              <Link href="/products">
                <Button variant="link" className="p-0 text-sm">
                  Подробнее
                </Button>
              </Link>
            </div>
            <ul className="list-disc pl-4 text-sm">
              <li>Яйца (10 шт.) — 50 руб.</li>
              <li>Бекон (200 г) — 150 руб.</li>
              <li>Сливки (200 мл) — 80 руб.</li>
              <li>Пармезан (100 г) — 200 руб.</li>
              <li>Спагетти (500 г) — 100 руб.</li>
              <li>Курица (1 кг) — 250 руб.</li>
            </ul>
          </div>

          <Separator />

          {/* Подробный анализ загрузки кухни */}
          <div className="text-xs text-muted-foreground space-y-2">
            <h3 className="text-md font-bold">Анализ загрузки кухни</h3>
            <p>
              Здесь представлен подробный анализ загрузки кухни, включая графики
              пиковых нагрузок, статистику по времени приготовления и рекомендации
              по оптимизации рабочего процесса.
            </p>
            <ul className="list-disc pl-4">
              <li>
                <strong>График загрузки:</strong> Визуализация пиковых нагрузок в
                течение дня.
              </li>
              <li>
                <strong>Статистика:</strong> Среднее время приготовления, количество
                заказов в час.
              </li>
              <li>
                <strong>Рекомендации:</strong> Оптимизация процессов, перераспределение
                задач между поварами, обновление меню для ускорения приготовления.
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

