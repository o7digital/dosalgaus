import Head from "next/head";

export default function Home() {
  const siteUrl = "https://dosalga.com";
  const locales = ['en', 'es'];
  const currentLocale = 'en';
  const path = '';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${path}`;
  const ogLocale = 'en_US';
  const ogImage = `${siteUrl}/assets/img/sm-logo.svg`;
  
  return (
    <>
      <Head>
        <title>Dosalga - Premium Sportswear & Active Lifestyle | Quality Athletic Wear</title>
        <meta name="description" content="Shop premium sportswear and activewear at Dosalga. Discover high-performance athletic clothing, gym wear, and lifestyle apparel designed for comfort, style, and durability. Free shipping available." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/img/sm-logo.svg" />
        <link rel="canonical" href={hrefFor(currentLocale)} />
        {/* Hreflang tags */}
        {locales.map((locale) => (
          <link key={locale} rel="alternate" hrefLang={locale} href={hrefFor(locale)} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={hrefFor('en')} />
        
        {/* Open Graph */}
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={hrefFor(currentLocale)} />
        <meta property="og:title" content="Dosalga - Premium Sportswear & Active Lifestyle" />
        <meta property="og:description" content="Discover premium sportswear and active lifestyle products for everyone. Quality meets performance." />
        <meta property="og:site_name" content="Dosalga" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Dosalga" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dosalga - Premium Sportswear & Active Lifestyle" />
        <meta name="twitter:description" content="Discover premium sportswear and active lifestyle products for everyone. Quality meets performance." />
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
