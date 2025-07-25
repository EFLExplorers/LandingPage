"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import Navbar from "./Navbar";
import AuthButtons from "../AuthButtons";
import styles from "./Header.module.css";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    console.log('Mobile menu toggle clicked, current state:', isMobileMenuOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
          style={{border: '2px solid blue', backgroundColor: isMobileMenuOpen ? 'yellow' : 'transparent'}}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu} onClick={closeMobileMenu} style={{border: '2px solid red'}}>
          <nav className={styles.mobileNav} onClick={(e) => e.stopPropagation()}>
            <Link href="/platforms/teacher" className={styles.mobileNavLink} onClick={closeMobileMenu}>
              Teacher Platform
            </Link>
            <Link href="/platforms/student" className={styles.mobileNavLink} onClick={closeMobileMenu}>
              Student Platform
            </Link>
            <Link href="/pricing" className={styles.mobileNavLink} onClick={closeMobileMenu}>
              Pricing
            </Link>
            <Link href="/about" className={styles.mobileNavLink} onClick={closeMobileMenu}>
              About
            </Link>
            <Link href="/contact" className={styles.mobileNavLink} onClick={closeMobileMenu}>
              Contact
            </Link>
            <Link href="/faq" className={styles.mobileNavLink} onClick={closeMobileMenu}>
              FAQ
            </Link>
          </nav>
          <div className={styles.mobileAuthButtons} onClick={(e) => e.stopPropagation()}>
            <Link href="/Auth/login" className={styles.mobileLoginButton} onClick={closeMobileMenu}>
              Login
            </Link>
            <Link href="/Auth/register" className={styles.mobileSignupButton} onClick={closeMobileMenu}>
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export { Header as default };
