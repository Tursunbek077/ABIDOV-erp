import { Construction } from "lucide-react";
import styles from "./Placeholder.module.css";

function Placeholder({ title }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.icon}>
        <Construction size={26} />
      </div>
      <h3>{title}</h3>
      {/* <p>Bu bo'lim hozircha ishlab chiqilmoqda. Tez orada tayyor bo'ladi.</p> */}
    </div>
  );
}

export default Placeholder;
