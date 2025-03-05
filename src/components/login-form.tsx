"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HTMLMotionProps } from "framer-motion";

interface LoginFormProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  className?: string;
}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      localStorage.setItem("adminLoggedIn", "true");
      router.push("/dashbord");
    } else {
      setError("Неверные данные");
    }
  };

  // Варианты анимации для контейнера
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  // Варианты анимации для элементов формы
  const formItemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  // Варианты анимации для кнопок
  const buttonVariants: Variants = {
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
      className={cn("flex flex-col gap-4 sm:gap-6", className)}
      {...props}
    >
      <Card className="bg-gradient-to-br from-gray-900 to-black text-gray-100 border border-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all">
        <CardHeader className="p-3 sm:p-4">
          <CardTitle className="text-base sm:text-2xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Вход
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-gray-400">
            Введите email для входа в аккаунт
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-4">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <motion.div custom={0} variants={formItemVariants} className="grid gap-2">
              <Label htmlFor="email" className="text-xs sm:text-sm text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 text-gray-100 border-gray-700 rounded-xl px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </motion.div>
            <motion.div custom={1} variants={formItemVariants} className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs sm:text-sm text-gray-300">
                  Пароль
                </Label>
                <a
                  href="#"
                  className="text-[0.65rem] sm:text-xs text-gray-400 hover:text-gray-200 transition-colors"
                >
                  Забыли пароль?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 text-gray-100 border-gray-700 rounded-xl px-3 py-2 text-xs sm:text-sm focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </motion.div>
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-red-400 text-xs sm:text-sm"
              >
                {error}
              </motion.p>
            )}
            <motion.div custom={2} variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-medium rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm transition-all shadow-md hover:shadow-lg"
              >
                Войти
              </Button>
            </motion.div>
            <motion.div custom={3} variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Button
                variant="outline"
                className="w-full border-gray-700 bg-gray-800/50 text-gray-200 hover:bg-gray-700/50 hover:text-white rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm transition-all"
              >
                Войти через Google
              </Button>
            </motion.div>
            <motion.div
              variants={formItemVariants}
              custom={4}
              className="mt-2 sm:mt-4 text-center text-[0.65rem] sm:text-sm text-gray-400"
            >
              Нет аккаунта?{" "}
              <a href="#" className="text-gray-300 hover:text-gray-200 transition-colors">
                Зарегистрируйтесь
              </a>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}


