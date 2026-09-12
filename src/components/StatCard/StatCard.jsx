import styles from "./StatCard.module.css";

function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className={styles.card}>
      <div className={`${styles.iconWrap} ${styles[color]}`}>
        <Icon size={20} />
      </div>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
      <p className={styles.sub}>{sub}</p>
    </div>
  );
}

export default StatCard;