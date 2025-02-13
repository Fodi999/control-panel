import Image from "next/image";
import { 
  BarChart, 
  Users, 
  Settings, 
  User, 
  Briefcase, 
  FileText 
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 w-64 bg-white shadow-lg`}
    >
      <div className="flex flex-col h-full">
        {/* Верхняя часть: логотип и навигация */}
        <div className="p-5">
          <div className="flex items-center justify-center mb-5">
            <Image src="/logo1.png" alt="CRM Logo" width={48} height={48} />
          </div>
          <h1 className="text-xl font-bold text-center mb-4">CRM Dashboard</h1>
          <Separator className="mb-4" />
          <nav className="flex-1 space-y-4">
            <SidebarItem icon={BarChart} text="Аналитика" />
            <SidebarItem icon={Users} text="Пользователи" />
            <SidebarItem icon={Settings} text="Настройки" />
            <SidebarItem icon={User} text="Клиенты" />
            <SidebarItem icon={Briefcase} text="Сделки" />
            <SidebarItem icon={FileText} text="Отчеты" />
          </nav>
        </div>
        {/* Нижняя часть: информация о пользователе */}
        <div className="p-5">
          <Separator className="mb-4" />
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image src="/login1.png" alt="User Avatar" width={40} height={40} />
            </div>
            <div>
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

