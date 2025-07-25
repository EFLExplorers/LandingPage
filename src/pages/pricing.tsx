import type { NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";
import { PricingTable } from "../components/layout/Pricing/PricingTable";
import { scrollToTop } from "../utils/scrollToTop";

export const Pricing: NextPage = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <Head>
        <title>Pricing - ESL Explorers</title>
        <meta
          name="description"
          content="Choose the best plan to improve your English skills with ESL Explorers."
        />
      </Head>
      <PricingTable />
    </>
  );
};

export default Pricing;
