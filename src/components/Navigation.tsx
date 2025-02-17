// C:\Users\Admin\Desktop\control-panel\src\components\Navigation.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/schedules", label: "Schedules" },
  { href: "/chat", label: "Chat" },
  { href: "/calendar", label: "Calendar" },
  { href: "/payments", label: "Payments" },
  { href: "/recipes", label: "Recipes" },
  { href: "/products", label: "Products" },
];

export function Navigation() {
  const router = useRouter();

  return (
    <nav className="flex gap-2">
      {navItems.map((item) => {
        // Если текущий путь совпадает с href, назначаем активный стиль
        const isActive = router.pathname === item.href;
        return (
          <Link key={item.href} href={item.href}>
            <Button
              variant={isActive ? "default" : "outline"}
              className={isActive ? "bg-blue-500 text-white" : "text-gray-700"}
            >
              {item.label}
            </Button>
          </Link>
        );
      })}
    </nav>
  );
}

