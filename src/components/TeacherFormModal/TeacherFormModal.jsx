import { useState } from "react";
import { X, User, Mail, Phone, BookOpen, Users, Layers } from "lucide-react";
import { subjectOptions } from "../../data/teachersData";
import styles from "./TeacherFormModal.module.css";

const AVATAR_COLORS = ["blue", "green", "purple", "orange"];

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: subjectOptions[0],
  classesCount: "",
  studentsCount: "",
  status: "faol",
};

function TeacherFormModal({ teacher, onClose, onSave }) {
  const isEdit = Boolean(teacher);
  const [form, setForm] = useState(
    teacher
      ? {
          firstName: teacher.firstName,
          lastName: teacher.lastName,
          email: teacher.email,
          phone: teacher.phone,
          subject: teacher.subject,
          classesCount: String(teacher.classesCount),
          studentsCount: String(teacher.studentsCount),
          status: teacher.status,
        }
      : emptyForm
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
      ...teacher,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      subject: form.subject,
      classesCount: Number(form.classesCount) || 0,
      studentsCount: Number(form.studentsCount) || 0,
      status: form.status,
      color: teacher?.color || AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
    };

    onSave(payload);
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>{isEdit ? "O'qituvchini tahrirlash" : "Yangi o'qituvchi qo'shish"}</h3>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Yopish">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <p className={styles.error}>{error}</p>}

          <div className={styles.formRow}>
            <label className={styles.field}>
              <span>Ism</span>
              <div className={styles.inputWrap}>
                <User size={16} />
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  placeholder="Farrux"
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
                  placeholder="Karimov"
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
                placeholder="teacher@abidovs.uz"
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
            <span>Yo'nalish</span>
            <div className={styles.inputWrap}>
              <BookOpen size={16} />
              <select value={form.subject} onChange={(e) => update("subject", e.target.value)}>
                {subjectOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </label>

          <div className={styles.formRow}>
            <label className={styles.field}>
              <span>Guruhlar soni</span>
              <div className={styles.inputWrap}>
                <Layers size={16} />
                <input
                  type="number"
                  min="0"
                  value={form.classesCount}
                  onChange={(e) => update("classesCount", e.target.value)}
                  placeholder="0"
                />
              </div>
            </label>

            <label className={styles.field}>
              <span>O'quvchilar soni</span>
              <div className={styles.inputWrap}>
                <Users size={16} />
                <input
                  type="number"
                  min="0"
                  value={form.studentsCount}
                  onChange={(e) => update("studentsCount", e.target.value)}
                  placeholder="0"
                />
              </div>
            </label>
          </div>

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

export default TeacherFormModal;
