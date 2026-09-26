import { useMemo, useState } from "react";
import { Check, X, Clock, Users, Layers, CalendarDays } from "lucide-react";
import { attendanceGroup } from "../../data/attendanceData";
import styles from "./Attendance.module.css";

function initials(firstName, lastName) {
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
}

const todayLabel = new Date().toLocaleDateString("uz-UZ", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function buildInitialStatus(students) {
  const map = {};
  students.forEach((s) => {
    map[s.id] = "bor";
  });
  return map;
}

function Attendance() {
  const [statusMap, setStatusMap] = useState(() => buildInitialStatus(attendanceGroup.students));
  const [saved, setSaved] = useState(false);

  const stats = useMemo(() => {
    const values = Object.values(statusMap);
    return {
      bor: values.filter((v) => v === "bor").length,
      kechikdi: values.filter((v) => v === "kechikdi").length,
      yoq: values.filter((v) => v === "yoq").length,
    };
  }, [statusMap]);

  function setStatus(studentId, value) {
    setStatusMap((prev) => ({ ...prev, [studentId]: value }));
    setSaved(false);
  }

  function handleSave() {
    setSaved(true);
  }

  return (
    <div className={styles.page}>
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={`${styles.iconWrap} ${styles.blue}`}>
            <Users size={20} />
          </div>
          <p className={styles.statLabel}>Jami o'quvchi</p>
          <p className={styles.statValue}>{attendanceGroup.students.length}</p>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.iconWrap} ${styles.green}`}>
            <Check size={20} />
          </div>
          <p className={styles.statLabel}>Keldi</p>
          <p className={styles.statValue}>{stats.bor}</p>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.iconWrap} ${styles.orange}`}>
            <Clock size={20} />
          </div>
          <p className={styles.statLabel}>Kechikdi</p>
          <p className={styles.statValue}>{stats.kechikdi}</p>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.iconWrap} ${styles.red}`}>
            <X size={20} />
          </div>
          <p className={styles.statLabel}>Kelmadi</p>
          <p className={styles.statValue}>{stats.yoq}</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.groupInfo}>
            <div className={styles.groupIcon}>
              <Layers size={18} />
            </div>
            <div>
              <h3 className={styles.groupName}>{attendanceGroup.name}</h3>
              <p className={styles.groupSubject}>{attendanceGroup.subject}</p>
            </div>
          </div>
          <div className={styles.dateBadge}>
            <CalendarDays size={15} />
            {todayLabel}
          </div>
        </div>

        <div className={styles.studentList}>
          {attendanceGroup.students.map((s) => {
            const status = statusMap[s.id];
            return (
              <div key={s.id} className={styles.studentRow}>
                <div className={styles.studentInfo}>
                  <div className={styles.avatar}>{initials(s.firstName, s.lastName)}</div>
                  <p className={styles.studentName}>
                    {s.firstName} {s.lastName}
                  </p>
                </div>

                <div className={styles.actions}>
                  <button
                    className={`${styles.actionBtn} ${styles.borBtn} ${status === "bor" ? styles.active : ""}`}
                    onClick={() => setStatus(s.id, "bor")}
                  >
                    <Check size={14} />
                    Keldi
                  </button>
                  <button
                    className={`${styles.actionBtn} ${styles.kechikdiBtn} ${status === "kechikdi" ? styles.active : ""}`}
                    onClick={() => setStatus(s.id, "kechikdi")}
                  >
                    <Clock size={14} />
                    Kechikdi
                  </button>
                  <button
                    className={`${styles.actionBtn} ${styles.yoqBtn} ${status === "yoq" ? styles.active : ""}`}
                    onClick={() => setStatus(s.id, "yoq")}
                  >
                    <X size={14} />
                    Kelmadi
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.footer}>
          <span className={styles.footerHint}>
            {saved ? "Davomat saqlandi ✓" : "O'zgarishlarni saqlashni unutmang"}
          </span>
          <button className={styles.saveBtn} onClick={handleSave}>
            Saqlash
          </button>
        </div>
      </div>
    </div>
  );
}

export default Attendance;