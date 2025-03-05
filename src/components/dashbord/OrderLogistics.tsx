"use client";

import React, { useCallback, useRef } from "react";
import { LoadScript, GoogleMap } from "@react-google-maps/api";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Truck, Clock, MapPin } from "lucide-react";

// Размеры контейнера карты с адаптивностью
const containerStyle = {
  width: "100%",
  height: "350px", // Уменьшено для телефонов
  borderRadius: "12px", // Увеличено для современного вида
};

// Пример центра карты (можно заменить на актуальные координаты)
const center = {
  lat: 51.505,
  lng: -0.09,
};

export function OrderLogistics() {
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
    if (window.google?.maps?.marker?.AdvancedMarkerElement) {
      markerRef.current = new google.maps.marker.AdvancedMarkerElement({
        position: center,
        map: map,
      });
    }
  }, []);

  return (
    <Card className="w-full max-w-3xl mx-auto bg-gradient-to-br from-gray-900 to-black text-gray-100 border border-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all">
      <CardHeader className="p-3 sm:p-4">
        <CardTitle className="flex items-center gap-2 text-base sm:text-xl font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          <Truck className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          Логистика
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 space-y-4 sm:space-y-6">
        <div className="space-y-2 sm:space-y-4">
          <div className="flex items-center gap-2">
            <Truck className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
            <span className="text-xs sm:text-sm font-medium text-gray-300">
              Активные заказы:
            </span>
            <span className="text-xs sm:text-base font-bold text-gray-100">8</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
            <span className="text-xs sm:text-sm font-medium text-gray-300">
              Среднее время:
            </span>
            <span className="text-xs sm:text-base font-bold text-gray-100">25 мин</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-red-400" />
            <span className="text-xs sm:text-sm font-medium text-gray-300">GPS:</span>
            <span className="text-xs sm:text-base font-bold text-gray-100">В реальном времени</span>
          </div>
        </div>
        <div className="mt-4 sm:mt-6">
          <LoadScript googleMapsApiKey={googleMapsApiKey}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={13}
              onLoad={onLoad}
              options={{
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
              }}
            />
          </LoadScript>
        </div>
      </CardContent>
    </Card>
  );
}




