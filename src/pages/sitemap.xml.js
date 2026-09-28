const routes = [
  "",
  "/rolunk",
  "/szolgaltatasok",
  "/mukodesunk",
  "/helyszinek",
  "/kapcsolat",
  "/konyveles",
  "/konyveles-budapest",
  "/adotanacsadas",
  "/berszamfejtes",
  "/vezetoi-informacio",
  "/konyvelovaltas",
];

export async function getServerSideProps({ res }) {
  const base = "https://www.odaazado.hu";
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${base}${route || "/"}</loc></url>`).join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.write(xml);
  res.end();

  return { props: {} };
}

export default function Sitemap() {
  return null;
}
