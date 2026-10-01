import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "./useAuth";
import { translations, LANGUAGES, DEFAULT_LANGUAGE } from "../i18n/translations";
import { LanguageContext } from "./languageContextObject";

// Har bir foydalanuvchining tili alohida kalitda saqlanadi:
//   abidovs_lang_student@abidovs.uz, abidovs_lang_admin@abidovs.uz ...
// Shunda o'quvchi rus tilini tanlasa, admin va o'qituvchiga ta'sir qilmaydi.
const LANG_PREFIX = "abidovs_lang_";

function loadLanguage(email) {
  if (!email) return DEFAULT_LANGUAGE; // tizimga kirmagan (Landing, Login, Signup) — o'zbekcha
  try {
    const saved = localStorage.getItem(LANG_PREFIX + email);
    if (saved && translations[saved]) return saved;
  } catch {
    // localStorage yopiq bo'lsa, standart tilda davom etamiz
  }
  return DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }) {
  const { user } = useAuth();
  const email = user?.email || null;

  const [lang, setLangState] = useState(() => loadLanguage(email));
  const [langOwner, setLangOwner] = useState(email);

  // Boshqa foydalanuvchi kirsa yoki tizimdan chiqilsa — o'sha odamning tilini yuklaymiz
  if (langOwner !== email) {
    setLangOwner(email);
    setLangState(loadLanguage(email));
  }

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback(
    (code) => {
      if (!translations[code]) return;
      setLangState(code);
      if (email) {
        try {
          localStorage.setItem(LANG_PREFIX + email, code);
        } catch {
          // saqlab bo'lmasa ham til shu sessiyada ishlayveradi
        }
      }
    },
    [email]
  );

  // t("dashboard.welcome", { name: "Aziza" }) -> "Xush kelibsiz, Aziza! 👋"
  const t = useCallback(
    (key, vars) => {
      const text = translations[lang]?.[key] ?? translations[DEFAULT_LANGUAGE][key] ?? key;
      if (!vars) return text;
      return text.replace(/\{(\w+)\}/g, (_, name) => (vars[name] ?? `{${name}}`));
    },
    [lang]
  );

  const locale = LANGUAGES.find((l) => l.code === lang)?.locale || "uz-UZ";

  const value = useMemo(() => ({ lang, setLang, t, locale }), [lang, setLang, t, locale]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}