"use client"

import * as React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Truck, Clock, MapPin } from "lucide-react";

// Размеры контейнера карты
const containerStyle = {
  width: "100%",
  height: "550px",
  borderRadius: "8px",
};

// Пример центра карты (замените на актуальные координаты)
const center = {
  lat: 51.505,
  lng: -0.09,
};

export function OrderLogistics() {
  // Получаем ключ из переменных окружения
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
  
  const mapRef = React.useRef<google.maps.Map | null>(null);
  const markerRef = React.useRef<google.maps.marker.AdvancedMarkerElement | null>(null);

  const onLoad = React.useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    if (
      window.google &&
      google.maps &&
      google.maps.marker &&
      google.maps.marker.AdvancedMarkerElement
    ) {
      markerRef.current = new google.maps.marker.AdvancedMarkerElement({
        position: center,
        map: map,
      });
    }
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-blue-600" />
          Логистика заказов
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Активные заказы */}
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-green-600" />
            <span className="font-medium">Активные заказы:</span>
            <span className="text-lg font-bold">8 заказов</span>
          </div>
          {/* Среднее время доставки */}
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-yellow-500" />
            <span className="font-medium">Среднее время доставки:</span>
            <span className="text-lg font-bold">25 минут</span>
          </div>
          {/* Интеграция GPS */}
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-red-500" />
            <span className="font-medium">Интеграция GPS:</span>
            <span className="text-lg font-bold">Отслеживание в реальном времени</span>
          </div>
          {/* Карта доставки (Google Maps) */}
          <div className="mt-4">
            <LoadScript googleMapsApiKey={googleMapsApiKey}>
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={13}
                onLoad={onLoad}
              >
                {/* AdvancedMarkerElement создан в onLoad */}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}




