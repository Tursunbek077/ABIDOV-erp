import { useState, useEffect, useCallback } from "react";
import { seedUsers } from "../data/seedUsers";
import { AuthContext } from "./authContextObject";
import { loadStudents, saveStudents, nextStudentCode } from "../utils/studentsStore";
import { loadTeachers, saveTeachers } from "../utils/teachersStore";
import { loadCourses } from "../utils/coursesStore";

const USERS_KEY = "abidovs_users";
const SESSION_KEY = "abidovs_session";

function loadUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore parse errors, fall back to seed
  }
  localStorage.setItem(USERS_KEY, JSON.stringify(seedUsers));
  return seedUsers;
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function omitPassword(fullUser) {
  const safeUser = {};
  for (const key in fullUser) {
    if (key !== "password") safeUser[key] = fullUser[key];
  }
  return safeUser;
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(loadUsers);
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    saveUsers(users);
  }, [users]);

  useEffect(() => {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
  }, [user]);

  const login = useCallback(
    (email, password) => {
      const found = users.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
      );
      if (!found) {
        return { ok: false, error: "Email yoki parol noto'g'ri" };
      }
      const safeUser = omitPassword(found);
      setUser(safeUser);
      return { ok: true, user: safeUser };
    },
    [users]
  );

  const signup = useCallback(
    ({ firstName, lastName, email, password, role }) => {
      const trimmedEmail = email.trim();
      const trimmedFirst = firstName.trim();
      const trimmedLast = lastName.trim();
      const exists = users.some((u) => u.email.toLowerCase() === trimmedEmail.toLowerCase());
      if (exists) {
        return { ok: false, error: "Bu email allaqachon ro'yxatdan o'tgan" };
      }
      const newUser = {
        id: `u-${role}-${Date.now()}`,
        firstName: trimmedFirst,
        lastName: trimmedLast,
        email: trimmedEmail,
        password,
        role,
      };

      const today = new Date().toISOString().slice(0, 10);
      if (role === "student") {
        const allStudents = loadStudents();
        const nextDue = new Date();
        nextDue.setMonth(nextDue.getMonth() + 1);
        const availableCourses = loadCourses();
        const defaultCourse = availableCourses[0]?.title || "Frontend Development";

        const newStudent = {
          id: `s-${Date.now()}`,
          studentCode: nextStudentCode(allStudents),
          firstName: trimmedFirst,
          lastName: trimmedLast,
          email: trimmedEmail,
          phone: "+998 90 000 00 00",
          course: defaultCourse,
          status: "faol",
          joinDate: today,
          lastPaymentDate: today,
          nextDueDate: nextDue.toISOString().slice(0, 10),
        };
        saveStudents([...allStudents, newStudent]);
      } else if (role === "teacher") {
        const allTeachers = loadTeachers();
        const newTeacher = {
          id: `t-${Date.now()}`,
          firstName: trimmedFirst,
          lastName: trimmedLast,
          email: trimmedEmail,
          phone: "+998 90 000 00 00",
          subject: "Frontend",
          classesCount: 1,
          studentsCount: 0,
          status: "faol",
          joinDate: today,
          color: "blue",
        };
        saveTeachers([...allTeachers, newTeacher]);
      }

      setUsers((prev) => [...prev, newUser]);
      const safeUser = omitPassword(newUser);
      setUser(safeUser);
      return { ok: true, user: safeUser };
    },
    [users]
  );

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
