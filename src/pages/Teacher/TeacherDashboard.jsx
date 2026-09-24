import { Users, GraduationCap, Clock, FileText, ChevronRight } from "lucide-react";
import StatCard from "../../components/StatCard/StatCard";
import Placeholder from "../../components/Placeholder/Placeholder";
import Schedule from "../../components/Schedule/Schedule";
import { teacherStats, teacherClasses, teacherHomeworkQueue } from "../../data/staffData";
import { pageTitles } from "../../data/navConfig";
import styles from "./TeacherDashboard.module.css"; 
import MyClasses from "../../components/MyClasses/MyClasess";

const iconMap = { users: Users, graduation: GraduationCap, clock: Clock, file: FileText };

function TeacherDashboard({ user, activePage }) {
  if (activePage === "schedule") {
    return <Schedule />;
  }

  
  if (activePage === "classes") {
    return <MyClasses />;
  }


  if (activePage !== "dashboard") {
    return <Placeholder title={pageTitles[activePage] || "Bo'lim"} />;
  }

  return (
    <div className={styles.page}>
      <section className={styles.banner}>
        <h2>Xush kelibsiz, {user.firstName}! 👋</h2>
        <p>Bugungi darslaringiz va tekshirilishi kerak bo'lgan vazifalar shu yerda.</p>
      </section>

      <div className={styles.statsRow}>
        {teacherStats.map((s) => (
          <StatCard key={s.id} icon={iconMap[s.icon]} label={s.label} value={s.value} sub={s.sub} color={s.color} />
        ))}
      </div>

      <div className={styles.mainGrid}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Mening sinflarim</h3>
            <a href="#">Barchasi</a>
          </div>
          <div>
            {teacherClasses.map((c) => (
              <div key={c.id} className={styles.classItem}>
                <div>
                  <p className={styles.classTitle}>{c.name}</p>
                  <p className={styles.classMeta}>{c.students} o'quvchi • {c.time}</p>
                </div>
                <div className={styles.progressWrap}>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${c.progress}%` }} />
                  </div>
                  <span>{c.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Tekshirish kerak</h3>
            <a href="#">Barchasi</a>
          </div>
          <div className={styles.list}>
            {teacherHomeworkQueue.map((h) => (
              <div key={h.id} className={styles.hwItem}>
                <div>
                  <p className={styles.hwStudent}>{h.student}</p>
                  <p className={styles.hwTask}>{h.task}</p>
                  <p className={styles.hwTime}>{h.submitted}</p>
                </div>
                <ChevronRight size={18} color="#B7BECB" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherDashboard;
