// Interfeys matnlari uch tilda. Yangi matn qo'shganda uchala tilga ham
// bir xil kalit bilan qo'shing; biror tilda kalit topilmasa, o'zbekcha
// variant ko'rsatiladi (LanguageContext.jsx -> t funksiyasi).

export const LANGUAGES = [
  { code: "uz", label: "O'zbekcha", short: "UZ", locale: "uz-UZ" },
  { code: "ru", label: "Русский", short: "RU", locale: "ru-RU" },
  { code: "en", label: "English", short: "EN", locale: "en-US" },
];

export const DEFAULT_LANGUAGE = "uz";

export const translations = {
  uz: {
    "nav.dashboard": "Dashboard",
    "nav.teachers": "O'qituvchilar",
    "nav.students": "O'quvchilar",
    "nav.courses": "Kurslar",
    "nav.myCourses": "Mening kurslarim",
    "nav.payments": "To'lovlar",
    "nav.reports": "Daraja",
    "nav.rating": "Reyting",
    "nav.settings": "Sozlamalar",
    "nav.classes": "Mening sinflarim",
    "nav.schedule": "Jadval",
    "nav.attendance": "Davomat",
    "nav.grades": "Baholar",
    "nav.homework": "Uy vazifalari",

    "role.admin": "Administrator",
    "role.teacher": "O'qituvchi",
    "role.student": "O'quvchi",

    "common.logout": "Chiqish",
    "common.section": "Bo'lim",

    "placeholder.text": "Bu bo'lim hozircha ishlab chiqilmoqda. Tez orada tayyor bo'ladi.",

    "dashboard.welcome": "Xush kelibsiz, {name}! 👋",
    "dashboard.adminSub": "O'quv markazingizning umumiy holati bir qarashda.",
    "dashboard.teacherSub": "Bugungi darslaringiz va tekshirilishi kerak bo'lgan vazifalar shu yerda.",
    "dashboard.studentSub": "O'qishda davom eting va maqsadlaringizga erishing.",

    "settings.language": "Til",
    "settings.languageDesc": "Interfeys tilini tanlang",
    "settings.theme": "Mavzu",
    "settings.themeDesc": "Bosib almashtiring",
    "settings.light": "Yorug'",
    "settings.dark": "Qorong'i",
    "settings.note": "O'zgarishlar darhol qo'llanadi va shu qurilmada eslab qolinadi.",
  },

  ru: {
    "nav.dashboard": "Главная",
    "nav.teachers": "Преподаватели",
    "nav.students": "Ученики",
    "nav.courses": "Курсы",
    "nav.myCourses": "Мои курсы",
    "nav.payments": "Платежи",
    "nav.reports": "рейтинг",
    "nav.rating": "Рейтинг",
    "nav.settings": "Настройки",
    "nav.classes": "Мои группы",
    "nav.schedule": "Расписание",
    "nav.attendance": "Посещаемость",
    "nav.grades": "Оценки",
    "nav.homework": "Домашние задания",

    "role.admin": "Администратор",
    "role.teacher": "Преподаватель",
    "role.student": "Ученик",

    "common.logout": "Выйти",
    "common.section": "Раздел",

    "placeholder.text": "Этот раздел пока в разработке. Скоро он будет готов.",

    "dashboard.welcome": "Добро пожаловать, {name}! 👋",
    "dashboard.adminSub": "Общее состояние вашего учебного центра на одном экране.",
    "dashboard.teacherSub": "Ваши сегодняшние уроки и задания, которые нужно проверить.",
    "dashboard.studentSub": "Продолжайте учиться и достигайте своих целей.",

    "settings.language": "Язык",
    "settings.languageDesc": "Выберите язык интерфейса",
    "settings.theme": "Тема",
    "settings.themeDesc": "Нажмите, чтобы переключить",
    "settings.light": "Светлая",
    "settings.dark": "Тёмная",
    "settings.note": "Изменения применяются сразу и сохраняются на этом устройстве.",
  },

  en: {
    "nav.dashboard": "Dashboard",
    "nav.teachers": "Teachers",
    "nav.students": "Students",
    "nav.courses": "Courses",
    "nav.myCourses": "My courses",
    "nav.payments": "Payments",
    "nav.reports": "Reting",
    "nav.rating": "Rating",
    "nav.settings": "Settings",
    "nav.classes": "My classes",
    "nav.schedule": "Schedule",
    "nav.attendance": "Attendance",
    "nav.grades": "Grades",
    "nav.homework": "Homework",

    "role.admin": "Administrator",
    "role.teacher": "Teacher",
    "role.student": "Student",

    "common.logout": "Log out",
    "common.section": "Section",

    "placeholder.text": "This section is still being built. It'll be ready soon.",

    "dashboard.welcome": "Welcome back, {name}! 👋",
    "dashboard.adminSub": "Your learning center's overall status at a glance.",
    "dashboard.teacherSub": "Today's lessons and the homework waiting for review.",
    "dashboard.studentSub": "Keep learning and reach your goals.",

    "settings.language": "Language",
    "settings.languageDesc": "Choose the interface language",
    "settings.theme": "Theme",
    "settings.themeDesc": "Click to switch",
    "settings.light": "Light",
    "settings.dark": "Dark",
    "settings.note": "Changes apply instantly and are remembered on this device.",
  },
};