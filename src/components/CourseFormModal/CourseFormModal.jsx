import { useState } from "react";
import { X, BookOpen, User, Calendar, Wallet, Users as UsersIcon, Layers } from "lucide-react";
import { categoryOptions } from "../../data/coursesData";
import { loadTeachers } from "../../utils/teachersStore";
import styles from "./CourseFormModal.module.css";
import { useLanguage } from "../../context/useLanguage";

const AVATAR_COLORS = ["blue", "green", "purple", "orange"];

function buildEmptyForm(teacherNames) {
  return {
    title: "",
    category: categoryOptions[0],
    teacher: teacherNames[0] || "",
    durationMonths: "",
    price: "",
    capacity: "",
    startDate: "",
    status: "faol",
  };
}

function CourseFormModal({ course, onClose, onSave }) {
  const { t } = useLanguage();
  const isEdit = Boolean(course);
  const teacherNames = loadTeachers().map((t) => `${t.firstName} ${t.lastName}`);
  const [form, setForm] = useState(
    course
      ? {
          title: course.title,
          category: course.category,
          teacher: course.teacher,
          durationMonths: String(course.durationMonths),
          price: String(course.price),
          capacity: String(course.capacity),
          startDate: course.startDate,
          status: course.status,
        }
      : buildEmptyForm(teacherNames)
  );
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.title.trim()) {
      setError("cf.errTitle");
      return;
    }
    if (!form.teacher) {
      setError("cf.errTeacher");
      return;
    }
    if (!form.durationMonths || Number(form.durationMonths) <= 0) {
      setError("cf.errDuration");
      return;
    }
    if (!form.startDate) {
      setError("cf.errStart");
      return;
    }

    const payload = {
      ...course,
      title: form.title.trim(),
      category: form.category,
      teacher: form.teacher,
      durationMonths: Number(form.durationMonths) || 0,
      price: Number(form.price) || 0,
      capacity: Number(form.capacity) || 0,
      startDate: form.startDate,
      status: form.status,
      color: course?.color || AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
    };

    onSave(payload);
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>{isEdit ? t("cf.editTitle") : t("cf.addTitle")}</h3>
          <button className={styles.closeBtn} onClick={onClose} aria-label={t("common.close")}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <p className={styles.error}>{t(error)}</p>}

          <label className={styles.field}>
            <span>{t("cf.title")}</span>
            <div className={styles.inputWrap}>
              <BookOpen size={16} />
              <input
                type="text"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder={t("cf.titlePh")}
              />
            </div>
          </label>

          <div className={styles.formRow}>
            <label className={styles.field}>
              <span>{t("form.track")}</span>
              <div className={styles.inputWrap}>
                <Layers size={16} />
                <select value={form.category} onChange={(e) => update("category", e.target.value)}>
                  {categoryOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </label>

            <label className={styles.field}>
              <span>{t("common.teacher")}</span>
              <div className={styles.inputWrap}>
                <User size={16} />
                {teacherNames.length > 0 ? (
                  <select value={form.teacher} onChange={(e) => update("teacher", e.target.value)}>
                    {teacherNames.map((name) => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={form.teacher}
                    onChange={(e) => update("teacher", e.target.value)}
                    placeholder={t("cf.teacherPh")}
                  />
                )}
              </div>
            </label>
          </div>

          <div className={styles.formRow}>
            <label className={styles.field}>
              <span>{t("cf.duration")}</span>
              <div className={styles.inputWrap}>
                <Calendar size={16} />
                <input
                  type="number"
                  min="1"
                  value={form.durationMonths}
                  onChange={(e) => update("durationMonths", e.target.value)}
                  placeholder="6"
                />
              </div>
            </label>

            <label className={styles.field}>
              <span>{t("courses.startDate")}</span>
              <div className={styles.inputWrap}>
                <Calendar size={16} />
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => update("startDate", e.target.value)}
                />
              </div>
            </label>
          </div>

          <div className={styles.formRow}>
            <label className={styles.field}>
              <span>{t("cf.price")}</span>
              <div className={styles.inputWrap}>
                <Wallet size={16} />
                <input
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={(e) => update("price", e.target.value)}
                  placeholder="650000"
                />
              </div>
            </label>

            <label className={styles.field}>
              <span>{t("cf.capacity")}</span>
              <div className={styles.inputWrap}>
                <UsersIcon size={16} />
                <input
                  type="number"
                  min="0"
                  value={form.capacity}
                  onChange={(e) => update("capacity", e.target.value)}
                  placeholder="20"
                />
              </div>
            </label>
          </div>

          <label className={styles.field}>
            <span>{t("form.status")}</span>
            <div className={styles.statusTabs}>
              <button
                type="button"
                className={`${styles.statusTab} ${form.status === "faol" ? styles.statusTabActive : ""}`}
                onClick={() => update("status", "faol")}
              >
                {t("common.active")}
              </button>
              <button
                type="button"
                className={`${styles.statusTab} ${form.status === "nofaol" ? styles.statusTabActive : ""}`}
                onClick={() => update("status", "nofaol")}
              >
                {t("common.inactive")}
              </button>
            </div>
          </label>

          <div className={styles.footer}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              {t("common.cancel")}
            </button>
            <button type="submit" className={styles.submitBtn}>
              {isEdit ? t("common.save") : t("common.add")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CourseFormModal;
