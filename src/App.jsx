import { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/useAuth";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import AppShell from "./components/AppShell/AppShell";
import StudentDashboard from "./pages/Student/StudentDashboard";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import styles from "./App.module.css";

const dashboardByRole = {
  admin: AdminDashboard,
  teacher: TeacherDashboard,
  student: StudentDashboard,
};

function AppContent() {
  const { user, logout } = useAuth();
  const [view, setView] = useState("landing"); // landing | login | signup
  const [activePage, setActivePage] = useState("dashboard");

  if (user) {
    const DashboardBody = dashboardByRole[user.role] || StudentDashboard;
    return (
      <div className={styles.layout}>
        <AppShell
          user={user}
          activePage={activePage}
          onNavigate={setActivePage}
          onLogout={() => {
            logout();
            setView("landing");
            setActivePage("dashboard");
          }}
        >
          <DashboardBody user={user} activePage={activePage} />
        </AppShell>
      </div>
    );
  }

  if (view === "login") {
    return (
      <Login
        onBack={() => setView("landing")}
        onGotoSignup={() => setView("signup")}
      />
    );
  }

  if (view === "signup") {
    return (
      <Signup
        onBack={() => setView("landing")}
        onGotoLogin={() => setView("login")}
      />
    );
  }

  return <Landing onLogin={() => setView("login")} onSignup={() => setView("signup")} />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
    // boldi
  );
}

export default App;
