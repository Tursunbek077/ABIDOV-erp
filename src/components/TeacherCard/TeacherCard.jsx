import { Mail, Phone, Users, BookOpen, Pencil, Trash2 } from "lucide-react";
import styles from "./TeacherCard.module.css";
import { useLanguage } from "../../context/useLanguage";

function initials(firstName, lastName) {
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
}

function TeacherCard({ teacher, onEdit, onDelete }) {
  const { t } = useLanguage();
  const isActive = teacher.status === "faol";

  return (
    <div className={styles.card}>
      <div className={styles.topRow}>
        <div className={`${styles.avatar} ${styles[teacher.color] || styles.blue}`}>
          {initials(teacher.firstName, teacher.lastName)}
        </div>

        <div className={styles.info}>
          <h4 className={styles.name}>
            {teacher.firstName} {teacher.lastName}
          </h4>
          <span className={styles.subjectBadge}>{teacher.subject}</span>
        </div>

        <span className={`${styles.statusBadge} ${isActive ? styles.statusActive : styles.statusInactive}`}>
          {isActive ? t("common.active") : t("common.inactive")}
        </span>
      </div>

      <div className={styles.contactRow}>
        <span className={styles.contactItem}>
          <Mail size={14} />
          {teacher.email}
        </span>
        <span className={styles.contactItem}>
          <Phone size={14} />
          {teacher.phone}
        </span>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.statGroup}>
          <span className={styles.statItem}>
            <Users size={14} />
            {t("teacher.studentsCount", { n: teacher.studentsCount })}
          </span>
          <span className={styles.statItem}>
            <BookOpen size={14} />
            {t("teachers.groupsCount", { n: teacher.classesCount })}
          </span>
        </div>

        <div className={styles.actions}>
          <button className={styles.actionBtn} onClick={() => onEdit(teacher)} aria-label={t("common.edit")}>
            <Pencil size={15} />
          </button>
          <button
            className={`${styles.actionBtn} ${styles.deleteBtn}`}
            onClick={() => onDelete(teacher)}
            aria-label={t("common.delete")}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeacherCard;
