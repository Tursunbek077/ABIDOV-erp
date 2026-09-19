import { useState } from "react";
import { X, Plus, Users, Calendar, Wallet, User } from "lucide-react";
import StudentFormModal from "../StudentFormModal/StudentFormModal";
import { loadStudents, saveStudents, nextStudentCode } from "../../utils/studentsStore";
import styles from "./CourseDetailModal.module.css";

function initials(firstName, lastName) {
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
}

function CourseDetailModal({ course, onClose, onStudentsChanged }) {
  const [students, setStudents] = useState(() =>
    loadStudents().filter((s) => s.course === course.title)
  );
  const [addOpen, setAddOpen] = useState(false);

  function handleAddStudent(newStudent) {
    const all = loadStudents();
    const withNew = [
      ...all,
      { ...newStudent, id: `s-${Date.now()}`, studentCode: nextStudentCode(all) },
    ];
    saveStudents(withNew);
    setStudents(withNew.filter((s) => s.course === course.title));
    setAddOpen(false);
    onStudentsChanged?.();
  }

  const fillPercent = course.capacity > 0 ? Math.min(100, Math.round((students.length / course.capacity) * 100)) : 0;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <h3>{course.title}</h3>
            <span className={styles.categoryBadge}>{course.category}</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Yopish">
            <X size={18} />
          </button>
        </div>

        <div className={styles.metaRow}>
          <span className={styles.metaItem}>
            <User size={14} />
            {course.teacher}
          </span>
          <span className={styles.metaItem}>
            <Calendar size={14} />
            {course.durationMonths} oylik kurs
          </span>
          <span className={styles.metaItem}>
            <Wallet size={14} />
            {course.price.toLocaleString("uz-UZ")} so'm / oy
          </span>
        </div>

        <div className={styles.capacityBlock}>
          <div className={styles.capacityLabel}>
            <span>
              <Users size={14} /> {students.length}
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

        <div className={styles.listHeader}>
          <h4>Kursga yozilgan o'quvchilar</h4>
          <button className={styles.addBtn} onClick={() => setAddOpen(true)}>
            <Plus size={15} />
            Yangi o'quvchi qo'shish
          </button>
        </div>

        <div className={styles.studentList}>
          {students.length > 0 ? (
            students.map((s) => (
              <div key={s.id} className={styles.studentRow}>
                <span className={styles.avatar}>{initials(s.firstName, s.lastName)}</span>
                <div className={styles.studentInfo}>
                  <p className={styles.studentName}>{s.firstName} {s.lastName}</p>
                  <p className={styles.studentMeta}>{s.studentCode} · {s.phone}</p>
                </div>
                <span className={`${styles.statusBadge} ${s.status === "faol" ? styles.statusActive : styles.statusInactive}`}>
                  {s.status === "faol" ? "Faol" : "Nofaol"}
                </span>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>Bu kursga hali o'quvchi yozilmagan.</div>
          )}
        </div>
      </div>

      {addOpen && (
        <div onClick={(e) => e.stopPropagation()}>
          <StudentFormModal
            lockedCourse={course.title}
            onClose={() => setAddOpen(false)}
            onSave={handleAddStudent}
          />
        </div>
      )}
    </div>
  );
}

export default CourseDetailModal;
