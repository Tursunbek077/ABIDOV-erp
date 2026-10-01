import { useState, useEffect, useMemo } from "react";
import { Search, ChevronDown, Plus, Users, UserCheck, Layers, GraduationCap } from "lucide-react";
import StatCard from "../StatCard/StatCard";
import TeacherCard from "../TeacherCard/TeacherCard";
import TeacherFormModal from "../TeacherFormModal/TeacherFormModal";
import { subjectOptions } from "../../data/teachersData";
import { loadTeachers, saveTeachers } from "../../utils/teachersStore";
import styles from "./TeachersPage.module.css";
import { useLanguage } from "../../context/useLanguage";

function TeachersPage() {
  const { t } = useLanguage();
  const [teachers, setTeachers] = useState(loadTeachers);
  const [query, setQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  useEffect(() => {
    saveTeachers(teachers);
  }, [teachers]);

  const stats = useMemo(() => {
    const total = teachers.length;
    const active = teachers.filter((t) => t.status === "faol").length;
    const classes = teachers.reduce((sum, t) => sum + Number(t.classesCount || 0), 0);
    const students = teachers.reduce((sum, t) => sum + Number(t.studentsCount || 0), 0);
    return { total, active, classes, students };
  }, [teachers]);

  const filtered = teachers.filter((t) => {
    const fullName = `${t.firstName} ${t.lastName}`.toLowerCase();
    const matchesQuery =
      fullName.includes(query.toLowerCase()) || t.email.toLowerCase().includes(query.toLowerCase());
    const matchesSubject = subjectFilter === "all" || t.subject === subjectFilter;
    const matchesStatus =
      statusFilter === "all" || t.status === statusFilter;
    return matchesQuery && matchesSubject && matchesStatus;
  });

  function openAddModal() {
    setEditingTeacher(null);
    setModalOpen(true);
  }

  function openEditModal(teacher) {
    setEditingTeacher(teacher);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingTeacher(null);
  }

  function handleSave(teacher) {
    if (teacher.id) {
      setTeachers((prev) => prev.map((t) => (t.id === teacher.id ? teacher : t)));
    } else {
      setTeachers((prev) => [...prev, { ...teacher, id: `t-${Date.now()}` }]);
    }
    closeModal();
  }

  function handleDelete(teacher) {
    const confirmed = window.confirm(
      t("admin.confirmDelete", { name: `${teacher.firstName} ${teacher.lastName}` })
    );
    if (confirmed) {
      setTeachers((prev) => prev.filter((t) => t.id !== teacher.id));
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.statsRow}>
        <StatCard icon={Users} label={t("admin.stats.teachers")} value={stats.total} sub={t("teachers.allStaff")} color="blue" />
        <StatCard icon={UserCheck} label={t("teachers.active")} value={stats.active} sub={t("teachers.activeSub")} color="green" />
        <StatCard icon={Layers} label={t("teachers.groups")} value={stats.classes} sub={t("teachers.groupsSub")} color="purple" />
        <StatCard icon={GraduationCap} label={t("admin.stats.students")} value={stats.students} sub={t("teachers.studentsSub")} color="orange" />
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={16} style={{ color: "var(--c-8a94a6)" }} />
          <input
            type="text"
            placeholder={t("teachers.search")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className={styles.filterBox}>
          <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}>
            <option value="all">{t("admin.allTracks")}</option>
            {subjectOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
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
          {t("teachers.new")}
        </button>
      </div>

      <div className={styles.grid}>
        {filtered.length > 0 ? (
          filtered.map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className={styles.emptyState}>{t("teachers.empty")}</div>
        )}
      </div>

      {modalOpen && (
        <TeacherFormModal teacher={editingTeacher} onClose={closeModal} onSave={handleSave} />
      )}
    </div>
  );
}

export default TeachersPage;
