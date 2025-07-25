import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "./Logo";
import styles from "./Footer.module.css";
import { scrollToTop } from "../../../utils/scrollToTop";

export const Footer = () => {
  const router = useRouter();

  const handleLinkClick = (href: string) => {
    if (router.pathname === href) {
      scrollToTop();
    }
  };

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
            <Link href="/about" onClick={() => handleLinkClick("/about")}>About Us</Link>
            <Link href="/pricing" onClick={() => handleLinkClick("/pricing")}>Pricing</Link>
            <Link href="/Auth/register" onClick={() => handleLinkClick("/Auth/register")}>Register</Link>
          </div>

          <div className={styles.column}>
            <h3>Support</h3>
            <Link href="/contact" onClick={() => handleLinkClick("/contact")}>Contact Us</Link>
            <Link href="/faq" onClick={() => handleLinkClick("/faq")}>FAQ</Link>
            <Link href="/terms" onClick={() => handleLinkClick("/terms")}>Terms & Conditions</Link>
            <Link href="/privacy" onClick={() => handleLinkClick("/privacy")}>Cookie Policy</Link>
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
