import { useState, useMemo } from "react";
import { Search, ChevronDown } from "lucide-react";
import CourseProgressCard from "../courseProgressCard/CourseProgressCard";
import { courses } from "../../data/dummyData";
import styles from "./CoursesPage.module.css";

function CoursesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Barcha kurslar");

  const categories = useMemo(
    () => ["Barcha kurslar", ...new Set(courses.map((c) => c.category))],
    []
  );

  const filtered = courses.filter((c) => {
    const matchesQuery = c.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "Barcha kurslar" || c.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={16} color="#8A94A6" />
          <input
            type="text"
            placeholder="Kurslarni qidirish..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className={styles.filterBox}>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <ChevronDown size={16} color="#8A94A6" />
        </div>
      </div>

      <div className={styles.list}>
        {filtered.length > 0 ? (
          filtered.map((course) => (
            <CourseProgressCard key={course.id} course={course} />
          ))
        ) : (
          <div className={styles.emptyState}>Hech qanday kurs topilmadi.</div>
        )}
      </div>
    </div>
  );
}

export default CoursesPage;