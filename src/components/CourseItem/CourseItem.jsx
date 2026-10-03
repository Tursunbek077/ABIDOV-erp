import { ChevronRight, Code2, Palette } from "lucide-react";
import styles from "./CourseItem.module.css";
import { useLanguage } from "../../context/useLanguage";

const iconMap = { code: Code2, palette: Palette };

function CourseItem({ course }) {
  const { t } = useLanguage();
  const Icon = iconMap[course.icon];
  const color = course.color || "blue";
  const progress = course.progress ?? 60;
  const tags = course.tags || course.category || "Dasturlash";

  return (
    <div className={styles.item}>
      <div className={`${styles.iconWrap} ${styles[color]}`}>
        {Icon ? <Icon size={20} /> : <span>{course.icon || "📚"}</span>}
      </div>

      <div className={styles.info}>
        <p className={styles.title}>{course.title}</p>
        <p className={styles.tags}>{tags}</p>
        <p className={styles.teacher}>{t("common.teacher")}: {course.teacher}</p>
      </div>

      <div className={styles.progressWrap}>
        <span className={styles.percent}>{progress}%</span>
        <div className={styles.track}>
          <div className={`${styles.fill} ${styles[color]}`} style={{ width: `${progress}%` }} />
        </div>
      </div>

      <ChevronRight size={18} style={{ color: "var(--c-b7becb)" }} />
    </div>
  );
}

export default CourseItem;