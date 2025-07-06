import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuPortal,
} from "../../ui/dropdown-menu";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <nav className={styles.desktopNav}>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className={styles.navLink}>
          Platforms <ChevronDown className={styles.dropdownIcon} />
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent
            className={styles.dropdownContent}
            sideOffset={8}
          >
            <DropdownMenuItem className={styles.dropdownItem}>
              <Link href="/platforms/teacher" className={styles.dropdownLink}>
                Teacher
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className={styles.dropdownItem}>
              <Link href="/platforms/student" className={styles.dropdownLink}>
                Student
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
      <Link href="/pricing" className={styles.navLink}>
        Pricing
      </Link>
      <Link href="/about" className={styles.navLink}>
        About
      </Link>
      <Link href="/contact" className={styles.navLink}>
        Contact
      </Link>
    </nav>
  );
};

export { Navbar as default };
