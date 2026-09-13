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
  const keywords = 'ropa Dosalga, estilo cotidiano, chaquetas, compras en línea, información de productos';

  return (
    <>
      <Head>
        <title>Dosalga USA - Ropa y estilo para todos los días</title>
        <meta name="description" content="Descubre ropa y productos para el día a día en Dosalga USA. Compara fotografías, características y opciones disponibles, con atención para tu pedido." />
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
