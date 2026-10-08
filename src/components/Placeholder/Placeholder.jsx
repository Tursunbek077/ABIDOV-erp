// import { Construction } from "lucide-react";
// import styles from "./Placeholder.module.css";

// function Placeholder({ title }) {
//   return (
//     <div className={styles.wrap}>
//       <div className={styles.icon}>
//         <Construction size={26} />
//       </div>
//       <h3>{title}</h3>
//       <p>Bu bo'lim hozircha ishlab chiqilmoqda. Tez orada tayyor bo'ladi.</p>
//     </div>
//   );
// }

// export default Placeholder;


import { Construction } from "lucide-react";
import { useLanguage } from "../../context/useLanguage";
import { pageTitles } from "../../data/navConfig";
import styles from "./Placeholder.module.css";

// page — sahifa kaliti (masalan "reports"); sarlavha tanlangan tilda chiqadi.
function Placeholder({ page }) {
  const { t } = useLanguage();

  return (
    <div className={styles.wrap}>
      <div className={styles.icon}>
        <Construction size={26} />
      </div>
      <h3>{t(pageTitles[page] || "common.section")}</h3>
      <p>{t("placeholder.text")}</p>
    </div>
  );
}

export default Placeholder;