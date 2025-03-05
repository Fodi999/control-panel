"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggleWrapper } from "@/components/ThemeToggleWrapper";

// Импорты карточек
import { TotalCustomers } from "@/components/dashbord/TotalCustomers";
import { TotalRevenue } from "@/components/dashbord/TotalRevenue";
import { UpcomingAppointments } from "@/components/dashbord/UpcomingAppointments";
import { OpenSupportTickets } from "@/components/dashbord/OpenSupportTickets";
import { RevenueOverview } from "@/components/dashbord/RevenueOverview";
import { CustomerSegmentation } from "@/components/dashbord/CustomerSegmentation";
import { CustomerRetentionRate } from "@/components/dashbord/CustomerRetentionRate";
import { AverageOrderValue } from "@/components/dashbord/AverageOrderValue";
import { CustomerAcquisitionCost } from "@/components/dashbord/CustomerAcquisitionCost";
import { CustomerLifetimeValue } from "@/components/dashbord/CustomerLifetimeValue";
import { ManagePayments } from "@/components/dashbord/ManagePayments";
import { Messages } from "@/components/dashbord/Messages";
import { MailComponent } from "@/components/dashbord/Mail";
import { KitchenDashboard } from "@/components/dashbord/KitchenDashboard";
import { OrderLogistics } from "@/components/dashbord/OrderLogistics";

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 sm:h-16 shrink-0 items-center gap-2 border-b border-gray-800 bg-gradient-to-br from-gray-900 to-black px-3 sm:px-4">
          <SidebarTrigger className="-ml-1 text-gray-300 hover:text-white transition-colors" />
          <Separator orientation="vertical" className="mr-2 h-3 sm:h-4 bg-gray-700" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-gray-300 text-sm sm:text-base">
                  Dashboard
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto">
            <ThemeToggleWrapper />
          </div>
        </header>
        <div className="flex-1 p-3 sm:p-4 space-y-4 sm:space-y-6 bg-gradient-to-br from-gray-900 to-black text-gray-100">
          <h1 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            CRM Dashboard
          </h1>
          {/* Первая строка карточек */}
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <TotalCustomers />
            <TotalRevenue />
            <UpcomingAppointments />
            <OpenSupportTickets />
          </div>

          {/* Вторая строка */}
          <div className="grid gap-3 sm:gap-4 grid-cols-1 lg:grid-cols-7">
            <div className="lg:col-span-4">
              <RevenueOverview />
            </div>
            <div className="lg:col-span-3">
              <CustomerSegmentation />
            </div>
          </div>

          {/* Третья строка */}
          <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <CustomerRetentionRate />
            <AverageOrderValue />
            <CustomerAcquisitionCost />
            <CustomerLifetimeValue />
          </div>

          {/* Четвёртая строка */}
          <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-3">
            <ManagePayments />
            <Messages />
            <MailComponent />
          </div>

          {/* Пятая строка */}
          <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2">
            <KitchenDashboard />
            <OrderLogistics />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}





