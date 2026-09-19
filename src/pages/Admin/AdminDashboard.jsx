import { useMemo } from "react";
import { GraduationCap, Users, BookOpen, Wallet } from "lucide-react";
import StatCard from "../../components/StatCard/StatCard";
import Placeholder from "../../components/Placeholder/Placeholder";
import TeachersPage from "../../components/TeachersPage/TeachersPage";
import StudentsPage from "../../components/StudentsPage/StudentsPage";
import CoursesManagementPage from "../../components/CoursesManagementPage/CoursesManagementPage";
import PaymentsPage from "../../components/PaymentsPage/PaymentsPage";
import { adminStats, recentEnrollments } from "../../data/staffData";
import { pageTitles } from "../../data/navConfig";
import { loadStudents } from "../../utils/studentsStore";
import {
  PAYMENT_STATUS,
  getPaymentStatusType,
  getStudentPaymentAmount,
} from "../../utils/paymentsStore";
import styles from "./AdminDashboard.module.css";

const iconMap = { graduation: GraduationCap, users: Users, book: BookOpen, wallet: Wallet };

const statusMeta = {
  [PAYMENT_STATUS.PAID]: { label: "To'landi", bg: "#E4F8EE", color: "#22B573" },
  [PAYMENT_STATUS.DUE_SOON]: { label: "Kutilmoqda", bg: "#FEF3E3", color: "#F5A623" },
  [PAYMENT_STATUS.OVERDUE]: { label: "Muddati o'tgan", bg: "#FDECEC", color: "#D64545" },
};

const statusOrder = {
  [PAYMENT_STATUS.OVERDUE]: 0,
  [PAYMENT_STATUS.DUE_SOON]: 1,
  [PAYMENT_STATUS.PAID]: 2,
};

function AdminDashboard({ user, activePage, onNavigate }) {
  const paymentPreview = useMemo(() => {
    return loadStudents()
      .map((s) => ({
        id: s.id,
        name: `${s.firstName} ${s.lastName}`,
        amount: `${getStudentPaymentAmount(s).toLocaleString("uz-UZ")} so'm`,
        statusType: getPaymentStatusType(s),
      }))
      .sort((a, b) => statusOrder[a.statusType] - statusOrder[b.statusType])
      .slice(0, 4);
  }, []);

  if (activePage === "teachers") {
    return <TeachersPage />;
  }

  if (activePage === "students") {
    return <StudentsPage />;
  }

  if (activePage === "courses") {
    return <CoursesManagementPage />;
  }

  if (activePage === "payments") {
    return <PaymentsPage />;
  }

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
            <button className={styles.cardHeaderBtn} onClick={() => onNavigate?.("payments")}>
              Barchasi
            </button>
          </div>
          <div>
            {paymentPreview.map((p) => {
              const meta = statusMeta[p.statusType];
              return (
                <div key={p.id} className={styles.row}>
                  <div>
                    <p className={styles.rowTitle}>{p.name}</p>
                    <p className={styles.rowMeta}>{p.amount}</p>
                  </div>
                  <span className={styles.badge} style={{ background: meta.bg, color: meta.color }}>
                    {meta.label}
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
