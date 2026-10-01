import CourseItem from "../CourseItem/CourseItem";
import { courses } from "../../data/dummyData";
import styles from "./MyCourses.module.css";
import { useLanguage } from "../../context/useLanguage";

function MyCourses() {
  const { t } = useLanguage();
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h3>{t("student.myCourses")}</h3>
        <a href="#" className={styles.viewAll}>{t("common.viewAll")}</a>
      </div>

      <div>
        {courses.map((course) => (
          <CourseItem key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}

export default MyCourses;