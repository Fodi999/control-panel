"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export function UpcomingAppointments() {
  // Варианты анимации для карточки
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // Варианты анимации для текста числа
  const numberVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.2, duration: 0.5, ease: "easeOut" } },
  };

  // Варианты анимации для подписи
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      <Card className="bg-gradient-to-br from-gray-900 to-black text-gray-100 border border-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 sm:p-4">
          <CardTitle className="text-xs sm:text-sm font-medium text-gray-300">
            Предстоящие встречи
          </CardTitle>
          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
        </CardHeader>
        <CardContent className="p-3 sm:p-4 pt-0">
          <motion.div
            variants={numberVariants}
            className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            28
          </motion.div>
          <motion.p
            variants={textVariants}
            className="text-[0.65rem] sm:text-xs text-gray-400 mt-1"
          >
            Следующие 7 дней
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
