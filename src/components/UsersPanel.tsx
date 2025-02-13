import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function UsersPanel() {
  return (
    <Card className="w-full rounded-2xl shadow-lg border border-gray-200 bg-white text-gray-900">
      <CardHeader className="p-5">
        <CardTitle className="text-xl font-bold">Панель пользователей</CardTitle>
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <Input placeholder="Поиск пользователей..." className="sm:w-1/2" />
          <Button className="w-full sm:w-auto">Добавить пользователя</Button>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b">
              <tr>
                <th className="pb-2 text-left">ID</th>
                <th className="pb-2 text-left">Имя</th>
                <th className="pb-2 text-left">Email</th>
                <th className="pb-2 text-left">Роль</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-2">1</td>
                <td className="py-2">Иван Иванов</td>
                <td className="py-2">ivan@example.com</td>
                <td className="py-2">Администратор</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-2">2</td>
                <td className="py-2">Петр Петров</td>
                <td className="py-2">petr@example.com</td>
                <td className="py-2">Пользователь</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-2">3</td>
                <td className="py-2">Сергей Сергеев</td>
                <td className="py-2">sergey@example.com</td>
                <td className="py-2">Пользователь</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

