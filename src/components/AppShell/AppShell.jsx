// import Sidebar from "../Sidebar/Sidebar";
// import Topbar from "../Topbar/Topbar";
// import { navConfig, pageTitles } from "../../data/navConfig";
// import styles from "./AppShell.module.css";

// function AppShell({ user, activePage, onNavigate, onLogout, children }) {
//   const navItems = navConfig[user.role] || [];

//   return (
//     <div>
//       <Sidebar
//         navItems={navItems}
//         activePage={activePage}
//         onNavigate={onNavigate}
//         role={user.role}
//         onLogout={onLogout}
//       />
//       <div className={styles.page}>
//         <Topbar title={pageTitles[activePage] || "Dashboard"} user={user} />
//         {children}
//       </div>
//     </div>
//   );
// }

// export default AppShell;


import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import { navConfig, pageTitles } from "../../data/navConfig";
import { useLanguage } from "../../context/useLanguage";
import styles from "./AppShell.module.css";

function AppShell({ user, activePage, onNavigate, onLogout, children }) {
  const { t } = useLanguage();
  const navItems = navConfig[user.role] || [];

  return (
    <div>
      <Sidebar
        navItems={navItems}
        activePage={activePage}
        onNavigate={onNavigate}
        role={user.role}
        onLogout={onLogout}
      />
      <div className={styles.page}>
        <Topbar title={t(pageTitles[activePage] || "nav.dashboard")} user={user} />
        {children}
      </div>
    </div>
  );
}

export default AppShell;