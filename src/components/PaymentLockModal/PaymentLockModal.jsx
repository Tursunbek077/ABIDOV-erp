import { AlertTriangle, RefreshCcw, LogOut } from "lucide-react";
import styles from "./PaymentLockModal.module.css";
import { useLanguage } from "../../context/useLanguage";


function PaymentLockModal({ student, amount, onRecheck, onLogout }) {
  const { t, formatDate, formatMoney } = useLanguage();
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.iconWrap}>
          <AlertTriangle size={26} />
        </div>

        <h3>{t("lock.title")}</h3>

        <p className={styles.text}>
          {t("lock.textA", { name: student?.firstName })}
          <strong>{student?.course}</strong>
          {t("lock.textB")}
          <strong>{formatDate(student?.nextDueDate)}</strong>
          {t("lock.textC")}
        </p>

        {amount > 0 && (
          <div className={styles.amountBox}>
            <span>{t("lock.amountDue")}</span>
            <strong>{formatMoney(amount)}</strong>
          </div>
        )}

        <p className={styles.hint}>
          {t("lock.hint")}
        </p>

        <div className={styles.actions}>
          <button className={styles.recheckBtn} onClick={onRecheck}>
            <RefreshCcw size={16} />
            {t("lock.recheck")}
          </button>
          <button className={styles.logoutBtn} onClick={onLogout}>
            <LogOut size={16} />
            {t("common.logout")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentLockModal;
