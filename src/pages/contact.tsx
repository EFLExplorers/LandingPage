import type { NextPage } from "next";
import Head from "next/head";
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
      <ContactSection />
    </>
  );
};

export default ContactPage;
