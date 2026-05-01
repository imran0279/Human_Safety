"use client";

import { useEffect, useState } from "react";

function isNightTime() {
  const hour = new Date().getHours();
  return hour >= 21 || hour <= 5;
}

async function getBatteryLevel() {
  if (!navigator.getBattery) return 100;

  try {
    const battery = await navigator.getBattery();
    return Math.round(battery.level * 100);
  } catch {
    return 100;
  }
}

function calculateRiskLevel(data) {
  let score = 0;

  if (!data.locationPermission) score += 30;
  if (data.emergencyContactsCount === 0) score += 30;
  if (data.isNight) score += 20;
  if (data.batteryLevel < 20) score += 20;

  if (score >= 60) {
    return {
      level: "HIGH",
      className: "risk-high",
      message: "High risk detected. Please stay alert or send SOS.",
    };
  }

  if (score >= 30) {
    return {
      level: "LOW",
      className: "risk-low",
      message: "Some risk factors detected.",
    };
  }

  return {
    level: "SAFE",
    className: "risk-safe",
    message: "You appear to be safe.",
  };
}

export default function RiskMonitor() {
  const [risk, setRisk] = useState(null);

  useEffect(() => {
    async function checkRisk() {
      const batteryLevel = await getBatteryLevel();

      const data = {
        locationPermission: !!navigator.geolocation,
        batteryLevel,
        isNight: isNightTime(),
        emergencyContactsCount: 2,
      };

      setRisk(calculateRiskLevel(data));
    }

    checkRisk();
    const interval = setInterval(checkRisk, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!risk) return <p>Checking risk level...</p>;

  return (
    <div className={`risk-card ${risk.className}`}>
      <h2>Risk Level: {risk.level}</h2>
      <p>{risk.message}</p>
    </div>
  );
}
