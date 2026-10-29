import Head from "next/head";
import HeroSlider from "../../components/home-uomo/HeroSlider";
import ShopPage from "../shop";

export default function HomeEs() {
  const siteUrl = "https://www.dosalga.store";
  const locales = ['en', 'es'];
  const currentLocale = 'es';
  const path = '/es';
  const hrefFor = (locale) => {
    if (locale === 'en') return `${siteUrl}/`;
    return `${siteUrl}/${locale}`;
  };
  const ogLocale = 'es_ES';
  const keywords = 'maletas, equipaje, bolsas de viaje, organizadores de equipaje, fundas para maletas, accesorios de viaje';

  return (
    <>
      <Head>
        <title>Dosalga USA - Maletas, equipaje y accesorios de viaje</title>
        <meta name="description" content="Compra maletas, bolsas de viaje, organizadores, fundas protectoras y accesorios prácticos para viajar en Dosalga USA." />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/img/sm-logo.svg" />
        <link rel="canonical" href={hrefFor(currentLocale)} />
        {locales.map((locale) => (
          <link key={locale} rel="alternate" hrefLang={locale} href={hrefFor(locale)} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={hrefFor('en')} />
        <meta property="og:locale" content={ogLocale} />
      </Head>

      <HeroSlider />
      <ShopPage />
    </>
  );
}
