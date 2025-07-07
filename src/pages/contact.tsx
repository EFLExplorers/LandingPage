import type { NextPage } from "next";
import Head from "next/head";
import { PageLayout } from "../components/layout/PageLayout";
import { ContactHeroSection } from "../components/layout/Contact/ContactHeroSection";
import { ContactFormSection } from "../components/layout/Contact/ContactFormSection";
import { ContactFAQSection } from "../components/layout/Contact/ContactFAQSection";

import { ContactSection } from "../components/layout/Contact/ContactSection";

export const ContactPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contact Us - ESL Explorers</title>
        <meta
          name="description"
          content="Get in touch with ESL Explorers. We're here to help with your English learning journey through innovative education methods and dedicated support."
        />
        <meta
          name="keywords"
          content="ESL contact, English learning support, language education help, contact us"
        />
        <meta property="og:title" content="Contact Us - ESL Explorers" />
        <meta
          property="og:description"
          content="Get in touch with ESL Explorers. We're here to help with your English learning journey through innovative education methods and dedicated support."
        />
        <meta property="og:type" content="website" />
      </Head>
      <PageLayout>
        <ContactHeroSection />
        <ContactFormSection />
        <ContactFAQSection />
    
        <ContactSection />
      </PageLayout>
    </>
  );
};

export default ContactPage;
