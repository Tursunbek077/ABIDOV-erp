import { Clock, CheckCircle2 } from "lucide-react";
import { homeworks } from "../../data/dummyData";
import styles from "./RecentHomework.module.css";
import { useLanguage } from "../../context/useLanguage";

const statusStyle = {
  due: { color: "var(--c-f55a5a)", icon: Clock },
  pending: { color: "var(--c-f5a623)", icon: Clock },
  done: { color: "var(--c-22b573)", icon: CheckCircle2 },
};

function RecentHomework({ onNavigate }) {
  const { t, formatDate } = useLanguage();
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h3>{t("student.recentHomework")}</h3>
        <button type="button" className={styles.viewAllBtn} onClick={() => onNavigate?.("homework")}>
          {t("common.viewAll")}
        </button>
      </div>

      <div className={styles.list}>
        {homeworks.map((hw) => {
          const s = statusStyle[hw.statusType];
          const Icon = s.icon;
          return (
            <div key={hw.id} className={styles.item}>
              <div>
                <p className={styles.title}>{hw.title}</p>
                <p className={styles.status} style={{ color: s.color }}>
                  {t(hw.statusKey, { date: formatDate(hw.due, { day: "numeric", month: "short" }) })}
                </p>
              </div>
              <Icon size={18} style={{ color: s.color }} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default RecentHomework;