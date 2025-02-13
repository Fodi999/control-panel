import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface DashboardCardProps {
  title: string;
  value: string;
  bgColor: string;
  subtext?: string;
  trend?: string;
}

export default function DashboardCard({
  title,
  value,
  bgColor,
  subtext,
  trend,
}: DashboardCardProps) {
  // Определяем цвет бейджа в зависимости от тренда
  let badgeColor = "bg-green-500";
  if (trend?.startsWith("-")) {
    badgeColor = "bg-red-500";
  } else if (trend?.toLowerCase() === "stable") {
    badgeColor = "bg-gray-500";
  }

  return (
    <Card className={`rounded-2xl shadow-lg border border-gray-200 ${bgColor} text-white`}>
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-4">
        <p className="text-3xl font-bold">{value}</p>
        {subtext && <p className="mt-2 text-sm opacity-75">{subtext}</p>}
      </CardContent>
      {trend && (
        <>
          <Separator />
          <CardFooter className="p-4">
            <Badge className={`text-white ${badgeColor}`}>
              {trend}
            </Badge>
          </CardFooter>
        </>
      )}
    </Card>
  );
}


