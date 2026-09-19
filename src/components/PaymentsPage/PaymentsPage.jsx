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

function initials(firstName, lastName) {
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
}

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("uz-UZ", { day: "2-digit", month: "2-digit", year: "numeric" });
}

const statusMeta = {
  [PAYMENT_STATUS.PAID]: { label: "To'landi", bg: "#E4F8EE", color: "#22B573" },
  [PAYMENT_STATUS.DUE_SOON]: { label: "Muddati yaqinlashmoqda", bg: "#FEF3E3", color: "#F5A623" },
  [PAYMENT_STATUS.OVERDUE]: { label: "Muddati o'tgan", bg: "#FDECEC", color: "#D64545" },
};

function PaymentsPage() {
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
      `${student.firstName} ${student.lastName} uchun to'lov qabul qilindi deb belgilansinmi? O'quvchi ERPga qayta kira oladigan bo'ladi.`
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
          label="Oylik jami summa"
          value={`${(stats.monthlyTotal / 1000000).toFixed(1)}M so'm`}
          sub="Barcha o'quvchilar bo'yicha"
          color="blue"
        />
        <StatCard icon={CheckCircle2} label="To'lagan o'quvchilar" value={stats.paid} sub="Joriy holat bo'yicha" color="green" />
        <StatCard icon={Clock} label="Muddati yaqinlashgan" value={stats.dueSoon} sub="5 kun ichida" color="orange" />
        <StatCard icon={AlertTriangle} label="Muddati o'tgan" value={stats.overdue} sub="Vaqtincha chetlatilgan" color="red" />
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={16} color="#8A94A6" />
          <input
            type="text"
            placeholder="Ism yoki ID bo'yicha qidirish..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className={styles.filterBox}>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="barchasi">Barcha holatlar</option>
            <option value={PAYMENT_STATUS.OVERDUE}>Muddati o'tgan</option>
            <option value={PAYMENT_STATUS.DUE_SOON}>Muddati yaqinlashmoqda</option>
            <option value={PAYMENT_STATUS.PAID}>To'langan</option>
          </select>
        </div>
      </div>

      <div className={styles.tableWrap}>
        {filtered.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>O'quvchi</th>
                <th>Kurs</th>
                <th>Oxirgi to'lov</th>
                <th>Keyingi muddat</th>
                <th>Summa</th>
                <th>Holat</th>
                <th className={styles.actionsHead}>Amal</th>
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
                    <td className={styles.amountCell}>{s.amount.toLocaleString("uz-UZ")} so'm</td>
                    <td>
                      <span className={styles.statusBadge} style={{ background: meta.bg, color: meta.color }}>
                        {meta.label}
                      </span>
                    </td>
                    <td>
                      {s.statusType !== PAYMENT_STATUS.PAID ? (
                        <button className={styles.payBtn} onClick={() => handleMarkPaid(s)}>
                          To'landi deb belgilash
                        </button>
                      ) : (
                        <span className={styles.paidTag}>
                          <CheckCircle2 size={14} /> To'langan
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className={styles.emptyState}>Hech qanday o'quvchi topilmadi.</div>
        )}
      </div>
    </div>
  );
}

export default PaymentsPage;
