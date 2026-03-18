import { Helmet } from "react-helmet-async";

const SITE_NAME = "Stella Crew";
const SITE_URL = "https://www.stellacrewgaming.com";
const DEFAULT_IMAGE = `${SITE_URL}/og/default.jpg`;

export default function SEO({ title, description, image, path }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const fullImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : DEFAULT_IMAGE;
  const fullUrl = path ? `${SITE_URL}${path}` : SITE_URL;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
    </Helmet>
  );
}

// ─── 4. EXAMPLE USAGE PER PAGE ────────────────────────────────────────────────
//
// Car Builder page:
// <SEO
//   title="Car Builder"
//   description="Visualize your GTA Online build in real-time 3D. 222+ paint codes, 63 wheel styles, 7 vehicle classes."
//   image="/og/car-builder.jpg"
//   path="/car-builder"
// />
//
// BEFF page (when ready):
// <SEO
//   title="BEFF Reference"
//   description="Full GTA Online BEFF guide. Browse by drawable and texture. Find any modded outfit component."
//   image="/og/beff.jpg"
//   path="/beff"
// />
//
// Home page:
// <SEO
//   title="Architects of Excellence"
//   description="Stella Crew — GTA Online crew resources, car builder, BEFF reference and more."
//   image="/og/home.jpg"
//   path="/"
// />
