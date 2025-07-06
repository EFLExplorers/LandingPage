import type { NextPage } from "next";
import Head from "next/head";
import { PricingTable } from "../components/layout/Pricing/PricingTable";

export const Pricing: NextPage = () => {
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
