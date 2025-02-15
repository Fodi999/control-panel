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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ChevronLeft, ChevronRight } from "lucide-react"

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

export default function SchedulesPage() {
  // Для выбора месяца (на будущее, если понадобится)
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  // Выбранный день недели
  const [selectedDay, setSelectedDay] = useState<string>("Monday")
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)

  // Состояния для модального окна редактирования рабочего времени
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEmpId, setEditingEmpId] = useState<number | null>(null)
  const [newTime, setNewTime] = useState<string>("")

  // Открытие модального окна для редактирования рабочего времени выбранного сотрудника
  const handleOpenModal = (empId: number) => {
    const emp = employees.find((e) => e.id === empId)
    if (!emp) return
    setEditingEmpId(empId)
    setNewTime(emp.schedule[selectedDay] || "Off")
    setIsModalOpen(true)
  }

  // Сохранение изменений рабочего времени для выбранного сотрудника и выбранного дня
  const handleSave = () => {
    if (editingEmpId === null) return
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === editingEmpId
          ? { ...emp, schedule: { ...emp.schedule, [selectedDay]: newTime } }
          : emp
      )
    )
    setIsModalOpen(false)
  }

  // Вычисляем даты для текущей недели (7 дней)
  const weekDates = getWeekDates(currentMonth)
  const selectedDayIndex = days.indexOf(selectedDay)
  const actualDate =
    selectedDayIndex !== -1 ? weekDates[selectedDayIndex] : null

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          {/* Здесь можно оставить SidebarTrigger и Breadcrumb */}
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Schedules</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-8 bg-gray-50">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
              Who Works Today?
            </h1>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full p-2 hover:bg-gray-100"
                onClick={() =>
                  setCurrentMonth(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() - 1,
                      1
                    )
                  )
                }
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-[300px] justify-start text-left font-medium rounded-md shadow-sm bg-white hover:bg-gray-50"
              >
                {currentMonth.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full p-2 hover:bg-gray-100"
                onClick={() =>
                  setCurrentMonth(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth() + 1,
                      1
                    )
                  )
                }
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Working Hours on Selected Day</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center gap-4">
                <Select value={selectedDay} onValueChange={setSelectedDay}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select day" />
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
                    {actualDate.toLocaleDateString("default", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                )}
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[140px]">Employee</TableHead>
                      <TableHead className="text-center">Working Hours</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees.map((emp) => (
                      <TableRow key={emp.id}>
                        <TableCell className="font-medium">{emp.name}</TableCell>
                        <TableCell
                          className="text-center cursor-pointer hover:bg-gray-50"
                          onClick={() => handleOpenModal(emp.id)}
                        >
                          <span
                            className={
                              emp.schedule[selectedDay] === "Off"
                                ? "text-red-500"
                                : "text-green-500"
                            }
                          >
                            {emp.schedule[selectedDay] || "Off"}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modal for editing working hours */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>
                Edit Working Hours on {selectedDay}
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



