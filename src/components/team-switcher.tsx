"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronsUpDown, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

interface Team {
  name: string;
  logo: React.ElementType;
  plan: string;
}

export function TeamSwitcher({ teams }: { teams: Team[] }) {
  const [activeTeam, setActiveTeam] = useState(teams[0]);

  // Варианты анимации для выпадающего меню
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2, ease: "easeIn" } },
  };

  // Варианты анимации для элементов меню
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.2, ease: "easeOut" },
    }),
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-gray-800 data-[state=open]:text-gray-100 hover:bg-gray-800 hover:text-gray-100 transition-all"
            >
              <div className="flex aspect-square h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-gray-700 text-gray-300 border border-gray-800">
                <activeTeam.logo className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-gray-100">{activeTeam.name}</span>
                <span className="truncate text-xs text-gray-400">{activeTeam.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 bg-gradient-to-br from-gray-900 to-black text-gray-100 border border-gray-800 rounded-xl shadow-lg"
            align="start"
            sideOffset={4}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropdownVariants}
            >
              <DropdownMenuLabel className="text-xs text-gray-400 px-2 py-1.5">
                Команды
              </DropdownMenuLabel>
              {teams.map((team, index) => (
                <motion.div key={team.name} custom={index} variants={itemVariants}>
                  <DropdownMenuItem
                    onClick={() => setActiveTeam(team)}
                    className="gap-2 p-2 hover:bg-gray-800 focus:bg-gray-800 hover:text-gray-100 focus:text-gray-100 transition-colors"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-md border border-gray-800 bg-gray-700">
                      <team.logo className="h-3 w-3 sm:h-4 sm:w-4 text-gray-300" />
                    </div>
                    <span className="text-xs sm:text-sm">{team.name}</span>
                    <DropdownMenuShortcut className="text-[0.65rem] sm:text-xs text-gray-400">
                      ⌘{index + 1}
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </motion.div>
              ))}
              <DropdownMenuSeparator className="bg-gray-800" />
              <motion.div custom={teams.length} variants={itemVariants}>
                <DropdownMenuItem className="gap-2 p-2 hover:bg-gray-800 focus:bg-gray-800 hover:text-gray-100 focus:text-gray-100 transition-colors">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md border border-gray-800 bg-gray-700">
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-gray-300" />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-400">Добавить команду</span>
                </DropdownMenuItem>
              </motion.div>
            </motion.div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

