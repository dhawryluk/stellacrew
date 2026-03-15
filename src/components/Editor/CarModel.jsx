import { useRef, useEffect, useMemo, Suspense, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Environment,
  ContactShadows,
  PerspectiveCamera,
  Html,
  useProgress,
} from "@react-three/drei";
import * as THREE from "three";
import {
  getSlot,
  toThreeColor,
  isGradient,
  parseGradientStops,
  sampleGradient,
  buildCompositeTexture,
  buildGradientCanvasTexture,
  getPaintProfile,
  needsTexture,
  TEXTURE_URLS,
} from "./paintUtils.js";

// ─── CAMERA AUTO-FIT ──────────────────────────────────────────────────────────
function CameraRig({ target }) {
  const { camera } = useThree();
  useEffect(() => {
    if (!target) return;
    const box = new THREE.Box3().setFromObject(target);
    const sz = new THREE.Vector3();
    const ctr = new THREE.Vector3();
    box.getSize(sz);
    box.getCenter(ctr);
    const d =
      (Math.max(sz.x, sz.y, sz.z) /
        2 /
        Math.tan((camera.fov * Math.PI) / 360)) *
      1.35;
    camera.position.set(ctr.x + d * 0.75, ctr.y + d * 0.36, ctr.z + d * 0.65);
    camera.lookAt(ctr);
    camera.near = d * 0.004;
    camera.far = d * 14;
    camera.updateProjectionMatrix();
  }, [target, camera]);
  return null;
}

// ─── CAR MODEL ────────────────────────────────────────────────────────────────
function CarModel({ config, autoRotate, onLoaded, vehicleOverrides }) {
  const { scene } = useGLTF(config._modelPath);
  const groupRef = useRef();
  const matCache = useRef({});
  const cloned = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(cloned);
    const ctr = new THREE.Vector3();
    box.getCenter(ctr);
    cloned.position.set(-ctr.x, -box.min.y, -ctr.z);
  }, [cloned]);

  useEffect(() => {
    if (onLoaded) onLoaded(cloned);
  }, [cloned, onLoaded]);

  const allOverrides = vehicleOverrides || {};

  useEffect(() => {
    if (!cloned) return;
    const { primary, secondary, pearl, rim, crew } = config;
    const crewHex = crew?.hex || "#ffffff";
    const crewActive = crew?.active ?? false;
    const crewTarget = crew?.target || "both";
    const crewOp = crewActive ? 0.92 : 0;

    const hasPearl = pearl?.hex && pearl.hex !== "transparent";
    const pearlColor = hasPearl ? toThreeColor(pearl.hex) : null;

    const crewOnSlot = (slot) => {
      if (!crewActive) return false;
      if (crewTarget === "both")
        return slot === "primary" || slot === "secondary";
      if (crewTarget === "primary") return slot === "primary";
      if (crewTarget === "secondary") return slot === "secondary";
      return false;
    };

    const applyMesh = async (child, slot) => {
      if (slot === "ignore") {
        child.visible = false;
        return;
      }
      child.visible = true;

      if (!matCache.current[child.uuid])
        matCache.current[child.uuid] = new THREE.MeshPhysicalMaterial();
      const mat = matCache.current[child.uuid];
      child.material = mat;

      mat.map = null;
      mat.transparent = false;
      mat.opacity = 1;
      mat.emissive = new THREE.Color(0, 0, 0);
      mat.emissiveIntensity = 0;
      mat.clearcoatColor = undefined;
      mat.iridescence = 0;
      mat.sheen = 0;
      mat.sheenColor = undefined;

      if (slot === "glass") {
        Object.assign(mat, {
          color: new THREE.Color("#6fa8c4"),
          roughness: 0.03,
          metalness: 0.05,
          transparent: true,
          opacity: 0.28,
          clearcoat: 1.0,
          clearcoatRoughness: 0.0,
          envMapIntensity: 1.8,
          iridescence: 0,
        });
        mat.needsUpdate = true;
        return;
      }
      if (slot === "tire") {
        Object.assign(mat, {
          color: new THREE.Color("#0d0d0d"),
          roughness: 0.93,
          metalness: 0.0,
          clearcoat: 0,
          iridescence: 0,
        });
        mat.needsUpdate = true;
        return;
      }
      if (slot === "chrome") {
        Object.assign(mat, {
          color: new THREE.Color("#A8B2B6"),
          roughness: 0.0,
          metalness: 1.0,
          clearcoat: 1.0,
          clearcoatRoughness: 0.0,
          envMapIntensity: 2.6,
          iridescence: 0,
        });
        mat.needsUpdate = true;
        return;
      }
      if (slot === "interior") {
        mat.map = null;
        Object.assign(mat, {
          color: new THREE.Color("#0a0a0a"),
          roughness: 0.8,
          metalness: 0.0,
          clearcoat: 0,
          iridescence: 0,
          envMapIntensity: 0,
        });
        mat.needsUpdate = true;
        return;
      }

      const colorObj =
        slot === "secondary" ? secondary : slot === "rim" ? rim : primary;
      if (!colorObj) {
        mat.needsUpdate = true;
        return;
      }

      const profile = getPaintProfile(colorObj);
      mat.color = profile.color;
      mat.roughness = profile.roughness ?? 0.5;
      mat.metalness = profile.metalness ?? 0.3;
      mat.clearcoat = profile.clearcoat ?? 0;
      mat.clearcoatRoughness = profile.clearcoatRoughness ?? 0;
      mat.envMapIntensity = profile.envMapIntensity ?? 1.0;
      mat.iridescence = profile.iridescence ?? 0;
      mat.iridescenceIOR = profile.iridescenceIOR ?? 1.5;
      mat.iridescenceThicknessRange = profile.iridescenceThicknessRange ?? [
        100, 400,
      ];

      if (pearlColor && (slot === "primary" || slot === "secondary")) {
        const isFlat = colorObj.type === "Matte" || colorObj.type === "Worn";
        mat.clearcoatColor = pearlColor;
        mat.emissive = pearlColor.clone();
        mat.emissiveIntensity = 0.02;
        if (!isFlat) {
          mat.clearcoat = Math.max(mat.clearcoat, 0.85);
          mat.clearcoatRoughness = Math.min(mat.clearcoatRoughness, 0.08);
        }
      }

      const withCrew = crewOnSlot(slot);

      if (colorObj.type === "Chameleon" && profile._gradStops) {
        const tex = buildGradientCanvasTexture(
          profile._gradStops,
          crewHex,
          withCrew ? crewOp : 0,
        );
        mat.map = tex;
        mat.color = new THREE.Color("#ffffff");
        const peakStop = sampleGradient(profile._gradStops, 0.65);
        mat.emissive = peakStop.clone().multiplyScalar(0.5);
        mat.emissiveIntensity = 0.22;
      } else if (needsTexture(colorObj)) {
        const texUrl = profile._tex || TEXTURE_URLS.carbon;
        const tex = await buildCompositeTexture(
          texUrl,
          (colorObj.hex || "111111").replace("#", ""),
          crewHex,
          withCrew ? crewOp : 0,
        );
        mat.map = tex;
        mat.color = new THREE.Color("#ffffff");
      } else if (withCrew) {
        const base = toThreeColor(colorObj.hex);
        const crew = toThreeColor(crewHex);
        mat.color = base.clone().lerp(crew, 0.9);
      }

      mat.needsUpdate = true;
      child.castShadow = true;
      child.receiveShadow = true;
    };

    cloned.traverse((child) => {
      if (child.isMesh) applyMesh(child, getSlot(child.name, allOverrides));
    });
  }, [cloned, config, allOverrides]);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current)
      groupRef.current.rotation.y += delta * 0.28;
  });

  return <primitive ref={groupRef} object={cloned} />;
}

// ─── LOADER ───────────────────────────────────────────────────────────────────
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div style={{ textAlign: "center", fontFamily: "monospace" }}>
        <div
          style={{
            color: "#EAB308",
            fontSize: 10,
            letterSpacing: "0.2em",
            fontWeight: 900,
            marginBottom: 10,
          }}
        >
          LOADING MODEL
        </div>
        <div
          style={{
            width: 180,
            height: 2,
            background: "#181818",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "#EAB308",
              transition: "width 0.2s",
              borderRadius: 2,
            }}
          />
        </div>
        <div style={{ color: "#444", fontSize: 9, marginTop: 5 }}>
          {Math.round(progress)}%
        </div>
      </div>
    </Html>
  );
}

// ─── 3D SCENE ─────────────────────────────────────────────────────────────────
function Scene({ config, autoRotate, onModelLoaded, vehicleOverrides }) {
  const [model, setModel] = useState(null);
  const handleLoaded = (m) => {
    setModel(m);
    if (onModelLoaded) onModelLoaded(m);
  };

  const { orbitTarget, minDist, maxDist } = useMemo(() => {
    if (!model) return { orbitTarget: [0, 0.5, 0], minDist: 1, maxDist: 50 };
    const box = new THREE.Box3().setFromObject(model);
    const sz = new THREE.Vector3();
    box.getSize(sz);
    const d = Math.max(sz.x, sz.y, sz.z);
    return {
      orbitTarget: [0, sz.y * 0.35, 0],
      minDist: d * 0.5,
      maxDist: d * 5.5,
    };
  }, [model]);

  return (
    <>
      <PerspectiveCamera makeDefault fov={38} />
      <CameraRig target={model} />
      <OrbitControls
        enablePan={false}
        minDistance={minDist}
        maxDistance={maxDist}
        minPolarAngle={0.04}
        maxPolarAngle={Math.PI / 2.04}
        autoRotate={autoRotate}
        autoRotateSpeed={0.65}
        target={orbitTarget}
        enableDamping
        dampingFactor={0.06}
      />
      <directionalLight
        position={[8, 10, 6]}
        intensity={1.8}
        color="#fff8f0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={60}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
        shadow-bias={-0.0004}
      />
      <directionalLight
        position={[-8, 6, -6]}
        intensity={0.9}
        color="#cce0ff"
      />
      <directionalLight position={[0, 4, -8]} intensity={0.7} color="#fff4e0" />
      <directionalLight
        position={[0, -4, 4]}
        intensity={0.25}
        color="#445566"
      />
      <ambientLight intensity={0.08} />
      <Environment preset="warehouse" background={false} />
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.72}
        scale={28}
        blur={3.2}
        far={5}
      />
      <Suspense fallback={<Loader />}>
        <CarModel
          config={config}
          autoRotate={autoRotate}
          onLoaded={handleLoaded}
          vehicleOverrides={vehicleOverrides}
        />
      </Suspense>
    </>
  );
}

export { Scene };
export default CarModel;
