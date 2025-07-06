import styles from "./PricingSection.module.css";

type PricingTier = {
  name: string;
  price: string;
  period: string;
  description: string;
};

export const PricingSection = () => {
  const pricingTiers: PricingTier[] = [
    {
      name: "Free Access",
      price: "Free",
      period: "",
      description:
        "Free access to basic features and content to help you get started.",
    },
    {
      name: "Individual",
      price: "$20",
      period: "/MO",
      description:
        "Access to all features and content, perfect for individual learners.",
    },
    {
      name: "Teacher",
      price: "$25",
      period: "/MO",
      description:
        "Complete access with additional teaching tools and resources.",
    },
    {
      name: "School",
      price: "$15",
      period: "/MO",
      description:
        "Bulk pricing for schools, includes all features and management tools.",
    },
  ];

  return (
    <section className={styles.pricing}>
      <h2 className={styles.title}>Pricing</h2>
      <p className={styles.subtitle}>Choose the plan that is right for you</p>

      <div className={styles.pricingGrid}>
        {pricingTiers.map((tier) => (
          <div key={tier.name} className={styles.pricingCard}>
            <h3 className={styles.tierName}>{tier.name}</h3>
            <div className={styles.priceContainer}>
              <span className={styles.price}>{tier.price}</span>
              {tier.period && (
                <span className={styles.period}>{tier.period}</span>
              )}
            </div>
            <p className={styles.description}>{tier.description}</p>
            <button className={styles.getStarted}>Get started</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
