import { useMemo, useState } from "react";
import { Wallet, CalendarClock, CreditCard } from "lucide-react";
import StatCard from "../StatCard/StatCard";
import { PAYMENT_STATUS, getStudentAccessInfo } from "../../utils/paymentsStore";
import { formatDate, daysUntil, buildHistory, buildBannerText } from "../../utils/studentPaymentsHelpers";
import { paymentStatusConfig } from "../../data/paymentStatusConfig";
import styles from "./StudentPaymentsPage.module.css";

function StudentPaymentsPage({ user }) {
  const [showDetails, setShowDetails] = useState(false);
  const access = useMemo(() => getStudentAccessInfo(user?.email), [user?.email]);
  const { student, statusType, amount } = access;

  const meta = paymentStatusConfig[statusType] || paymentStatusConfig[PAYMENT_STATUS.PAID];
  const Icon = meta.icon;
  const daysLeft = daysUntil(student?.nextDueDate);
  const history = useMemo(
    () => buildHistory(student?.lastPaymentDate, amount),
    [student?.lastPaymentDate, amount]
  );
  const bannerText = buildBannerText(statusType, student?.nextDueDate, amount);

  if (!student) {
    return (
      <div className={styles.page}>
        <div className={styles.emptyState}>To'lov ma'lumotlari topilmadi.</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.statsRow}>
        <StatCard
          icon={Icon}
          label="Joriy holat"
          value={meta.label}
          sub={daysLeft === null ? "—" : daysLeft >= 0 ? `Muddatgacha ${daysLeft} kun` : `${Math.abs(daysLeft)} kun kechikdi`}
          color={meta.cardColor}
        />
        <StatCard icon={Wallet} label="Oylik to'lov" value={`${amount.toLocaleString("uz-UZ")} so'm`} sub={student.course} color="blue" />
        <StatCard
          icon={CalendarClock}
          label="Keyingi muddat"
          value={formatDate(student.nextDueDate)}
          sub={`Oxirgi to'lov: ${formatDate(student.lastPaymentDate)}`}
          color="purple"
        />
      </div>

      <div className={styles.banner} style={{ background: meta.bannerBg, borderColor: meta.bannerBorder }}>
        <div className={styles.bannerLeft}>
          <div className={styles.bannerIcon} style={{ background: meta.iconBg, color: meta.iconColor }}>
            <Icon size={20} />
          </div>
          <div>
            <p className={styles.bannerTitle}>{meta.title}</p>
            <p className={styles.bannerText}>{bannerText}</p>
          </div>
        </div>
        {statusType !== PAYMENT_STATUS.PAID && (
          <button className={styles.detailsBtn} onClick={() => setShowDetails((v) => !v)}>
            <CreditCard size={15} />
            To'lov tafsilotlari
          </button>
        )}
      </div>

      {showDetails && (
        <div className={styles.detailsCard}>
          <p className={styles.detailsTitle}>To'lov rekvizitlari</p>
          <div className={styles.detailsRow}>
            <span>Karta raqami</span>
            <span className={styles.detailsValue}>8600 1234 5678 9012</span>
          </div>
          <div className={styles.detailsRow}>
            <span>Qabul qiluvchi</span>
            <span className={styles.detailsValue}>Abidov's o'quv markazi</span>
          </div>
          <div className={styles.detailsRow}>
            <span>Izoh (komment)</span>
            <span className={styles.detailsValue}>{student.studentCode} — {student.firstName} {student.lastName}</span>
          </div>
          <p className={styles.detailsNote}>
            To'lovni amalga oshirgach, chekni administratorga yuboring — u tasdiqlagach holat avtomatik yangilanadi.
          </p>
        </div>
      )}

      <div className={styles.card}>
        <p className={styles.cardTitle}>To'lovlar tarixi</p>
        <div className={styles.historyHead}>
          <span>Sana</span>
          <span>Summa</span>
          <span className={styles.historyStatusHead}>Holat</span>
        </div>
        {history.length > 0 ? (
          history.map((row, i) => (
            <div key={row.date + i} className={styles.historyRow}>
              <span className={styles.historyDate}>{formatDate(row.date)}</span>
              <span className={styles.historyAmount}>{row.amount.toLocaleString("uz-UZ")} so'm</span>
              <span className={styles.historyStatus}>
                <span className={styles.paidBadge}>To'landi</span>
              </span>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>Hozircha to'lovlar tarixi yo'q.</div>
        )}
      </div>
    </div>
  );
}

export default StudentPaymentsPage;