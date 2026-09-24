import { useState } from "react";
import { Users, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { myClassesSeed } from "../../data/myClassesData";
import styles from "./MyClasses.module.css";

function initials(firstName, lastName) {
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
}

function MyClasses() {
  const [selectedClass, setSelectedClass] = useState(null);

  if (selectedClass) {
    return (
      <div className={styles.page}>
        <button className={styles.backBtn} onClick={() => setSelectedClass(null)}>
          <ChevronLeft size={18} />
          Orqaga
        </button>

        <div className={styles.groupHeader}>
          <div className={styles.groupIcon}>
            <Layers size={22} />
          </div>
          <div>
            <h3 className={styles.groupTitle}>{selectedClass.name}</h3>
            <p className={styles.groupMeta}>
              {selectedClass.subject} • {selectedClass.students.length} o'quvchi
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
                  {isActive ? "Faol" : "Nofaol"}
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
              <ChevronRight size={18} color="#B7BECB" />
            </div>
            <h4 className={styles.className}>{c.name}</h4>
            <p className={styles.classSubject}>{c.subject}</p>
            <div className={styles.classFooter}>
              <span className={styles.classFooterItem}>
                <Users size={14} />
                {c.students.length} o'quvchi
              </span>
              <span className={styles.classFooterTime}>{c.time}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default MyClasses;
