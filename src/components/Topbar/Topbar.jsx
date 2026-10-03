// import { Bell, ChevronDown } from "lucide-react";
// import styles from "./Topbar.module.css";

// const roleLabels = {
//   admin: "Administrator",
//   teacher: "O'qituvchi",
//   student: "O'quvchi",
// };

// function Topbar({ title = "Dashboard", user }) {
//   const initials = user ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() : "?";
//   const fullName = user ? `${user.firstName} ${user.lastName}` : "";

//   return (
//     <header className={styles.topbar}>
//       <h1 className={styles.title}>{title}</h1>

//       <div className={styles.right}>
//         <div className={styles.bellWrap}>
//           <Bell size={25} />
//           <span className={styles.dot} />
//         </div>

//         <div className={styles.profile}>
//           <div className={styles.avatar}>{initials}</div>
//           <div className={styles.userInfo}>
//             <span className={styles.name}>{fullName}</span>
//             <span className={styles.role}>{user ? roleLabels[user.role] || user.role : ""}</span>
//           </div>
//           <ChevronDown size={25} color="#8A94A6" />
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Topbar;


import { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, Menu, Settings, LogOut, CreditCard, BookOpen, CheckCheck } from "lucide-react";
import { useLanguage } from "../../context/useLanguage";
import styles from "./Topbar.module.css";

const getInitialNotifications = (role) => {
  if (role === "student") {
    return [
      { id: 1, title: "Yangi topshiriq: React asoslari", time: "15 daqiqa oldin", unread: true },
      { id: 2, title: "Oylik to'lov muddati yaqinlashmoqda", time: "2 soat oldin", unread: true },
      { id: 3, title: "Frontend kursi darsi ertaga 14:00 da", time: "Kecha", unread: false },
    ];
  }
  if (role === "teacher") {
    return [
      { id: 1, title: "3 ta uy vazifasi tekshirishga tayyor", time: "20 daqiqa oldin", unread: true },
      { id: 2, title: "Ertaga soat 10:00 da yangi guruh darsi", time: "Bugun 09:15", unread: false },
    ];
  }
  return [
    { id: 1, title: "Yangi talaba ro'yxatdan o'tdi", time: "10 daqiqa oldin", unread: true },
    { id: 2, title: "To'lovlar hisoboti yangilandi", time: "1 soat oldin", unread: true },
    { id: 3, title: "Tizim ma'lumotlari muvaffaqiyatli saqlandi", time: "Kecha", unread: false },
  ];
};

function Topbar({ title = "Dashboard", user, onMenuClick, onNavigate, onLogout }) {
  const { t } = useLanguage();
  const [bellOpen, setBellOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState(() => getInitialNotifications(user?.role));

  const bellRef = useRef(null);
  const profileRef = useRef(null);

  const initials = user ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() : "?";
  const fullName = user ? `${user.firstName} ${user.lastName}` : "";
  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    function handleClickOutside(e) {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setBellOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setBellOpen(false);
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleMarkAllAsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        {/* ☰ — faqat planshet va telefonda ko'rinadi */}
        <button type="button" className={styles.menuBtn} onClick={onMenuClick} aria-label={t("common.menu")}>
          <Menu size={22} />
        </button>
        <h1 className={styles.title}>{title}</h1>
      </div>

      <div className={styles.right}>
        {/* Bildirishnomalar (Bell) */}
        <div className={styles.relativeWrap} ref={bellRef}>
          <button
            type="button"
            className={styles.bellBtn}
            onClick={() => {
              setBellOpen((prev) => !prev);
              setProfileOpen(false);
            }}
            aria-label="Bildirishnomalar"
            aria-expanded={bellOpen}
          >
            <Bell size={24} />
            {unreadCount > 0 && <span className={styles.dot} />}
          </button>

          {bellOpen && (
            <div className={styles.dropdown} role="menu">
              <div className={styles.dropdownHeader}>
                <span className={styles.dropdownTitle}>Bildirishnomalar</span>
                {unreadCount > 0 && (
                  <button type="button" className={styles.markReadBtn} onClick={handleMarkAllAsRead}>
                    <CheckCheck size={14} />
                    <span>O'qildi</span>
                  </button>
                )}
              </div>
              <div className={styles.notificationsList}>
                {notifications.length === 0 ? (
                  <div className={styles.emptyNote}>Yangi bildirishnomalar yo'q</div>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`${styles.notificationItem} ${item.unread ? styles.notificationUnread : ""}`}
                      onClick={() => {
                        setNotifications((prev) =>
                          prev.map((n) => (n.id === item.id ? { ...n, unread: false } : n))
                        );
                      }}
                    >
                      <div className={styles.noteContent}>
                        <p className={styles.noteTitle}>{item.title}</p>
                        <span className={styles.noteTime}>{item.time}</span>
                      </div>
                      {item.unread && <span className={styles.itemDot} />}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profil menyusi */}
        <div className={styles.relativeWrap} ref={profileRef}>
          <button
            type="button"
            className={styles.profileBtn}
            onClick={() => {
              setProfileOpen((prev) => !prev);
              setBellOpen(false);
            }}
            aria-label="Profil menyusi"
            aria-expanded={profileOpen}
          >
            <div className={styles.avatar}>{initials}</div>
            <div className={styles.userInfo}>
              <span className={styles.name}>{fullName}</span>
              <span className={styles.role}>{user ? t(`role.${user.role}`) : ""}</span>
            </div>
            <ChevronDown
              size={20}
              className={`${styles.chevron} ${profileOpen ? styles.chevronRotated : ""}`}
              style={{ color: "var(--c-8a94a6)" }}
            />
          </button>

          {profileOpen && (
            <div className={`${styles.dropdown} ${styles.profileDropdown}`} role="menu">
              <div className={styles.profileDropdownHeader}>
                <div className={styles.profileAvatarLarge}>{initials}</div>
                <div className={styles.profileDetails}>
                  <p className={styles.profileName}>{fullName}</p>
                  <p className={styles.profileRoleBadge}>{user ? t(`role.${user.role}`) : ""}</p>
                  <p className={styles.profileEmail}>{user?.username || user?.email || ""}</p>
                </div>
              </div>

              <div className={styles.divider} />

              <div className={styles.menuItems}>
                <button
                  type="button"
                  className={styles.menuItem}
                  onClick={() => {
                    setProfileOpen(false);
                    onNavigate?.("settings");
                  }}
                >
                  <Settings size={16} />
                  <span>{t("nav.settings")}</span>
                </button>

                {user?.role === "student" && (
                  <button
                    type="button"
                    className={styles.menuItem}
                    onClick={() => {
                      setProfileOpen(false);
                      onNavigate?.("payments");
                    }}
                  >
                    <CreditCard size={16} />
                    <span>To'lovlar tarixi</span>
                  </button>
                )}

                {user?.role === "admin" && (
                  <button
                    type="button"
                    className={styles.menuItem}
                    onClick={() => {
                      setProfileOpen(false);
                      onNavigate?.("courses");
                    }}
                  >
                    <BookOpen size={16} />
                    <span>Kurslar boshqaruvi</span>
                  </button>
                )}

                <div className={styles.divider} />

                <button
                  type="button"
                  className={`${styles.menuItem} ${styles.logoutItem}`}
                  onClick={() => {
                    setProfileOpen(false);
                    onLogout?.();
                  }}
                >
                  <LogOut size={16} />
                  <span>{t("common.logout")}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;