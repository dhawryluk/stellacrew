import { useState } from "react";
import { resourceCategories } from "../data/resourceData";
import { jobDatabase } from "../data/jobData";
import SystemStatus from "../components/SystemStatus";
import ResourceHero from "../components/ResourceHero";
import TacticalUtilities from "../components/TacticalUtilities";
import JobDatabase from "../components/JobDatabase";
import GarageManifest from "../components/GarageManifest";
import ExternalAssets from "../components/ExternalAssets";

export default function ResourcesPage() {
  const [activePlatform, setActivePlatform] = useState("PlayStation");
  const [searchQuery, setSearchQuery] = useState("");
  const [openCategories, setOpenCategories] = useState([]);

  const toggleCategory = (catName) => {
    setOpenCategories((prev) =>
      prev.includes(catName)
        ? prev.filter((c) => c !== catName)
        : [...prev, catName]
    );
  };

  const currentPlatformData = jobDatabase.find(
    (p) => p.platform === activePlatform
  );
  const filteredCategories = currentPlatformData?.categories
    .map((cat) => ({
      ...cat,
      links: cat.links.filter((link) =>
        link.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.links.length > 0 || searchQuery === "");

  return (
   <div className="min-h-screen bg-bg pt-32 pb-20 px-6 font-sans selection:bg-accent selection:text-black">
      <div className="max-w-6xl mx-auto">
        <ResourceHero />
        <TacticalUtilities categories={resourceCategories} />
        <SystemStatus />
        <GarageManifest />
        <ExternalAssets />
        <JobDatabase
          database={jobDatabase}
          activePlatform={activePlatform}
          setActivePlatform={setActivePlatform}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          openCategories={openCategories}
          toggleCategory={toggleCategory}
          filteredCategories={filteredCategories}
        />
      </div>
    </div>
  );
};
