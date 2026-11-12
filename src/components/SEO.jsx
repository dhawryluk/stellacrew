import { Helmet } from "react-helmet-async";

const SITE_NAME = "Stella Crew";
// Use the exact address your site loads on (no "www"), and keep it identical
// in index.html, sitemap.xml and robots.txt.
const SITE_URL = "https://stellacrewgaming.com";
const DEFAULT_IMAGE = `${SITE_URL}/images/share-image-v2.jpg`;
const DEFAULT_DESCRIPTION =
  "Stella Crew: GTA crew resources, car builder, BEFF reference and launch guides.";

const absolute = (value) =>
  value.startsWith("http") ? value : `${SITE_URL}${value}`;

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  image,
  path = "/",
  imageAlt,
  noindex = false,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const fullImage = image ? absolute(image) : DEFAULT_IMAGE;
  const fullUrl = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
  const alt = imageAlt || fullTitle;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={alt} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:image:alt" content={alt} />
    </Helmet>
  );
}
