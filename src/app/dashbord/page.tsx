// src/app/dashbord/page.tsx
import { AppSidebar } from "@/components/app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
// Импортируем обёртку для переключения темы, которая рендерится только на клиенте
import { ThemeToggleWrapper } from "@/components/ThemeToggleWrapper";

// Импортируем все компоненты карточек
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
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          {/* Используем обёртку, чтобы компонент переключения темы рендерился только на клиенте */}
          <ThemeToggleWrapper />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <h1 className="text-2xl font-bold">CRM Analysis Dashboard</h1>
          {/* Первая строка карточек */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <TotalCustomers />
            <TotalRevenue />
            <UpcomingAppointments />
            <OpenSupportTickets />
          </div>

          {/* Вторая строка: Revenue Overview и Customer Segmentation */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <RevenueOverview />
            <CustomerSegmentation />
          </div>

          {/* Третья строка карточек */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <CustomerRetentionRate />
            <AverageOrderValue />
            <CustomerAcquisitionCost />
            <CustomerLifetimeValue />
          </div>

          {/* Четвёртая строка: Payments, Messages и Mail */}
          <div className="grid gap-4 md:grid-cols-3">
            <ManagePayments />
            <Messages />
            <MailComponent />
          </div>

          {/* Пятая строка: Kitchen Dashboard и Order Logistics */}
          <div className="grid gap-4 md:grid-cols-2">
            <KitchenDashboard />
            <OrderLogistics />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}





