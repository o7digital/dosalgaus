import React from 'react';
import Head from 'next/head';
import ContactForm from '@/src/components/common/ContactForm';

const ContactPageEs = () => {
  const siteUrl = "https://dosalga.store";
  const locales = ['en', 'es'];
  const slugByLocale = {
    en: '/contact',
    es: '/contact',
  };
  const currentLocale = 'es';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${slugByLocale[locale]}`;
  const ogLocale = 'es_ES';
  const ogImage = `${siteUrl}/assets/img/sm-logo.svg`;
  
  return (
    <>
      <Head>
        <title>Contacto Dosalga - Atención al Cliente | Contáctanos</title>
        <meta name="description" content="Contacta con el servicio de atención al cliente de Dosalga para consultas sobre nuestros productos de activewear, pedidos, envíos o devoluciones. Estamos aquí para ayudarte 24/7. Contáctanos por email o teléfono." />
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
        <meta property="og:title" content="Contacto Dosalga - Contáctanos" />
        <meta property="og:description" content="Contacta con Dosalga para consultas sobre nuestros productos de activewear premium. Estamos para ayudarte." />
        <meta property="og:site_name" content="Dosalga" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Dosalga" />
      </Head>
      <div className="contact-page pt-100 mb-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <ContactForm lang="es" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPageEs;
