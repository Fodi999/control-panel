"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"

// Импорт диалоговых компонентов.
// Если модуль не найден, создайте заглушку в файле: src/components/ui/dialog.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

interface Employee {
  id: number
  name: string
  schedule: {
    [day: string]: string
  }
}

const initialEmployees: Employee[] = [
  {
    id: 1,
    name: "Alice",
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
]

// Массив дней недели (7 дней)
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

// Функция, возвращающая даты текущей недели (с понедельника по воскресенье)
function getWeekDates(referenceDate: Date): Date[] {
  const dateCopy = new Date(referenceDate)
  const dayOfWeek = dateCopy.getDay() // Sunday = 0, Monday = 1, ..., Saturday = 6
  const adjustedDay = dayOfWeek === 0 ? 7 : dayOfWeek // считаем воскресенье за 7
  const diff = 1 - adjustedDay
  dateCopy.setDate(dateCopy.getDate() + diff)
  return [0, 1, 2, 3, 4, 5, 6].map((offset) => {
    const d = new Date(dateCopy)
    d.setDate(d.getDate() + offset)
    return d
  })
}

export default function CalendarPage() {
  const [date, setDate] = useState<Date>(new Date())
  const [selectedEmployee, setSelectedEmployee] = useState<string>("all")
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)

  // Состояния для модального окна редактирования рабочего времени
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingDay, setEditingDay] = useState<string>("")
  const [newTime, setNewTime] = useState<string>("")

  // Получаем расписание выбранной компании (сотрудника)
  const selectedSchedule =
    selectedEmployee === "all"
      ? null
      : employees.find(
          (emp) =>
            emp.name.toLowerCase() === selectedEmployee.toLowerCase()
        )?.schedule

  // Открытие модального окна для редактирования рабочего времени выбранного дня
  const handleOpenModal = (day: string) => {
    if (!selectedSchedule) return
    setEditingDay(day)
    setNewTime(selectedSchedule[day] || "Off")
    setIsModalOpen(true)
  }

  // Сохранение изменений рабочего времени для выбранной компании
  const handleSave = () => {
    if (selectedEmployee === "all") return
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.name.toLowerCase() === selectedEmployee.toLowerCase()
          ? { ...emp, schedule: { ...emp.schedule, [editingDay]: newTime } }
          : emp
      )
    )
    setIsModalOpen(false)
  }

  // Вычисляем даты для текущей недели (7 дней)
  const weekDates = getWeekDates(date)

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
                <BreadcrumbPage>Calendar</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-8 bg-gray-50">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
              Company Working Hours
            </h1>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full p-2 hover:bg-gray-100"
                onClick={() =>
                  setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
                }
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-[300px] justify-start text-left font-medium rounded-md shadow-sm bg-white hover:bg-gray-50"
              >
                <CalendarIcon className="mr-2 h-5 w-5 text-gray-600" />
                {date.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full p-2 hover:bg-gray-100"
                onClick={() =>
                  setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
                }
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Working Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Select
                  value={selectedEmployee}
                  onValueChange={setSelectedEmployee}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Companies</SelectItem>
                    {employees.map((emp) => (
                      <SelectItem key={emp.id} value={emp.name.toLowerCase()}>
                        {emp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedSchedule ? (
                <div className="space-y-4">
                  {days.map((day, index) => (
                    <div
                      key={day}
                      className="flex items-center justify-between border-b py-2"
                    >
                      <span className="font-medium">
                        {day} (
                        {weekDates[index]?.toLocaleDateString("default", {
                          day: "2-digit",
                          month: "2-digit",
                        })}
                        )
                      </span>
                      <span
                        className={
                          selectedSchedule[day] === "Off"
                            ? "text-red-500"
                            : "text-green-500"
                        }
                      >
                        {selectedSchedule[day] || "Off"}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenModal(day)}
                      >
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-600">
                  Please select a specific company to view and edit its working hours.
                </p>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>

        {/* Modal for editing working hours */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>
                Edit Working Hours for{" "}
                {selectedEmployee !== "all" &&
                  employees.find(
                    (e) => e.name.toLowerCase() === selectedEmployee
                  )?.name}{" "}
                on {editingDay}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-muted-foreground">
                New Time (e.g., &quot;09:00 - 17:00&quot;)
              </label>
              <input
                type="text"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="w-full rounded-md border p-2"
              />
            </div>
            <DialogFooter className="mt-4 flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarInset>
    </SidebarProvider>
  )
}









