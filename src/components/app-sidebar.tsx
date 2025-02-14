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
    name: "Admin User",
    email: "admin@example.com",
    avatar: "/logo1.png",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: LayoutDashboard,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: Users,
      plan: "Startup",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      // Папка для страницы Dashboard называется dashbord, поэтому URL обновлён:
      url: "/dashbord",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Schedules",
      url: "/schedules",
      icon: Calendar,
    },
    {
      title: "Chat",
      url: "/chat",
      icon: MessageSquare,
    },
    {
      title: "Calendar",
      url: "/calendar",
      icon: CalendarDays,
    },
    {
      title: "Payments",
      url: "/payments",
      icon: CreditCard,
    },
    // Если нужны другие страницы, можно добавить их сюда, например:
    // {
    //   title: "Clients",
    //   url: "/clients",
    //   icon: Users,
    // },
    // {
    //   title: "Settings",
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
