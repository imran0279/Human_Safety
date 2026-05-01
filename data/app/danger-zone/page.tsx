import dynamic from "next/dynamic";

const DangerZoneMap = dynamic(() => import("@/components/DangerZoneMap"), {
  ssr: false,
});

export default function DangerZonePage() {
  return (
    <main style={{ padding: "30px" }}>
      <h1>Danger Zone Map</h1>
      <p>Red = high risk, orange = medium risk, green = low risk.</p>

      <DangerZoneMap />
    </main>
  );
}
