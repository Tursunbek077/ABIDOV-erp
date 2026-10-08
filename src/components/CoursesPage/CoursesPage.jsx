import { useState, useMemo, useEffect, useRef } from "react";
import { Search, ChevronDown } from "lucide-react";
import CourseProgressCard from "../CourseProgressCard/CourseProgressCard";
import { loadCourses } from "../../utils/coursesStore";
import styles from "./CoursesPage.module.css";
import { useLanguage } from "../../context/useLanguage";

function enrichCourse(course) {
  const start = new Date(course.startDate || Date.now());
  const now = new Date();

  let elapsedMonths = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  let elapsedDays = now.getDate() - start.getDate();
  if (elapsedDays < 0) {
    elapsedMonths = Math.max(0, elapsedMonths - 1);
    elapsedDays = 30 + elapsedDays;
  }
  elapsedMonths = Math.max(0, elapsedMonths);
  elapsedDays = Math.max(0, elapsedDays);

  const duration = course.durationMonths || 6;
  const currentMonth = Math.min(duration, Math.max(1, elapsedMonths + 1));
  const progress = course.progress !== undefined ? course.progress : Math.min(100, Math.round((currentMonth / duration) * 100));

  return {
    ...course,
    progress: course.progress ?? progress,
    currentMonth: course.currentMonth ?? currentMonth,
    elapsedMonths: course.elapsedMonths ?? elapsedMonths,
    elapsedDays: course.elapsedDays ?? elapsedDays,
  };
}

function CoursesPage() {
  const { t } = useLanguage();
  const [courses, setCourses] = useState(() => loadCourses().map(enrichCourse));
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function refresh() {
      setCourses(loadCourses().map(enrichCourse));
    }
    window.addEventListener("storage", refresh);
    window.addEventListener("abidovs_courses_changed", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("abidovs_courses_changed", refresh);
    };
  }, []);

  const categories = useMemo(
    () => ["all", ...new Set(courses.map((c) => c.category))],
    [courses]
  );

  // Ro'yxat tashqarisiga bosilganda yoki Esc bosilganda yopiladi
  useEffect(() => {
    if (!open) return;
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false);
    }
    function handleKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const categoryLabel = (c) => (c === "all" ? t("courses.all") : c);

  const filtered = courses.filter((c) => {
    const matchesQuery = c.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "all" || c.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={16} style={{ color: "var(--c-8a94a6)" }} />
          <input
            type="text"
            placeholder={t("courses.search")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div ref={dropdownRef} className={`${styles.dropdown} ${open ? styles.dropdownOpen : ""}`}>
          <button
            type="button"
            className={styles.dropdownTrigger}
            onClick={() => setOpen((o) => !o)}
            aria-haspopup="listbox"
            aria-expanded={open}
          >
            <span>{categoryLabel(category)}</span>
            <ChevronDown size={16} className={styles.dropdownChevron} />
          </button>

          {open && (
            <div className={styles.dropdownMenu} role="listbox">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="option"
                  aria-selected={c === category}
                  className={`${styles.dropdownOption} ${c === category ? styles.dropdownSelected : ""}`}
                  onClick={() => {
                    setCategory(c);
                    setOpen(false);
                  }}
                >
                  {categoryLabel(c)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.list}>
        {filtered.length > 0 ? (
          filtered.map((course) => (
            <CourseProgressCard key={course.id} course={course} />
          ))
        ) : (
          <div className={styles.emptyState}>{t("courses.empty")}</div>
        )}
      </div>
    </div>
  );
}

export default CoursesPage;