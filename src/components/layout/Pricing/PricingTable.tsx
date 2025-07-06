import styles from "./PricingTable.module.css";

export const PricingTable = () => {
  return (
    <section className={styles.pricing}>
      <div className={styles.header}>
        <h1>Choose your plan</h1>
        <p>Unlock endless possibilities</p>
      </div>

      <div className={styles.plans}>
        <div className={`${styles.plan} ${styles.basic}`}>
          <div className={styles.planHeader}>
            <h3>Basic</h3>
            <p className={styles.description}>
              Perfect for individual use and exploration of ESL learning
            </p>
            <div className={styles.price}>
              <span className={styles.currency}>$</span>
              <span className={styles.amount}>0</span>
            </div>
            <button className={styles.button}>Get started</button>
          </div>
          <ul className={styles.features}>
            <li>10 daily active users</li>
            <li>Basic learning resources access</li>
            <li>Limited ESL exercises</li>
          </ul>
        </div>

        <div className={`${styles.plan} ${styles.premium}`}>
          <div className={styles.planHeader}>
            <h3>Premium</h3>
            <p className={styles.description}>
              Perfect for serious learners who want more features
            </p>
            <div className={styles.price}>
              <span className={styles.currency}>$</span>
              <span className={styles.amount}>9.99</span>
            </div>
            <button className={`${styles.button} ${styles.buttonPrimary}`}>
              Get started
            </button>
          </div>
          <ul className={styles.features}>
            <li>Unlimited active users</li>
            <li>Full learning resources access</li>
            <li>Priority email support</li>
            <li>Advanced ESL exercises</li>
          </ul>
        </div>

        <div className={`${styles.plan} ${styles.enterprise}`}>
          <div className={styles.planHeader}>
            <h3>Enterprise</h3>
            <p className={styles.description}>
              Perfect for schools and large organizations
            </p>
            <button className={`${styles.button} ${styles.buttonEnterprise}`}>
              Contact sales
            </button>
          </div>
          <ul className={styles.features}>
            <li>Custom user management</li>
            <li>Advanced analytics</li>
            <li>24/7 phone support</li>
            <li>Training workshops</li>
            <li>Custom curriculum development</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
