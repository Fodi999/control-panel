import React from "react";

interface SidebarItemProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
}

export default function SidebarItem({ icon: Icon, text }: SidebarItemProps) {
  return (
    <a
      href="#"
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <Icon className="w-5 h-5" />
      <span>{text}</span>
    </a>
  );
}
