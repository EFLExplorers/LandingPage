import Link from "next/link";
import Logo from "./Logo";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.logoSection}>
          <Logo />
        </div>

        <div className={styles.linksSection}>
          <div className={styles.column}>
            <h3>Socials</h3>
            <Link href="https://linkedin.com">LinkedIn</Link>
            <Link href="https://instagram.com">Instagram</Link>
            <Link href="https://facebook.com">Facebook</Link>
          </div>

          <div className={styles.column}>
            <h3>Company</h3>
            <Link href="/about">About Us</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/Auth/register">Register</Link>
          </div>

          <div className={styles.column}>
            <h3>Support</h3>
            <Link href="/contact">Contact Us</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/terms">Terms & Conditions</Link>
            <Link href="/privacy">Cookie Policy</Link>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>All rights reserved</p>
        <p>Copyright 2024 | Privacy Policy</p>
        <p>Powered by ESL Explorers</p>
      </div>
    </footer>
  );
};

export { Footer as default };
