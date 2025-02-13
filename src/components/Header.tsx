import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  onLogout: () => void;
}

export default function Header({ isSidebarOpen, toggleSidebar, onLogout }: HeaderProps) {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <button
        onClick={toggleSidebar}
        className="p-2 bg-gray-700 rounded-lg md:hidden"
        aria-label="Toggle sidebar"
      >
        {isSidebarOpen ? (
          <Menu className="w-5 h-5 rotate-90 transition-transform" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>
      <h2 className="text-lg font-bold">CRM Dashboard</h2>
      <Button onClick={onLogout} className="p-2 bg-red-600 rounded-lg hover:bg-red-700">
        Выйти
      </Button>
    </header>
  );
}
