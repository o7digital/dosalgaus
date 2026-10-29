import React from "react";
import Head from "next/head";

const AboutPage = () => {
  const siteUrl = "https://www.dosalga.store";
  const locales = ['en', 'es'];
  const currentLocale = 'en';
  const slug = '/about-us';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${slug}`;
  const ogLocale = 'en_US';
  const ogImage = `${siteUrl}/assets/img/sm-logo.svg`;
  
  return (
    <>
      <Head>
        <title>About Dosalga - Products for Everyday Life | Story, Vision & Values</title>
        <meta name="description" content="Dosalga makes it easy to get products designed for everyday life, delivered to your home or office. Learn our 2013 origin, vision, mission, and values." />
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
        <meta property="og:title" content="About Dosalga - Products for Everyday Life" />
        <meta property="og:description" content="Company focused on simplifying the purchase of essential products with delivery wherever you need. Story, vision, mission, and values of Dosalga." />
        <meta property="og:site_name" content="Dosalga" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Dosalga" />
      </Head>
      
      <div className="about-page pb-100">
        <section className="about-hero">
          <img
            src="https://www.o7digital.com/assets/hammer-group.webp"
            alt="Modern office representing the Dosalga team and company story"
          />
          <div className="about-hero-overlay" />
          <div className="about-hero-content">
            <span>About Dosalga</span>
            <h1>Useful products for a simpler life</h1>
            <p>
              Since 2013, we have brought functional products closer to people and businesses through a clear, practical and reliable shopping experience.
            </p>
          </div>
        </section>
        <div className="container">
        <div className="row justify-content-center pt-100">
          <div className="col-lg-10">
            <div className="about-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Products Designed for Daily Life</h2>
              <p>
                The products Dosalga offers are meant to keep pace with day-to-day life. We focus on comfort, simplicity, and versatility—choosing items that naturally fit into daily routines and add functionality without complications.
              </p>
              <p>
                Every product aims to answer real needs, balancing usefulness, design, and ease of use.
              </p>
            </div>

            <div className="about-card bg-light p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">How Dosalga Started</h2>
              <p>
                Dosalga began operating in 2013, supplying commercial products to different markets and serving diverse industries. Over time and through experience, the company evolved and restructured to improve service, optimize processes, and adapt to new ways of buying.
              </p>
              <p>
                Today, Dosalga keeps developing to offer more efficient solutions for acquiring products that make daily life easier, maintaining a modern, customer-focused vision.
              </p>
            </div>

            <div className="about-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Vision</h2>
              <p>
                To be the best option for supplying commercial products, creating value for our customers and offering essential items that support a modern, practical, and functional lifestyle.
              </p>
            </div>

            <div className="about-card bg-light p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Mission</h2>
              <p>
                To meet our customers’ expectations and needs through innovative, competitive, and profitable solutions, ensuring a trustworthy, clear shopping experience focused on service quality.
              </p>
            </div>

            <div className="about-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Our Values</h2>
              <ul className="mb-0">
                <li><strong>Integrity</strong>: Act with honesty, transparency, and consistency in every decision.</li>
                <li><strong>Innovation</strong>: Encourage creativity and the constant search for new, efficient solutions.</li>
                <li><strong>Responsibility</strong>: Honor commitments and answer for our actions consciously.</li>
                <li><strong>Respect</strong>: Value people, diversity, and different perspectives.</li>
                <li><strong>Teamwork</strong>: Collaborate and support each other to reach shared goals.</li>
                <li><strong>Customer Focus</strong>: Prioritize our customers’ satisfaction, trust, and needs.</li>
                <li><strong>Sustainability</strong>: Maintain a responsible commitment to the environment and society.</li>
              </ul>
            </div>

            <div className="about-card bg-light p-4 p-lg-5 rounded-3 mb-40">
              <h2 className="h4 mb-3">What Dosalga Provides</h2>
              <ul className="mb-0">
                <li>Convenience in the purchasing process</li>
                <li>Simplicity in selecting and acquiring products</li>
                <li>Reliability in the service</li>
                <li>Products designed for everyday lifestyles</li>
              </ul>
            </div>

            <div className="about-card bg-white border p-4 p-lg-5 rounded-3">
              <h2 className="h4 mb-3">Why Dosalga</h2>
              <p>
                Dosalga is for those who value convenience, practicality, and easy access to essential products, integrating them simply and efficiently into daily life.
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .about-hero { position: relative; width: 100%; height: calc(100vh - 80px); min-height: 620px; overflow: hidden; }
        .about-hero img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .about-hero-overlay { position: absolute; inset: 0; background: rgba(0, 0, 0, .54); }
        .about-hero-content { position: relative; z-index: 1; height: 100%; max-width: 1320px; margin: auto; padding: 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: #fff; }
        .about-hero-content span { color: #fff; text-transform: uppercase; letter-spacing: .18em; font-size: 13px; font-weight: 800; }
        .about-hero-content h1 { max-width: 1200px; margin: 20px auto 24px; color: #fff !important; font-size: clamp(52px, 7vw, 104px); line-height: .98; letter-spacing: -.045em; }
        .about-hero-content p { max-width: 900px; margin: 0; color: #fff; font-size: clamp(18px, 2vw, 25px); line-height: 1.55; }
        @media (max-width: 767px) { .about-hero { height: calc(100vh - 70px); min-height: 560px; } .about-hero-content { padding: 24px; } .about-hero-content h1 { font-size: clamp(44px, 14vw, 68px); } }
      `}</style>
    </>
  );
};

export default AboutPage;
