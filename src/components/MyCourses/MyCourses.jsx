import { useState, useEffect } from "react";
import CourseItem from "../CourseItem/CourseItem";
import { loadCourses } from "../../utils/coursesStore";
import styles from "./MyCourses.module.css";
import { useLanguage } from "../../context/useLanguage";

function MyCourses({ onNavigate }) {
  const { t } = useLanguage();
  const [courses, setCourses] = useState(() => loadCourses().filter((c) => c.status === "faol"));

  useEffect(() => {
    function refresh() {
      setCourses(loadCourses().filter((c) => c.status === "faol"));
    }
    window.addEventListener("storage", refresh);
    window.addEventListener("abidovs_courses_changed", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("abidovs_courses_changed", refresh);
    };
  }, []);

  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h3>{t("student.myCourses")}</h3>
        <button type="button" className={styles.viewAllBtn} onClick={() => onNavigate?.("courses")}>
          {t("common.viewAll")}
        </button>
      </div>

      <div>
        {courses.slice(0, 3).map((course) => (
          <CourseItem key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}

export default MyCourses;