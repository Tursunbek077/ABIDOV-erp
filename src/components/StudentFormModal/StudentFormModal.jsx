import { useState } from "react";
import { X, User, Mail, Phone, BookOpen } from "lucide-react";
import { loadCourses } from "../../utils/coursesStore";
import styles from "./StudentFormModal.module.css";

function buildEmptyForm(lockedCourse, courseOptions) {
  return {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    course: lockedCourse || courseOptions[0] || "",
    status: "faol",
  };
}

function StudentFormModal({ student, lockedCourse, onClose, onSave }) {
  const isEdit = Boolean(student);
  const courseOptions = loadCourses().map((c) => c.title);
  const [form, setForm] = useState(
    student
      ? {
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          phone: student.phone,
          course: student.course,
          status: student.status,
        }
      : buildEmptyForm(lockedCourse, courseOptions)
  );
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError("Ism va familiyani kiriting");
      return;
    }
    if (!form.email.trim() || !form.email.includes("@")) {
      setError("To'g'ri email kiriting");
      return;
    }
    if (!form.phone.trim()) {
      setError("Telefon raqamini kiriting");
      return;
    }

    const payload = {
      ...student,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      course: form.course,
      status: form.status,
    };

    onSave(payload);
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>{isEdit ? "O'quvchini tahrirlash" : "Yangi o'quvchi qo'shish"}</h3>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Yopish">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <p className={styles.error}>{error}</p>}

          {isEdit && (
            <label className={styles.field}>
              <span>O'quvchi ID</span>
              <div className={styles.readonlyBox}>{student.studentCode}</div>
            </label>
          )}

          <div className={styles.formRow}>
            <label className={styles.field}>
              <span>Ism</span>
              <div className={styles.inputWrap}>
                <User size={16} />
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  placeholder="Aziza"
                />
              </div>
            </label>

            <label className={styles.field}>
              <span>Familiya</span>
              <div className={styles.inputWrap}>
                <User size={16} />
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  placeholder="Yusupova"
                />
              </div>
            </label>
          </div>

          <label className={styles.field}>
            <span>Email</span>
            <div className={styles.inputWrap}>
              <Mail size={16} />
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="student@abidovs.uz"
              />
            </div>
          </label>

          <label className={styles.field}>
            <span>Telefon</span>
            <div className={styles.inputWrap}>
              <Phone size={16} />
              <input
                type="text"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+998 90 123 45 67"
              />
            </div>
          </label>

          <label className={styles.field}>
            <span>Kurs</span>
            {lockedCourse ? (
              <div className={styles.readonlyBox}>
                <BookOpen size={15} style={{ marginRight: 8, verticalAlign: "-2px" }} />
                {lockedCourse}
              </div>
            ) : (
              <div className={styles.inputWrap}>
                <BookOpen size={16} />
                <select value={form.course} onChange={(e) => update("course", e.target.value)}>
                  {courseOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            )}
          </label>

          <label className={styles.field}>
            <span>Holati</span>
            <div className={styles.statusTabs}>
              <button
                type="button"
                className={`${styles.statusTab} ${form.status === "faol" ? styles.statusTabActive : ""}`}
                onClick={() => update("status", "faol")}
              >
                Faol
              </button>
              <button
                type="button"
                className={`${styles.statusTab} ${form.status === "nofaol" ? styles.statusTabActive : ""}`}
                onClick={() => update("status", "nofaol")}
              >
                Nofaol
              </button>
            </div>
          </label>

          <div className={styles.footer}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Bekor qilish
            </button>
            <button type="submit" className={styles.submitBtn}>
              {isEdit ? "Saqlash" : "Qo'shish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentFormModal;
