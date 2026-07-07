import React from "react";
import Head from "next/head";

const TaxesAndDutiesPage = () => {
  const siteUrl = "https://dosalga.store";
  const locales = ['en', 'es'];
  const slugByLocale = {
    en: '/taxes-and-duties',
    es: '/impuestos-y-aranceles',
  };
  const currentLocale = 'en';
  const hrefFor = (locale) => {
    const slug = slugByLocale[locale] || '/taxes-and-duties';
    return `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${slug}`;
  };
  const ogLocale = 'en_US';
  const ogImage = `${siteUrl}/assets/img/sm-logo.svg`;

  return (
    <>
      <Head>
        <title>Sales Tax &amp; Duties | Dosalga</title>
        <meta
          name="description"
          content="Sales tax, import duties, tariffs, and customs fees policy for Dosalga orders shipped to customers in the United States."
        />
        <link rel="canonical" href={hrefFor(currentLocale)} />
        {locales.map((locale) => (
          <link key={locale} rel="alternate" hrefLang={locale} href={hrefFor(locale)} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={hrefFor('en')} />
        <meta property="og:locale" content={ogLocale} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={hrefFor(currentLocale)} />
        <meta property="og:title" content="Sales Tax & Import Duties | Dosalga" />
        <meta
          property="og:description"
          content="Review Dosalga's sales tax, import duties, tariffs, and customs fees policy for U.S. orders."
        />
        <meta property="og:site_name" content="Dosalga" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Dosalga" />
      </Head>

      <div className="privacy-policy-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="privacy-content">
                <h1 className="mb-4">Sales Tax &amp; Duties</h1>

                <div className="policy-section mt-5">
                  <h2>U.S. Sales Tax</h2>
                  <p>
                    Dosalga sells to customers in the United States through an online storefront. U.S. sales tax is different from
                    VAT and may apply depending on the customer's shipping address, applicable state and local rules, and any tax
                    collection obligations that apply at the time of purchase.
                  </p>
                  <p>
                    If sales tax is collected at checkout, it will be shown before the order is confirmed. If no sales tax is
                    collected at checkout, the customer may still be responsible for any applicable use tax or similar tax required
                    by their state or local jurisdiction.
                  </p>
                </div>

                <div className="policy-section mt-5">
                  <h2>Import Duties, Tariffs &amp; Customs Fees</h2>
                  <p>
                    Some products may ship from international fulfillment partners. Orders imported into the United States may be
                    subject to customs duties, tariffs, carrier brokerage fees, or other import-related charges assessed by U.S.
                    Customs and Border Protection, carriers, or other authorities.
                  </p>
                  <p>
                    Unless expressly stated at checkout, these charges are not included in the product price or shipping fee and
                    remain the customer's responsibility. Dosalga does not control these charges and cannot guarantee their amount
                    before customs processing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaxesAndDutiesPage;
