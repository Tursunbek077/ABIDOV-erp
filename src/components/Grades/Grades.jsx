import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Layers, Star, Trophy, TrendingUp, TrendingDown, Check } from "lucide-react";
import { gradesGroup } from "../../data/gradesData";
import styles from "./Grades.module.css";

function initials(firstName, lastName) {
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
}

function buildInitialScores(students) {
  const map = {};
  students.forEach((s) => {
    map[s.id] = s.score;
  });
  return map;
}

function rankStyle(rank) {
  if (rank === 1) return "gold";
  if (rank === 2) return "silver";
  if (rank === 3) return "bronze";
  return "plain";
}

function Grades() {
  const [scores, setScores] = useState(() => buildInitialScores(gradesGroup.students));
  const [editingId, setEditingId] = useState(null);
  const [draftValue, setDraftValue] = useState("");

  const ranked = useMemo(() => {
    return [...gradesGroup.students]
      .map((s) => ({ ...s, score: scores[s.id] }))
      .sort((a, b) => b.score - a.score);
  }, [scores]);

  const stats = useMemo(() => {
    const values = Object.values(scores);
    const avg = values.reduce((sum, v) => sum + v, 0) / values.length;
    return {
      avg: Math.round(avg),
      max: Math.max(...values),
      min: Math.min(...values),
    };
  }, [scores]);

  function handleNameClick(studentId, currentScore) {
    if (editingId === studentId) {
      setEditingId(null);
      return;
    }
    setEditingId(studentId);
    setDraftValue(String(currentScore));
  }

  function handleScoreInput(studentId, rawValue) {
    setDraftValue(rawValue);
    const parsed = Number(rawValue);
    if (rawValue !== "" && !Number.isNaN(parsed)) {
      const clamped = Math.min(100, Math.max(0, parsed));
      setScores((prev) => ({ ...prev, [studentId]: clamped }));
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === "Escape") {
      setEditingId(null);
    }
  }

  // Qator boshqa o'ringa "sirg'alib tushishi" uchun (FLIP animatsiyasi)
  const rowRefs = useRef({});
  const prevPositions = useRef({});

  useLayoutEffect(() => {
    const newPositions = {};
    ranked.forEach((s) => {
      const el = rowRefs.current[s.id];
      if (el) newPositions[s.id] = el.getBoundingClientRect().top;
    });

    ranked.forEach((s) => {
      const el = rowRefs.current[s.id];
      const prevTop = prevPositions.current[s.id];
      const newTop = newPositions[s.id];
      if (!el || prevTop === undefined || newTop === undefined) return;

      const delta = prevTop - newTop;
      if (delta) {
        el.style.transition = "none";
        el.style.transform = `translateY(${delta}px)`;
        requestAnimationFrame(() => {
          el.style.transition = "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)";
          el.style.transform = "translateY(0)";
        });
      }
    });

    prevPositions.current = newPositions;
  }, [ranked]);

  return (
    <div className={styles.page}>
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={`${styles.iconWrap} ${styles.blue}`}>
            <Star size={20} />
          </div>
          <p className={styles.statLabel}>Jami o'quvchi</p>
          <p className={styles.statValue}>{gradesGroup.students.length}</p>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.iconWrap} ${styles.green}`}>
            <Trophy size={20} />
          </div>
          <p className={styles.statLabel}>O'rtacha ball</p>
          <p className={styles.statValue}>{stats.avg}</p>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.iconWrap} ${styles.orange}`}>
            <TrendingUp size={20} />
          </div>
          <p className={styles.statLabel}>Eng yuqori</p>
          <p className={styles.statValue}>{stats.max}</p>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.iconWrap} ${styles.red}`}>
            <TrendingDown size={20} />
          </div>
          <p className={styles.statLabel}>Eng past</p>
          <p className={styles.statValue}>{stats.min}</p>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.groupInfo}>
            <div className={styles.groupIcon}>
              <Layers size={18} />
            </div>
            <div>
              <h3 className={styles.groupName}>{gradesGroup.name}</h3>
              <p className={styles.groupSubject}>{gradesGroup.subject}</p>
            </div>
          </div>
          <span className={styles.hint}>Ismga bosib bahoni o'zgartiring</span>
        </div>

        <div className={styles.studentList}>
          {ranked.map((s, index) => {
            const rank = index + 1;
            const style = rankStyle(rank);
            const isEditing = editingId === s.id;
            return (
              <div
                key={s.id}
                ref={(el) => (rowRefs.current[s.id] = el)}
                className={styles.studentRow}
              >
                <div className={styles.studentInfo}>
                  <div className={`${styles.rankBadge} ${styles[style]}`}>{rank}</div>
                  <div className={styles.avatar}>{initials(s.firstName, s.lastName)}</div>

                  <div className={styles.nameArea}>
                    <button className={styles.nameBtn} onClick={() => handleNameClick(s.id, s.score)}>
                      {s.firstName} {s.lastName}
                    </button>

                    {isEditing && (
                      <div className={styles.editBox}>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          className={styles.scoreInput}
                          autoFocus
                          value={draftValue}
                          onChange={(e) => handleScoreInput(s.id, e.target.value)}
                          onKeyDown={handleKeyDown}
                          onBlur={() => setEditingId(null)}
                        />
                        <button
                          type="button"
                          className={styles.confirmBtn}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => setEditingId(null)}
                        >
                          <Check size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <span className={styles.scoreBadge}>{s.score} ball</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Grades;
