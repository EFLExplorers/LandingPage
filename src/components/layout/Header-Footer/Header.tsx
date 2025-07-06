"use client";

import Link from "next/link";
import Logo from "./Logo";
import Navbar from "./Navbar";
import AuthButtons from "../AuthButtons";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />
        <Navbar />
        <AuthButtons />
      </div>
    </header>
  );
};

export { Header as default };
