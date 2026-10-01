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


import { LogOut, GraduationCap } from "lucide-react";
import { useLanguage } from "../../context/useLanguage";
import styles from "./Sidebar.module.css";

function Sidebar({ navItems, activePage, onNavigate, role, onLogout }) {
  const { t } = useLanguage();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <GraduationCap size={30} />
        <span>ABIDOV'S</span>
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
  );
}

export default Sidebar;