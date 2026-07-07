import React from "react";
import Head from "next/head";

const LocalTaxesPage = () => {
  return (
    <>
      <Head>
        <title>Local Taxes | Dosalga</title>
      </Head>

      <div className="privacy-policy-section pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="privacy-content">
                <h1 className="mb-4">Local Taxes</h1>

                <p>
                  Dosalga operates as an international e-commerce platform. Products are shipped directly from suppliers and
                  fulfillment partners located outside the destination country.
                </p>

                <div className="policy-section mt-5">
                  <h2>United States Orders</h2>
                  <p>Orders shipped to the United States may be subject to:</p>
                  <ul>
                    <li>Sales tax or use tax, depending on state and local rules</li>
                    <li>Import duties, tariffs, customs fees, or carrier brokerage fees</li>
                    <li>Administrative fees charged by carriers or customs brokers</li>
                  </ul>
                  <p>
                    These charges may be determined by state or local tax rules, U.S. Customs and Border Protection, shipping
                    carriers, or customs brokers. They are not included in the product price or shipping fee unless explicitly
                    stated at checkout.
                  </p>
                </div>

                <div className="policy-section mt-5">
                  <h2>No U.S. VAT</h2>
                  <p>
                    The United States does not use VAT in the same way as many other countries. For U.S. customers, applicable tax is
                    generally sales tax or use tax, depending on the shipping address and applicable law.
                  </p>
                </div>

                <div className="policy-section mt-5">
                  <h2>General considerations</h2>
                  <p>
                    Tax and customs regulations vary by country. By placing an order, customers agree to comply with local
                    regulations and pay any applicable taxes or fees required by their destination country.
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

export default LocalTaxesPage;
