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
import styles from "./Homework.module.css";

function initials(firstName, lastName) {
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
}

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("uz-UZ", { day: "2-digit", month: "2-digit", year: "numeric" });
}

const statusMeta = {
  tekshirildi: { label: "Tekshirildi", bg: "#E4F8EE", color: "#22B573" },
  tekshirilmagan: { label: "Tekshirilmagan", bg: "#FEF3E3", color: "#F5A623" },
  topshirmadi: { label: "Topshirmadi", bg: "#FDECEC", color: "#D64545" },
};

function Homework() {
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
      `${student.firstName} ${student.lastName} uchun baho qo'ying (0-100):`,
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
          Orqaga
        </button>

        <div className={styles.groupHeader}>
          <div className={styles.groupInfo}>
            <div className={styles.groupIcon}>
              <Layers size={20} />
            </div>
            <div>
              <h3 className={styles.groupName}>{selectedGroup.name}</h3>
              <p className={styles.groupSubject}>
                {selectedGroup.subject} • {selectedGroup.assignment}
              </p>
            </div>
          </div>
          <div className={styles.dateBadge}>
            <CalendarDays size={15} />
            Muddat: {formatDate(selectedGroup.deadline)}
          </div>
        </div>

        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <div className={`${styles.iconWrap} ${styles.blue}`}>
              <Users size={20} />
            </div>
            <p className={styles.statLabel}>Jami o'quvchi</p>
            <p className={styles.statValue}>{groupStats.total}</p>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.iconWrap} ${styles.green}`}>
              <CheckCircle2 size={20} />
            </div>
            <p className={styles.statLabel}>Tekshirildi</p>
            <p className={styles.statValue}>{groupStats.checked}</p>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.iconWrap} ${styles.orange}`}>
              <Clock size={20} />
            </div>
            <p className={styles.statLabel}>Tekshirilmagan</p>
            <p className={styles.statValue}>{groupStats.pending}</p>
          </div>
          <div className={styles.statCard}>
            <div className={`${styles.iconWrap} ${styles.red}`}>
              <XCircle size={20} />
            </div>
            <p className={styles.statLabel}>Topshirmadi</p>
            <p className={styles.statValue}>{groupStats.missing}</p>
          </div>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>O'quvchi</th>
                <th>Topshirilgan sana</th>
                <th>Muddat</th>
                <th>Baho</th>
                <th>Holat</th>
                <th className={styles.actionsHead}>Amal</th>
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
                    <td className={styles.gradeCell}>{s.grade != null ? `${s.grade} ball` : "—"}</td>
                    <td>
                      <span className={styles.statusBadge} style={{ background: meta.bg, color: meta.color }}>
                        {meta.label}
                      </span>
                    </td>
                    <td>
                      {s.status === "tekshirilmagan" && (
                        <button className={styles.checkBtn} onClick={() => handleCheck(s)}>
                          Tekshirish
                        </button>
                      )}
                      {s.status === "tekshirildi" && (
                        <span className={styles.doneTag}>
                          <CheckCircle2 size={14} /> Baholandi
                        </span>
                      )}
                      {s.status === "topshirmadi" && <span className={styles.waitingTag}>Kutilmoqda</span>}
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
                <ChevronRight size={18} color="#B7BECB" />
              </div>
              <h4 className={styles.className}>{g.name}</h4>
              <p className={styles.classSubject}>{g.subject}</p>
              <p className={styles.assignmentLine}>{g.assignment}</p>

              <div className={styles.classFooter}>
                <span className={styles.classFooterItem}>
                  <Users size={14} />
                  {g.students.length} o'quvchi
                </span>
                <span className={styles.classFooterTime}>Muddat: {formatDate(g.deadline)}</span>
              </div>

              <div className={styles.miniProgress}>
                <span className={styles.miniDone}>{stat.checked} tekshirildi</span>
                <span className={styles.miniPending}>{stat.pending} kutmoqda</span>
                <span className={styles.miniMissing}>{stat.missing} topshirmadi</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Homework;
