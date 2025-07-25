"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import Navbar from "./Navbar";
import AuthButtons from "../AuthButtons";
import styles from "./Header.module.css";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />
        <Navbar />
        <AuthButtons />
        
        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <nav className={styles.mobileNav}>
            <Link href="/platforms/teacher" className={styles.mobileNavLink}>
              Teacher Platform
            </Link>
            <Link href="/platforms/student" className={styles.mobileNavLink}>
              Student Platform
            </Link>
            <Link href="/pricing" className={styles.mobileNavLink}>
              Pricing
            </Link>
            <Link href="/about" className={styles.mobileNavLink}>
              About
            </Link>
            <Link href="/contact" className={styles.mobileNavLink}>
              Contact
            </Link>
            <Link href="/faq" className={styles.mobileNavLink}>
              FAQ
            </Link>
          </nav>
          <div className={styles.mobileAuthButtons}>
            <Link href="/Auth/login" className={styles.mobileLoginButton}>
              Login
            </Link>
            <Link href="/Auth/register" className={styles.mobileSignupButton}>
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export { Header as default };
