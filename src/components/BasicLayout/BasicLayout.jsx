import Footer from "../Footer/Footer";
import styles from "./BasicLayout.module.css";

export default function BasicLayout({ children }) {
  return (
    <div className={styles.layout}>
      {children}
      <Footer />
    </div>
  );
}
