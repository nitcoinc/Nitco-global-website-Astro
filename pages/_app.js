import React from "react";
import Script from "next/script";
import Head from "next/head";
import LazyChatbot from '../components/Chatbot/LazyChatbot';

// Global Styles
import "../styles/css/bootstrap.min.css";
import "animate.css";
import "../styles/css/boxicons.min.css";
import "../styles/css/flaticon.css";
import "react-accessible-accordion/dist/fancy-example.css";
import "/node_modules/aos/dist/aos.css";
import "swiper/css";
import "swiper/css/bundle";
import "../styles/css/switzer.css";
import "@fontsource/montserrat";
import "../styles/css/style.css";
import "../styles/css/responsive.css";

function MyApp({ Component, pageProps }) {

  const { seo } = pageProps || {};

  const defaultTitle = "NITCO Inc.";
  const defaultDescription =
    "NITCO delivers AI, Automation, Data, and Integration solutions engineered to transform and scale enterprise operations.";
  const defaultCanonical = "https://nitcoinc.com";

  return (
    <>
      {/* SEO */}
      <Head>
        <title>{seo?.title || defaultTitle}</title>
        <meta
          name="description"
          content={seo?.description || defaultDescription}
        />
        <link rel="canonical" href={seo?.canonical || defaultCanonical} />
      </Head>

      <Component {...pageProps} />

      {/* ========================= */}
      {/* IUBENDA COOKIE CONSENT */}
      {/* ========================= */}

      <Script id="iubenda-config" strategy="afterInteractive">
        {`
          var _iub = _iub || [];
          _iub.csConfiguration = {
            enableCcpa: true,
            tcfPurposes: {
              "2": "consent_only",
              "3": "consent_only",
              "4": "consent_only",
              "5": "consent_only",
              "6": "consent_only",
              "7": "consent_only",
              "8": "consent_only",
              "9": "consent_only",
              "10": "consent_only"
            },
            isTCFConsentGlobal: false,
            consentOnContinuedBrowsing: false,
            perPurposeConsent: true,
            enableCMP: true,
            googleAdditionalConsentMode: true,
            ccpaAcknowledgeOnDisplay: false,
            whitelabel: false,
            lang: "en",
            siteId: 2053600,
            cookiePolicyId: 12542728,
            floatingPreferencesButtonDisplay: "bottom-left",
            banner: {
              acceptButtonDisplay: true,
              customizeButtonDisplay: true,
              rejectButtonDisplay: true,
              position: "bottom"
            }
          };
        `}
      </Script>

      <Script src="https://cdn.iubenda.com/cs/tcf/stub-v2.js" strategy="afterInteractive" />
      <Script src="https://cdn.iubenda.com/cs/tcf/safe-tcf-v2.js" strategy="afterInteractive" />
      <Script src="https://cdn.iubenda.com/cs/ccpa/stub.js" strategy="afterInteractive" />
      <Script src="https://cdn.iubenda.com/cs/iubenda_cs.js" strategy="afterInteractive" async />

      {/* ========================= */}
      {/* LEADSY TRACKING */}
      {/* ========================= */}

      <Script
        id="leadsy"
        src="https://r2.leadsy.ai/tag.js"
        strategy="afterInteractive"
        data-pid="1dyBPBDbcXYcBnDGy"
        data-version="062024"
      />

      {/* ========================= */}
      {/* SCRIPT INTEL */}
      {/* ========================= */}

      <Script
        id="scriptintel"
        src="https://api-gateway.scriptintel.io/service/visitorintel/visitorTag/221764/script.js?apiKey=MjIxNzY0NDMyOWE4NDUtZDMxYy00MjEwLThkYzEtYTM5NzNlNTFjYjVj"
        strategy="afterInteractive"
        charSet="utf-8"
      />

      {/* ========================= */}
      {/* HUBSPOT */}
      {/* ========================= */}

      {/* <Script
        id="hubspot"
        src="https://js.hs-scripts.com/8158070.js"
        strategy="afterInteractive"
        async
        defer
      /> */}

      {/* ========================= */}
      {/* KORE.AI CHATBOT */}
      {/* ========================= */}

      <LazyChatbot />

    </>
  );
}

export default MyApp;

















