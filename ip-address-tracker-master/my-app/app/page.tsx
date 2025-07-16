"use client";
// src/components/MapView.jsx
import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: "<YOUR_API_KEY>", // ← replace with your key
  version: "weekly", // use the latest stable
});

export default function MapView() {
  const mapRef = useRef(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Get user’s current position
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude: lat, longitude: lng } = coords;

        // 2. Load Google Maps script
        loader.load().then(async () => {
          const map = new google.maps.Map(mapRef.current, {
            center: { lat, lng },
            zoom: 14,
          });

          // 3. Place a marker at the user’s location
          new google.maps.Marker({
            position: { lat, lng },
            map,
            title: "You are here",
          });
        });
      },
      (err) => {
        setError(err.message);
      }
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div
          ref={mapRef}
          className="w-full max-w-3xl h-96 rounded-lg shadow-lg"
        />
      )}
    </div>
  );
}
