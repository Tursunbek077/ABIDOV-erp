import CourseItem from "../CourseItem/CourseItem";
import { courses } from "../../data/dummyData";
import styles from "./MyCourses.module.css";

function MyCourses() {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h3>My Courses</h3>
        <a href="#" className={styles.viewAll}>View all</a>
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