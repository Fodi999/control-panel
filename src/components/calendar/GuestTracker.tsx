"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type Guest = {
  id: number;
  name: string;
  table: number;
  arrivalTime: string;
  departureTime: string | null;
};

export function GuestTracker() {
  const [guests, setGuests] = React.useState<Guest[]>([]);
  const [newGuest, setNewGuest] = React.useState({ name: "", table: "" });

  const addGuest = () => {
    if (newGuest.name && newGuest.table) {
      setGuests([
        ...guests,
        {
          id: Date.now(),
          name: newGuest.name,
          table: Number(newGuest.table),
          arrivalTime: new Date().toLocaleTimeString(),
          departureTime: null,
        },
      ]);
      setNewGuest({ name: "", table: "" });
    }
  };

  const markDeparture = (id: number) => {
    setGuests(
      guests.map((guest) =>
        guest.id === id
          ? { ...guest, departureTime: new Date().toLocaleTimeString() }
          : guest
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <Label htmlFor="guestName">Имя гостя</Label>
          <Input
            id="guestName"
            value={newGuest.name}
            onChange={(e) =>
              setNewGuest({ ...newGuest, name: e.target.value })
            }
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="tableNumber">Номер стола</Label>
          <Input
            id="tableNumber"
            type="number"
            min="1"
            value={newGuest.table}
            onChange={(e) =>
              setNewGuest({ ...newGuest, table: e.target.value })
            }
          />
        </div>
        <Button onClick={addGuest} className="mt-auto">
          Добавить гостя
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Имя</TableHead>
            <TableHead>Стол</TableHead>
            <TableHead>Время прихода</TableHead>
            <TableHead>Время ухода</TableHead>
            <TableHead>Действие</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {guests.map((guest) => (
            <TableRow key={guest.id}>
              <TableCell>{guest.name}</TableCell>
              <TableCell>{guest.table}</TableCell>
              <TableCell>{guest.arrivalTime}</TableCell>
              <TableCell>{guest.departureTime || "-"}</TableCell>
              <TableCell>
                {!guest.departureTime && (
                  <Button onClick={() => markDeparture(guest.id)}>
                    Отметить уход
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
