import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "./useAuth";
import { ThemeContext } from "./themeContextObject";

// Har bir foydalanuvchining mavzusi alohida kalitda saqlanadi:
//   abidovs_theme_student@abidovs.uz, abidovs_theme_admin@abidovs.uz ...
// Shunda o'quvchi qorong'i rejimni yoqsa, admin va o'qituvchiga ta'sir qilmaydi.
// index.html dagi kichik skript ham xuddi shu kalitdan o'qiydi.
const THEME_PREFIX = "abidovs_theme_";

function loadTheme(email) {
  if (!email) return "light"; // tizimga kirmagan (Landing, Login, Signup) — doim yorug'
  try {
    const saved = localStorage.getItem(THEME_PREFIX + email);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    // localStorage yopiq bo'lsa, yorug' mavzuda qolamiz
  }
  return "light";
}

export function ThemeProvider({ children }) {
  const { user } = useAuth();
  const email = user?.email || null;

  const [theme, setTheme] = useState(() => loadTheme(email));
  const [themeOwner, setThemeOwner] = useState(email);

  // Boshqa foydalanuvchi kirsa yoki tizimdan chiqilsa — o'sha odamning
  // o'z mavzusini yuklaymiz (render paytida, effekt kutmasdan).
  if (themeOwner !== email) {
    setThemeOwner(email);
    setTheme(loadTheme(email));
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (email) {
      try {
        localStorage.setItem(THEME_PREFIX + email, next);
      } catch {
        // saqlab bo'lmasa ham mavzu shu sessiyada ishlayveradi
      }
    }
  }, [theme, email]);

  const value = useMemo(() => ({ theme, isDark: theme === "dark", toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}