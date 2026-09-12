import { Megaphone, ChevronRight } from "lucide-react";
import styles from "./ExamAnnouncement.module.css";

function ExamAnnouncement() {
  return (
    <section className={styles.card}>
      <div className={styles.iconWrap}>
        <Megaphone size={20} />
      </div>

      <div className={styles.info}>
        <p className={styles.title}>Exam Announcements</p>
        {/* <p className={styles.text}>Midterm Exam for Frontend Development course</p> */}
        <p className={styles.meta}>20 Aug 2024 • 10:00 AM • Room 205</p>
      </div>

      <ChevronRight size={18} color="#B7BECB" />
    </section>
  );
}

export default ExamAnnouncement;