"use client";

import { useState, useMemo } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { PageHeader } from "@/components/schedules/PageHeader";
import { MonthNavigation } from "@/components/schedules/MonthNavigation";
import { EmployeeScheduleTable, Employee } from "@/components/schedules/EmployeeScheduleTable";
import { EditScheduleDialog } from "@/components/schedules/EditScheduleDialog";
import { days } from "@/utils/days";

// Вспомогательные функции для работы с датами и расписанием
function getWeekDates(referenceDate: Date): Date[] {
  const dateCopy = new Date(referenceDate);
  const dayOfWeek = dateCopy.getDay();
  const adjustedDay = dayOfWeek === 0 ? 7 : dayOfWeek;
  const diff = 1 - adjustedDay;
  dateCopy.setDate(dateCopy.getDate() + diff);
  return [0, 1, 2, 3, 4, 5, 6].map((offset) => {
    const d = new Date(dateCopy);
    d.setDate(d.getDate() + offset);
    return d;
  });
}

const initialEmployees: Employee[] = [
  {
    id: 1,
    name: "Alice",
    hourlyRate: 20,
    schedule: {
      Monday: "09:00 - 17:00",
      Tuesday: "09:00 - 17:00",
      Wednesday: "Off",
      Thursday: "09:00 - 17:00",
      Friday: "09:00 - 17:00",
      Saturday: "Off",
      Sunday: "Off",
    },
  },
  {
    id: 2,
    name: "Bob",
    hourlyRate: 18,
    schedule: {
      Monday: "Off",
      Tuesday: "10:00 - 18:00",
      Wednesday: "10:00 - 18:00",
      Thursday: "10:00 - 18:00",
      Friday: "10:00 - 18:00",
      Saturday: "10:00 - 14:00",
      Sunday: "Off",
    },
  },
  {
    id: 3,
    name: "Charlie",
    hourlyRate: 22,
    schedule: {
      Monday: "08:00 - 16:00",
      Tuesday: "08:00 - 16:00",
      Wednesday: "08:00 - 16:00",
      Thursday: "08:00 - 16:00",
      Friday: "Off",
      Saturday: "Off",
      Sunday: "Off",
    },
  },
];

export default function SchedulesPage() {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  // Состояния для модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmpId, setEditingEmpId] = useState<number | null>(null);
  const [newTime, setNewTime] = useState<string>("");

  const weekDates = useMemo(() => getWeekDates(currentMonth), [currentMonth]);
  const selectedDayIndex = days.indexOf(selectedDay);
  const actualDate = selectedDayIndex !== -1 ? weekDates[selectedDayIndex] : null;

  const handleOpenModal = (empId: number) => {
    const employee = employees.find((e) => e.id === empId);
    if (!employee) return;
    setEditingEmpId(empId);
    setNewTime(employee.schedule[selectedDay] || "Off");
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingEmpId === null) return;
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === editingEmpId
          ? { ...emp, schedule: { ...emp.schedule, [selectedDay]: newTime } }
          : emp
      )
    );
    setIsModalOpen(false);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <PageHeader />

        {/* Основной контент */}
        <div className="flex flex-1 flex-col gap-6 p-8 bg-gray-50 dark:bg-gray-800">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight">
              Кто работает сегодня?
            </h1>
            <MonthNavigation
              currentMonth={currentMonth}
              onPrev={() =>
                setCurrentMonth(
                  new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
                )
              }
              onNext={() =>
                setCurrentMonth(
                  new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
                )
              }
            />
          </div>

          <EmployeeScheduleTable
            employees={employees}
            selectedDay={selectedDay}
            actualDate={actualDate}
            onSelectDay={setSelectedDay}
            onOpenModal={handleOpenModal}
          />
        </div>

        <EditScheduleDialog
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          selectedDay={selectedDay}
          actualDate={actualDate}
          newTime={newTime}
          onChangeNewTime={setNewTime}
        />
      </SidebarInset>
    </SidebarProvider>
  );
}


