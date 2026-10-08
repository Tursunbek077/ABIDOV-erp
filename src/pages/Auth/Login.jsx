import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "../../context/useAuth";
import AuthLayout from "./AuthLayout";
import styles from "./Auth.module.css";

const demoAccounts = [
  { role: "Admin", email: "admin@abidovs.uz", password: "admin123" },
  { role: "O'qituvchi", email: "teacher@abidovs.uz", password: "teacher123" },
  { role: "O'quvchi", email: "student@abidovs.uz", password: "student123" },
];

function Login({ onBack, onGotoSignup }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const res = login(email, password);
    if (!res.ok) setError(res.error);
  }

  function fillDemo(acc) {
    setEmail(acc.email);
    setPassword(acc.password);
    setError("");
  }

  return (
    <AuthLayout
      title="Hisobingizga kiring"
      subtitle="Xush kelibsiz! Ma'lumotlaringizni kiriting"
      onBack={onBack}
      footer={
        <>
          Hisobingiz yo'qmi?{" "}
          <button className={styles.linkBtn} onClick={onGotoSignup}>
            Ro'yxatdan o'ting
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.field}>
          <span>Email</span>
          <div className={styles.inputWrap}>
            <Mail size={16} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
        </label>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.optionsRow}>
          <label className={styles.rememberMe}>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Meni eslab qol
          </label>
          <button type="button" className={styles.forgotLink}>
            Parolni unutdingizmi?
          </button>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Kirish
        </button>
      </form>

      <div className={styles.demoBox}>
        <p>Demo hisoblar:</p>
        {demoAccounts.map((acc) => (
          <button key={acc.role} type="button" className={styles.demoRow} onClick={() => fillDemo(acc)}>
            <span>{acc.role}</span>
            <span className={styles.demoEmail}>{acc.email}</span>
          </button>
        ))}
      </div>
    </AuthLayout>
  );
}

export default Login;
