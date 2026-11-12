import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <SEO title="Page Not Found" path="/404" noindex />
      <p className="text-sm font-bold tracking-widest text-accent uppercase">
        Error 404
      </p>
      <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold text-text-main">
        Page not found
      </h1>
      <p className="mt-4 text-text-main/70">
        That page doesn't exist or has moved. Head back home or check out the
        GTA 6 launch hub.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          to="/"
          className="w-full rounded-lg bg-accent px-5 py-2 font-extrabold text-black transition hover:bg-accent-hover sm:w-auto"
        >
          Back to home
        </Link>
        <Link
          to="/gta6"
          className="w-full rounded-lg border border-accent/60 px-5 py-2 font-extrabold text-accent transition hover:border-accent-hover hover:text-accent-hover sm:w-auto"
        >
          GTA 6 launch hub
        </Link>
      </div>
    </div>
  );
}