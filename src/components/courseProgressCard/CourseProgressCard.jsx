import { Code2, Palette, Calendar, Check } from "lucide-react";
import styles from "./CourseProgressCard.module.css";

const iconMap = { code: Code2, palette: Palette };

function CircularProgress({ percent }) {
  const size = 56;
  const stroke = 5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);

  return (
    <div className={styles.progressRing}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#D9E6FF"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#2F6FED"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className={styles.progressLabel}>{percent}%</span>
    </div>
  );
}

function CourseProgressCard({ course }) {
  const Icon = iconMap[course.icon];
  const months = Array.from({ length: course.durationMonths }, (_, i) => i + 1);

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div className={styles.iconBox}>
          {Icon ? <Icon size={26} /> : <span>{course.icon}</span>}
        </div>

        <div className={styles.info}>
          <h4 className={styles.title}>{course.title}</h4>
          <div className={styles.metaRow}>
            <span className={styles.badge}>{course.category}</span>
            <span className={styles.durationText}>{course.durationMonths} oyli kurs</span>
          </div>
          <div className={styles.dateRow}>
            <Calendar size={14} />
            <span>Boshlanish sanasi: {course.startDate}</span>
          </div>
        </div>

        <div className={styles.statPanel}>
          <div className={styles.statText}>
            <p>O'quv vaqti: <b>{course.durationMonths} oy</b></p>
            <p className={styles.statElapsed}>O'tgan vaqti: <b>{course.elapsed}</b></p>
          </div>
          <CircularProgress percent={course.progress} />
        </div>
      </div>

      <div className={styles.timeline}>
        {months.map((m, idx) => {
          const isDone = m < course.currentMonth;
          const isCurrent = m === course.currentMonth;
          const isFuture = m > course.currentMonth;
          const nextConnectorDone = m < course.currentMonth;

          return (
            <div className={styles.timelineStep} key={m}>
              <div className={styles.nodeWrap}>
                <div
                  className={[
                    styles.node,
                    isDone ? styles.nodeDone : "",
                    isCurrent ? styles.nodeCurrent : "",
                    isFuture ? styles.nodeFuture : "",
                  ].join(" ").trim()}
                >
                  {isDone && <Check size={12} strokeWidth={3} />}
                  {isCurrent && <span className={styles.nodeCurrentDot} />}
                </div>
                {idx < months.length - 1 && (
                  <div
                    className={`${styles.connector} ${
                      nextConnectorDone ? styles.connectorDone : styles.connectorFuture
                    }`}
                  />
                )}
              </div>
              <span className={`${styles.monthLabel} ${isCurrent ? styles.monthLabelCurrent : ""}`}>
                {m}-oy
              </span>
              {isCurrent && <span className={styles.currentTag}>Joriy oy</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CourseProgressCard;