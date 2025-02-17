"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Removed unused Button import
import { days } from "@/utils/days";

export interface Employee {
  id: number;
  name: string;
  hourlyRate: number;
  schedule: {
    [day: string]: string;
  };
}

export interface EmployeeScheduleTableProps {
  employees: Employee[];
  selectedDay: string;
  actualDate: Date | null;
  onSelectDay: (day: string) => void;
  onOpenModal: (empId: number) => void;
}

function parseScheduleToHours(scheduleStr: string): number {
  if (!scheduleStr || scheduleStr.trim() === "" || scheduleStr === "Off") {
    return 0;
  }
  const [start, end] = scheduleStr.split("-").map((s) => s.trim());
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);
  const diffMinutes =
    endHour * 60 + endMinute - (startHour * 60 + startMinute);
  return diffMinutes > 0 ? diffMinutes / 60 : 0;
}

function calculateWeeklyHours(schedule: { [day: string]: string }): number {
  return days.reduce((total, day) => {
    const hours = parseScheduleToHours(schedule[day] || "Off");
    return total + hours;
  }, 0);
}

export function EmployeeScheduleTable({
  employees,
  selectedDay,
  actualDate,
  onSelectDay,
  onOpenModal,
}: EmployeeScheduleTableProps) {
  const getScheduleStatusClass = (schedule: string) => {
    return schedule === "Off" ? "text-red-500" : "text-green-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Рабочее время в {selectedDay}{" "}
          {actualDate &&
            `- ${actualDate.toLocaleDateString("default", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-4">
          <Select value={selectedDay} onValueChange={onSelectDay}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Выберите день" />
            </SelectTrigger>
            <SelectContent>
              {days.map((day) => (
                <SelectItem key={day} value={day}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {actualDate && (
            <span className="text-sm text-gray-600">
              {actualDate.toLocaleString("default", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </div>

        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[140px]">Сотрудник</TableHead>
                <TableHead className="text-center">
                  Рабочее время (выбранный день)
                </TableHead>
                <TableHead className="text-center">
                  Часы за неделю
                </TableHead>
                <TableHead className="text-center">
                  Ставка ($/час)
                </TableHead>
                <TableHead className="text-center">
                  Зарплата за неделю ($)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((emp) => {
                const dailySchedule = emp.schedule[selectedDay] || "Off";
                const dailyHours = parseScheduleToHours(dailySchedule);
                const weeklyHours = calculateWeeklyHours(emp.schedule);
                const weeklySalary = weeklyHours * emp.hourlyRate;
                return (
                  <TableRow key={emp.id}>
                    <TableCell className="font-medium">
                      {emp.name}
                    </TableCell>
                    <TableCell
                      className="text-center cursor-pointer hover:bg-gray-50"
                      onClick={() => onOpenModal(emp.id)}
                    >
                      <span className={getScheduleStatusClass(dailySchedule)}>
                        {dailySchedule}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {dailyHours.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center">
                      {emp.hourlyRate.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center">
                      {weeklySalary.toFixed(2)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
