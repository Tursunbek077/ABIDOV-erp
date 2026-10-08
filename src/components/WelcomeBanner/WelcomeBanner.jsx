// import styles from "./WelcomeBanner.module.css";
// import booksImg from "../../assets/illustrations/books.png";

// function WelcomeBanner({ name }) {
//   return (
//     <section className={styles.banner}>
//       <div>
//         <h2 className={styles.heading}>Welcome back, {name}! 👋</h2>
//         <p className={styles.subtext}>Keep learning and reach your goals.</p>
//       </div>
//       <img src={booksImg} alt="Books" className={styles.illustration} />
//     </section>
//   );
// }

// export default WelcomeBanner;


import styles from "./WelcomeBanner.module.css";
import { useLanguage } from "../../context/useLanguage";
import booksImg from "../../assets/illustrations/books.png";

function WelcomeBanner({ name }) {
  const { t } = useLanguage();

  return (
    <section className={styles.banner}>
      <div>
        <h2 className={styles.heading}>{t("dashboard.welcome", { name })}</h2>
        <p className={styles.subtext}>{t("dashboard.studentSub")}</p>
      </div>
      <img src={booksImg} alt="Books" className={styles.illustration} />
    </section>
  );
}

export default WelcomeBanner;