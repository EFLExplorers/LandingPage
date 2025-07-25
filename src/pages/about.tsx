import type { NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";
import { AboutUsSection } from "../components/layout/About/AboutUsSection";
import { scrollToTop } from "../utils/scrollToTop";

export const AboutPage: NextPage = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <Head>
        <title>About Us - ESL Explorers</title>
        <meta
          name="description"
          content="Learn about ESL Explorers - Making English learning an exciting adventure through innovative education methods and dedicated teaching."
        />
        <meta
          name="keywords"
          content="ESL, English learning, language education, about us, teaching platform"
        />
        <meta property="og:title" content="About Us - ESL Explorers" />
        <meta
          property="og:description"
          content="Learn about ESL Explorers - Making English learning an exciting adventure through innovative education methods and dedicated teaching."
        />
        <meta property="og:type" content="website" />
      </Head>
      <AboutUsSection />
    </>
  );
};

export default AboutPage;
