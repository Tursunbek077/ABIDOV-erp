import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { lessons } from "../../data/dummyData";
import styles from "./Schedule.module.css";
import { useLanguage } from "../../context/useLanguage";

// Hafta kunlari va oy nomlari endi tarjimadan olinadi: t("cal.weekdaysShort"), t("cal.months")

// Kunlar: 0 = Dushanba ... 6 = Yakshanba. Dars kunlari: Seshanba(1), Payshanba(3), Shanba(5)
const LESSON_WEEKDAYS = [1, 3, 5];

function getMonthMatrix(year, month) {
  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7; // Dushanbadan boshlanadi
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

function Schedule() {
  const { t, formatDate } = useLanguage();
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState(today.getDate());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();
  const weekdays = t("cal.weekdaysShort").split(",");
  const monthNames = t("cal.months").split(",");

  const cells = useMemo(() => getMonthMatrix(year, month), [year, month]);

  const lessonDayCount = cells.filter((d) => {
    if (!d) return false;
    const dow = (new Date(year, month, d).getDay() + 6) % 7;
    return LESSON_WEEKDAYS.includes(dow);
  }).length;

  function goPrevMonth() {
    setViewDate(new Date(year, month - 1, 1));
  }
  function goNextMonth() {
    setViewDate(new Date(year, month + 1, 1));
  }

  function isLessonDay(d) {
    if (!d) return false;
    const dow = (new Date(year, month, d).getDay() + 6) % 7;
    return LESSON_WEEKDAYS.includes(dow);
  }

  const selectedIsLessonDay = isCurrentMonth && isLessonDay(selectedDay);

  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        <section className={styles.card}>
          <div className={styles.calHeader}>
            <button className={styles.navBtn} onClick={goPrevMonth} aria-label={t("cal.prevMonth")}>
              <ChevronLeft size={18} />
            </button>
            <span className={styles.monthLabel}>{monthNames[month]} {year}</span>
            <button className={styles.navBtn} onClick={goNextMonth} aria-label={t("cal.nextMonth")}>
              <ChevronRight size={18} />
            </button>
          </div>

          <div className={styles.weekRow}>
            {weekdays.map((w, i) => (
              <span
                key={w}
                className={
                  LESSON_WEEKDAYS.includes(i) ? styles.weekLabelLesson : styles.weekLabel
                }
              >
                {w}
              </span>
            ))}
          </div>

          <div className={styles.daysGrid}>
            {cells.map((d, idx) => {
              if (!d) return <div key={idx} className={styles.emptyCell} />;
              const lesson = isLessonDay(d);
              const selected = isCurrentMonth && d === selectedDay;
              const cellClass = [
                styles.dayCell,
                lesson ? styles.lessonCell : "",
                selected ? styles.selectedCell : "",
              ].join(" ").trim();

              return (
                <button
                  key={idx}
                  className={cellClass}
                  onClick={() => setSelectedDay(d)}
                >
                  <span className={styles.dayNum}>{d}</span>
                  {lesson && <span className={styles.dot} />}
                </button>
              );
            })}
          </div>

          <div className={styles.legend}>
            <span className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.legendDotLesson}`} />
              {t("schedule.lessonDay")} ({LESSON_WEEKDAYS.map((i) => weekdays[i]).join(" / ")})
            </span>
          </div>
        </section>

        <section className={styles.card}>
          <div className={styles.sideHeader}>
            <h3>
              {!selectedIsLessonDay
                ? t("schedule.selectedDay")
                : selectedDay === today.getDate()
                  ? t("schedule.todayLessons")
                  : t("schedule.dayLessons", {
                      date: formatDate(new Date(year, month, selectedDay), { day: "numeric", month: "long" }),
                    })}
            </h3>
            <span className={styles.sideCount}>{t("schedule.daysPerMonth", { n: lessonDayCount })}</span>
          </div>

          {selectedIsLessonDay ? (
            <div className={styles.lessonList}>
              {lessons.map((lesson) => (
                <div key={lesson.id} className={styles.lessonItem}>
                  <span className={styles.lessonTime}>
                    <Clock size={14} /> {lesson.time}
                  </span>
                  <div>
                    <p className={styles.lessonTitle}>{lesson.title}</p>
                    <p className={styles.lessonSubtitle}>{lesson.subtitle} · {t("common.room")}: {lesson.room}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.emptyNote}>{t("schedule.noLessons")}</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default Schedule;
