import { AlertTriangle, RefreshCcw, LogOut } from "lucide-react";
import styles from "./PaymentLockModal.module.css";

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("uz-UZ", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function PaymentLockModal({ student, amount, onRecheck, onLogout }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.iconWrap}>
          <AlertTriangle size={26} />
        </div>

        <h3>Kirish vaqtincha cheklandi</h3>

        <p className={styles.text}>
          Hurmatli {student?.firstName}, <strong>{student?.course}</strong> kursi bo'yicha to'lov
          muddatingiz <strong>{formatDate(student?.nextDueDate)}</strong> sanasida tugagan. Shu sababli
          siz to'lov amalga oshirilgunga qadar guruhdan vaqtinchalik chetlatildingiz.
        </p>

        {amount > 0 && (
          <div className={styles.amountBox}>
            <span>To'lanishi kerak</span>
            <strong>{amount.toLocaleString("uz-UZ")} so'm</strong>
          </div>
        )}

        <p className={styles.hint}>
          To'lovni administratorga topshiring. Admin to'lovni tasdiqlagach, hisobingiz avtomatik
          ravishda qayta faollashtiriladi.
        </p>

        <div className={styles.actions}>
          <button className={styles.recheckBtn} onClick={onRecheck}>
            <RefreshCcw size={16} />
            Holatni qayta tekshirish
          </button>
          <button className={styles.logoutBtn} onClick={onLogout}>
            <LogOut size={16} />
            Chiqish
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentLockModal;
