import { useMemo, useState } from "react";
import { Wallet, CalendarClock, CreditCard } from "lucide-react";
import StatCard from "../StatCard/StatCard";
import { PAYMENT_STATUS, getStudentAccessInfo } from "../../utils/paymentsStore";
import { daysUntil, buildHistory } from "../../utils/studentPaymentsHelpers";
import { paymentStatusConfig } from "../../data/paymentStatusConfig";
import styles from "./StudentPaymentsPage.module.css";
import { useLanguage } from "../../context/useLanguage";

function StudentPaymentsPage({ user }) {
  const { t, formatDate, formatMoney } = useLanguage();
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
  // Banner matni tanlangan tilda
  const bannerVars = { date: formatDate(student?.nextDueDate), sum: formatMoney(amount) };
  const bannerText =
    statusType === PAYMENT_STATUS.OVERDUE
      ? t("pay.banner.overdue", bannerVars)
      : statusType === PAYMENT_STATUS.DUE_SOON
        ? t("pay.banner.dueSoon", bannerVars)
        : t("pay.banner.paid", bannerVars);

  if (!student) {
    return (
      <div className={styles.page}>
        <div className={styles.emptyState}>{t("pay.notFound")}</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.statsRow}>
        <StatCard
          icon={Icon}
          label={t("pay.currentStatus")}
          value={t(meta.labelKey)}
          sub={
            daysLeft === null
              ? "—"
              : daysLeft >= 0
                ? t("pay.daysLeft", { n: daysLeft })
                : t("pay.daysLate", { n: Math.abs(daysLeft) })
          }
          color={meta.cardColor}
        />
        <StatCard icon={Wallet} label={t("pay.monthly")} value={formatMoney(amount)} sub={student.course} color="blue" />
        <StatCard
          icon={CalendarClock}
          label={t("pay.nextDue")}
          value={formatDate(student.nextDueDate)}
          sub={`${t("pay.lastPayment")}: ${formatDate(student.lastPaymentDate)}`}
          color="purple"
        />
      </div>

      <div className={styles.banner} style={{ background: meta.bannerBg, borderColor: meta.bannerBorder }}>
        <div className={styles.bannerLeft}>
          <div className={styles.bannerIcon} style={{ background: meta.iconBg, color: meta.iconColor }}>
            <Icon size={20} />
          </div>
          <div>
            <p className={styles.bannerTitle}>{t(meta.titleKey)}</p>
            <p className={styles.bannerText}>{bannerText}</p>
          </div>
        </div>
        {statusType !== PAYMENT_STATUS.PAID && (
          <button className={styles.detailsBtn} onClick={() => setShowDetails((v) => !v)}>
            <CreditCard size={15} />
            {t("pay.details")}
          </button>
        )}
      </div>

      {showDetails && (
        <div className={styles.detailsCard}>
          <p className={styles.detailsTitle}>{t("pay.requisites")}</p>
          <div className={styles.detailsRow}>
            <span>{t("pay.cardNumber")}</span>
            <span className={styles.detailsValue}>8600 1234 5678 9012</span>
          </div>
          <div className={styles.detailsRow}>
            <span>{t("pay.recipient")}</span>
            <span className={styles.detailsValue}>{t("pay.recipientName")}</span>
          </div>
          <div className={styles.detailsRow}>
            <span>{t("pay.comment")}</span>
            <span className={styles.detailsValue}>{student.studentCode} — {student.firstName} {student.lastName}</span>
          </div>
          <p className={styles.detailsNote}>
            {t("pay.detailsNote")}
          </p>
        </div>
      )}

      <div className={styles.card}>
        <p className={styles.cardTitle}>{t("pay.history")}</p>
        <div className={styles.historyHead}>
          <span>{t("pay.col.date")}</span>
          <span>{t("pay.col.amount")}</span>
          <span className={styles.historyStatusHead}>{t("pay.col.status")}</span>
        </div>
        {history.length > 0 ? (
          history.map((row, i) => (
            <div key={row.date + i} className={styles.historyRow}>
              <span className={styles.historyDate}>{formatDate(row.date)}</span>
              <span className={styles.historyAmount}>{formatMoney(row.amount)}</span>
              <span className={styles.historyStatus}>
                <span className={styles.paidBadge}>{t("pay.paid")}</span>
              </span>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>{t("pay.noHistory")}</div>
        )}
      </div>
    </div>
  );
}

export default StudentPaymentsPage;