import { useState, useEffect, useMemo } from "react";
import { Search, ChevronDown, Plus, Users, UserCheck, Layers, GraduationCap } from "lucide-react";
import StatCard from "../StatCard/StatCard";
import TeacherCard from "../TeacherCard/TeacherCard";
import TeacherFormModal from "../TeacherFormModal/TeacherFormModal";
import { subjectOptions } from "../../data/teachersData";
import { loadTeachers, saveTeachers } from "../../utils/teachersStore";
import styles from "./TeachersPage.module.css";

function TeachersPage() {
  const [teachers, setTeachers] = useState(loadTeachers);
  const [query, setQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("Barcha yo'nalishlar");
  const [statusFilter, setStatusFilter] = useState("Barcha holatlar");
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
    const matchesSubject = subjectFilter === "Barcha yo'nalishlar" || t.subject === subjectFilter;
    const matchesStatus =
      statusFilter === "Barcha holatlar" ||
      (statusFilter === "Faol" && t.status === "faol") ||
      (statusFilter === "Nofaol" && t.status === "nofaol");
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
      `${teacher.firstName} ${teacher.lastName}ni ro'yxatdan o'chirishni tasdiqlaysizmi?`
    );
    if (confirmed) {
      setTeachers((prev) => prev.filter((t) => t.id !== teacher.id));
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.statsRow}>
        <StatCard icon={Users} label="Jami o'qituvchilar" value={stats.total} sub="Barcha xodimlar" color="blue" />
        <StatCard icon={UserCheck} label="Faol o'qituvchilar" value={stats.active} sub="Hozirda dars beradi" color="green" />
        <StatCard icon={Layers} label="Jami guruhlar" value={stats.classes} sub="Barcha yo'nalishlarda" color="purple" />
        <StatCard icon={GraduationCap} label="Jami o'quvchilar" value={stats.students} sub="O'qituvchilar oldida" color="orange" />
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={16} color="#8A94A6" />
          <input
            type="text"
            placeholder="Ism yoki email bo'yicha qidirish..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className={styles.filterBox}>
          <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}>
            <option value="Barcha yo'nalishlar">Barcha yo'nalishlar</option>
            {subjectOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
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
          Yangi o'qituvchi
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
          <div className={styles.emptyState}>Hech qanday o'qituvchi topilmadi.</div>
        )}
      </div>

      {modalOpen && (
        <TeacherFormModal teacher={editingTeacher} onClose={closeModal} onSave={handleSave} />
      )}
    </div>
  );
}

export default TeachersPage;
