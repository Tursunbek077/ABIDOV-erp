import { useState, useEffect, useMemo } from "react";
import {
  Search,
  ChevronDown,
  Plus,
  Layers,
  BookOpen,
  Users,
  Wallet,
  Pencil,
  Trash2,
  User,
  Calendar,
} from "lucide-react";
import StatCard from "../StatCard/StatCard";
import CourseFormModal from "../CourseFormModal/CourseFormModal";
import CourseDetailModal from "../CourseDetailModal/CourseDetailModal";
import { categoryOptions } from "../../data/coursesData";
import { loadCourses, saveCourses } from "../../utils/coursesStore";
import { loadStudents } from "../../utils/studentsStore";
import styles from "./CoursesManagementPage.module.css";

function CoursesManagementPage() {
  const [courses, setCourses] = useState(loadCourses);
  const [studentsTick, setStudentsTick] = useState(0);
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Barcha yo'nalishlar");
  const [statusFilter, setStatusFilter] = useState("Barcha holatlar");
  const [formOpen, setFormOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [detailCourse, setDetailCourse] = useState(null);

  useEffect(() => {
    saveCourses(courses);
  }, [courses]);

  const students = useMemo(() => loadStudents(), [studentsTick, courses]);

  const studentCountByCourse = useMemo(() => {
    const map = {};
    students.forEach((s) => {
      map[s.course] = (map[s.course] || 0) + 1;
    });
    return map;
  }, [students]);

  const stats = useMemo(() => {
    const totalCourses = courses.length;
    const activeCourses = courses.filter((c) => c.status === "faol").length;
    const totalEnrolled = courses.reduce((sum, c) => sum + (studentCountByCourse[c.title] || 0), 0);
    const monthlyRevenue = courses.reduce(
      (sum, c) => sum + c.price * (studentCountByCourse[c.title] || 0),
      0
    );
    return { totalCourses, activeCourses, totalEnrolled, monthlyRevenue };
  }, [courses, studentCountByCourse]);

  const filtered = courses.filter((c) => {
    const matchesQuery = c.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = categoryFilter === "Barcha yo'nalishlar" || c.category === categoryFilter;
    const matchesStatus =
      statusFilter === "Barcha holatlar" ||
      (statusFilter === "Faol" && c.status === "faol") ||
      (statusFilter === "Nofaol" && c.status === "nofaol");
    return matchesQuery && matchesCategory && matchesStatus;
  });

  function openAddModal() {
    setEditingCourse(null);
    setFormOpen(true);
  }

  function openEditModal(course) {
    setEditingCourse(course);
    setFormOpen(true);
  }

  function closeFormModal() {
    setFormOpen(false);
    setEditingCourse(null);
  }

  function handleSave(course) {
    if (course.id) {
      setCourses((prev) => prev.map((c) => (c.id === course.id ? course : c)));
    } else {
      setCourses((prev) => [...prev, { ...course, id: `c-${Date.now()}` }]);
    }
    closeFormModal();
  }

  function handleDelete(course) {
    const enrolled = studentCountByCourse[course.title] || 0;
    const message =
      enrolled > 0
        ? `"${course.title}" kursida ${enrolled} ta o'quvchi bor. Kursni baribir o'chirishni tasdiqlaysizmi?`
        : `"${course.title}" kursini o'chirishni tasdiqlaysizmi?`;
    if (window.confirm(message)) {
      setCourses((prev) => prev.filter((c) => c.id !== course.id));
    }
  }

  function handleStudentsChanged() {
    setStudentsTick((n) => n + 1);
  }

  return (
    <div className={styles.page}>
      <div className={styles.statsRow}>
        <StatCard icon={Layers} label="Jami kurslar" value={stats.totalCourses} sub="Barcha yo'nalishlar" color="blue" />
        <StatCard icon={BookOpen} label="Faol kurslar" value={stats.activeCourses} sub="Hozirda o'tilmoqda" color="green" />
        <StatCard icon={Users} label="Jami o'quvchilar" value={stats.totalEnrolled} sub="Barcha kurslarda" color="purple" />
        <StatCard
          icon={Wallet}
          label="Oylik taxminiy tushum"
          value={`${(stats.monthlyRevenue / 1000000).toFixed(1)}M so'm`}
          sub="Faol yozilishlar bo'yicha"
          color="orange"
        />
      </div>

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
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="Barcha yo'nalishlar">Barcha yo'nalishlar</option>
            {categoryOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <ChevronDown size={16} color="#8A94A6" />
        </div>

        <div className={styles.filterBox}>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="Barcha holatlar">Barcha holatlar</option>
            <option value="Faol">Faol</option>
            <option value="Nofaol">Nofaol</option>
          </select>
          <ChevronDown size={16} color="#8A94A6" />
        </div>

        <button className={styles.addBtn} onClick={openAddModal}>
          <Plus size={16} />
          Yangi kurs
        </button>
      </div>

      <div className={styles.grid}>
        {filtered.length > 0 ? (
          filtered.map((course) => {
            const enrolled = studentCountByCourse[course.title] || 0;
            const fillPercent =
              course.capacity > 0 ? Math.min(100, Math.round((enrolled / course.capacity) * 100)) : 0;
            const isActive = course.status === "faol";

            return (
              <div key={course.id} className={styles.card} onClick={() => setDetailCourse(course)}>
                <div className={styles.cardTop}>
                  <div className={`${styles.iconBox} ${styles[course.color] || styles.blue}`}>
                    <BookOpen size={22} />
                  </div>
                  <span className={`${styles.statusBadge} ${isActive ? styles.statusActive : styles.statusInactive}`}>
                    {isActive ? "Faol" : "Nofaol"}
                  </span>
                </div>

                <h4 className={styles.title}>{course.title}</h4>
                <span className={styles.categoryBadge}>{course.category}</span>

                <div className={styles.metaRow}>
                  <span className={styles.metaItem}>
                    <User size={13} />
                    {course.teacher}
                  </span>
                  <span className={styles.metaItem}>
                    <Calendar size={13} />
                    {course.durationMonths} oy
                  </span>
                </div>

                <div className={styles.priceRow}>
                  <Wallet size={13} />
                  {course.price.toLocaleString("uz-UZ")} so'm / oy
                </div>

                <div className={styles.capacityBlock}>
                  <div className={styles.capacityLabel}>
                    <span>
                      <Users size={13} /> {enrolled}
                      {course.capacity > 0 ? ` / ${course.capacity}` : ""} o'quvchi
                    </span>
                    {course.capacity > 0 && <span className={styles.capacityPercent}>{fillPercent}%</span>}
                  </div>
                  {course.capacity > 0 && (
                    <div className={styles.capacityTrack}>
                      <div className={styles.capacityFill} style={{ width: `${fillPercent}%` }} />
                    </div>
                  )}
                </div>

                <div className={styles.cardActions} onClick={(e) => e.stopPropagation()}>
                  <button className={styles.actionBtn} onClick={() => openEditModal(course)} aria-label="Tahrirlash">
                    <Pencil size={15} />
                  </button>
                  <button
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    onClick={() => handleDelete(course)}
                    aria-label="O'chirish"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.emptyState}>Hech qanday kurs topilmadi.</div>
        )}
      </div>

      {formOpen && (
        <CourseFormModal course={editingCourse} onClose={closeFormModal} onSave={handleSave} />
      )}

      {detailCourse && (
        <CourseDetailModal
          course={detailCourse}
          onClose={() => setDetailCourse(null)}
          onStudentsChanged={handleStudentsChanged}
        />
      )}
    </div>
  );
}

export default CoursesManagementPage;
