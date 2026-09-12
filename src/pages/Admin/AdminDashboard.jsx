import { GraduationCap, Users, BookOpen, Wallet } from "lucide-react";
import StatCard from "../../components/StatCard/StatCard";
import Placeholder from "../../components/Placeholder/Placeholder";
import { adminStats, recentEnrollments, paymentStatus } from "../../data/staffData";
import { pageTitles } from "../../data/navConfig";
import styles from "./AdminDashboard.module.css";

const iconMap = { graduation: GraduationCap, users: Users, book: BookOpen, wallet: Wallet };

const statusColor = {
  done: { bg: "#E4F8EE", color: "#22B573" },
  pending: { bg: "#FEF3E3", color: "#F5A623" },
  due: { bg: "#FDECEC", color: "#D64545" },
};

function AdminDashboard({ user, activePage }) {
  if (activePage !== "dashboard") {
    return <Placeholder title={pageTitles[activePage] || "Bo'lim"} />;
  }

  return (
    <div className={styles.page}>
      <section className={styles.banner}>
        <h2>Xush kelibsiz, {user.firstName}! 👋</h2>
        <p>O'quv markazingizning umumiy holati bir qarashda.</p>
      </section>

      <div className={styles.statsRow}>
        {adminStats.map((s) => (
          <StatCard key={s.id} icon={iconMap[s.icon]} label={s.label} value={s.value} sub={s.sub} color={s.color} />
        ))}
      </div>

      <div className={styles.mainGrid}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>So'nggi ro'yxatdan o'tganlar</h3>
            <a href="#">Barchasi</a>
          </div>
          <div>
            {recentEnrollments.map((e) => (
              <div key={e.id} className={styles.row}>
                <div>
                  <p className={styles.rowTitle}>{e.name}</p>
                  <p className={styles.rowMeta}>{e.course}</p>
                </div>
                <span className={styles.rowDate}>{e.date}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>To'lovlar holati</h3>
            <a href="#">Barchasi</a>
          </div>
          <div>
            {paymentStatus.map((p) => {
              const s = statusColor[p.statusType];
              return (
                <div key={p.id} className={styles.row}>
                  <div>
                    <p className={styles.rowTitle}>{p.name}</p>
                    <p className={styles.rowMeta}>{p.amount}</p>
                  </div>
                  <span className={styles.badge} style={{ background: s.bg, color: s.color }}>
                    {p.status}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;
