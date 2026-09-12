import { useState, useEffect, useCallback } from "react";
import { seedUsers } from "../data/seedUsers";
import { AuthContext } from "./authContextObject";

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
      const exists = users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase());
      if (exists) {
        return { ok: false, error: "Bu email allaqachon ro'yxatdan o'tgan" };
      }
      const newUser = {
        id: `u-${role}-${Date.now()}`,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password,
        role,
      };
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
