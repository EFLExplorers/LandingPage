import { ReactNode } from "react";
import { Header } from "./Header-Footer/Header";
import { Footer } from "./Header-Footer/Footer";
import styles from "../../styles/Layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.appContainer}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};
