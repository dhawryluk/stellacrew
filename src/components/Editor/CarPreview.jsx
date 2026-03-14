/**
 * CarPreview.jsx — 3D Car Visualizer with Vehicle Class Tabs
 * ─────────────────────────────────────────────────────────────────────────────
 * Props: { config, crewVisible, crewTarget }
 *
 * VEHICLE MODELS — download each GLB from Sketchfab and place in /public/models/:
 *   Muscle  → mustang.glb    (already done — Ford Mustang GT Drift Spec)
 *   Sports  → r8.glb
 *   Super   → 458.glb
 *   SUV     → g63.glb
 *   Coupe   → jag.glb
 *   Sedan   → m5.glb
 *   Offroad → jeep.glb
 *
 * Each vehicle needs its own MESH_OVERRIDES entry — use the ⊕ ASSIGN MESHES
 * picker after placing the GLB, export the map, paste it into the vehicle's
 * overrides object below.
 */

import {
  useRef,
  useEffect,
  useMemo,
  Suspense,
  useState,
  useCallback,
} from "react";
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

// ─── PICKER CONSTANTS ─────────────────────────────────────────────────────────
const STORAGE_KEY = "scg_vehicle_overrides_v1";
const SLOT_META = {
  primary: { label: "Primary", color: "#EAB308" },
  secondary: { label: "Secondary", color: "#60a8e0" },
  rim: { label: "Rim", color: "#22c55e" },
  glass: { label: "Glass", color: "#38bdf8" },
  tire: { label: "Tire", color: "#6b7280" },
  chrome: { label: "Chrome", color: "#e2e8f0" },
  interior: { label: "Interior", color: "#d97706" },
  ignore: { label: "Ignore", color: "#374151" },
};
const SLOT_HIGHLIGHT = Object.fromEntries(
  Object.entries(SLOT_META).map(([k, v]) => [k, new THREE.Color(v.color)]),
);

// ─── VEHICLE CLASS REGISTRY ───────────────────────────────────────────────────
// Add each vehicle here. icon is an emoji used in the tab row.
// overrides: mesh → slot map (use the picker tool to generate these per vehicle).
const VEHICLES = [
  {
    id: "muscle",
    label: "Muscle",
    icon: "🔥",
    model: "/models/mustang.glb",
    overrides: {
      // primary
      Object_27: "primary",
      Object_28: "primary",
      Object_20: "primary",
      Object_21: "primary",
      Object_32: "primary",
      // secondary
      Object_29: "secondary",
      Object_30: "secondary",
      Object_31: "secondary",
      Object_3: "secondary",
      Object_35: "secondary",
      Object_36: "secondary",
      Object_37: "secondary",
      Object_38: "secondary",
      Phoenix445_Bottom_UCB_BOTTOM_0: "secondary",
      // glass
      Object_23: "glass",
      // rim
      Object_25: "rim",
      Object_33: "rim",
      Object_39: "rim",
      Object_40: "rim",
      Object_41: "rim",
      Object_45: "rim",
      Object_47: "rim",
      Object_49: "rim",
      Object_51: "rim",
      // tire
      Object_53: "tire",
      Object_54: "tire",
      // interior
      Object_2: "interior",
      Object_4: "interior",
      Object_5: "interior",
      Object_6: "interior",
      Object_7: "interior",
      Object_8: "interior",
      Object_9: "interior",
      Object_10: "interior",
      Object_11: "interior",
      Object_12: "interior",
      Object_13: "interior",
      Object_14: "interior",
      Object_15: "interior",
      Object_16: "interior",
      Object_17: "interior",
      Object_18: "interior",
      Object_22: "interior",
    },
  },
  {
    id: "sports",
    label: "Sports",
    icon: "⚡",
    model: "/models/supra.glb",
    overrides: {
      // primary
      Plane002_body_0: "primary",
      tWing4a_Paint_Geo_lodA_Wing4a_Paint_Geo_lodA_Toyota_GRSupraTNR4_2020PaintTNR_Material_003_tToyota_GRSupraTNR4_2020PaintTNR_Material_002_0:
        "primary",
      tWing4a_Coloured_Geo_lodA_Wing4a_Coloured_Geo_lodA_Toyota_GRSupraTNR4_2020Coloured_Material_001_tToyota_GRSupraTNR4_2020Coloured_Material1_0:
        "primary",
      tWing4a_Carbon1_Geo_lodA_Wing4a_Carbon1_Geo_lodA_Toyota_GRSupraTNR4_2020Carbon1_Material_002_tToyota_GRSupraTNR4_2020Carbon1_Material1_0:
        "primary",
      // secondary
      Object_97: "secondary",
      Object_225: "secondary",
      Object_90: "secondary",
      Object_81: "secondary",
      Object_36: "secondary",
      Object_16: "secondary",
      Object_28: "secondary",
      Object_20: "secondary",
      Plane003_trim_0: "secondary",
      tKit4_Carbon1_Geo_lodA_Kit4_Carbon1_Geo_lodA_Toyota_GRSupraTNR4_2020Carbon1_Material_tToyota_GRSupraTNR4_2020Carbon1_Material1_0:
        "secondary",
      tKit4_Carbon1_Geo_lodA_Kit4_Carbon1_Geo_lodA_Toyota_GRSupraTNR4_2020Carbon1_Material_orange_color_0:
        "secondary",
      tHood4a_Carbon1_Geo_lodA_Hood4a_Carbon1_Geo_lodA_Toyota_GRSupraTNR4_2020Carbon1_Material_001_tToyota_GRSupraTNR4_2020Carbon1_Material1_0:
        "secondary",
      tKit4_Grille3_Geo_lodA_Kit4_Grille3_Geo_lodA_Toyota_GRSupraTNR4_2020Grille3E_Material_tToyota_GRSupraTNR4_2020Grille3E_Material1_0:
        "secondary",
      polySurface31_tToyota_GRSupraTNR0_2020_CallipersCalliperGloss_Material1_0:
        "secondary",
      polySurface78_tToyota_GRSupraTNR0_2020_CallipersCalliperBadgeA_Material1_0:
        "secondary",
      polySurface75_tToyota_GRSupraTNR0_2020_CallipersCalliperGloss_Material1_0:
        "secondary",
      polySurface68_tToyota_GRSupraTNR0_2020_CallipersCalliperGloss_Material1_0:
        "secondary",
      // glass
      Object_99: "glass",
      Object_304: "glass",
      Object_39: "glass",
      Object_17: "glass",
      Object_41: "glass",
      Object_11: "glass",
      Object_45: "glass",
      Object_29: "glass",
      Object_269: "glass",
      Object_244: "glass",
      Object_102: "glass",
      Object_8: "glass",
      Object_6: "glass",
      Object_26: "glass",
      Object_72: "glass",
      Object_9: "glass",
      Object_69: "glass",
      Plane002_windows_0: "glass",
      tKit4_Window_Geo_lodA_Kit4_Window_Geo_lodA_Toyota_GRSupraTNR4_2020Window_Material_tToyota_GRSupraTNR4_2020Window_Material1_0:
        "glass",
      tKit4_Window_Geo_lodA_Kit4_Window_Geo_lodA_Toyota_GRSupraTNR4_2020Window_Material_glass_surr_0:
        "glass",
      // rim
      Object_313: "rim",
      Object_338: "rim",
      Object_340: "rim",
      Object_317: "rim",
      Object_315: "rim",
      Object_336: "rim",
      Object_334: "rim",
      Object_319: "rim",
      Object_352: "rim",
      Object_354: "rim",
      Object_356: "rim",
      Object_350: "rim",
      Object_361: "rim",
      Object_363: "rim",
      Object_365: "rim",
      Object_367: "rim",
      Object_125: "rim",
      Object_126: "rim",
      Object_123: "rim",
      Object_132: "rim",
      Object_129: "rim",
      Object_107: "rim",
      Object_98: "rim",
      Object_116: "rim",
      Object_108: "rim",
      Plane003_rim002_0: "rim",
      Plane006_rim002_0: "rim",
      wobjoff1_rim_mat_01_0: "rim",
      wobjoff1_Rim_b_0: "rim",
      polySurface420_w_TNRRims_84A18NaBrakeDisc_ForgedDrilled_Material1_0:
        "rim",
      off1_rim_mat_01_0_1: "rim",
      off1_Rim_b_0_1: "rim",
      off1_rim_mat_01_0_2: "rim",
      off1_Rim_b_0_2: "rim",
      off1_rim_mat_01_0: "rim",
      off1_Rim_b_0: "rim",
      // tire
      Object_372: "tire",
      Object_345: "tire",
      Object_329: "tire",
      Object_324: "tire",
      Object_131: "tire",
      Object_128: "tire",
      Object_122: "tire",
      Object_104: "tire",
      Object_113: "tire",
      Object_95: "tire",
      Object_54: "tire",
      Object_48: "tire",
      Object_60: "tire",
      Object_66: "tire",
      Plane006_trim_0: "tire",
      Plane009_trim_0: "tire",
      Plane012_trim_0: "tire",
      polySurface1_Porsche_911Carrera4SCabrioletReward_2020_Wheel1A_3D_3DWheel2A_Material_0:
        "tire",
      polySurface33_Porsche_911Carrera4SCabrioletReward_2020_Wheel1A_3D_3DWheel2A_Material_0:
        "tire",
      polySurface34_Porsche_911Carrera4SCabrioletReward_2020_Wheel1A_3D_3DWheel2A_Material_0:
        "tire",
      polySurface35_Porsche_911Carrera4SCabrioletReward_2020_Wheel1A_3D_3DWheel2A_Material_0:
        "tire",
      polySurface36_Porsche_911Carrera4SCabrioletReward_2020_Wheel1A_3D_3DWheel2A_Material_0:
        "tire",
      polySurface44_Porsche_911Carrera4SCabrioletReward_2020_Wheel1A_3D_3DWheel2A_Material_0:
        "tire",
      polySurface43_Porsche_911Carrera4SCabrioletReward_2020_Wheel1A_3D_3DWheel2A_Material_0:
        "tire",
      polySurface42_Porsche_911Carrera4SCabrioletReward_2020_Wheel1A_3D_3DWheel2A_Material_0:
        "tire",
      polySurface41_Porsche_911Carrera4SCabrioletReward_2020_Wheel1A_3D_3DWheel2A_Material_0:
        "tire",
      polySurface40_Porsche_911Carrera4SCabrioletReward_2020_Wheel1A_3D_3DWheel2A_Material_0:
        "tire",
      polySurface32_Porsche_911Carrera4SCabrioletReward_2020_Wheel1A_3D_3DWheel2A_Material_0:
        "tire",
      polySurface31_Porsche_911Carrera4SCabrioletReward_2020_Wheel1A_3D_3DWheel2A_Material_0:
        "tire",
      polySurface30_Porsche_911Carrera4SCabrioletReward_2020_Wheel1A_3D_3DWheel2A_Material_0:
        "tire",
      polySurface45_Porsche_911Carrera4SCabrioletReward_2020_Wheel1A_3D_3DWheel2A_Material_0:
        "tire",
      polySurface176_Porsche_911Carrera4SCabrioletReward_2020_Wheel1A_3D_3DWheel2A_Material_0:
        "tire",
      polySurface127_Porsche_911Carrera4SCabrioletReward_2020_Wheel1A_3D_3DWheel2A_Material_0:
        "tire",
      polySurface82_w_TNRRims_84A18NaTireBlur_Material1_0: "tire",
      polySurface81_w_TNRRims_84A18NaTireBlur_Material1_0: "tire",
      polySurface87_w_TNRRims_84A18NaTireBlur_Material1_0: "tire",
      polySurface85_w_TNRRims_84A18NaTireBlur_Material1_0: "tire",
      polySurface84_w_TNRRims_84A18NaTireBlur_Material1_0: "tire",
      polySurface98_w_TNRRims_84A18NaTireBlur_Material1_0: "tire",
      polySurface97_w_TNRRims_84A18NaTireBlur_Material1_0: "tire",
      polySurface100_w_TNRRims_84A18NaTireBlur_Material1_0: "tire",
      polySurface103_w_TNRRims_84A18NaTireBlur_Material1_0: "tire",
      polySurface101_w_TNRRims_84A18NaTireBlur_Material1_0: "tire",
      polySurface99_w_TNRRims_84A18NaTireBlur_Material1_0: "tire",
      polySurface107_w_TNRRims_84A18NaTireBlur_Material1_0: "tire",
      polySurface109_w_TNRRims_84A18NaTireBlur_Material1_0: "tire",
      polySurface111_w_TNRRims_84A18NaTireBlur_Material1_0: "tire",
      polySurface108_w_TNRRims_84A18NaTireBlur_Material1_0: "tire",
      polySurface90_w_TNRRims_84A18NaTireBlur_Material1_0: "tire",
      polySurface89_w_TNRRims_84A18NaTireBlur_Material1_0: "tire",
      polySurface92_w_TNRRims_84A18NaTireBlur_Material1_0: "tire",
      polySurface95_w_TNRRims_84A18NaTireBlur_Material1_0: "tire",
      polySurface93_w_TNRRims_84A18NaTireBlur_Material1_0: "tire",
      polySurface91_w_TNRRims_84A18NaTireBlur_Material1_0: "tire",
      polySurface105_w_TNRRims_84A18NaTireBlur_Material1_0: "tire",
      polySurface83_w_TNRRims_84A18NaTireBlur_Material1_0: "tire",
    },
  },
  {
    id: "super",
    label: "Super",
    icon: "🏎",
    model: "/models/p1.glb",
    overrides: {
      // primary
      Object_78: "primary",
      Object_12: "primary",
      Object_18: "primary",
      Object_24: "primary",
      Object_30: "primary",
      Object_33: "primary",
      Object_36: "primary",
      Object_39: "primary",
      GEO_HOOD_SUB0_Carpaint_0: "primary",
      polymsh5_SUB4_Windows_0: "primary",
      g_Body_SUB0_Windows_0: "primary",
      // secondary
      Object_75: "secondary",
      Object_15: "secondary",
      Object_21: "secondary",
      Object_27: "secondary",
      Object_81: "secondary",
      g_Body_SUB1_Carpaint_Black_0: "secondary",
      g_Bumper_F_SUB0_Carbon_Mult50_0: "secondary",
      polymsh5_SUB1_Carpaint_Black_0: "secondary",
      GEO_DOOR_RR_SUB1_Carpaint_Black_0: "secondary",
      g_Diffuser_2_INT_carbon_0: "secondary",
      g_Susp_Hub_RF_SUB1_Brake_Caliper_0: "secondary",
      g_Susp_Hub_LF_SUB1_Brake_Caliper_0: "secondary",
      g_Susp_Hub_LR_SUB1_Brake_Caliper_0: "secondary",
      g_Susp_Hub_RR_SUB2_Details_0: "secondary",
      // glass
      Object_63: "glass",
      Object_72: "glass",
      Object_66: "glass",
      polymsh_detached73_SUB1_Windows_alpha_0: "glass",
      polymsh5_SUB5_Windows_alpha_0: "glass",
      g_Window_B_SUB0_Windows_alpha_0: "glass",
      GEO_DOOR_RR_SUB2_Windows_alpha_0: "glass",
      // chrome
      Object_9: "chrome",
      Object_42: "chrome",
      Object_45: "chrome",
      Object_48: "chrome",
      Object_51: "chrome",
      Object_54: "chrome",
      Object_57: "chrome",
      Object_60: "chrome",
      Object_69: "chrome",
      Object_89: "chrome",
      Object_128: "chrome",
      // rim
      Object_98: "rim",
      Object_107: "rim",
      Object_116: "rim",
      Object_125: "rim",
      Rim_LF1_SUB0_Rim_0: "rim",
      Object_1716: "rim",
      Object_1719: "rim",
      Object_1704: "rim",
      Object_940: "rim",
      Object_1764: "rim",
      Object_1788: "rim",
      Object_1806: "rim",
      Object_1815: "rim",
      Object_1800: "rim",
      Object_1824: "rim",
      Object_1821: "rim",
      Object_1818: "rim",
      Object_1842: "rim",
      Object_1851: "rim",
      Object_1857: "rim",
      Object_904: "rim",
      Object_1779: "rim",
      Object_1761: "rim",
      Object_1746: "rim",
      Object_1698: "rim",
      Object_1749: "rim",
      Object_1767: "rim",
      Object_1785: "rim",
      Object_1803: "rim",
      Object_1839: "rim",
      Object_1854: "rim",
      Object_1731: "rim",
      Rim_RF1_SUB1_Details_0: "rim",
      Rim_RF1_SUB0_Rim_0: "rim",
      Rim_LR1_SUB1_Details_0: "rim",
      Rim_LR1_SUB0_Rim_0: "rim",
      Rim_RR1_SUB1_Details_0: "rim",
      Rim_LF1_SUB1_Details_0: "rim",
      // tire
      Object_92: "tire",
      Object_95: "tire",
      Object_101: "tire",
      Object_104: "tire",
      Object_110: "tire",
      Object_113: "tire",
      Object_119: "tire",
      Object_122: "tire",
      Object_712: "tire",
      Tyre_RF_2_Tyre_0: "tire",
      Tyre_LR_2_Tyre_0: "tire",
      // interior
      Object_84: "interior",
      Object_87: "interior",
      g_Susp_Hub_RF_SUB0_Mechanicals_0: "interior",
      g_Susp_Hub_RF_SUB2_Details_0: "interior",
      g_Bumper_F_SUB1_Matte_Black_0: "interior",
      Brake_Disk_RR_2_Brake_Disk_0: "interior",
      LIGHT_BRAKE_3_2_Taillights_0: "interior",
      LIGHT_BRAKE_REAR_2_Taillights_0: "interior",
      LIGHT_BRAKE_2_2_Taillights_0: "interior",
      LIGHT_BRAKE_0_2_Taillights_0: "interior",
      LIGHT_BRAKE_1_2_Taillights_0: "interior",
      g_Susp_ALever_Top_LR_2_Mechanicals_0: "interior",
      g_Susp_ALever_Top_RR_2_Mechanicals_0: "interior",
      GEO_DOOR_L_SUB5_INT_Decals_REF_spec_0: "interior",
      GEO_DOOR_L_SUB8_INT_Decals_FLAT_0: "interior",
      GEO_DOOR_L_SUB3_INT_Velvet_0: "interior",
      GEO_DOOR_L_SUB4_INT_PLASTIC_Speakers_0: "interior",
      GEO_DOOR_L_SUB0_INT_carbon_0: "interior",
      GEO_DOOR_L_SUB7_INT_METAL_Aluminium_0: "interior",
      GEO_DOOR_L_SUB2_INT_PLASTIC_Black_0: "interior",
      GEO_DOOR_L_SUB6_INT_PLASTIC_Rubber_0: "interior",
      GEO_DOOR_L_SUB1_Matte_Black_0: "interior",
      GEO_DOOR_L_SUB9_INT_Decals_REF_AT_GLOSS_0: "interior",
      polymsh6_2_INT_Decals_REF_GLOSS_0: "interior",
      Cylinder7_SUB1_INT_Decals_REF_spec_0: "interior",
      Cylinder7_SUB0_INT_Decals_REF_GLOSS_0: "interior",
      Cylinder6_SUB0_INT_Decals_REF_GLOSS_0: "interior",
      Cylinder6_SUB1_INT_Decals_REF_spec_0: "interior",
      polymsh54_2_INT_Decals_REF_GLOSS_0: "interior",
      GEO_DOOR_R1_SUB7_INT_Decals_REF_spec_0: "interior",
      GEO_DOOR_R1_SUB6_INT_Decals_FLAT_0: "interior",
      GEO_DOOR_R1_SUB4_INT_Velvet_0: "interior",
      GEO_DOOR_R1_SUB5_INT_PLASTIC_Speakers_0: "interior",
      GEO_DOOR_R1_SUB2_INT_carbon_0: "interior",
      GEO_DOOR_R1_SUB0_INT_PLASTIC_Black_0: "interior",
      GEO_DOOR_R1_SUB1_INT_PLASTIC_Rubber_0: "interior",
      GEO_DOOR_R1_SUB3_Matte_Black_0: "interior",
      GEO_DOOR_R1_SUB8_INT_Decals_REF_AT_GLOSS_0: "interior",
      polymsh_extracted11_SUB0_Windows_alpha_0: "interior",
      polymsh_extracted11_SUB1_Windows_0: "interior",
      polymsh5_SUB2_Mirror_0: "interior",
      polymsh5_SUB3_Carbon_Mult50_0: "interior",
      GEO_STEER1_SUB4_INT_Decals_REF_GLOSS_0: "interior",
      GEO_STEER1_SUB6_INT_Decals_REF_spec_0: "interior",
      GEO_STEER1_SUB7_INT_Decals_FLAT_0: "interior",
      GEO_STEER1_SUB1_INT_Skin_A_0: "interior",
      GEO_STEER1_SUB0_INT_Velvet_0: "interior",
      GEO_STEER1_SUB2_INT_carbon_0: "interior",
      GEO_STEER1_SUB3_INT_METAL_Aluminium_0: "interior",
      GEO_STEER1_SUB5_INT_PLASTIC_Black_0: "interior",
      GEO_STEER1_SUB8_INT_Cuciture_0: "interior",
      LED_CHARGE_0_2_INT_DISPLAY_0: "interior",
      LED_CHARGE_1_2_INT_DISPLAY_0: "interior",
      polymsh_extracted10_2_Clear_Glass_0: "interior",
      LED_CHARGE_2_2_INT_DISPLAY_0: "interior",
      LED_CHARGE_3_2_INT_DISPLAY_0: "interior",
      LED_FUEL_0_2_INT_DISPLAY_0: "interior",
      LED_FUEL_1_2_INT_DISPLAY_0: "interior",
      LED_FUEL_2_2_INT_DISPLAY_0: "interior",
      LED_FUEL_3_2_INT_DISPLAY_0: "interior",
      GEO_Seats_SUB6_INT_Cuciture_0: "interior",
      GEO_Seats_SUB3_INT_PLASTIC_Black_0: "interior",
      GEO_Seats_SUB2_INT_carbon_0: "interior",
      GEO_Seats_SUB1_INT_Velvet_0: "interior",
      GEO_Seats_SUB0_INT_Skin_A_0: "interior",
      GEO_Seats_SUB4_INT_Decals_REF_spec_0: "interior",
      GEO_Seats_SUB5_INT_Decals_REF_GLOSS_0: "interior",
      CINTURE_OFF_SUB0_IN_Cinture_0: "interior",
      CINTURE_OFF_SUB1_INT_Decals_REF_spec_0: "interior",
      CINTURE_OFF_SUB2_INT_METAL_Aluminium_0: "interior",
      CINTURE_ON_SUB2_INT_Decals_REF_GLOSS_0: "interior",
      CINTURE_ON_SUB0_INT_Decals_REF_spec_0: "interior",
      CINTURE_ON_SUB1_IN_Cinture_0: "interior",
      polymsh_SUB9_INT_DISPLAY_0: "interior",
      polymsh_SUB2_INT_Decals_REF_GLOSS_0: "interior",
      polymsh_SUB7_INT_Decals_REF_spec_0: "interior",
      polymsh_SUB8_INT_Carpet_0: "interior",
      polymsh_SUB5_INT_Velvet_0: "interior",
      polymsh_SUB11_INT_Decals_FLAT_0: "interior",
      polymsh_SUB10_Mirror_0: "interior",
      polymsh_SUB1_INT_carbon_0: "interior",
      polymsh_SUB6_INT_METAL_Aluminium_0: "interior",
      polymsh_SUB0_INT_PLASTIC_Black_0: "interior",
      polymsh_SUB4_INT_PLASTIC_Rubber_0: "interior",
      polymsh_SUB3_Matte_Black_0: "interior",
      polymsh_SUB12_INT_Decals_REF_AT_GLOSS_0: "interior",
      DRS_Tag_2_2_INT_DISPLAY_0: "interior",
      DRS_Tag_1_2_INT_DISPLAY_0: "interior",
      DRS_Tag_0_2_INT_DISPLAY_0: "interior",
      IPAS_Tag_2_2_INT_DISPLAY_0: "interior",
      IPAS_Tag_1_2_INT_DISPLAY_0: "interior",
      IPAS_Tag_0_2_INT_DISPLAY_0: "interior",
      IPAS_Tag_3_2_INT_DISPLAY_0: "interior",
      DRS_Tag_3_2_INT_DISPLAY_0: "interior",
      LED_BATTERY_0_2_INT_DISPLAY_0: "interior",
      LED_BATTERY_1_2_INT_DISPLAY_0: "interior",
      LED_BATTERY_2_2_INT_DISPLAY_0: "interior",
      LED_BATTERY_3_2_INT_DISPLAY_0: "interior",
      LED_WATER_0_2_INT_DISPLAY_0: "interior",
      LED_WATER_1_2_INT_DISPLAY_0: "interior",
      LED_WATER_2_2_INT_DISPLAY_0: "interior",
      LED_WATER_3_2_INT_DISPLAY_0: "interior",
      LED_OIL_0_2_INT_DISPLAY_0: "interior",
      LED_OIL_1_2_INT_DISPLAY_0: "interior",
      LED_OIL_2_2_INT_DISPLAY_0: "interior",
      LED_OIL_3_2_INT_DISPLAY_0: "interior",
    },
  },
  {
    id: "suv",
    label: "SUV",
    icon: "🚙",
    model: "/models/g63.glb",
    overrides: {
      // primary
      Object_255: "primary",
      Object_251: "primary",
      Object_410: "primary",
      // secondary
      Object_415: "secondary",
      Object_305: "secondary",
      Object_201: "secondary",
      Object_192: "secondary",
      Object_206: "secondary",
      Object_72: "secondary",
      Object_330: "secondary",
      Object_187: "secondary",
      Object_405: "secondary",
      Object_507: "secondary",
      // rim
      Object_519: "rim",
      Object_531: "rim",
      Object_549: "rim",
      Object_551: "rim",
      Object_541: "rim",
      Object_425: "rim",
      Object_529: "rim",
      // tire
      Object_523: "tire",
      Object_521: "tire",
      Object_543: "tire",
      Object_533: "tire",
      // interior
      Object_117: "interior",
      Object_27: "interior",
      Object_32: "interior",
      Object_37: "interior",
      Object_455: "interior",
      Object_490: "interior",
      Object_52: "interior",
      Object_132: "interior",
      Object_127: "interior",
      Object_385: "interior",
      Object_380: "interior",
      Object_475: "interior",
      Object_246: "interior",
      Object_142: "interior",
      Object_265: "interior",
      Object_97: "interior",
      Object_270: "interior",
      Object_82: "interior",
      Object_22: "interior",
      Object_440: "interior",
      Object_112: "interior",
      Object_47: "interior",
      Object_67: "interior",
      Object_137: "interior",
      Object_122: "interior",
      Object_147: "interior",
      Object_375: "interior",
      Object_450: "interior",
      Object_77: "interior",
      Object_87: "interior",
    },
  },
  {
    id: "coupe",
    label: "Coupe",
    icon: "✨",
    model: "/models/jag.glb",
    overrides: {
      // primary
      Object_208: "primary",
      Object_7: "primary",
      Object_9: "primary",
      Object_21: "primary",
      Object_25: "primary",
      Object_33: "primary",
      Object_37: "primary",
      Object_43: "primary",
      Object_47: "primary",
      Object_63: "primary",
      Object_67: "primary",
      Object_76: "primary",
      Object_109: "primary",
      Object_111: "primary",
      Object_113: "primary",
      Object_122: "primary",
      Object_124: "primary",
      Object_140: "primary",
      Object_142: "primary",
      Object_167: "primary",
      Object_180: "primary",
      Object_210: "primary",
      Object_221: "primary",
      Object_223: "primary",
      Object_229: "primary",
      Object_234: "primary",
      Object_239: "primary",
      Object_246: "primary",
      Object_250: "primary",
      Object_259: "primary",
      Object_261: "primary",
      Object_295: "primary",
      Object_297: "primary",
      // secondary
      Object_97: "secondary",
      Object_99: "secondary",
      Object_225: "secondary",
      Object_83: "secondary",
      Object_304: "secondary",
      Object_212: "secondary",
      Object_217: "secondary",
      Object_227: "secondary",
      // glass
      Object_39: "glass",
      Object_17: "glass",
      Object_41: "glass",
      Object_11: "glass",
      Object_29: "glass",
      Object_45: "glass",
      Object_193: "glass",
      Object_199: "glass",
      Object_278: "glass",
      Object_288: "glass",
      // rim
      Object_319: "rim",
      Object_313: "rim",
      Object_340: "rim",
      Object_338: "rim",
      Object_336: "rim",
      Object_334: "rim",
      Object_317: "rim",
      Object_315: "rim",
      Object_350: "rim",
      Object_356: "rim",
      Object_352: "rim",
      Object_354: "rim",
      Object_361: "rim",
      Object_367: "rim",
      Object_365: "rim",
      Object_363: "rim",
      // tire
      Object_329: "tire",
      Object_324: "tire",
      Object_345: "tire",
      Object_372: "tire",
      // interior
      Object_13: "interior",
      Object_15: "interior",
      Object_19: "interior",
      Object_23: "interior",
      Object_27: "interior",
      Object_31: "interior",
      Object_35: "interior",
      Object_49: "interior",
      Object_51: "interior",
      Object_53: "interior",
      Object_55: "interior",
      Object_57: "interior",
      Object_59: "interior",
      Object_61: "interior",
      Object_65: "interior",
      Object_69: "interior",
      Object_71: "interior",
      Object_81: "interior",
      Object_88: "interior",
      Object_93: "interior",
      Object_95: "interior",
      Object_104: "interior",
      Object_118: "interior",
      Object_120: "interior",
      Object_126: "interior",
      Object_128: "interior",
      Object_133: "interior",
      Object_138: "interior",
      Object_147: "interior",
      Object_149: "interior",
      Object_154: "interior",
      Object_156: "interior",
      Object_158: "interior",
      Object_160: "interior",
      Object_165: "interior",
      Object_169: "interior",
      Object_171: "interior",
      Object_173: "interior",
      Object_178: "interior",
      Object_182: "interior",
      Object_184: "interior",
      Object_186: "interior",
      Object_191: "interior",
      Object_195: "interior",
      Object_197: "interior",
      Object_201: "interior",
      Object_206: "interior",
      Object_219: "interior",
      Object_244: "interior",
      Object_248: "interior",
      Object_252: "interior",
      Object_254: "interior",
      Object_263: "interior",
      Object_265: "interior",
      Object_267: "interior",
      Object_269: "interior",
      Object_274: "interior",
      Object_276: "interior",
      Object_280: "interior",
      Object_282: "interior",
      Object_284: "interior",
      Object_286: "interior",
      Object_293: "interior",
      Object_302: "interior",
      Object_306: "interior",
      Object_308: "interior",
    },
  },
  {
    id: "sedan",
    label: "Sedan",
    icon: "🚗",
    model: "/models/rs6.glb",
    overrides: {
      // primary
      Object_108: "primary",
      Object_81: "primary",
      Object_241: "primary",
      Object_243: "primary",
      Object_245: "primary",
      Object_247: "primary",
      Object_249: "primary",
      Object_251: "primary",
      Object_253: "primary",
      Object_255: "primary",
      Object_257: "primary",
      Object_33: "primary",
      Object_39: "primary",
      Object_75: "primary",
      Object_99: "primary",
      Object_101: "primary",
      Object_103: "primary",
      Object_113: "primary",
      Object_121: "primary",
      Object_131: "primary",
      Object_147: "primary",
      Object_165: "primary",
      Object_177: "primary",
      Object_299: "primary",
      AKit1_Grille1_Geo_lodA_Kit1_Grille1_Geo_lodA_Audi_RS6AvantRewardRecycled_2020Grille1A_Material_AAudi_RS6AvantRewardRecycled_2020Grille1A_Material1_0:
        "primary",
      AKit1_Paint_Geo_lodA_Kit1_Paint_Geo_lodA_Audi_RS6AvantRewardRecycled_2020Paint_Material_AAudi_RS6AvantRewardRecycled_2020Paint_Material1_0:
        "primary",
      // secondary
      Object_140: "secondary",
      Object_134: "secondary",
      Object_142: "secondary",
      Object_84: "secondary",
      Object_51: "secondary",
      Object_136: "secondary",
      Object_57: "secondary",
      Object_107: "secondary",
      Object_43: "secondary",
      Object_109: "secondary",
      Object_29: "secondary",
      Object_35: "secondary",
      Object_37: "secondary",
      Object_41: "secondary",
      Object_45: "secondary",
      Object_47: "secondary",
      Object_49: "secondary",
      EVKit0_Coloured_Geo_lodA_Kit0_Coloured_Geo_lodA_MercedesAMG_CLAEVRewardRecycled_2025Coloured_Material_EVMercedesAMG_CLAEVRewardRecycled_2025Coloured_Material1_0:
        "secondary",
      AKit1_Carbon1_Geo_lodA_Kit1_Carbon1_Geo_lodA_Audi_RS6AvantRewardRecycled_2020Carbon1_Material_AAudi_RS6AvantRewardRecycled_2020Carbon1_Material1_0:
        "secondary",
      AKit1_Coloured_Geo_lodA_Kit1_Coloured_Geo_lodA_Audi_RS6AvantRewardRecycled_2020Coloured_Material_AAudi_RS6AvantRewardRecycled_2020Coloured_Material1_0:
        "secondary",
      AKit1_Badge_Geo_lodA_Kit1_Badge_Geo_lodA_Audi_RS6AvantRewardRecycled_2020BadgeA_Material_AAudi_RS6AvantRewardRecycled_2020BadgeA_Material1_0:
        "secondary",
      polySurface592_AAudi_RS6AvantRewardRecycled_2020_CallipersCalliperGloss_87e966e1_0:
        "secondary",
      // glass
      Object_93: "glass",
      Object_297: "glass",
      Object_293: "glass",
      Object_291: "glass",
      Object_303: "glass",
      Object_287: "glass",
      Object_289: "glass",
      Object_295: "glass",
      Object_191: "glass",
      Object_193: "glass",
      Object_195: "glass",
      Object_301: "glass",
      Object_23: "glass",
      EVKit0_Window_Geo_lodA_Kit0_Window_Geo_lodA_MercedesAMG_CLAEVRewardRecycled_2025Window_Material_EVMercedesAMG_CLAEVRewardRecycled_2025Window_Material1_0:
        "glass",
      EVKit0_Window_Geo_lodA_Kit0_Window_Geo_lodA_MercedesAMG_CLAEVRewardRecycled_2025Window_Material_D_glass_0:
        "glass",
      AWindow_Geo_lodA_Window_Geo_lodA_Audi_RS6AvantRewardRecycled_2020Window_Material_AAudi_RS6AvantRewardRecycled_2020Window_Material1_0:
        "glass",
      AWindow_Geo_lodA_Window_Geo_lodA_Audi_RS6AvantRewardRecycled_2020Window_Material_red_glass_0:
        "glass",
      // rim
      Object_162: "rim",
      Object_156: "rim",
      Object_146: "rim",
      Object_152: "rim",
      Object_11: "rim",
      Object_7: "rim",
      Object_9: "rim",
      Object_5: "rim",
      polySurface1_EVMercedesAMG_CLAEVRewardRecycled_2025_Wheel1A_3D_3DWheel_7af8362_0:
        "rim",
      polySurface311_EVMercedesAMG_CLAEVRewardRecycled_2025_Wheel1A_3D_3DWheel_7af8362_0:
        "rim",
      polySurface75_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface81_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface97_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface83_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface80_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface89_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface94_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface64_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface82_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface17_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface134_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface132_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface79_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface138_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface131_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface104_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface98_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface76_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface293_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface294_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface349_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface351_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface373_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface359_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface340_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface370_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface365_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface304_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface313_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface322_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface279_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface302_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface331_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface355_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface356_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface358_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface357_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface352_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface353_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface414_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface410_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface412_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface407_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface368_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface371_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface508_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface489_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface495_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface496_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface497_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface511_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface518_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface493_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface503_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface478_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface490_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface510_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface494_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface432_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface431_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface442_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface433_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface469_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface460_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface451_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface512_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface487_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface218_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface227_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface213_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface202_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface217_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface221_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface235_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface220_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface232_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface215_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface219_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface156_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface155_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface175_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface184_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface193_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface157_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface166_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface270_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface276_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface272_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface214_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface230_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface233_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface18_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface93_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface19_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface28_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface37_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface46_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      polySurface55_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "rim",
      // tire
      Object_117: "tire",
      Object_132: "tire",
      Object_153: "tire",
      Object_31: "tire",
      Object_111: "tire",
      Object_123: "tire",
      Object_129: "tire",
      Object_135: "tire",
      Object_120: "tire",
      Object_114: "tire",
      Object_174: "tire",
      Object_126: "tire",
      Object_138: "tire",
      Object_150: "tire",
      Object_144: "tire",
      Object_149: "tire",
      Object_154: "tire",
      Object_1715: "tire",
      Object_1718: "tire",
      Object_1721: "tire",
      Object_1724: "tire",
      Object_1727: "tire",
      Object_1730: "tire",
      Object_1733: "tire",
      Object_1736: "tire",
      Object_1739: "tire",
      Object_1748: "tire",
      Object_1742: "tire",
      Object_1673: "tire",
      Object_1709: "tire",
      Object_1712: "tire",
      Object_1706: "tire",
      Object_1703: "tire",
      Object_1700: "tire",
      Object_1694: "tire",
      Object_1691: "tire",
      Object_1688: "tire",
      Object_1685: "tire",
      Object_1682: "tire",
      Object_1679: "tire",
      Object_1676: "tire",
      Object_1697: "tire",
      Object_2499: "tire",
      Object_2502: "tire",
      Object_2493: "tire",
      Object_2496: "tire",
      Object_2505: "tire",
      Object_2508: "tire",
      Object_2511: "tire",
      Object_2514: "tire",
      Object_2517: "tire",
      Object_2520: "tire",
      Object_2523: "tire",
      Object_2454: "tire",
      ABase_Geo_lodA_Base_Geo_lodA_Audi_RS6AvantRewardRecycled_2020Base_Material_AAudi_RS6AvantRewardRecycled_2020Base_Material1_0:
        "tire",
      polySurface121_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface120_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface130_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface117_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface118_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface119_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface122_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface116_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface115_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface114_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface113_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface112_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface111_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface110_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface109_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface108_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface107_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface123_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface124_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface125_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface126_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface397_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface395_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface394_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface393_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface392_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface390_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface389_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface406_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface388_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface391_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface396_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface398_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface387_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface386_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface385_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface384_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface383_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface382_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface405_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface404_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface403_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface401_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface402_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface400_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface399_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface350_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface534_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface533_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface532_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface531_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface530_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface529_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface528_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface527_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface526_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface525_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface544_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface535_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface536_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface260_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface258_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface259_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface257_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface256_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface255_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface254_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface253_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface251_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface252_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface268_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface537_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface538_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface127_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface128_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface129_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface106_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface105_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface103_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface102_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface101_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface100_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface99_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface539_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface540_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface95_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface96_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface92_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface91_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface90_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface87_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface88_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface86_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface85_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface84_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface78_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface77_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface267_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface266_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface265_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface264_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface263_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface244_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface245_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface246_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface247_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface248_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface249_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface250_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface262_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface261_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface541_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface542_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface543_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface520_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface521_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface522_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface523_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      polySurface524_AAudi_RS6AvantRewardRecycled_2020_Wheel1A_3D_3DWheel1A_Material1_0:
        "tire",
      // interior
      Object_141: "interior",
      Object_159: "interior",
      Object_161: "interior",
      Object_157: "interior",
      Object_151: "interior",
      Object_279: "interior",
      Object_283: "interior",
      Object_285: "interior",
      Object_281: "interior",
      Object_239: "interior",
      Object_237: "interior",
      Object_233: "interior",
      Object_235: "interior",
      Object_231: "interior",
      Object_229: "interior",
      Object_227: "interior",
      Object_155: "interior",
      Object_163: "interior",
      Object_167: "interior",
      Object_169: "interior",
      Object_171: "interior",
      Object_175: "interior",
      Object_173: "interior",
      Object_179: "interior",
      Object_181: "interior",
      Object_183: "interior",
      Object_185: "interior",
      Object_197: "interior",
      Object_199: "interior",
      Object_201: "interior",
      Object_203: "interior",
      Object_205: "interior",
      Object_207: "interior",
      Object_209: "interior",
      Object_211: "interior",
      Object_213: "interior",
      Object_215: "interior",
      Object_217: "interior",
      Object_219: "interior",
      Object_223: "interior",
      Object_221: "interior",
      Object_225: "interior",
      Object_259: "interior",
      Object_261: "interior",
      Object_263: "interior",
      Object_265: "interior",
      Object_267: "interior",
      Object_269: "interior",
      Object_271: "interior",
      Object_273: "interior",
      Object_275: "interior",
      Object_277: "interior",
      Object_13: "interior",
      Object_15: "interior",
      Object_17: "interior",
      Object_19: "interior",
      Object_21: "interior",
      Object_25: "interior",
      Object_27: "interior",
      Object_53: "interior",
      Object_55: "interior",
      Object_59: "interior",
      Object_61: "interior",
      Object_79: "interior",
      Object_63: "interior",
      Object_65: "interior",
      Object_67: "interior",
      Object_69: "interior",
      Object_73: "interior",
      Object_71: "interior",
      Object_77: "interior",
      Object_83: "interior",
      Object_85: "interior",
      Object_87: "interior",
      Object_89: "interior",
      Object_91: "interior",
      Object_95: "interior",
      Object_97: "interior",
      Object_105: "interior",
      Object_115: "interior",
      Object_119: "interior",
      Object_127: "interior",
      Object_125: "interior",
      Object_133: "interior",
      Object_137: "interior",
      Object_139: "interior",
      Object_143: "interior",
      Object_145: "interior",
      Object_305: "interior",
      // ignore
      Object_187: "ignore",
      Object_189: "ignore",
    },
  },
  {
    id: "offroad",
    label: "Off-Road",
    icon: "🛻",
    model: "/models/jeep.glb",
    overrides: {
      // primary
      Object_76: "primary",
      Object_14: "primary",
      Object_35: "primary",
      Object_38: "primary",
      Object_41: "primary",
      Object_44: "primary",
      Object_50: "primary",
      Object_68: "primary",
      Object_78: "primary",
      Object_82: "primary",
      Object_80: "primary",
      Object_88: "primary",
      Object_90: "primary",
      Object_93: "primary",
      Object_99: "primary",
      Object_101: "primary",
      Object_107: "primary",
      Object_109: "primary",
      Object_111: "primary",
      Object_119: "primary",
      // secondary
      Object_117: "secondary",
      Object_26: "secondary",
      Object_17: "secondary",
      Object_114: "secondary",
      // glass
      Object_71: "glass",
      Object_20: "glass",
      // rim
      Object_8: "rim",
      Object_104: "rim",
      Object_96: "rim",
      Object_47: "rim",
      // tire
      Object_65: "tire",
      Object_29: "tire",
      Object_59: "tire",
      Object_23: "tire",
      // interior
      Object_11: "interior",
      Object_32: "interior",
      Object_53: "interior",
      Object_56: "interior",
      Object_62: "interior",
      Object_74: "interior",
      Object_85: "interior",
    },
  },
];

// ─── TEXTURES ─────────────────────────────────────────────────────────────────
const TEXTURE_URLS = {
  carbon: "https://www.transparenttextures.com/patterns/carbon-fibre.png",
  brushed: "https://www.transparenttextures.com/patterns/brushed-alum-dark.png",
  worn: "https://www.transparenttextures.com/patterns/worn-dots.png",
};

// ─── MESH CLASSIFICATION ──────────────────────────────────────────────────────
const SLOT_KEYWORDS = {
  primary: [
    "body",
    "hood",
    "door",
    "trunk",
    "fender",
    "roof",
    "bumper",
    "panel",
    "quarter",
    "spoiler",
    "cap",
    "shell",
    "exterior",
    "paint",
    "car_body",
    "chassis",
  ],
  secondary: [
    "secondary",
    "trim",
    "detail",
    "stripe",
    "accent",
    "sill",
    "skirt",
    "lower",
    "rocker",
    "splitter",
    "lip",
  ],
  rim: [
    "rim",
    "spoke",
    "alloy",
    "hubcap",
    "center",
    "wheel_r",
    "wheel_f",
    "disc",
    "caliper",
  ],
  glass: ["glass", "window", "windshield", "windscreen", "screen", "visor"],
  tire: ["tire", "tyre", "rubber"],
  chrome: [
    "chrome",
    "grill",
    "grille",
    "exhaust",
    "pipe",
    "mirror",
    "badge",
    "light",
    "headlight",
    "taillight",
  ],
  interior: [
    "interior",
    "seat",
    "dash",
    "dashboard",
    "cabin",
    "steering",
    "carpet",
    "console",
  ],
};

function getSlot(name, overrides = {}) {
  if (!name) return "primary";
  if (overrides[name]) return overrides[name];
  const lower = name.toLowerCase();
  for (const [slot, keys] of Object.entries(SLOT_KEYWORDS)) {
    if (keys.some((k) => lower.includes(k))) return slot;
  }
  return "primary";
}

// ─── COLOR HELPERS ────────────────────────────────────────────────────────────
function toThreeColor(hex) {
  if (!hex || hex === "transparent") return new THREE.Color(0x111111);
  if (
    typeof hex === "string" &&
    (hex.includes("gradient") || hex.includes("linear"))
  )
    return new THREE.Color(0x111111);
  const c = hex.startsWith("#") ? hex : `#${hex.replace("#", "")}`;
  try {
    return new THREE.Color(c);
  } catch {
    return new THREE.Color(0x111111);
  }
}

function hexToRgb(hex) {
  const c = (hex || "111111")
    .replace(/^#/, "")
    .replace(/[^0-9a-fA-F]/g, "0")
    .padEnd(6, "0");
  return {
    r: parseInt(c.slice(0, 2), 16),
    g: parseInt(c.slice(2, 4), 16),
    b: parseInt(c.slice(4, 6), 16),
  };
}

const isGradient = (h) =>
  typeof h === "string" && (h.includes("gradient") || h.includes("linear"));

function parseGradientStops(gradientStr) {
  const m = gradientStr.match(/#[0-9a-fA-F]{6}/g);
  if (!m || !m.length) return [new THREE.Color(0x111111)];
  return m.map((h) => new THREE.Color(h));
}

function sampleGradient(stops, t) {
  if (stops.length === 1) return stops[0].clone();
  const scaled = t * (stops.length - 1);
  const lo = Math.floor(scaled);
  const hi = Math.min(lo + 1, stops.length - 1);
  return stops[lo].clone().lerp(stops[hi], scaled - lo);
}

// ─── TEXTURE BUILDERS ─────────────────────────────────────────────────────────
const texCache = {};
function buildCompositeTexture(patternUrl, baseHex, crewHex, crewOpacity) {
  const key = `${patternUrl}|${baseHex}|${crewHex}|${crewOpacity.toFixed(2)}`;
  if (texCache[key]) return texCache[key];
  const p = new Promise((resolve) => {
    const SIZE = 512;
    const cv = document.createElement("canvas");
    cv.width = cv.height = SIZE;
    const ctx = cv.getContext("2d");
    const { r, g, b } = hexToRgb(baseHex);
    const crew = hexToRgb(crewHex || "ffffff");
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(0, 0, SIZE, SIZE);
    const img = new Image();
    img.crossOrigin = "anonymous";
    const finish = () => {
      if (crewOpacity > 0.01) {
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = `rgba(${crew.r},${crew.g},${crew.b},${crewOpacity})`;
        ctx.fillRect(0, 0, SIZE, SIZE);
      }
      ctx.globalCompositeOperation = "source-over";
      const tex = new THREE.CanvasTexture(cv);
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(4, 4);
      tex.needsUpdate = true;
      resolve(tex);
    };
    img.onload = () => {
      // Scale pattern opacity by luminance — very dark colors skip the overlay entirely
      // so the texture can't lift near-black above its actual hex value.
      const luma = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
      if (luma > 0.08) {
        const patOpacity = Math.pow((luma - 0.08) / 0.92, 0.6) * 0.45;
        ctx.globalAlpha = patOpacity;
        ctx.globalCompositeOperation = "multiply";
        const pat = ctx.createPattern(img, "repeat");
        if (pat) {
          ctx.fillStyle = pat;
          ctx.fillRect(0, 0, SIZE, SIZE);
        }
        ctx.globalAlpha = 1.0;
        ctx.globalCompositeOperation = "source-over";
      }
      finish();
    };
    img.onerror = finish;
    img.src = patternUrl;
  });
  texCache[key] = p;
  return p;
}

const gradTexCache = {};
function buildGradientCanvasTexture(stops, crewHex, crewOpacity) {
  const key =
    stops.map((c) => c.getHexString()).join(",") +
    "|" +
    crewHex +
    "|" +
    crewOpacity.toFixed(2);
  if (gradTexCache[key]) return gradTexCache[key];
  const W = 512;
  const H = 512;
  const cv = document.createElement("canvas");
  cv.width = W;
  cv.height = H;
  const ctx = cv.getContext("2d");
  ctx.fillStyle = `#${stops[0].getHexString()}`;
  ctx.fillRect(0, 0, W, H);
  const blobs = [
    {
      x: W * 0.75,
      y: H * 0.35,
      r: W * 0.7,
      si: Math.floor(stops.length * 0.65),
    },
    {
      x: W * 0.25,
      y: H * 0.65,
      r: W * 0.55,
      si: Math.floor(stops.length * 0.5),
    },
    {
      x: W * 0.85,
      y: H * 0.8,
      r: W * 0.45,
      si: Math.floor(stops.length * 0.8),
    },
  ];
  blobs.forEach(({ x, y, r, si }) => {
    const stop = stops[Math.min(si, stops.length - 1)];
    const dark = stops[0];
    const rad = ctx.createRadialGradient(x, y, 0, x, y, r);
    rad.addColorStop(0, `#${stop.getHexString()}`);
    rad.addColorStop(0.6, `#${stop.getHexString()}aa`);
    rad.addColorStop(1, `#${dark.getHexString()}00`);
    ctx.globalCompositeOperation = "screen";
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, W, H);
  });
  ctx.globalCompositeOperation = "source-over";
  if (crewOpacity > 0.01) {
    const { r, g, b } = hexToRgb(crewHex);
    ctx.fillStyle = `rgba(${r},${g},${b},${crewOpacity})`;
    ctx.fillRect(0, 0, W, H);
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 1);
  tex.needsUpdate = true;
  gradTexCache[key] = tex;
  return tex;
}

// ─── PBR PROFILES ─────────────────────────────────────────────────────────────
function getPaintProfile(colorObj) {
  if (!colorObj)
    return {
      roughness: 0.5,
      metalness: 0.0,
      clearcoat: 0,
      envMapIntensity: 0.1,
      iridescence: 0,
    };
  const color = toThreeColor(colorObj.hex);
  const type = colorObj.type || "Metallic";
  const name = (colorObj.name || "").toLowerCase();
  switch (type) {
    case "Metallic": {
      // Metallic paint — mid-sheen. Luma gating prevents dark colors going grey.
      const luma = color.r * 0.299 + color.g * 0.587 + color.b * 0.114;
      const envI = luma < 0.05 ? 0 : Math.pow(luma, 0.7) * 0.8;
      return {
        color,
        roughness: 0.25,
        metalness: 0.6,
        clearcoat: 0.7,
        clearcoatRoughness: 0.1,
        envMapIntensity: envI,
        iridescence: 0,
      };
    }
    case "Matte":
      // Completely flat — no env, no clearcoat, no metalness. Pure diffuse.
      return {
        color,
        roughness: 1.0,
        metalness: 0.0,
        clearcoat: 0,
        clearcoatRoughness: 0,
        envMapIntensity: 0.0,
        iridescence: 0,
      };
    case "Chrome":
      return {
        color: new THREE.Color("#C8CDD0"),
        roughness: 0.0,
        metalness: 1.0,
        clearcoat: 1.0,
        clearcoatRoughness: 0.0,
        envMapIntensity: 2.5,
        iridescence: 0,
      };
    case "Metals": {
      const brushed = name.includes("brushed");
      return {
        color,
        roughness: brushed ? 0.55 : 0.25,
        metalness: brushed ? 0.7 : 0.9,
        clearcoat: brushed ? 0.0 : 0.5,
        clearcoatRoughness: brushed ? 0.0 : 0.1,
        envMapIntensity: brushed ? 0.4 : 1.2,
        iridescence: 0,
        _tex: brushed ? TEXTURE_URLS.brushed : TEXTURE_URLS.carbon,
      };
    }
    case "Chameleon": {
      const gradStops = isGradient(colorObj.hex)
        ? parseGradientStops(colorObj.hex)
        : null;
      const baseColor = gradStops
        ? sampleGradient(gradStops, 0.15)
        : new THREE.Color(0x111111);
      return {
        color: baseColor,
        roughness: 0.25,
        metalness: 0.35,
        clearcoat: 1.0,
        clearcoatRoughness: 0.06,
        iridescence: 0.55,
        iridescenceIOR: 1.8,
        iridescenceThicknessRange: [150, 500],
        envMapIntensity: 0.3,
        _gradStops: gradStops,
        _isChameleon: true,
      };
    }
    case "Worn": {
      // Dull version of Matte — slightly more sheen but very close.
      const luma = color.r * 0.299 + color.g * 0.587 + color.b * 0.114;
      const envI = luma < 0.05 ? 0 : Math.pow(luma, 0.7) * 0.06;
      return {
        color,
        roughness: 0.88,
        metalness: 0.0,
        clearcoat: 0.05,
        clearcoatRoughness: 0.5,
        envMapIntensity: envI,
        iridescence: 0,
      };
    }
    case "Util": {
      // Shinier than Metallic — higher clearcoat. Same luma gating.
      const luma = color.r * 0.299 + color.g * 0.587 + color.b * 0.114;
      const envI = luma < 0.05 ? 0 : Math.pow(luma, 0.7) * 0.5;
      return {
        color,
        roughness: 0.15,
        metalness: 0.0,
        clearcoat: 1.0,
        clearcoatRoughness: 0.04,
        envMapIntensity: envI,
        iridescence: 0,
      };
    }
    case "Rim":
      return {
        color,
        roughness: 0.2,
        metalness: 0.8,
        clearcoat: 0.6,
        clearcoatRoughness: 0.1,
        envMapIntensity: 1.0,
        iridescence: 0,
      };
    default:
      return {
        color,
        roughness: 0.4,
        metalness: 0.3,
        clearcoat: 0.2,
        envMapIntensity: 0.3,
        iridescence: 0,
      };
  }
}

function needsTexture(colorObj) {
  // Only Metals (brushed/carbon pattern) needs canvas compositing.
  // isTexture is a UI obtainability flag only — never affects material rendering.
  // Chameleon is handled separately via buildGradientCanvasTexture.
  return colorObj?.type === "Metals";
}

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
function CarModel({
  config,
  autoRotate,
  onLoaded,
  vehicleOverrides,
  pickerMode,
  pickerOverrides,
  hoveredUUID,
  onMeshClick,
  onMeshHover,
}) {
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

  const allOverrides = useMemo(
    () => ({ ...vehicleOverrides, ...(pickerOverrides || {}) }),
    [vehicleOverrides, pickerOverrides],
  );

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

      // Picker mode — show slot colour highlight
      if (pickerMode) {
        mat.map = null;
        mat.iridescence = 0;
        mat.transparent = false;
        mat.opacity = 1;
        mat.color =
          child.uuid === hoveredUUID
            ? new THREE.Color("#ffffff")
            : SLOT_HIGHLIGHT[slot] || SLOT_HIGHLIGHT.primary;
        mat.emissive =
          child.uuid === hoveredUUID
            ? new THREE.Color("#ffffff")
            : new THREE.Color(0, 0, 0);
        mat.emissiveIntensity = child.uuid === hoveredUUID ? 0.4 : 0;
        mat.roughness = 0.6;
        mat.metalness = 0.1;
        mat.clearcoat = 0;
        mat.envMapIntensity = 0;
        mat.needsUpdate = true;
        return;
      }

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
        mat.clearcoatColor = pearlColor;
        mat.clearcoat = Math.max(mat.clearcoat, 0.92);
        mat.clearcoatRoughness = Math.min(mat.clearcoatRoughness, 0.06);
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
  }, [cloned, config, allOverrides, pickerMode, hoveredUUID]);

  // Hide glass in picker mode so interior meshes are clickable through it
  useEffect(() => {
    if (!cloned) return;
    cloned.traverse((child) => {
      if (!child.isMesh) return;
      const slot = getSlot(child.name, allOverrides);
      if (slot === "glass") child.visible = !pickerMode;
    });
  }, [cloned, pickerMode, allOverrides]);

  // Picker raycaster
  const { gl, camera } = useThree();
  const ptr = useRef(new THREE.Vector2());
  const ray = useRef(new THREE.Raycaster());
  useEffect(() => {
    if (!pickerMode) return;
    const el = gl.domElement;
    const uv = (e) => {
      const r = el.getBoundingClientRect();
      ptr.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      ptr.current.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    };
    const onClick = (e) => {
      uv(e);
      ray.current.setFromCamera(ptr.current, camera);
      const hits = ray.current.intersectObject(cloned, true);
      if (hits.length > 0 && onMeshClick) onMeshClick(hits[0].object);
    };
    const onMove = (e) => {
      uv(e);
      ray.current.setFromCamera(ptr.current, camera);
      const hits = ray.current.intersectObject(cloned, true);
      if (onMeshHover)
        onMeshHover(hits.length > 0 ? hits[0].object.uuid : null);
    };
    el.addEventListener("click", onClick);
    el.addEventListener("mousemove", onMove);
    return () => {
      el.removeEventListener("click", onClick);
      el.removeEventListener("mousemove", onMove);
    };
  }, [pickerMode, gl, camera, cloned, onMeshClick, onMeshHover]);

  useFrame((_, delta) => {
    if (autoRotate && !pickerMode && groupRef.current)
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
function Scene({
  config,
  autoRotate,
  onModelLoaded,
  vehicleOverrides,
  pickerMode,
  pickerOverrides,
  hoveredUUID,
  onMeshClick,
  onMeshHover,
}) {
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
        autoRotate={autoRotate && !pickerMode}
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
      <ambientLight intensity={pickerMode ? 0.6 : 0.08} />
      {!pickerMode && <Environment preset="warehouse" background={false} />}
      {!pickerMode && (
        <ContactShadows
          position={[0, 0, 0]}
          opacity={0.72}
          scale={28}
          blur={3.2}
          far={5}
        />
      )}
      <Suspense fallback={<Loader />}>
        <CarModel
          config={config}
          autoRotate={autoRotate}
          onLoaded={handleLoaded}
          vehicleOverrides={vehicleOverrides}
          pickerMode={pickerMode}
          pickerOverrides={pickerOverrides}
          hoveredUUID={hoveredUUID}
          onMeshClick={onMeshClick}
          onMeshHover={onMeshHover}
        />
      </Suspense>
    </>
  );
}

// ─── VEHICLE TAB ROW ──────────────────────────────────────────────────────────
function VehicleTabRow({ vehicles, activeId, onChange }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        background: "#060606",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        overflowX: "auto",
        scrollbarWidth: "none",
      }}
    >
      <style>{`.vtabs::-webkit-scrollbar{display:none}`}</style>
      {vehicles.map((v) => {
        const active = v.id === activeId;
        return (
          <button
            key={v.id}
            onClick={() => onChange(v.id)}
            style={{
              flex: "0 0 auto",
              background: active ? "rgba(234,179,8,0.07)" : "transparent",
              border: "none",
              borderBottom: `2px solid ${active ? "#EAB308" : "transparent"}`,
              borderRight: "1px solid rgba(255,255,255,0.04)",
              padding: "10px 18px 8px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              transition: "all 0.15s",
              minWidth: 72,
            }}
          >
            <span style={{ fontSize: 16, lineHeight: 1 }}>{v.icon}</span>
            <span
              style={{
                fontSize: 8,
                fontWeight: 900,
                letterSpacing: "0.1em",
                color: active ? "#EAB308" : "rgba(255,255,255,0.3)",
                transition: "color 0.15s",
              }}
            >
              {v.label.toUpperCase()}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── WHEEL HUD (floating, bottom-right of canvas) ────────────────────────────
function WheelHud({ wheelStyle }) {
  const [expanded, setExpanded] = useState(false);
  if (!wheelStyle) return null;
  const hasImg = wheelStyle.img && wheelStyle.img !== "/no-stock.png";

  return (
    <div
      style={{
        position: "absolute",
        bottom: 12,
        right: 12,
        zIndex: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 6,
      }}
    >
      {expanded && hasImg && (
        <div
          style={{
            background: "rgba(6,6,6,0.94)",
            border: "1px solid rgba(234,179,8,0.18)",
            borderRadius: 8,
            padding: "12px 12px 8px",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            boxShadow: "0 12px 40px rgba(0,0,0,0.8)",
            animation: "wfadeup 0.15s ease",
          }}
        >
          <style>{`@keyframes wfadeup{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}`}</style>
          <img
            src={wheelStyle.img}
            alt={wheelStyle.name}
            referrerPolicy="no-referrer"
            style={{
              width: 110,
              height: 110,
              objectFit: "contain",
              filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.9))",
            }}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 900,
                color: "#EAB308",
                letterSpacing: "0.06em",
              }}
            >
              {wheelStyle.name}
            </div>
            {wheelStyle.category && (
              <div
                style={{
                  fontSize: 7.5,
                  color: "#444",
                  marginTop: 2,
                  letterSpacing: "0.1em",
                }}
              >
                {wheelStyle.category.replace(/_/g, " ").toUpperCase()}
              </div>
            )}
          </div>
        </div>
      )}
      <button
        onClick={() => setExpanded((v) => !v)}
        style={{
          background: expanded ? "rgba(234,179,8,0.1)" : "rgba(6,6,6,0.85)",
          border: `1px solid ${expanded ? "rgba(234,179,8,0.3)" : "rgba(255,255,255,0.08)"}`,
          borderRadius: 20,
          padding: "4px 10px 4px 7px",
          cursor: "pointer",
          backdropFilter: "blur(10px)",
          display: "flex",
          alignItems: "center",
          gap: 6,
          transition: "all 0.15s",
        }}
      >
        {hasImg && (
          <img
            src={wheelStyle.img}
            alt=""
            referrerPolicy="no-referrer"
            style={{
              width: 16,
              height: 16,
              objectFit: "contain",
              filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.9))",
            }}
          />
        )}
        <span
          style={{
            fontSize: 8,
            fontWeight: 900,
            letterSpacing: "0.12em",
            color: expanded ? "#EAB308" : "rgba(255,255,255,0.45)",
          }}
        >
          {wheelStyle.name?.toUpperCase() || "WHEEL"}
        </span>
        <span style={{ fontSize: 7, color: "#333" }}>
          {expanded ? "▲" : "▼"}
        </span>
      </button>
    </div>
  );
}

// ─── PAINT HUD ────────────────────────────────────────────────────────────────
const TYPE_BADGE = {
  Chrome: { bg: "#0c1c26", border: "#3a7a9a", text: "#78b8d8", icon: "✦" },
  Matte: { bg: "#141414", border: "#383838", text: "#787878", icon: "◼" },
  Chameleon: { bg: "#10081e", border: "#6a4aaa", text: "#b890f4", icon: "◈" },
  Metals: { bg: "#181208", border: "#7a5018", text: "#c09030", icon: "⬡" },
  Metallic: { bg: "#08101e", border: "#2a4880", text: "#70a0d0", icon: "◇" },
  Worn: { bg: "#141010", border: "#4a3028", text: "#886050", icon: "◧" },
};

function PaintHud({ config, crewVisible, crewTarget }) {
  const getBg = (c) => {
    if (!c?.hex || c.hex === "transparent") return "#1a1a1a";
    if (isGradient(c.hex)) return c.hex;
    return `#${c.hex.replace("#", "")}`;
  };
  const slots = [
    { label: "PRI", c: config.primary },
    { label: "SEC", c: config.secondary },
    {
      label: "PRL",
      c: config.pearl?.hex !== "transparent" ? config.pearl : null,
    },
    { label: "RIM", c: config.rim },
  ].filter((s) => s.c);
  const badge = TYPE_BADGE[config.primary?.type];
  return (
    <div
      style={{
        position: "absolute",
        top: 12,
        left: 12,
        zIndex: 30,
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        gap: 5,
      }}
    >
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        {slots.map(({ label, c }) => (
          <div
            key={label}
            style={{ display: "flex", alignItems: "center", gap: 3 }}
          >
            <div
              style={{
                width: 13,
                height: 13,
                borderRadius: 3,
                background: getBg(c),
                border: "1px solid rgba(255,255,255,0.1)",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 7,
                color: "rgba(255,255,255,0.28)",
                fontWeight: 800,
                letterSpacing: "0.08em",
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
      {config.primary && (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              fontSize: 9,
              color: "rgba(255,255,255,0.55)",
              fontWeight: 900,
            }}
          >
            {config.primary.name}
          </span>
          {badge && (
            <span
              style={{
                background: badge.bg,
                border: `1px solid ${badge.border}`,
                borderRadius: 3,
                padding: "1px 5px",
                fontSize: 7.5,
                color: badge.text,
                fontWeight: 900,
              }}
            >
              {badge.icon} {config.primary.type?.toUpperCase()}
            </span>
          )}
        </div>
      )}
      {crewVisible && (
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 2,
              background: config.crew?.hex || "#ff00ff",
              border: "1px solid rgba(234,179,8,0.5)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: 7.5,
              fontWeight: 900,
              letterSpacing: "0.1em",
              color: "rgba(234,179,8,0.75)",
            }}
          >
            CREW · {(crewTarget || "BOTH").toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
}

// ─── MESH PICKER PANEL ────────────────────────────────────────────────────────
function MeshPickerPanel({
  vehicleId,
  meshNames,
  overrides,
  selectedSlot,
  setSelectedSlot,
  onAssign,
  onReset,
  onExport,
  onClose,
}) {
  const counts = {};
  Object.values(overrides).forEach((s) => {
    counts[s] = (counts[s] || 0) + 1;
  });
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        width: 240,
        background: "rgba(5,5,5,0.97)",
        borderRight: "1px solid rgba(234,179,8,0.1)",
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        backdropFilter: "blur(20px)",
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          padding: "10px 12px 7px",
          borderBottom: "1px solid #0e0e0e",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 9,
              fontWeight: 900,
              color: "#EAB308",
              letterSpacing: "0.14em",
            }}
          >
            ASSIGN MESHES
          </div>
          <div style={{ fontSize: 7.5, color: "#333", marginTop: 1 }}>
            {vehicleId.toUpperCase()} · pick slot → click part
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "1px solid #1e1e1e",
            color: "#444",
            borderRadius: 3,
            padding: "2px 7px",
            cursor: "pointer",
            fontSize: 8,
          }}
        >
          DONE ✓
        </button>
      </div>
      <div
        style={{
          padding: "7px 12px",
          borderBottom: "1px solid #0e0e0e",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {Object.entries(SLOT_META).map(([key, { label, color }]) => (
          <button
            key={key}
            onClick={() => setSelectedSlot(key)}
            style={{
              background: selectedSlot === key ? `${color}12` : "transparent",
              border: `1px solid ${selectedSlot === key ? color : "#181818"}`,
              borderRadius: 3,
              padding: "4px 7px",
              display: "flex",
              alignItems: "center",
              gap: 7,
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                background: color,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 8,
                fontWeight: 900,
                letterSpacing: "0.05em",
                color: selectedSlot === key ? color : "#444",
              }}
            >
              {label.toUpperCase()}
              {counts[key] ? (
                <span style={{ color: "#2a2a2a", marginLeft: 4 }}>
                  ({counts[key]})
                </span>
              ) : null}
            </span>
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "6px 12px" }}>
        <div style={{ fontSize: 7.5, color: "#252525", marginBottom: 4 }}>
          {Object.keys(overrides).length}/{meshNames.length} ASSIGNED
        </div>
        {meshNames.map((name) => {
          const slot = overrides[name];
          const sc = slot ? SLOT_META[slot] : null;
          return (
            <div
              key={name}
              onClick={() => onAssign(name)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "2px 5px",
                borderRadius: 3,
                cursor: "pointer",
                marginBottom: 1,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#0d0d0d")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <span
                style={{
                  fontSize: 7.5,
                  color: "#383838",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: 130,
                }}
              >
                {name}
              </span>
              {sc && (
                <span
                  style={{
                    fontSize: 7,
                    fontWeight: 900,
                    color: sc.color,
                    background: `${sc.color}12`,
                    border: `1px solid ${sc.color}33`,
                    borderRadius: 2,
                    padding: "1px 4px",
                    flexShrink: 0,
                    marginLeft: 3,
                  }}
                >
                  {slot.toUpperCase()}
                </span>
              )}
            </div>
          );
        })}
      </div>
      <div
        style={{
          padding: "8px 12px",
          borderTop: "1px solid #0e0e0e",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <button
          onClick={onExport}
          style={{
            background: "rgba(234,179,8,0.07)",
            border: "1px solid rgba(234,179,8,0.22)",
            color: "#EAB308",
            borderRadius: 3,
            padding: "5px",
            cursor: "pointer",
            fontSize: 8,
            fontWeight: 900,
            letterSpacing: "0.1em",
          }}
        >
          EXPORT → VEHICLES[{vehicleId}].overrides
        </button>
        <button
          onClick={onReset}
          style={{
            background: "transparent",
            border: "1px solid #161616",
            color: "#2e2e2e",
            borderRadius: 3,
            padding: "4px",
            cursor: "pointer",
            fontSize: 7.5,
          }}
        >
          RESET
        </button>
      </div>
    </div>
  );
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
export default function CarPreview({
  config,
  crewVisible,
  crewTarget = "both",
}) {
  const [activeVehicleId, setActiveVehicleId] = useState(VEHICLES[0].id);
  const [autoRotate, setAutoRotate] = useState(true);
  const [hintsDone, setHintsDone] = useState(false);
  const [pickerMode, setPickerMode] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("primary");
  const [hoveredUUID, setHoveredUUID] = useState(null);
  const [meshNames, setMeshNames] = useState([]);
  const [pickerOverrides, setPickerOverrides] = useState(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      return s ? JSON.parse(s) : {};
    } catch {
      return {};
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pickerOverrides));
    } catch {}
  }, [pickerOverrides]);

  const activeVehicle =
    VEHICLES.find((v) => v.id === activeVehicleId) || VEHICLES[0];
  const vehicleOverrides = activeVehicle.overrides || {};
  const activePicker = pickerOverrides[activeVehicleId] || {};

  const handleVehicleChange = useCallback((id) => {
    setActiveVehicleId(id);
    setPickerMode(false);
    setMeshNames([]);
  }, []);

  const handleModelLoaded = useCallback((m) => {
    const names = [];
    m.traverse((c) => {
      if (c.isMesh) names.push(c.name);
    });
    setMeshNames(names);
  }, []);

  const handleMeshClick = useCallback(
    (mesh) => {
      setPickerOverrides((prev) => ({
        ...prev,
        [activeVehicleId]: {
          ...(prev[activeVehicleId] || {}),
          [mesh.name]: selectedSlot,
        },
      }));
    },
    [activeVehicleId, selectedSlot],
  );

  const handleReset = useCallback(() => {
    setPickerOverrides((prev) => {
      const n = { ...prev };
      delete n[activeVehicleId];
      return n;
    });
  }, [activeVehicleId]);

  const handleExport = useCallback(() => {
    const merged = { ...vehicleOverrides, ...activePicker };
    const str = JSON.stringify(merged, null, 2);
    console.log(
      `%cVEHICLES["${activeVehicleId}"].overrides:`,
      "color:#EAB308;font-weight:900",
    );
    console.log(str);
    navigator.clipboard
      ?.writeText(str)
      .then(() => alert(`✓ Copied overrides for "${activeVehicleId}"!`))
      .catch(() => alert("See browser console."));
  }, [activeVehicleId, vehicleOverrides, activePicker]);

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
            onModelLoaded={handleModelLoaded}
            vehicleOverrides={vehicleOverrides}
            pickerMode={pickerMode}
            pickerOverrides={activePicker}
            hoveredUUID={hoveredUUID}
            onMeshClick={handleMeshClick}
            onMeshHover={setHoveredUUID}
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

        {/* Picker panel */}
        {pickerMode && (
          <MeshPickerPanel
            vehicleId={activeVehicleId}
            meshNames={meshNames}
            overrides={activePicker}
            selectedSlot={selectedSlot}
            setSelectedSlot={setSelectedSlot}
            onAssign={(name) =>
              setPickerOverrides((prev) => ({
                ...prev,
                [activeVehicleId]: {
                  ...(prev[activeVehicleId] || {}),
                  [name]: selectedSlot,
                },
              }))
            }
            onReset={handleReset}
            onExport={handleExport}
            onClose={() => setPickerMode(false)}
          />
        )}
        {pickerMode && (
          <div
            style={{
              position: "absolute",
              top: 12,
              left: 252,
              zIndex: 40,
              pointerEvents: "none",
              background: "rgba(234,179,8,0.07)",
              border: "1px solid rgba(234,179,8,0.18)",
              borderRadius: 4,
              padding: "4px 10px",
              backdropFilter: "blur(6px)",
            }}
          >
            <span
              style={{
                fontSize: 8,
                color: "#EAB308",
                fontWeight: 900,
                letterSpacing: "0.1em",
              }}
            >
              CLICK PART → {selectedSlot.toUpperCase()} · GLASS HIDDEN
            </span>
          </div>
        )}

        {/* Paint HUD */}
        {!pickerMode && (
          <PaintHud
            config={enrichedConfig}
            crewVisible={crewVisible}
            crewTarget={crewTarget}
          />
        )}

        {/* Top-right controls */}
        <div className="absolute top-3 right-3 z-30 flex gap-2">
          {!pickerMode && (
            <button
              onClick={() => setAutoRotate((v) => !v)}
              style={{
                background: autoRotate
                  ? "rgba(234,179,8,0.1)"
                  : "rgba(0,0,0,0.6)",
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
          )}
          <button
            onClick={() => setPickerMode((v) => !v)}
            style={{
              background: pickerMode
                ? "rgba(234,179,8,0.1)"
                : "rgba(0,0,0,0.6)",
              border: `1px solid ${pickerMode ? "rgba(234,179,8,0.35)" : "rgba(255,255,255,0.07)"}`,
              borderRadius: 20,
              padding: "3px 10px",
              color: pickerMode ? "#EAB308" : "#333",
              fontSize: 8,
              fontWeight: 900,
              letterSpacing: "0.15em",
              cursor: "pointer",
              backdropFilter: "blur(6px)",
              transition: "all 0.15s",
            }}
          >
            {pickerMode ? "✕ EXIT PICKER" : "⊕ ASSIGN MESHES"}
          </button>
        </div>

        {/* Controls hint */}
        {!hintsDone && !pickerMode && (
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
