import { Bell, ChevronDown } from "lucide-react";
import styles from "./Topbar.module.css";

const roleLabels = {
  admin: "Administrator",
  teacher: "O'qituvchi",
  student: "O'quvchi",
};

function Topbar({ title = "Dashboard", user }) {
  const initials = user ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() : "?";
  const fullName = user ? `${user.firstName} ${user.lastName}` : "";

  return (
    <header className={styles.topbar}>
      <h1 className={styles.title}>{title}</h1>

      <div className={styles.right}>
        <div className={styles.bellWrap}>
          <Bell size={25} />
          <span className={styles.dot} />
        </div>

        <div className={styles.profile}>
          <div className={styles.avatar}>{initials}</div>
          <div className={styles.userInfo}>
            <span className={styles.name}>{fullName}</span>
            <span className={styles.role}>{user ? roleLabels[user.role] || user.role : ""}</span>
          </div>
          <ChevronDown size={25} color="#8A94A6" />
        </div>
      </div>
    </header>
  );
}

export default Topbar;
