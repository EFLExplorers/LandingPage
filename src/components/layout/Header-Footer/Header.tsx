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
  const [isMobile, setIsMobile] = useState(false);

  // Debug: Log window width on component mount
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 600;
      setIsMobile(mobile);
      console.log('Header component mounted, window width:', window.innerWidth);
      console.log('Is mobile view (< 600px):', mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      if (window.innerWidth > 600) {
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
        <div style={{ display: isMobile ? 'none' : 'flex' }}>
          <Navbar />
          <AuthButtons />
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          style={{
            border: '3px solid red', 
            backgroundColor: isMobileMenuOpen ? 'yellow' : 'rgba(255, 0, 0, 0.3)',
            display: isMobile ? 'block' : 'none',
            position: 'relative',
            zIndex: 1002,
            minWidth: '40px',
            minHeight: '40px'
          }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Debug button - always visible */}
        <button 
          onClick={toggleMobileMenu}
          style={{
            border: '3px solid green',
            backgroundColor: 'green',
            color: 'white',
            padding: '8px',
            marginLeft: '10px',
            display: 'block'
          }}
        >
          TEST MENU
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
