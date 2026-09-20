import { useState } from "react";
import { Trophy, TrendingUp, ClipboardCheck, CalendarCheck2 } from "lucide-react";
import StatCard from "../StatCard/StatCard";
import { courses, stats } from "../../data/dummyData";
import styles from "./GradesPage.module.css";

// Umumiy bahoning tarkibiy qismlari (davomat, uy vazifasi, imtihon, faollik).
// Backend ulanganda bu massiv shu joyning API javobiga almashtiriladi.
const gradeBreakdown = [
  { id: 1, label: "JS", value: 35, color: "#2F6FED" },
  { id: 2, label: "CSS", value: 30, color: "#22B573" },
  { id: 3, label: "HTML", value: 22, color: "#F5A623" },
  { id: 4, label: "REACT", value: 13, color: "#7C6FF0" },
];

const averageGrade = stats.find((s) => s.icon === "star")?.value || "86%";

function GradeDonut({ segments }) {
  const [hoveredId, setHoveredId] = useState(null);
  const size = 160;
  const stroke = 22;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((sum, s) => sum + s.value, 0);

  let offset = 0;
  const arcs = segments.map((s) => {
    const length = (s.value / total) * circumference;
    const arc = { ...s, length, dashoffset: -offset };
    offset += length;
    return arc;
  });

  return (
    <div className={styles.donutWrap}>
      <svg width={size} height={size}>
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#F1F3F8" strokeWidth={stroke} />
          {arcs.map((a) => {
            const isHovered = hoveredId === a.id;
            return (
              <circle
                key={a.id}
                className={styles.donutSegment}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={a.color}
                strokeWidth={isHovered ? stroke + 6 : stroke}
                strokeDasharray={`${a.length} ${circumference - a.length}`}
                strokeDashoffset={a.dashoffset}
                style={{ filter: isHovered ? `drop-shadow(0 0 7px ${a.color})` : "none" }}
                onMouseEnter={() => setHoveredId(a.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <title>{`${a.label}: ${Math.round((a.value / total) * 100)}%`}</title>
              </circle>
            );
          })}
        </g>
      </svg>
      <div className={styles.donutCenter}>
        <span className={styles.donutValue}>{averageGrade}</span>
        <span className={styles.donutLabel}>o'rtacha baho</span>
      </div>
    </div>
  );
}

function GradesPage() {
  return (
    <div className={styles.page}>
      <div className={styles.statsRow}>
        <StatCard icon={Trophy} label="O'rtacha baho" value={averageGrade} sub="Barcha kurslar bo'yicha" color="purple" />
        <StatCard icon={TrendingUp} label="Eng yuqori ball" value="Frontend Development" sub="Kurs bo'yicha" color="blue" />
        <StatCard icon={ClipboardCheck} label="Baholangan ishlar" value="24" sub="Shu semestrda" color="green" />
      </div>

      <div className={styles.mainGrid}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Baho tarkibi</h3>
          </div>
          <div className={styles.donutRow}>
            <GradeDonut segments={gradeBreakdown} />
            <div className={styles.legend}>
              {gradeBreakdown.map((item) => (
                <div key={item.id} className={styles.legendRow}>
                  <span className={styles.legendDot} style={{ background: item.color }} />
                  <span className={styles.legendName}>{item.label}</span>
                  <span className={styles.legendBar}>
                    <span style={{ width: `${item.value}%`, background: item.color }} />
                  </span>
                  <span className={styles.legendVal}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* <section className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Kurslar bo'yicha o'zlashtirish</h3>
          </div>
          <div className={styles.courseList}>
            {courses.map((course) => (
              <div key={course.id} className={styles.courseRow}>
                <div className={styles.courseTop}>
                  <span className={styles.courseTitle}>{course.title}</span>
                  <span className={styles.coursePercent}>{course.progress}%</span>
                </div>
                <span className={styles.courseBar}>
                  <span style={{ width: `${course.progress}%` }} />
                </span>
                <span className={styles.courseTeacher}>{course.teacher}</span>
              </div>
            ))}
          </div>
        </section> */}
      </div>

      <section className={styles.levelCard}>
        <div className={styles.levelLeft}>
          <div className={styles.levelTop}>
            <span className={styles.levelTag}>
              <CalendarCheck2 size={15} />
              Shu semestrdagi umumiy natija
            </span>
          </div>
          <span className={styles.progressTrack}>
            <span className={styles.progressFill} style={{ width: averageGrade }} />
          </span>
          <div className={styles.progressFoot}>
            <span>710 / 1000 ball</span>
            <span>{averageGrade}</span>
          </div>
        </div>
        <div className={styles.kpis}>
          {gradeBreakdown.map((item) => (
            <div key={item.id} className={styles.kpiRow}>
              <span className={styles.k}>{item.label}</span>
              <span className={styles.v}>{item.value}%</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default GradesPage;