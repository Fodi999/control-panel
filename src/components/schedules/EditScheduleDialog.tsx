"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CurrentDateTime } from "./CurrentDateTime";

interface EditScheduleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  selectedDay: string;
  actualDate: Date | null;
  newTime: string;
  onChangeNewTime: (value: string) => void;
}

export function EditScheduleDialog({
  isOpen,
  onClose,
  onSave,
  selectedDay,
  actualDate,
  newTime,
  onChangeNewTime,
}: EditScheduleDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>
            Редактировать рабочее время в {selectedDay}{" "}
            {actualDate &&
              `(${actualDate.toLocaleDateString("default", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })})`}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-muted-foreground">
            Новое время (например, &quot;09:00 - 17:00&quot;)
          </label>
          <input
            type="text"
            value={newTime}
            onChange={(e) => onChangeNewTime(e.target.value)}
            className="w-full rounded-md border p-2"
          />
          <div className="text-sm text-gray-600">
            Текущее время: <CurrentDateTime />
          </div>
        </div>
        <DialogFooter className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={onSave}>Сохранить</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
