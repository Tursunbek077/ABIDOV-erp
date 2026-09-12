import { GraduationCap, ArrowLeft } from "lucide-react";
import booksImg from "../../assets/illustrations/books.png";
import styles from "./Auth.module.css";

function AuthLayout({ title, subtitle, onBack, children, footer }) {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.leftPanel}>
          <button className={styles.backBtn} onClick={onBack}>
            <ArrowLeft size={15} /> Bosh sahifa
          </button>

          <div className={styles.welcomeText}>
            <p className={styles.welcomeSmall}>Xush kelibsiz</p>
            <p className={styles.welcomeBig}>
              <strong>ABIDOV'S</strong> — bilim va kelajak sari
            </p>
          </div>

          <img src={booksImg} alt="Illustration" className={styles.illustration} />

          <p className={styles.contactEmail}>info@abidovs.uz</p>
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.logo}>
            <GraduationCap size={24} />
            <span>ABIDOV'S</span>
          </div>

          <h1>{title}</h1>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

          {children}

          {footer && <div className={styles.footer}>{footer}</div>}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
