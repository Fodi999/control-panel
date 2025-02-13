"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Sidebar from "./Sidebar";
import Header from "./Header";
import DashboardCard from "./DashboardCard";
import UsersPanel from "./UsersPanel";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [timePeriod, setTimePeriod] = useState("today");

  const handleLogin = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (adminPassword === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
        setIsLoggedIn(true);
        setError("");
      } else {
        setError("Неверный пароль!");
      }
    },
    [adminPassword]
  );

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setAdminPassword("");
    setError("");
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-black to-gray-900 text-gray-200">
        <Card className="w-96 p-8 text-center bg-white shadow-xl rounded-2xl border border-gray-200">
          <CardHeader>
            <Image
              src="/logo1.png"
              alt="CRM Logo"
              width={64}
              height={64}
              className="mx-auto"
            />
            <CardTitle className="text-2xl font-semibold mt-2">
              Вход в CRM
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="flex flex-col">
              <label htmlFor="password" className="sr-only">
                Пароль
              </label>
              <input
                id="password"
                type="password"
                placeholder="Пароль"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full p-3 mb-4 rounded-lg bg-gray-200 focus:outline-none text-gray-900"
                autoFocus
              />
              {error && <p className="mb-4 text-red-500">{error}</p>}
              <Button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900"
              >
                Войти
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col">
        <Header
          isSidebarOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onLogout={handleLogout}
        />
        <main className="p-6 flex-1 overflow-auto">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="flex space-x-4 mb-4">
              <TabsTrigger value="overview">Обзор</TabsTrigger>
              <TabsTrigger value="invoices">Счета</TabsTrigger>
              <TabsTrigger value="payments">Платежи</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              {/* Radio Group для выбора временного периода */}
              <div className="mb-6">
                <RadioGroup
                  value={timePeriod}
                  onValueChange={setTimePeriod}
                  className="flex items-center space-x-4"
                >
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="today" id="today" />
                    <label htmlFor="today" className="cursor-pointer text-sm">
                      Сегодня
                    </label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="week" id="week" />
                    <label htmlFor="week" className="cursor-pointer text-sm">
                      Неделя
                    </label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem value="month" id="month" />
                    <label htmlFor="month" className="cursor-pointer text-sm">
                      Месяц
                    </label>
                  </div>
                </RadioGroup>
              </div>

              {/* Блок с основными KPI */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <DashboardCard
                  title="Просроченные платежи"
                  value="$31,211.00"
                  bgColor="bg-red-500"
                  trend="-5%"
                  subtext="С прошлого месяца"
                />
                <DashboardCard
                  title="Оплатят в этом месяце"
                  value="$172,560.00"
                  bgColor="bg-yellow-500"
                  trend="+10%"
                  subtext="Прирост заказов"
                />
                <DashboardCard
                  title="Среднее время оплаты"
                  value="12 дней"
                  bgColor="bg-green-500"
                  subtext="Улучшение на 2 дня"
                />
                <DashboardCard
                  title="Новые клиенты"
                  value="150"
                  bgColor="bg-blue-500"
                  trend="+15%"
                  subtext="За последний период"
                />
                <DashboardCard
                  title="Активные проекты"
                  value="12"
                  bgColor="bg-purple-500"
                  trend="Stable"
                  subtext="Без изменений"
                />
                <DashboardCard
                  title="Общие доходы"
                  value="$450,000.00"
                  bgColor="bg-teal-500"
                  trend="+8%"
                  subtext="За отчетный период"
                />
              </div>

              {/* Дополнительные компоненты CRM */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <RecentActivity />
                <SalesSummary />
              </div>

              {/* Панель пользователей */}
              <div className="mt-6">
                <UsersPanel />
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}

// Компонент "Последние активности"
function RecentActivity() {
  return (
    <Card className="rounded-2xl shadow-lg border border-gray-200 bg-white text-gray-900">
      <CardHeader className="p-4">
        <CardTitle className="text-xl font-bold">Последние активности</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ul className="space-y-2 text-sm">
          <li className="border-b pb-2">
            <span className="font-semibold">Иван Иванов</span> добавил нового клиента{" "}
            <span className="text-blue-500">ООО Ромашка</span> —{" "}
            <span className="text-gray-500">10:30</span>
          </li>
          <li className="border-b pb-2">
            <span className="font-semibold">Петр Петров</span> обновил статус сделки —{" "}
            <span className="text-gray-500">09:15</span>
          </li>
          <li>
            <span className="font-semibold">Сергей Сергеев</span> завершил звонок с клиентом —{" "}
            <span className="text-gray-500">08:45</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}

// Компонент "Сводка продаж"
function SalesSummary() {
  return (
    <Card className="rounded-2xl shadow-lg border border-gray-200 bg-white text-gray-900">
      <CardHeader className="p-4">
        <CardTitle className="text-xl font-bold">Продажи</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Всего сделок</p>
            <p className="text-2xl font-bold">45</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Завершено</p>
            <p className="text-2xl font-bold">32</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">В работе</p>
            <p className="text-2xl font-bold">8</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Потеряно</p>
            <p className="text-2xl font-bold">5</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


