"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function PaymentsPage() {
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
                  Платежи
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex-1 p-3 sm:p-4 bg-gradient-to-br from-gray-900 to-black text-gray-100 space-y-4">
          <h1 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Платежи
          </h1>
          <p className="text-sm text-gray-400">
            Здесь будет реализована функциональность платежей.
          </p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

