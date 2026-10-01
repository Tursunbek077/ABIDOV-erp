import { useState } from "react";
import { Users, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { myClassesSeed } from "../../data/myClassesData";
import { groupName } from "../../utils/groupName";
import styles from "./MyClasses.module.css";
import { useLanguage } from "../../context/useLanguage";

function initials(firstName, lastName) {
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
}

function MyClasses() {
  const { t } = useLanguage();
  const weekdays = t("cal.weekdaysShort").split(",");
  const [selectedClass, setSelectedClass] = useState(null);

  if (selectedClass) {
    return (
      <div className={styles.page}>
        <button className={styles.backBtn} onClick={() => setSelectedClass(null)}>
          <ChevronLeft size={18} />
          {t("common.back")}
        </button>

        <div className={styles.groupHeader}>
          <div className={styles.groupIcon}>
            <Layers size={22} />
          </div>
          <div>
            <h3 className={styles.groupTitle}>{groupName(selectedClass.name, t)}</h3>
            <p className={styles.groupMeta}>
              {selectedClass.subject} • {t("teacher.studentsCount", { n: selectedClass.students.length })}
            </p>
          </div>
        </div>

        <div className={styles.studentList}>
          {selectedClass.students.map((s) => {
            const isActive = s.status === "faol";
            return (
              <div key={s.id} className={styles.studentRow}>
                <div className={styles.studentInfo}>
                  <div className={styles.avatar}>{initials(s.firstName, s.lastName)}</div>
                  <p className={styles.studentName}>
                    {s.firstName} {s.lastName}
                  </p>
                </div>
                <span className={`${styles.statusBadge} ${isActive ? styles.statusActive : styles.statusInactive}`}>
                  {isActive ? t("common.active") : t("common.inactive")}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        {myClassesSeed.map((c) => (
          <button key={c.id} className={styles.classCard} onClick={() => setSelectedClass(c)}>
            <div className={styles.classTopRow}>
              <div className={styles.classIcon}>
                <Layers size={20} />
              </div>
              <ChevronRight size={18} style={{ color: "var(--c-b7becb)" }} />
            </div>
            <h4 className={styles.className}>{groupName(c.name, t)}</h4>
            <p className={styles.classSubject}>{c.subject}</p>
            <div className={styles.classFooter}>
              <span className={styles.classFooterItem}>
                <Users size={14} />
                {t("teacher.studentsCount", { n: c.students.length })}
              </span>
              <span className={styles.classFooterTime}>
                {c.days.map((d) => weekdays[d]).join("/")} • {c.time}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default MyClasses;
