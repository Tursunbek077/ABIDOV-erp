import { Users, GraduationCap, Clock, FileText, ChevronRight } from "lucide-react";
import StatCard from "../../components/StatCard/StatCard";
import Placeholder from "../../components/Placeholder/Placeholder";
import Schedule from "../../components/Schedule/Schedule";
import MyClasses from "../../components/MyClasses/MyClasess";
import Attendance from "../../components/Attendance/Attendance";
import Grades from "../../components/Grades/Grades";
import Homework from "../../components/Homework/Homework";
import { teacherStats, teacherClasses, teacherHomeworkQueue } from "../../data/staffData";
import { useLanguage } from "../../context/useLanguage";
import styles from "./TeacherDashboard.module.css";


const iconMap = { users: Users, graduation: GraduationCap, clock: Clock, file: FileText };

function TeacherDashboard({ user, activePage }) {
  const { t } = useLanguage();
  const weekdays = t("cal.weekdaysShort").split(",");
  if (activePage === "schedule") {
    return <Schedule />;
  }

  if (activePage === "classes") {
    return <MyClasses />;
  }

  if (activePage === "attendance") {
    return <Attendance />;
  }

  if (activePage === "grades") {
    return <Grades />;
  }

  if (activePage === "homework") {
    return <Homework />;
  }

  if (activePage !== "dashboard") {
        return <Placeholder page={activePage} />;
  }

  return (
    <div className={styles.page}>
      <section className={styles.banner}>
        <h2>{t("dashboard.welcome", { name: user.firstName })}</h2>
        <p>{t("dashboard.teacherSub")}</p>
      </section>

      <div className={styles.statsRow}>
        {teacherStats.map((s) => (
          <StatCard key={s.id} icon={iconMap[s.icon]} label={t(s.labelKey)} value={s.value} sub={t(s.subKey)} color={s.color} />
        ))}
      </div>

      <div className={styles.mainGrid}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>{t("nav.classes")}</h3>
            <a href="#">{t("common.viewAll")}</a>
          </div>
          <div>
            {teacherClasses.map((c) => (
              <div key={c.id} className={styles.classItem}>
                <div>
                  <p className={styles.classTitle}>{c.name}</p>
                  <p className={styles.classMeta}>
                    {t("teacher.studentsCount", { n: c.students })} • {c.days.map((d) => weekdays[d]).join("/")} • {c.time}
                  </p>
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
            <h3>{t("teacher.toReview")}</h3>
            <a href="#">{t("common.viewAll")}</a>
          </div>
          <div className={styles.list}>
            {teacherHomeworkQueue.map((h) => (
              <div key={h.id} className={styles.hwItem}>
                <div>
                  <p className={styles.hwStudent}>{h.student}</p>
                  <p className={styles.hwTask}>{h.task}</p>
                  <p className={styles.hwTime}>{t(h.dayKey)}, {h.time}</p>
                </div>
                <ChevronRight size={18} style={{ color: "var(--c-b7becb)" }} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherDashboard;