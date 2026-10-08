import { useMemo, useState } from "react";
import {
  ClipboardList,
  Layers,
  Users,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react";
import { homeworkGroups } from "../../data/homeworkData";
import { groupName } from "../../utils/groupName";
import styles from "./Homework.module.css";
import { useLanguage } from "../../context/useLanguage";

function initials(firstName, lastName) {
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
}


const statusMeta = {
  tekshirildi: { labelKey: "thw.checked", bg: "var(--c-e4f8ee)", color: "var(--c-22b573)" },
  tekshirilmagan: { labelKey: "thw.unchecked", bg: "var(--c-fef3e3)", color: "var(--c-f5a623)" },
  topshirmadi: { labelKey: "thw.missing", bg: "var(--c-fdecec)", color: "var(--c-d64545)" },
};

function Homework() {
  const { t, formatDate } = useLanguage();
  const [groups, setGroups] = useState(homeworkGroups);
  const [selectedId, setSelectedId] = useState(null);

  const selectedGroup = groups.find((g) => g.id === selectedId) || null;

  const overallStats = useMemo(() => {
    return groups.map((g) => {
      const checked = g.students.filter((s) => s.status === "tekshirildi").length;
      const pending = g.students.filter((s) => s.status === "tekshirilmagan").length;
      const missing = g.students.filter((s) => s.status === "topshirmadi").length;
      return { id: g.id, checked, pending, missing };
    });
  }, [groups]);

  const groupStats = useMemo(() => {
    if (!selectedGroup) return null;
    const checked = selectedGroup.students.filter((s) => s.status === "tekshirildi").length;
    const pending = selectedGroup.students.filter((s) => s.status === "tekshirilmagan").length;
    const missing = selectedGroup.students.filter((s) => s.status === "topshirmadi").length;
    return { checked, pending, missing, total: selectedGroup.students.length };
  }, [selectedGroup]);

  function handleCheck(student) {
    const raw = window.prompt(
      t("thw.prompt", { name: `${student.firstName} ${student.lastName}` }),
      "90"
    );
    if (raw === null) return;
    const parsed = Number(raw);
    if (Number.isNaN(parsed)) return;
    const grade = Math.min(100, Math.max(0, Math.round(parsed)));

    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== selectedGroup.id) return g;
        return {
          ...g,
          students: g.students.map((s) =>
            s.id === student.id ? { ...s, status: "tekshirildi", grade } : s
          ),
        };
      })
    );
  }

  if (selectedGroup) {
    return (
      <div className={styles.page}>
        <button className={styles.backBtn} onClick={() => setSelectedId(null)}>
          <ChevronLeft size={18} />
          {t("common.back")}
        </button>

        <div className={styles.groupHeader}>
          <div className={styles.groupInfo}>
            <div className={styles.groupIcon}>
              <Layers size={20} />
            </div>
            <div>
              <h3 className={styles.groupName}>{groupName(selectedGroup.name, t)}</h3>
              <p className={styles.groupSubject}>
                {selectedGroup.subject} • {selectedGroup.assignment}
              </p>
            </div>
          </div>
          <div className={styles.dateBadge}>
            <CalendarDays size={15} />
            {t("thw.deadline")}: {formatDate(selectedGroup.deadline)}
          </div>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <div className={`${styles.iconWrap} ${styles.blue}`}>
              <Users size={20} />
            </div>
            <p className={styles.statLabel}>{t("teacher.stats.students")}</p>
            <p className={styles.statValue}>{groupStats.total}</p>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.iconWrap} ${styles.green}`}>
              <CheckCircle2 size={20} />
            </div>
            <p className={styles.statLabel}>{t("thw.checked")}</p>
            <p className={styles.statValue}>{groupStats.checked}</p>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.iconWrap} ${styles.orange}`}>
              <Clock size={20} />
            </div>
            <p className={styles.statLabel}>{t("thw.unchecked")}</p>
            <p className={styles.statValue}>{groupStats.pending}</p>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.iconWrap} ${styles.red}`}>
              <XCircle size={20} />
            </div>
            <p className={styles.statLabel}>{t("thw.missing")}</p>
            <p className={styles.statValue}>{groupStats.missing}</p>
          </div>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{t("thw.col.student")}</th>
                <th>{t("thw.col.submitted")}</th>
                <th>{t("thw.deadline")}</th>
                <th>{t("thw.col.grade")}</th>
                <th>{t("pay.col.status")}</th>
                <th className={styles.actionsHead}>{t("thw.col.action")}</th>
              </tr>
            </thead>
            <tbody>
              {selectedGroup.students.map((s) => {
                const meta = statusMeta[s.status];
                return (
                  <tr key={s.id}>
                    <td>
                      <div className={styles.nameCell}>
                        <span className={styles.avatar}>{initials(s.firstName, s.lastName)}</span>
                        <div>
                          <p className={styles.fullName}>
                            {s.firstName} {s.lastName}
                          </p>
                          <p className={styles.code}>{s.studentCode}</p>
                        </div>
                      </div>
                    </td>
                    <td className={styles.dateCell}>{formatDate(s.submittedDate)}</td>
                    <td className={styles.dateCell}>{formatDate(selectedGroup.deadline)}</td>
                    <td className={styles.gradeCell}>{s.grade != null ? t("tgrades.score", { n: s.grade }) : "—"}</td>
                    <td>
                      <span className={styles.statusBadge} style={{ background: meta.bg, color: meta.color }}>
                        {t(meta.labelKey)}
                      </span>
                    </td>
                    <td>
                      {s.status === "tekshirilmagan" && (
                        <button className={styles.checkBtn} onClick={() => handleCheck(s)}>
                          {t("thw.check")}
                        </button>
                      )}
                      {s.status === "tekshirildi" && (
                        <span className={styles.doneTag}>
                          <CheckCircle2 size={14} /> {t("thw.graded")}
                        </span>
                      )}
                      {s.status === "topshirmadi" && <span className={styles.waitingTag}>{t("hwStudent.tabPending")}</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        {groups.map((g) => {
          const stat = overallStats.find((s) => s.id === g.id);
          return (
            <button key={g.id} className={styles.groupCard} onClick={() => setSelectedId(g.id)}>
              <div className={styles.classTopRow}>
                <div className={styles.classIcon}>
                  <ClipboardList size={20} />
                </div>
                <ChevronRight size={18} style={{ color: "var(--c-b7becb)" }} />
              </div>
              <h4 className={styles.className}>{groupName(g.name, t)}</h4>
              <p className={styles.classSubject}>{g.subject}</p>
              <p className={styles.assignmentLine}>{g.assignment}</p>

              <div className={styles.classFooter}>
                <span className={styles.classFooterItem}>
                  <Users size={14} />
                  {t("teacher.studentsCount", { n: g.students.length })}
                </span>
                <span className={styles.classFooterTime}>{t("thw.deadline")}: {formatDate(g.deadline)}</span>
              </div>

              <div className={styles.miniProgress}>
                <span className={styles.miniDone}>{t("thw.miniChecked", { n: stat.checked })}</span>
                <span className={styles.miniPending}>{t("thw.miniPending", { n: stat.pending })}</span>
                <span className={styles.miniMissing}>{t("thw.miniMissing", { n: stat.missing })}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Homework;
