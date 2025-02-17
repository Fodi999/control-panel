"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TableReservation() {
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");
  const [guests, setGuests] = React.useState("");
  const [table, setTable] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь можно отправить данные на сервер
    console.log("Бронирование отправлено:", { date, time, guests, table });
    setDate("");
    setTime("");
    setGuests("");
    setTable("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="date">Дата</Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="time">Время</Label>
        <Input
          id="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="guests">Количество гостей</Label>
        <Input
          id="guests"
          type="number"
          min="1"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="table">Стол</Label>
        <Select value={table} onValueChange={setTable}>
          <SelectTrigger>
            <SelectValue placeholder="Выберите стол" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Стол 1</SelectItem>
            <SelectItem value="2">Стол 2</SelectItem>
            <SelectItem value="3">Стол 3</SelectItem>
            <SelectItem value="4">Стол 4</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">Забронировать стол</Button>
    </form>
  );
}
