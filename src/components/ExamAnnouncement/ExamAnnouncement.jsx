import { Megaphone, ChevronRight } from "lucide-react";
import styles from "./ExamAnnouncement.module.css";
import { useLanguage } from "../../context/useLanguage";

function ExamAnnouncement() {
  const { t, formatDate } = useLanguage();
  return (
    <section className={styles.card}>
      <div className={styles.iconWrap}>
        <Megaphone size={20} />
      </div>

      <div className={styles.info}>
        <p className={styles.title}>{t("student.examTitle")}</p>
        {/* <p className={styles.text}>Midterm Exam for Frontend Development course</p> */}
        <p className={styles.meta}>
          {formatDate("2024-08-20")} • 10:00 • {t("common.room")} 205
        </p>
      </div>

      <ChevronRight size={18} style={{ color: "var(--c-b7becb)" }} />
    </section>
  );
}

export default ExamAnnouncement;