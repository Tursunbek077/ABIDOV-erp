import { useMemo, useState } from "react";
import { Check, X, Clock, Users, Layers, CalendarDays } from "lucide-react";
import { attendanceGroup } from "../../data/attendanceData";
import { groupName } from "../../utils/groupName";
import styles from "./Attendance.module.css";
import { useLanguage } from "../../context/useLanguage";

function initials(firstName, lastName) {
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
}

// Bugungi sana endi komponent ichida tanlangan til formatida chiqariladi (formatDate)

const ATTENDANCE_KEY = "abidovs_attendance";

function buildInitialStatus(students) {
  try {
    const raw = localStorage.getItem(ATTENDANCE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // Ignore storage read error
  }
  const map = {};
  students.forEach((s) => {
    map[s.id] = "bor";
  });
  return map;
}

function Attendance() {
  const { t, formatDate } = useLanguage();
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
    setStatusMap((prev) => {
      const next = { ...prev, [studentId]: value };
      try {
        localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage write error
      }
      return next;
    });
    setSaved(false);
  }

  function handleSave() {
    try {
      localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(statusMap));
    } catch {
      // Ignore storage write error
    }
    setSaved(true);
  }

  return (
    <div className={styles.page}>
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={`${styles.iconWrap} ${styles.blue}`}>
            <Users size={20} />
          </div>
          <p className={styles.statLabel}>{t("teacher.stats.students")}</p>
          <p className={styles.statValue}>{attendanceGroup.students.length}</p>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.iconWrap} ${styles.green}`}>
            <Check size={20} />
          </div>
          <p className={styles.statLabel}>{t("att.present")}</p>
          <p className={styles.statValue}>{stats.bor}</p>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.iconWrap} ${styles.orange}`}>
            <Clock size={20} />
          </div>
          <p className={styles.statLabel}>{t("att.late")}</p>
          <p className={styles.statValue}>{stats.kechikdi}</p>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.iconWrap} ${styles.red}`}>
            <X size={20} />
          </div>
          <p className={styles.statLabel}>{t("att.absent")}</p>
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
              <h3 className={styles.groupName}>{groupName(attendanceGroup.name, t)}</h3>
              <p className={styles.groupSubject}>{attendanceGroup.subject}</p>
            </div>
          </div>
          <div className={styles.dateBadge}>
            <CalendarDays size={15} />
            {formatDate(new Date())}
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
                    {t("att.present")}
                  </button>
                  <button
                    className={`${styles.actionBtn} ${styles.kechikdiBtn} ${status === "kechikdi" ? styles.active : ""}`}
                    onClick={() => setStatus(s.id, "kechikdi")}
                  >
                    <Clock size={14} />
                    {t("att.late")}
                  </button>
                  <button
                    className={`${styles.actionBtn} ${styles.yoqBtn} ${status === "yoq" ? styles.active : ""}`}
                    onClick={() => setStatus(s.id, "yoq")}
                  >
                    <X size={14} />
                    {t("att.absent")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.footer}>
          <span className={styles.footerHint}>
            {saved ? t("att.saved") : t("att.remember")}
          </span>
          <button className={styles.saveBtn} onClick={handleSave}>
            {t("common.save")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Attendance;