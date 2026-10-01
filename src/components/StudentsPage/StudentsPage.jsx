import { useState, useEffect, useMemo } from "react";
import { Search, ChevronDown, Plus, Users, UserCheck, BookOpen, Pencil, Trash2 } from "lucide-react";
import StatCard from "../StatCard/StatCard";
import StudentFormModal from "../StudentFormModal/StudentFormModal";
import { loadStudents, saveStudents, nextStudentCode } from "../../utils/studentsStore";
import { loadCourses } from "../../utils/coursesStore";
import styles from "./StudentsPage.module.css";
import { useLanguage } from "../../context/useLanguage";

function initials(firstName, lastName) {
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
}

function StudentsPage() {
  const { t } = useLanguage();
  const [students, setStudents] = useState(loadStudents);
  const courseOptions = useMemo(() => loadCourses().map((c) => c.title), [students]);
  const [query, setQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    saveStudents(students);
  }, [students]);

  const stats = useMemo(() => {
    const total = students.length;
    const active = students.filter((s) => s.status === "faol").length;
    const courses = new Set(students.map((s) => s.course)).size;
    return { total, active, courses };
  }, [students]);

  const filtered = students.filter((s) => {
    const fullName = `${s.firstName} ${s.lastName}`.toLowerCase();
    const matchesQuery =
      fullName.includes(query.toLowerCase()) ||
      s.studentCode.toLowerCase().includes(query.toLowerCase()) ||
      s.email.toLowerCase().includes(query.toLowerCase());
    const matchesCourse = courseFilter === "all" || s.course === courseFilter;
    const matchesStatus =
      statusFilter === "all" || s.status === statusFilter;
    return matchesQuery && matchesCourse && matchesStatus;
  });

  function openAddModal() {
    setEditingStudent(null);
    setModalOpen(true);
  }

  function openEditModal(student) {
    setEditingStudent(student);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingStudent(null);
  }

  function handleSave(student) {
    if (student.id) {
      setStudents((prev) => prev.map((s) => (s.id === student.id ? student : s)));
    } else {
      setStudents((prev) => [
        ...prev,
        { ...student, id: `s-${Date.now()}`, studentCode: nextStudentCode(prev) },
      ]);
    }
    closeModal();
  }

  function handleDelete(student) {
    const confirmed = window.confirm(
      t("admin.confirmDelete", { name: `${student.firstName} ${student.lastName}` })
    );
    if (confirmed) {
      setStudents((prev) => prev.filter((s) => s.id !== student.id));
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.statsRow}>
        <StatCard icon={Users} label={t("admin.stats.students")} value={stats.total} sub={t("students.allSub")} color="blue" />
        <StatCard icon={UserCheck} label={t("students.active")} value={stats.active} sub={t("students.activeSub")} color="green" />
        <StatCard icon={BookOpen} label={t("students.courses")} value={stats.courses} sub={t("students.coursesSub")} color="purple" />
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={16} style={{ color: "var(--c-8a94a6)" }} />
          <input
            type="text"
            placeholder={t("students.search")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className={styles.filterBox}>
          <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
            <option value="all">{t("courses.all")}</option>
            {courseOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <ChevronDown size={16} style={{ color: "var(--c-8a94a6)" }} />
        </div>

        <div className={styles.filterBox}>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">{t("admin.allStatuses")}</option>
            <option value="faol">{t("common.active")}</option>
            <option value="nofaol">{t("common.inactive")}</option>
          </select>
          <ChevronDown size={16} style={{ color: "var(--c-8a94a6)" }} />
        </div>

        <button className={styles.addBtn} onClick={openAddModal}>
          <Plus size={16} />
          {t("students.new")}
        </button>
      </div>

      <div className={styles.tableWrap}>
        {filtered.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>{t("students.col.name")}</th>
                <th>{t("students.col.course")}</th>
                <th>{t("form.phone")}</th>
                <th>{t("pay.col.status")}</th>
                <th className={styles.actionsHead}>{t("students.col.actions")}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td>
                    <span className={styles.codeBadge}>{s.studentCode}</span>
                  </td>
                  <td>
                    <div className={styles.nameCell}>
                      <span className={styles.avatar}>{initials(s.firstName, s.lastName)}</span>
                      <div>
                        <p className={styles.fullName}>{s.firstName} {s.lastName}</p>
                        <p className={styles.email}>{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={styles.courseBadge}>{s.course}</span>
                  </td>
                  <td className={styles.phoneCell}>{s.phone}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${s.status === "faol" ? styles.statusActive : styles.statusInactive}`}>
                      {s.status === "faol" ? t("common.active") : t("common.inactive")}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.actionBtn} onClick={() => openEditModal(s)} aria-label={t("common.edit")}>
                        <Pencil size={15} />
                      </button>
                      <button
                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                        onClick={() => handleDelete(s)}
                        aria-label={t("common.delete")}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.emptyState}>{t("students.empty")}</div>
        )}
      </div>

      {modalOpen && (
        <StudentFormModal student={editingStudent} onClose={closeModal} onSave={handleSave} />
      )}
    </div>
  );
}

export default StudentsPage;
