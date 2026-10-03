// import { LogOut, GraduationCap } from "lucide-react";
// import styles from "./Sidebar.module.css";

// const roleLabels = {
//   admin: "Administrator",
//   teacher: "O'qituvchi",
//   student: "O'quvchi",
// };

// function Sidebar({ navItems, activePage, onNavigate, role, onLogout }) {
//   return (
//     <aside className={styles.sidebar}>
//       <div className={styles.logo}>
//         <GraduationCap size={30} />
//         <span>ABIDOV'S</span>
//       </div>

//       {role && <div className={styles.roleTag}>{roleLabels[role] || role}</div>}

//       <nav className={styles.nav}>
//         {navItems.map((item) => (
//           <div
//             key={item.key}
//             className={`${styles.navItem} ${activePage === item.key ? styles.active : ""}`}
//             onClick={() => onNavigate(item.key)}
//           >
//             <item.icon size={18} />
//             <span>{item.label}</span>
//           </div>
//         ))}
//       </nav>

//       <div className={styles.bottomNav}>
//         <div className={styles.navItem} onClick={onLogout}>
//           <LogOut size={18} />
//           <span>Chiqish</span>
//         </div>
//       </div>
//     </aside>
//   );
// }

// export default Sidebar;


import { useEffect } from "react";
import { LogOut, GraduationCap, X } from "lucide-react";
import { useLanguage } from "../../context/useLanguage";
import styles from "./Sidebar.module.css";

function Sidebar({ navItems, activePage, onNavigate, role, onLogout, open = false, onClose }) {
  const { t } = useLanguage();

  // Menyu ochiq bo'lganda Esc bilan yopiladi va orqadagi sahifa aylanmaydi
  useEffect(() => {
    if (!open) return;
    function handleKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    document.addEventListener("keydown", handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <>
    {/* Telefonda menyu ortidagi qoraytirilgan fon — bosilsa menyu yopiladi */}
    <div className={`${styles.backdrop} ${open ? styles.backdropOpen : ""}`} onClick={onClose} aria-hidden="true" />
    <aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : ""}`}>
      <div className={styles.logo}>
        <GraduationCap size={30} />
        <span>ABIDOV'S</span>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label={t("common.close")}>
          <X size={20} />
        </button>
      </div>

      {role && <div className={styles.roleTag}>{t(`role.${role}`)}</div>}

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <div
            key={item.key}
            className={`${styles.navItem} ${activePage === item.key ? styles.active : ""}`}
            onClick={() => onNavigate(item.key)}
          >
            <item.icon size={18} />
            <span>{t(item.labelKey)}</span>
          </div>
        ))}
      </nav>

      <div className={styles.bottomNav}>
        <div className={styles.navItem} onClick={onLogout}>
          <LogOut size={18} />
          <span>{t("common.logout")}</span>
        </div>
      </div>
    </aside>
    </>
  );
}

export default Sidebar;