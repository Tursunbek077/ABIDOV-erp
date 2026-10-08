import { useMemo } from "react";
import { Megaphone, ChevronRight } from "lucide-react";
import styles from "./ExamAnnouncement.module.css";
import { useLanguage } from "../../context/useLanguage";

function ExamAnnouncement() {
  const { t, formatDate } = useLanguage();

  const examDate = useMemo(() => {
    const now = new Date();
    // Keyingi imtihon sanasi — har doim oldindagi eng yaqin 20-sana
    const target = new Date(now.getFullYear(), now.getMonth(), 20);
    if (now.getDate() >= 20) {
      target.setMonth(target.getMonth() + 1);
    }
    return target;
  }, []);

  return (
    <section className={styles.card}>
      <div className={styles.iconWrap}>
        <Megaphone size={20} />
      </div>

      <div className={styles.info}>
        <p className={styles.title}>{t("student.examTitle")}</p>
        {/* <p className={styles.text}>Midterm Exam for Frontend Development course</p> */}
        <p className={styles.meta}>
          {formatDate(examDate)} • 10:00 • {t("common.room")} 205
        </p>
      </div>

      <ChevronRight size={18} style={{ color: "var(--c-b7becb)" }} />
    </section>
  );
}

export default ExamAnnouncement;