import Head from 'next/head';
import HeroSlider from '../../components/home-uomo/HeroSlider';
import ShopPage from '../shop';

export default function HomeEn() {
  return (
    <>
      <Head>
        <title>Dosalga USA - Luggage, Suitcases & Travel Accessories</title>
        <meta name="description" content="Shop luggage, suitcases, travel bags, packing organizers, protective covers, and practical travel accessories at Dosalga USA." />
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
