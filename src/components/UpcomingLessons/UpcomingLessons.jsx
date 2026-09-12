import { lessons } from "../../data/dummyData";
import styles from "./UpcomingLessons.module.css";

function UpcomingLessons() {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <h3>Upcoming Lessons</h3>
        <a href="#" className={styles.viewAll}>View all</a>
      </div>

      <div className={styles.list}>
        {lessons.map((lesson) => (
          <div key={lesson.id} className={styles.item}>
            <span className={styles.time}>{lesson.time}</span>
            <div>
              <p className={styles.title}>{lesson.title}</p>
              <p className={styles.subtitle}>{lesson.subtitle}</p>
              <p className={styles.room}>{lesson.room}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default UpcomingLessons;