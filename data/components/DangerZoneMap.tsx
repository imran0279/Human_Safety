"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Circle, Popup } from "react-leaflet";
import { dangerZones } from "@/data/dangerZones";

function getColor(risk: string) {
  if (risk === "high") return "red";
  if (risk === "medium") return "orange";
  return "green";
}

export default function DangerZoneMap() {
  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={[23.8103, 90.4125]}
        zoom={13}
        style={{ height: "100%", width: "100%", borderRadius: "16px" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {dangerZones.map((zone) => (
          <Circle
            key={zone.id}
            center={[zone.lat, zone.lng]}
            radius={zone.radius}
            pathOptions={{
              color: getColor(zone.risk),
              fillColor: getColor(zone.risk),
              fillOpacity: 0.35,
            }}
          >
            <Popup>
              <b>{zone.name}</b>
              <br />
              Risk: {zone.risk}
              <br />
              Reports: {zone.reports}
            </Popup>
          </Circle>
        ))}
      </MapContainer>
    </div>
  );
}
