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


import { useState, useCallback } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import { navConfig, pageTitles } from "../../data/navConfig";
import { useLanguage } from "../../context/useLanguage";
import styles from "./AppShell.module.css";

function AppShell({ user, activePage, onNavigate, onLogout, children }) {
  const { t } = useLanguage();
  const navItems = navConfig[user.role] || [];
  // Planshet va telefonda menyu yon tomondan chiqadi (☰ tugmasi bilan)
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  function handleNavigate(key) {
    onNavigate(key);
    setMenuOpen(false);
  }

  return (
    <div>
      <Sidebar
        navItems={navItems}
        activePage={activePage}
        onNavigate={handleNavigate}
        role={user.role}
        onLogout={onLogout}
        open={menuOpen}
        onClose={closeMenu}
      />
      <div className={styles.page}>
        {/* Sarlavha menyudagi nom bilan bir xil (o'quvchida "Mening kurslarim") */}
        <Topbar
          title={t(navItems.find((i) => i.key === activePage)?.labelKey || pageTitles[activePage] || "nav.dashboard")}
          user={user}
          onMenuClick={() => setMenuOpen(true)}
        />
        {children}
      </div>
    </div>
  );
}

export default AppShell;