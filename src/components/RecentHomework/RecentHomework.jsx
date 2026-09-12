import { Clock, CheckCircle2 } from "lucide-react";
import { homeworks } from "../../data/dummyData";
import styles from "./RecentHomework.module.css";

const statusStyle = {
  due: { color: "#F55A5A", icon: Clock },
  pending: { color: "#F5A623", icon: Clock },
  done: { color: "#22B573", icon: CheckCircle2 },
};

function RecentHomework() {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h3>Recent Homework</h3>
        <a href="#" className={styles.viewAll}>View all</a>
      </div>

      <div className={styles.list}>
        {homeworks.map((hw) => {
          const s = statusStyle[hw.statusType];
          const Icon = s.icon;
          return (
            <div key={hw.id} className={styles.item}>
              <div>
                <p className={styles.title}>{hw.title}</p>
                <p className={styles.status} style={{ color: s.color }}>{hw.status}</p>
              </div>
              <Icon size={18} color={s.color} />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default RecentHomework;