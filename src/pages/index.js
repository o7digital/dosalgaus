import Head from "next/head";

export default function Home() {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const currentLocale = 'es';
  const path = '';
  const hrefFor = (locale) => (locale === 'es' ? `${siteUrl}/` : `${siteUrl}/${locale}`);
  const ogLocale = 'es_ES';
  const ogImage = `${siteUrl}/assets/img/sm-logo.svg`;
  const keywords = 'ropa fitness Miami Florida, tienda de ropa fitness Miami Florida, ropa de gimnasio para mujer Miami Florida, ropa de gimnasio para hombre Miami Florida, ropa de entrenamiento Miami Florida, ropa deportiva fitness Miami Florida, ropa fitness premium Miami Florida, ropa fitness de alto rendimiento Miami Florida, ropa de yoga fitness Miami Florida, ropa fitness para correr Miami Florida, ropa fitness Ciudad de México, ropa fitness CDMX, tienda de ropa fitness Ciudad de México, ropa de gimnasio para mujer CDMX, ropa de gimnasio para hombre CDMX, ropa de entrenamiento Ciudad de México, ropa deportiva fitness CDMX, ropa fitness premium Ciudad de México, ropa fitness de alto rendimiento CDMX, ropa de yoga fitness CDMX';
  
  return (
    <>
      <Head>
        <title>Dosalga - Ropa Deportiva Premium y Estilo de Vida Activo | Activewear</title>
        <meta name="description" content="Compra ropa deportiva premium en Dosalga. Descubre activewear de alto rendimiento, ropa de gimnasio y prendas lifestyle diseñadas para comodidad, estilo y durabilidad. Envío gratis disponible." />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/img/sm-logo.svg" />
        <link rel="canonical" href={hrefFor(currentLocale)} />
        {/* Hreflang tags */}
        {locales.map((locale) => (
          <link key={locale} rel="alternate" hrefLang={locale} href={hrefFor(locale)} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={hrefFor('es')} />
        
        {/* Open Graph */}
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={hrefFor(currentLocale)} />
        <meta property="og:title" content="Dosalga - Ropa Deportiva Premium y Estilo de Vida Activo" />
        <meta property="og:description" content="Descubre ropa deportiva premium y productos lifestyle activos para todos." />
        <meta property="og:site_name" content="Dosalga" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Dosalga" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dosalga - Ropa Deportiva Premium y Estilo de Vida Activo" />
        <meta name="twitter:description" content="Descubre ropa deportiva premium y productos lifestyle activos para todos." />
        <meta name="twitter:image" content={ogImage} />
      </Head>

      <main className="construction-page">
        <section className="construction-content" aria-labelledby="construction-title">
          <img
            className="construction-logo"
            src="/assets/img/sm-logo.svg"
            alt="Dosalga"
          />
          <p className="construction-kicker">Dosalga</p>
          <h1 id="construction-title">Sitio en construccion</h1>
          <p className="construction-copy">
            Estamos preparando una nueva experiencia. Vuelve pronto.
          </p>
        </section>
      </main>

      <style jsx>{`
        .construction-page {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 32px 20px;
          background: #f6f3ee;
          color: #171717;
        }

        .construction-content {
          width: min(100%, 560px);
          text-align: center;
        }

        .construction-logo {
          width: 88px;
          height: auto;
          margin-bottom: 28px;
        }

        .construction-kicker {
          margin-bottom: 12px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        h1 {
          margin: 0;
          font-size: clamp(40px, 8vw, 72px);
          line-height: 0.95;
          font-weight: 800;
        }

        .construction-copy {
          max-width: 420px;
          margin: 24px auto 0;
          color: #555;
          font-size: 18px;
          line-height: 1.6;
        }
      `}</style>
    </>
  );
}
