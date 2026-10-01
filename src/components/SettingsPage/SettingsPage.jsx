import { Languages, Palette, Sun, Moon, Check } from "lucide-react";
import { useLanguage } from "../../context/useLanguage";
import { useTheme } from "../../context/useTheme";
import { LANGUAGES } from "../../i18n/translations";
import styles from "./SettingsPage.module.css";

function SettingsPage() {
  const { lang, setLang, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const ThemeIcon = isDark ? Moon : Sun;

  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        <section className={styles.card}>
          <h3 className={styles.cardTitle}>
            <Languages size={18} className={styles.titleIcon} />
            {t("settings.language")}
          </h3>
          <p className={styles.cardDesc}>{t("settings.languageDesc")}</p>

          <div className={styles.options} role="radiogroup" aria-label={t("settings.language")}>
            {LANGUAGES.map((l) => {
              const active = l.code === lang;
              return (
                <button
                  key={l.code}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  lang={l.code}
                  className={`${styles.option} ${active ? styles.active : ""}`}
                  onClick={() => setLang(l.code)}
                >
                  <span className={styles.badge}>{l.short}</span>
                  <span className={styles.optionLabel}>{l.label}</span>
                  {active && <Check size={16} className={styles.check} />}
                </button>
              );
            })}
          </div>
        </section>

        <section className={styles.card}>
          <h3 className={styles.cardTitle}>
            <Palette size={18} className={styles.titleIcon} />
            {t("settings.theme")}
          </h3>
          <p className={styles.cardDesc}>{t("settings.themeDesc")}</p>

          <button
            type="button"
            role="switch"
            aria-checked={isDark}
            className={styles.option}
            onClick={toggleTheme}
          >
            <span className={`${styles.badge} ${styles.themeBadge}`}>
              <ThemeIcon size={16} />
            </span>
            <span className={styles.optionLabel}>{isDark ? t("settings.dark") : t("settings.light")}</span>
            <span className={`${styles.switch} ${isDark ? styles.switchOn : ""}`} aria-hidden="true">
              <span className={styles.knob} />
            </span>
          </button>
        </section>
      </div>

      <p className={styles.note}>
        <Check size={14} />
        {t("settings.note")}
      </p>
    </div>
  );
}

export default SettingsPage;