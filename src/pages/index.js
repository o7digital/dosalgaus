import Head from "next/head";
import HeroSlider from "../components/home-uomo/HeroSlider";
import ShopPage from "./shop";

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dosalga.store";
  const locales = ['en', 'es', 'de', 'fr', 'it', 'pt'];
  const currentLocale = 'en';
  const hrefFor = (locale) => (locale === 'en' ? `${siteUrl}/` : `${siteUrl}/${locale}`);
  const keywords = 'fitness clothing USA, activewear USA, premium fitness apparel, gym clothing for women, gym clothing for men, workout clothes, training clothes, yoga clothing, running apparel, performance activewear, Dosalga USA';

  return (
    <>
      <Head>
        <title>Dosalga USA - Premium Activewear and Fitness Clothing</title>
        <meta name="description" content="Shop Dosalga USA for premium activewear, gym clothing, and performance fitness apparel designed for training, comfort, and everyday style." />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/img/sm-logo.svg" />
        <link rel="canonical" href={hrefFor(currentLocale)} />
        {locales.map((locale) => (
          <link key={locale} rel="alternate" hrefLang={locale} href={hrefFor(locale)} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={hrefFor('en')} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={hrefFor(currentLocale)} />
        <meta property="og:title" content="Dosalga USA - Premium Activewear and Fitness Clothing" />
        <meta property="og:description" content="Discover premium activewear and fitness clothing for training, comfort, and everyday style." />
        <meta property="og:site_name" content="Dosalga USA" />
        <meta property="og:image" content={`${siteUrl}/assets/img/sm-logo.svg`} />
        <meta property="og:image:alt" content="Dosalga USA" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dosalga USA - Premium Activewear and Fitness Clothing" />
        <meta name="twitter:description" content="Premium activewear and fitness clothing for training, comfort, and everyday style." />
        <meta name="twitter:image" content={`${siteUrl}/assets/img/sm-logo.svg`} />
      </Head>

      <HeroSlider />
      <ShopPage />
    </>
  );
}
