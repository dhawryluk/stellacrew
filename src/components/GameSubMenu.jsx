import HubCard from "./HubCard";
import { hubCards } from "../data/hubCards";

export default function GameSubMenu() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-10 grid gap-6 sm:grid-cols-2">
      {hubCards.map((card) => (
        <HubCard key={card.to} {...card} />
      ))}
    </section>
  );
}