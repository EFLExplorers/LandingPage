import { Image } from "@/components/common/Image";
import { ASSETS } from "@/constants/assets";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <nav>
      <Image
        src={ASSETS.logo.default}
        alt="Site Logo"
        width={150}
        height={50}
        className={styles.logo}
        priority
      />
    </nav>
  );
};
