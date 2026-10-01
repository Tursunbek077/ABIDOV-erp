import { useMemo, useState } from "react";
import { Wallet, CheckCircle2, Clock, AlertTriangle, Search } from "lucide-react";
import StatCard from "../StatCard/StatCard";
import { loadStudents } from "../../utils/studentsStore";
import {
  PAYMENT_STATUS,
  getPaymentStatusType,
  getStudentPaymentAmount,
  markStudentPaid,
} from "../../utils/paymentsStore";
import styles from "./PaymentsPage.module.css";
import { useLanguage } from "../../context/useLanguage";

function initials(firstName, lastName) {
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
}


const statusMeta = {
  [PAYMENT_STATUS.PAID]: { labelKey: "pay.paid", bg: "var(--c-e4f8ee)", color: "var(--c-22b573)" },
  [PAYMENT_STATUS.DUE_SOON]: { labelKey: "ap.dueSoon", bg: "var(--c-fef3e3)", color: "var(--c-f5a623)" },
  [PAYMENT_STATUS.OVERDUE]: { labelKey: "pay.status.overdue", bg: "var(--c-fdecec)", color: "var(--c-d64545)" },
};

function PaymentsPage() {
  const { t, formatDate, formatMoney } = useLanguage();
  const [students, setStudents] = useState(loadStudents);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("barchasi");

  const rows = useMemo(
    () =>
      students
        .map((s) => ({
          ...s,
          statusType: getPaymentStatusType(s),
          amount: getStudentPaymentAmount(s),
        }))
        .sort((a, b) => {
          const order = {
            [PAYMENT_STATUS.OVERDUE]: 0,
            [PAYMENT_STATUS.DUE_SOON]: 1,
            [PAYMENT_STATUS.PAID]: 2,
          };
          return order[a.statusType] - order[b.statusType];
        }),
    [students]
  );

  const stats = useMemo(() => {
    const paid = rows.filter((r) => r.statusType === PAYMENT_STATUS.PAID).length;
    const dueSoon = rows.filter((r) => r.statusType === PAYMENT_STATUS.DUE_SOON).length;
    const overdue = rows.filter((r) => r.statusType === PAYMENT_STATUS.OVERDUE).length;
    const monthlyTotal = rows.reduce((sum, r) => sum + r.amount, 0);
    return { paid, dueSoon, overdue, monthlyTotal };
  }, [rows]);

  const filtered = rows.filter((r) => {
    const fullName = `${r.firstName} ${r.lastName}`.toLowerCase();
    const matchesQuery =
      fullName.includes(query.toLowerCase()) || r.studentCode.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "barchasi" || r.statusType === statusFilter;
    return matchesQuery && matchesStatus;
  });

  function handleMarkPaid(student) {
    const confirmed = window.confirm(
      t("ap.confirmPaid", { name: `${student.firstName} ${student.lastName}` })
    );
    if (!confirmed) return;
    const updated = markStudentPaid(student.id);
    setStudents(updated);
  }

  return (
    <div className={styles.page}>
      <div className={styles.statsRow}>
        <StatCard
          icon={Wallet}
          label={t("ap.monthlyTotal")}
          value={`${(stats.monthlyTotal / 1000000).toFixed(1)}M ${t("common.currency")}`}
          sub={t("ap.monthlyTotalSub")}
          color="blue"
        />
        <StatCard icon={CheckCircle2} label={t("ap.paidStudents")} value={stats.paid} sub={t("ap.paidSub")} color="green" />
        <StatCard icon={Clock} label={t("hwStudent.urgent")} value={stats.dueSoon} sub={t("ap.within5")} color="orange" />
        <StatCard icon={AlertTriangle} label={t("pay.status.overdue")} value={stats.overdue} sub={t("ap.suspended")} color="red" />
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={16} style={{ color: "var(--c-8a94a6)" }} />
          <input
            type="text"
            placeholder={t("ap.search")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className={styles.filterBox}>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="barchasi">{t("admin.allStatuses")}</option>
            <option value={PAYMENT_STATUS.OVERDUE}>{t("pay.status.overdue")}</option>
            <option value={PAYMENT_STATUS.DUE_SOON}>{t("ap.dueSoon")}</option>
            <option value={PAYMENT_STATUS.PAID}>{t("ap.paidState")}</option>
          </select>
        </div>
      </div>

      <div className={styles.tableWrap}>
        {filtered.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{t("thw.col.student")}</th>
                <th>{t("students.col.course")}</th>
                <th>{t("pay.lastPayment")}</th>
                <th>{t("pay.nextDue")}</th>
                <th>{t("pay.col.amount")}</th>
                <th>{t("pay.col.status")}</th>
                <th className={styles.actionsHead}>{t("thw.col.action")}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => {
                const meta = statusMeta[s.statusType];
                return (
                  <tr key={s.id}>
                    <td>
                      <div className={styles.nameCell}>
                        <span className={styles.avatar}>{initials(s.firstName, s.lastName)}</span>
                        <div>
                          <p className={styles.fullName}>{s.firstName} {s.lastName}</p>
                          <p className={styles.code}>{s.studentCode}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={styles.courseBadge}>{s.course}</span>
                    </td>
                    <td className={styles.dateCell}>{formatDate(s.lastPaymentDate)}</td>
                    <td className={styles.dateCell}>{formatDate(s.nextDueDate)}</td>
                    <td className={styles.amountCell}>{formatMoney(s.amount)}</td>
                    <td>
                      <span className={styles.statusBadge} style={{ background: meta.bg, color: meta.color }}>
                        {t(meta.labelKey)}
                      </span>
                    </td>
                    <td>
                      {s.statusType !== PAYMENT_STATUS.PAID ? (
                        <button className={styles.payBtn} onClick={() => handleMarkPaid(s)}>
                          {t("ap.markPaid")}
                        </button>
                      ) : (
                        <span className={styles.paidTag}>
                          <CheckCircle2 size={14} /> {t("ap.paidState")}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className={styles.emptyState}>{t("students.empty")}</div>
        )}
      </div>
    </div>
  );
}

export default PaymentsPage;
