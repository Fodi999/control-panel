"use client"

import type * as React from "react"
import { Calendar, CalendarDays, CreditCard, LayoutDashboard, MessageSquare, Users } from "lucide-react"

import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { TeamSwitcher } from "./team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"

// Обновлённый список навигационных элементов с корректными URL'ами для всех страниц
const data = {
  user: {
    name: "Администратор",
    email: "admin@example.com",
    avatar: "/logo1.png",
  },
  teams: [
    {
      name: "Robot CRM",
      logo: LayoutDashboard,
      plan: "Предприятие",
    },
    {
      name: "Acme Corp.",
      logo: Users,
      plan: "Startup",
    },
  ],
  navMain: [
    {
      title: "Панель управления",
      // Папка для страницы Dashboard называется dashbord, поэтому URL обновлён:
      url: "/dashbord",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Расписания",
      url: "/schedules",
      icon: Calendar,
    },
    {
      title: "Чат",
      url: "/chat",
      icon: MessageSquare,
    },
    {
      title: "Календарь",
      url: "/calendar",
      icon: CalendarDays,
    },
    {
      title: "Платежи",
      url: "/payments",
      icon: CreditCard,
    },
    // Если нужны другие страницы, можно добавить их сюда, например:
    // {
    //   title: "Клиенты",
    //   url: "/clients",
    //   icon: Users,
    // },
    // {
    //   title: "Настройки",
    //   url: "/settings",
    //   icon: Settings,
    // },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
