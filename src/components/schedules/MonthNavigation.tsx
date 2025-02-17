"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthNavigationProps {
  currentMonth: Date;
  onPrev: () => void;
  onNext: () => void;
}

export function MonthNavigation({ currentMonth, onPrev, onNext }: MonthNavigationProps) {
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="icon"
        className="rounded-full p-2 hover:bg-gray-100"
        onClick={onPrev}
      >
        <ChevronLeft className="h-5 w-5 text-gray-600" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="w-[300px] justify-start text-left font-medium rounded-md shadow-sm bg-white hover:bg-gray-50"
      >
        {currentMonth.toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full p-2 hover:bg-gray-100"
        onClick={onNext}
      >
        <ChevronRight className="h-5 w-5 text-gray-600" />
      </Button>
    </div>
  );
}
