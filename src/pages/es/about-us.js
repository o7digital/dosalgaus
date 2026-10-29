import React from "react";
import Head from "next/head";

const AboutPageEs = () => {
  const siteUrl = "https://www.dosalga.store";
  const locales = ['en', 'es'];
  const currentLocale = 'es';
  const slug = '/about-us';
  const hrefFor = (locale) => `${siteUrl}${locale === 'en' ? '' : `/${locale}`}${slug}`;
  const ogLocale = 'es_ES';
  const ogImage = `${siteUrl}/assets/img/sm-logo.svg`;
  
  return (
    <>
      <Head>
        <title>Sobre Dosalga - Productos para la vida diaria | Historia, visión y valores</title>
        <meta name="description" content="Dosalga facilita la adquisición de productos diseñados para la vida diaria con entregas en casa u oficina. Conoce su historia desde 2013, visión, misión y valores." />
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
        <meta property="og:title" content="Sobre Dosalga - Productos para la vida diaria" />
        <meta property="og:description" content="Empresa dedicada a simplificar la compra de productos esenciales con entregas donde los necesitas. Historia, visión, misión y valores de Dosalga." />
        <meta property="og:site_name" content="Dosalga" />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Dosalga" />
      </Head>
    <div className="about-page pb-100">
      <section className="about-hero">
        <img
          src="https://www.o7digital.com/assets/hammer-group.webp"
          alt="Oficina moderna que representa el equipo y la historia de Dosalga"
        />
        <div className="about-hero-overlay" />
        <div className="about-hero-content">
          <span>Sobre Dosalga</span>
          <h1>Productos útiles para una vida más simple</h1>
          <p>
            Desde 2013 acercamos productos funcionales a personas y empresas con una experiencia de compra clara, práctica y confiable.
          </p>
        </div>
      </section>
      <div className="container">
        <div className="row justify-content-center pt-100">
          <div className="col-lg-10">
            <div className="about-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Artículos diseñados para la vida diaria</h2>
              <p>
                Los productos que ofrece Dosalga están pensados para acompañar el ritmo del día a día. Nos enfocamos en comodidad, simplicidad y versatilidad, seleccionando artículos que se integran de forma natural en la rutina cotidiana y que aportan funcionalidad sin complicaciones.
              </p>
              <p>
                Cada producto busca responder a necesidades reales, manteniendo un equilibrio entre utilidad, diseño y facilidad de uso.
              </p>
            </div>

            <div className="about-card bg-light p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Cómo inició Dosalga</h2>
              <p>
                Dosalga inició su actividad en 2013, suministrando productos comerciales a distintos mercados y atendiendo las necesidades de diversas industrias. Con el paso del tiempo y a partir de la experiencia adquirida, la empresa evolucionó y se reestructuró con el objetivo de mejorar el servicio, optimizar procesos y adaptarse a nuevas formas de consumo.
              </p>
              <p>
                Hoy, Dosalga continúa desarrollándose para ofrecer soluciones más eficientes en la adquisición de productos que facilitan la vida diaria, manteniendo una visión moderna y orientada al cliente.
              </p>
            </div>

            <div className="about-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Visión</h2>
              <p>
                Ser la mejor opción para el suministro de productos comerciales, generando valor para nuestros clientes y ofreciendo artículos esenciales que acompañen un estilo de vida moderno, práctico y funcional.
              </p>
            </div>

            <div className="about-card bg-light p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Misión</h2>
              <p>
                Satisfacer las expectativas y necesidades de nuestros clientes mediante soluciones innovadoras, competitivas y rentables, garantizando una experiencia de compra confiable, clara y orientada a la calidad del servicio.
              </p>
            </div>

            <div className="about-card bg-white border p-4 p-lg-5 mb-40 rounded-3">
              <h2 className="h4 mb-3">Nuestros valores</h2>
              <ul className="mb-0">
                <li><strong>Integridad</strong>: Actuar con honestidad, transparencia y coherencia en cada decisión.</li>
                <li><strong>Innovación</strong>: Fomentar la creatividad y la búsqueda constante de soluciones nuevas y eficientes.</li>
                <li><strong>Responsabilidad</strong>: Cumplir los compromisos asumidos y responder de manera consciente por nuestras acciones.</li>
                <li><strong>Respeto</strong>: Valorar a las personas, la diversidad y las diferentes perspectivas.</li>
                <li><strong>Trabajo en equipo</strong>: Colaborar y apoyarnos mutuamente para alcanzar objetivos comunes.</li>
                <li><strong>Orientación al cliente</strong>: Priorizar la satisfacción, confianza y necesidades de nuestros clientes.</li>
                <li><strong>Sostenibilidad</strong>: Mantener un compromiso responsable con el medio ambiente y la sociedad.</li>
              </ul>
            </div>

            <div className="about-card bg-light p-4 p-lg-5 rounded-3 mb-40">
              <h2 className="h4 mb-3">Qué aporta Dosalga</h2>
              <ul className="mb-0">
                <li>Comodidad en el proceso de compra</li>
                <li>Simplicidad en la selección y adquisición de productos</li>
                <li>Fiabilidad en el servicio</li>
                <li>Productos pensados para el estilo de vida cotidiano</li>
              </ul>
            </div>

            <div className="about-card bg-white border p-4 p-lg-5 rounded-3">
              <h2 className="h4 mb-3">Por qué Dosalga</h2>
              <p>
                Somos la opción para quienes valoran la comodidad, la practicidad y la facilidad para acceder a productos esenciales, integrándolos de forma simple y eficiente en su día a día.
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

export default AboutPageEs;
