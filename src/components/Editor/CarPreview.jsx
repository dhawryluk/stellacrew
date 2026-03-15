import { useRef, useEffect, useMemo, useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import VEHICLES from "../../data/vehicles.json";
import { Scene } from "./CarModel.jsx";
import VehicleTabRow from "./VehicleTabRow.jsx";
import WheelHud from "./WheelHud.jsx";
import PaintHud from "./PaintHud.jsx";

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function CarPreview({
  config,
  crewVisible,
  crewTarget = "both",
}) {
  const [activeVehicleId, setActiveVehicleId] = useState(VEHICLES[0].id);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hintsDone, setHintsDone] = useState(false);

  const activeVehicle =
    VEHICLES.find((v) => v.id === activeVehicleId) || VEHICLES[0];
  const vehicleOverrides = activeVehicle.overrides || {};

  const handleVehicleChange = useCallback((id) => {
    setActiveVehicleId(id);
  }, []);

  const enrichedConfig = useMemo(
    () => ({
      ...config,
      _modelPath: activeVehicle.model,
      crew: { ...config.crew, active: crewVisible, target: crewTarget },
    }),
    [config, crewVisible, crewTarget, activeVehicle],
  );

  return (
    <div
      className="w-full rounded-sm border border-white/5 overflow-hidden shadow-2xl"
      style={{ background: "#0e0e12" }}
    >
      {/* ── VEHICLE TAB ROW ── */}
      <VehicleTabRow
        vehicles={VEHICLES}
        activeId={activeVehicleId}
        onChange={handleVehicleChange}
      />

      {/* ── 3D CANVAS ── */}
      <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
        <Canvas
          shadows
          onPointerDown={() => setHintsDone(true)}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.15,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <Scene
            config={enrichedConfig}
            autoRotate={autoRotate}
            vehicleOverrides={vehicleOverrides}
          />
        </Canvas>

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(ellipse at 50% 60%, transparent 50%, rgba(0,0,0,0.45) 100%)",
          }}
        />

        {/* Paint HUD */}
        <PaintHud
          config={enrichedConfig}
          crewVisible={crewVisible}
          crewTarget={crewTarget}
        />

        {/* Rotate toggle */}
        <button
          onClick={() => setAutoRotate((v) => !v)}
          className="absolute top-3 right-3 z-30"
          style={{
            background: autoRotate ? "rgba(234,179,8,0.1)" : "rgba(0,0,0,0.6)",
            border: `1px solid ${autoRotate ? "rgba(234,179,8,0.3)" : "rgba(255,255,255,0.07)"}`,
            borderRadius: 20,
            padding: "3px 10px",
            color: autoRotate ? "#EAB308" : "#2a2a2a",
            fontSize: 8,
            fontWeight: 900,
            letterSpacing: "0.15em",
            cursor: "pointer",
            backdropFilter: "blur(6px)",
            transition: "all 0.15s",
          }}
        >
          {autoRotate ? "⟳ ROTATING" : "⟳ PAUSED"}
        </button>

        {/* Controls hint */}
        {!hintsDone && (
          <div className="absolute bottom-12 left-3 z-20 pointer-events-none flex gap-4">
            {[
              ["Drag", "Rotate"],
              ["Scroll", "Zoom"],
            ].map(([k, a]) => (
              <span
                key={k}
                style={{
                  fontSize: 8,
                  color: "rgba(255,255,255,0.18)",
                  fontFamily: "monospace",
                }}
              >
                {k} <span style={{ opacity: 0.4 }}>→</span> {a}
              </span>
            ))}
          </div>
        )}

        {/* Wheel HUD */}
        <WheelHud wheelStyle={config.wheelStyle} />
      </div>
    </div>
  );
}
