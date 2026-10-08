import { lessons } from "../../data/dummyData";
import styles from "./UpcomingLessons.module.css";
import { useLanguage } from "../../context/useLanguage";

function UpcomingLessons({ onNavigate }) {
  const { t } = useLanguage();
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h3>{t("student.upcomingLessons")}</h3>
        <button type="button" className={styles.viewAllBtn} onClick={() => onNavigate?.("schedule")}>
          {t("common.viewAll")}
        </button>
      </div>

      <div className={styles.list}>
        {lessons.map((lesson) => (
          <div key={lesson.id} className={styles.item}>
            <span className={styles.time}>{lesson.time}</span>
            <div>
              <p className={styles.title}>{lesson.title}</p>
              <p className={styles.subtitle}>{lesson.subtitle}</p>
              <p className={styles.room}>{t("common.room")}: {lesson.room}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default UpcomingLessons;