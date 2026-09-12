import { ChevronRight, Code2, Palette } from "lucide-react";
import styles from "./CourseItem.module.css";

const iconMap = { code: Code2, palette: Palette };

function CourseItem({ course }) {
  const Icon = iconMap[course.icon];

  return (
    <div className={styles.item}>
      <div className={`${styles.iconWrap} ${styles[course.color]}`}>
        {Icon ? <Icon size={20} /> : <span>{course.icon}</span>}
      </div>

      <div className={styles.info}>
        <p className={styles.title}>{course.title}</p>
        <p className={styles.tags}>{course.tags}</p>
        <p className={styles.teacher}>Teacher: {course.teacher}</p>
      </div>

      <div className={styles.progressWrap}>
        <span className={styles.percent}>{course.progress}%</span>
        <div className={styles.track}>
          <div className={`${styles.fill} ${styles[course.color]}`} style={{ width: `${course.progress}%` }} />
        </div>
      </div>

      <ChevronRight size={18} color="#B7BECB" />
    </div>
  );
}

export default CourseItem;