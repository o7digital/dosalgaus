import Head from 'next/head';
import HeroSlider from '../../components/home-uomo/HeroSlider';
import ShopPage from '../shop';

export default function HomeEn() {
  return (
    <>
      <Head>
        <title>Dosalga USA - Clothing & Everyday Style</title>
        <meta name="description" content="Explore Dosalga clothing and everyday products. Compare photos, product details and available options, with support for your order." />
        <link rel="canonical" href="https://www.dosalga.store/" />
        <link rel="alternate" hrefLang="en" href="https://www.dosalga.store/" />
        <link rel="alternate" hrefLang="es" href="https://www.dosalga.store/es" />
        <link rel="alternate" hrefLang="x-default" href="https://www.dosalga.store/" />
        <meta property="og:locale" content="en_US" />
      </Head>
      <HeroSlider />
      <ShopPage />
    </>
  );
}
