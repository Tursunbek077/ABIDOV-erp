import { useState, useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/useAuth";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import AppShell from "./components/AppShell/AppShell";
import StudentDashboard from "./pages/Student/StudentDashboard";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import PaymentLockModal from "./components/PaymentLockModal/PaymentLockModal";
import { getStudentAccessInfo } from "./utils/paymentsStore";
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
  const [paymentTick, setPaymentTick] = useState(0);

  // Boshqa oynada (masalan admin to'lovni tasdiqlaganda) o'zgargan
  // localStorage holatini shu oynada ham darhol aks ettirish uchun.
  useEffect(() => {
    function handleStorage(e) {
      if (e.key === "abidovs_students") setPaymentTick((n) => n + 1);
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  function handleLogout() {
    logout();
    setView("landing");
    setActivePage("dashboard");
  }

  if (user) {
    const DashboardBody = dashboardByRole[user.role] || StudentDashboard;
    const access = user.role === "student" ? getStudentAccessInfo(user.email) : { blocked: false };

    return (
      <div className={styles.layout} data-payment-tick={paymentTick}>
        <AppShell
          user={user}
          activePage={activePage}
          onNavigate={setActivePage}
          onLogout={handleLogout}
        >
          <DashboardBody user={user} activePage={activePage} onNavigate={setActivePage} />
        </AppShell>

        {access.blocked && (
          <PaymentLockModal
            student={access.student}
            amount={access.amount}
            onRecheck={() => setPaymentTick((n) => n + 1)}
            onLogout={handleLogout}
          />
        )}
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
  );
}

export default App;
