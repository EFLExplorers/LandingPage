import styles from "./PricingTable.module.css";

export const PricingTable = () => {
  return (
    <section className={styles.pricing}>
      <div className={styles.header}>
        <div className={styles.badge}>Pricing Plans</div>
        <h1>Choose Your Perfect Plan</h1>
        <p>Unlock endless possibilities with our flexible pricing options designed for every learner</p>
      </div>

      <div className={styles.plans}>
        <div className={`${styles.plan} ${styles.basic}`}>
          <div className={styles.planBadge}>Free</div>
          <div className={styles.planHeader}>
            <h3>Basic</h3>
            <p className={styles.description}>
              Perfect for individual use and exploration of ESL learning
            </p>
            <div className={styles.price}>
              <span className={styles.currency}>$</span>
              <span className={styles.amount}>0</span>
              <span className={styles.period}>/month</span>
            </div>
            <button className={styles.button}>Get Started Free</button>
          </div>
          <div className={styles.divider}></div>
          <ul className={styles.features}>
            <li><span className={styles.checkmark}>✓</span>10 daily active users</li>
            <li><span className={styles.checkmark}>✓</span>Basic learning resources access</li>
            <li><span className={styles.checkmark}>✓</span>Limited ESL exercises</li>
            <li><span className={styles.checkmark}>✓</span>Community support</li>
          </ul>
        </div>

        <div className={`${styles.plan} ${styles.premium} ${styles.featured}`}>
          <div className={styles.planBadge}>Most Popular</div>
          <div className={styles.planHeader}>
            <h3>Premium</h3>
            <p className={styles.description}>
              Perfect for serious learners who want more features
            </p>
            <div className={styles.price}>
              <span className={styles.currency}>$</span>
              <span className={styles.amount}>9.99</span>
              <span className={styles.period}>/month</span>
            </div>
            <button className={`${styles.button} ${styles.buttonPrimary}`}>
              Start Premium Trial
            </button>
          </div>
          <div className={styles.divider}></div>
          <ul className={styles.features}>
            <li><span className={styles.checkmark}>✓</span>Unlimited active users</li>
            <li><span className={styles.checkmark}>✓</span>Full learning resources access</li>
            <li><span className={styles.checkmark}>✓</span>Priority email support</li>
            <li><span className={styles.checkmark}>✓</span>Advanced ESL exercises</li>
            <li><span className={styles.checkmark}>✓</span>Progress tracking</li>
            <li><span className={styles.checkmark}>✓</span>Custom learning paths</li>
          </ul>
        </div>

        <div className={`${styles.plan} ${styles.enterprise}`}>
          <div className={styles.planBadge}>Enterprise</div>
          <div className={styles.planHeader}>
            <h3>Enterprise</h3>
            <p className={styles.description}>
              Perfect for schools and large organizations
            </p>
            <div className={styles.price}>
              <span className={styles.amount}>Custom</span>
            </div>
            <button className={`${styles.button} ${styles.buttonEnterprise}`}>
              Contact Sales Team
            </button>
          </div>
          <div className={styles.divider}></div>
          <ul className={styles.features}>
            <li><span className={styles.checkmark}>✓</span>Custom user management</li>
            <li><span className={styles.checkmark}>✓</span>Advanced analytics</li>
            <li><span className={styles.checkmark}>✓</span>24/7 phone support</li>
            <li><span className={styles.checkmark}>✓</span>Training workshops</li>
            <li><span className={styles.checkmark}>✓</span>Custom curriculum development</li>
            <li><span className={styles.checkmark}>✓</span>Dedicated account manager</li>
          </ul>
        </div>
      </div>

      <div className={styles.footer}>
        <p>All plans include a 14-day free trial. No credit card required.</p>
        <p>Need help choosing? <a href="/contact">Contact our team</a></p>
      </div>
    </section>
  );
};

export default PricingTable;
