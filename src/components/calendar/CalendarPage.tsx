"use client";

import * as React from "react";
import { addDays, format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Компоненты для дашборда
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

// Импорт компонентов из нашей папки calendar
import { TableReservation } from "./TableReservation";
import { GuestTracker } from "./GuestTracker";
import { NotificationSystem } from "./NotificationSystem";

/* Тип для бронирования */
export interface Reservation {
  date: Date;
  table: number;
  time: string;
  guests: number;
}

export default function CalendarPage() {
  // Моковые данные бронирований
  const reservations: Reservation[] = [
    { date: new Date(), table: 1, time: "18:00", guests: 2 },
    { date: addDays(new Date(), 1), table: 2, time: "19:30", guests: 4 },
    { date: addDays(new Date(), 2), table: 3, time: "20:00", guests: 6 },
  ];

  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [selectedReservations, setSelectedReservations] = React.useState<Reservation[]>([]);

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      const reservationsForDate = reservations.filter(
        (res) => res.date.toDateString() === selectedDate.toDateString()
      );
      setSelectedReservations(reservationsForDate);
    } else {
      setSelectedReservations([]);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Дашборд</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="space-y-8 p-8 bg-gray-50 dark:bg-gray-900">
          {/* Верхняя часть: календарь и список бронирований */}
          <div className="flex flex-col md:flex-row gap-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleSelect}
              className="rounded-md border shadow"
            />
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>
                  Бронирования на{" "}
                  {date ? format(date, "MMMM d, yyyy") : "не выбрана дата"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedReservations.length > 0 ? (
                  <ul className="space-y-2">
                    {selectedReservations.map((res, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <span>Стол {res.table}</span>
                        <span>{res.time}</span>
                        <Badge>{res.guests} гостей</Badge>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>На эту дату бронирований нет.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Форма бронирования */}
          <Card>
            <CardHeader>
              <CardTitle>Сделать бронирование</CardTitle>
            </CardHeader>
            <CardContent>
              <TableReservation />
            </CardContent>
          </Card>

          {/* Трекер гостей */}
          <Card>
            <CardHeader>
              <CardTitle>Трекер гостей</CardTitle>
            </CardHeader>
            <CardContent>
              <GuestTracker />
            </CardContent>
          </Card>

          {/* Система уведомлений */}
          <Card>
            <CardHeader>
              <CardTitle>Уведомления</CardTitle>
            </CardHeader>
            <CardContent>
              <NotificationSystem />
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
