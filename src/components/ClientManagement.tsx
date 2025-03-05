"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Client {
  id: number;
  name: string;
}

interface ClientManagementProps {
  clients: Client[];
  setClients: (clients: Client[]) => void;
}

export function ClientManagement({ clients, setClients }: ClientManagementProps) {
  const handleClearClients = () => {
    setClients([]);
  };

  // Варианты анимации для контейнера
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // Варианты анимации для текста
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5, ease: "easeOut" } },
  };

  // Варианты анимации для кнопки
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.4, duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-gradient-to-br from-gray-900 to-black text-gray-100 border border-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all p-3 sm:p-4 space-y-4 sm:space-y-6"
    >
      <motion.h2
        variants={textVariants}
        className="text-base sm:text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
      >
        Управление клиентами
      </motion.h2>
      <motion.p
        variants={textVariants}
        className="text-xs sm:text-sm text-gray-400"
      >
        Количество клиентов: <span className="font-bold text-gray-100">{clients.length}</span>
      </motion.p>
      <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
        <Button
          onClick={handleClearClients}
          className="w-full bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-medium rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm transition-all shadow-md hover:shadow-lg"
        >
          Очистить
        </Button>
      </motion.div>
    </motion.div>
  );
}