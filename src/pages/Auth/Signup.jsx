import { useState } from "react";
import { User, Mail, Lock, BookOpen, Presentation } from "lucide-react";
import { useAuth } from "../../context/useAuth";
import AuthLayout from "./AuthLayout";
import styles from "./Auth.module.css";

function Signup({ onBack, onGotoLogin }) {
  const { signup } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "student",
  });
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (form.password.length < 6) {
      setError("Parol kamida 6 ta belgidan iborat bo'lishi kerak");
      return;
    }
    const res = signup(form);
    if (!res.ok) setError(res.error);
  }

  return (
    <AuthLayout
      title="Ro'yxatdan o'tish"
      subtitle="ABIDOV'S oilasiga qo'shiling"
      onBack={onBack}
      footer={
        <>
          Hisobingiz bormi?{" "}
          <button className={styles.linkBtn} onClick={onGotoLogin}>
            Tizimga kiring
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.roleTabs}>
          <button
            type="button"
            className={`${styles.roleTab} ${form.role === "student" ? styles.roleTabActive : ""}`}
            onClick={() => update("role", "student")}
          >
            <BookOpen size={16} /> O'quvchi
          </button>
          <button
            type="button"
            className={`${styles.roleTab} ${form.role === "teacher" ? styles.roleTabActive : ""}`}
            onClick={() => update("role", "teacher")}
          >
            <Presentation size={16} /> O'qituvchi
          </button>
        </div>

        <div className={styles.formRow}>
          <label className={styles.field}>
            <span>Ism</span>
            <div className={styles.inputWrap}>
              <User size={16} />
              <input
                value={form.firstName}
                onChange={(e) => update("firstName", e.target.value)}
                placeholder="Aziza"
                required
              />
            </div>
          </label>

          <label className={styles.field}>
            <span>Familiya</span>
            <div className={styles.inputWrap}>
              <User size={16} />
              <input
                value={form.lastName}
                onChange={(e) => update("lastName", e.target.value)}
                placeholder="Yusupova"
                required
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
              placeholder="email@abidovs.uz"
              required
            />
          </div>
        </label>

        <label className={styles.field}>
          <span>Parol</span>
          <div className={styles.inputWrap}>
            <Lock size={16} />
            <input
              type="password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
        </label>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.submitBtn}>
          Ro'yxatdan o'tish
        </button>
      </form>
    </AuthLayout>
  );
}

export default Signup;
