import { useMemo } from "react";
import { GraduationCap, Users, BookOpen, Wallet } from "lucide-react";
import StatCard from "../../components/StatCard/StatCard";
import Placeholder from "../../components/Placeholder/Placeholder";
import TeachersPage from "../../components/TeachersPage/TeachersPage";
import StudentsPage from "../../components/StudentsPage/StudentsPage";
import CoursesManagementPage from "../../components/CoursesManagementPage/CoursesManagementPage";
import PaymentsPage from "../../components/PaymentsPage/PaymentsPage";
import RatingPage from "../../components/RatingPage/RatingPage";
import { adminStats, recentEnrollments } from "../../data/staffData";
import { useLanguage } from "../../context/useLanguage";
import { loadStudents } from "../../utils/studentsStore";
import {
  PAYMENT_STATUS,
  getPaymentStatusType,
  getStudentPaymentAmount,
} from "../../utils/paymentsStore";
import styles from "./AdminDashboard.module.css";

const iconMap = { graduation: GraduationCap, users: Users, book: BookOpen, wallet: Wallet };

const statusMeta = {
  [PAYMENT_STATUS.PAID]: { labelKey: "pay.paid", bg: "var(--c-e4f8ee)", color: "var(--c-22b573)" },
  [PAYMENT_STATUS.DUE_SOON]: { labelKey: "pay.status.dueSoon", bg: "var(--c-fef3e3)", color: "var(--c-f5a623)" },
  [PAYMENT_STATUS.OVERDUE]: { labelKey: "pay.status.overdue", bg: "var(--c-fdecec)", color: "var(--c-d64545)" },
};

const statusOrder = {
  [PAYMENT_STATUS.OVERDUE]: 0,
  [PAYMENT_STATUS.DUE_SOON]: 1,
  [PAYMENT_STATUS.PAID]: 2,
};

function AdminDashboard({ user, activePage, onNavigate }) {
  const { t, formatDate, formatMoney } = useLanguage();
  const paymentPreview = useMemo(() => {
    return loadStudents()
      .map((s) => ({
        id: s.id,
        name: `${s.firstName} ${s.lastName}`,
        amount: getStudentPaymentAmount(s),
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

  if (activePage === "rating") {
    return <RatingPage />;
  }

  if (activePage !== "dashboard") {
        return <Placeholder page={activePage} />;
  }

  return (
    <div className={styles.page}>
      <section className={styles.banner}>
        <h2>{t("dashboard.welcome", { name: user.firstName })}</h2>
        <p>{t("dashboard.adminSub")}</p>
      </section>

      <div className={styles.statsRow}>
        {adminStats.map((s) => (
          <StatCard key={s.id} icon={iconMap[s.icon]} label={t(s.labelKey)} value={s.labelKey === "admin.stats.revenue" ? `${s.value} ${t("common.currency")}` : s.value} sub={t(s.subKey)} color={s.color} />
        ))}
      </div>

      <div className={styles.mainGrid}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>{t("admin.recent")}</h3>
            <a href="#">{t("common.viewAll")}</a>
          </div>
          <div>
            {recentEnrollments.map((e) => (
              <div key={e.id} className={styles.row}>
                <div>
                  <p className={styles.rowTitle}>{e.name}</p>
                  <p className={styles.rowMeta}>{e.course}</p>
                </div>
                <span className={styles.rowDate}>{formatDate(e.date, { day: "2-digit", month: "short" })}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>{t("admin.paymentsStatus")}</h3>
            <button className={styles.cardHeaderBtn} onClick={() => onNavigate?.("payments")}>
              {t("common.viewAll")}
            </button>
          </div>
          <div>
            {paymentPreview.map((p) => {
              const meta = statusMeta[p.statusType];
              return (
                <div key={p.id} className={styles.row}>
                  <div>
                    <p className={styles.rowTitle}>{p.name}</p>
                    <p className={styles.rowMeta}>{formatMoney(p.amount)}</p>
                  </div>
                  <span className={styles.badge} style={{ background: meta.bg, color: meta.color }}>
                    {t(meta.labelKey)}
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
