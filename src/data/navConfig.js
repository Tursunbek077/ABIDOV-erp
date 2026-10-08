// import {
//   Home,
//   BookOpen,
//   Calendar,
//   CheckCircle2,
//   Star,
//   FileText,
//   CreditCard,
//   Settings,
//   Users,
//   GraduationCap,
  
//   Trophy,
//   ClipboardList,
// } from "lucide-react";

// export const navConfig = {
//   admin: [
//     { key: "dashboard", label: "Dashboard", icon: Home },
//     { key: "teachers", label: "O'qituvchilar", icon: Users },
//     { key: "students", label: "O'quvchilar", icon: GraduationCap },
//     { key: "courses", label: "Kurslar", icon: BookOpen },
//     { key: "payments", label: "To'lovlar", icon: CreditCard },
    
//     { key: "rating", label: "Reyting", icon: Trophy },
//     { key: "settings", label: "Sozlamalar", icon: Settings },
//   ],
//   teacher: [
//     { key: "dashboard", label: "Dashboard", icon: Home },
//     { key: "classes", label: "Mening sinflarim", icon: Users },
//     { key: "schedule", label: "Jadval", icon: Calendar },
//     { key: "attendance", label: "Davomat", icon: CheckCircle2 },
//     { key: "grades", label: "Baholar", icon: Star },
//     { key: "homework", label: "Uy vazifalari", icon: ClipboardList },
//     { key: "settings", label: "Sozlamalar", icon: Settings },
//   ],
//   student: [
//     { key: "dashboard", label: "Dashboard", icon: Home },
//     { key: "courses", label: "Mening kurslarim", icon: BookOpen },
//     { key: "schedule", label: "Jadval", icon: Calendar },
//     { key: "attendance", label: "Davomat", icon: CheckCircle2 },
//     { key: "grades", label: "Baholar", icon: Star },
//     { key: "homework", label: "Uy vazifalari", icon: FileText },
//     { key: "payments", label: "To'lovlar", icon: CreditCard },
//     { key: "settings", label: "Sozlamalar", icon: Settings },
//   ],
// };

// export const pageTitles = {
//   dashboard: "Dashboard",
//   teachers: "O'qituvchilar",
//   students: "O'quvchilar",
//   courses: "Kurslar",
//   payments: "To'lovlar",
  
//   rating: "Reyting",
//   settings: "Sozlamalar",
//   classes: "Mening sinflarim",
//   schedule: "Jadval",
//   attendance: "Davomat",
//   grades: "Baholar",
//   homework: "Uy vazifalari",
// };

import {
  Home,
  BookOpen,
  Calendar,
  CheckCircle2,
  Star,
  FileText,
  CreditCard,
  Settings,
  Users,
  GraduationCap,
  Trophy,
  ClipboardList,
} from "lucide-react";

// label o'rniga labelKey: matn tanlangan tilga qarab i18n/translations.js dan olinadi.
export const navConfig = {
  admin: [
    { key: "dashboard", labelKey: "nav.dashboard", icon: Home },
    { key: "teachers", labelKey: "nav.teachers", icon: Users },
    { key: "students", labelKey: "nav.students", icon: GraduationCap },
    { key: "courses", labelKey: "nav.courses", icon: BookOpen },
    { key: "payments", labelKey: "nav.payments", icon: CreditCard },
    { key: "rating", labelKey: "nav.rating", icon: Trophy },
    { key: "settings", labelKey: "nav.settings", icon: Settings },
  ],
  teacher: [
    { key: "dashboard", labelKey: "nav.dashboard", icon: Home },
    { key: "classes", labelKey: "nav.classes", icon: Users },
    { key: "schedule", labelKey: "nav.schedule", icon: Calendar },
    { key: "attendance", labelKey: "nav.attendance", icon: CheckCircle2 },
    { key: "grades", labelKey: "nav.grades", icon: Star },
    { key: "homework", labelKey: "nav.homework", icon: ClipboardList },
    { key: "settings", labelKey: "nav.settings", icon: Settings },
  ],
  student: [
    { key: "dashboard", labelKey: "nav.dashboard", icon: Home },
    { key: "courses", labelKey: "nav.myCourses", icon: BookOpen },
    { key: "schedule", labelKey: "nav.schedule", icon: Calendar },
    // { key: "attendance", labelKey: "nav.attendance", icon: CheckCircle2 },
    { key: "grades", labelKey: "nav.grades", icon: Star },
    { key: "homework", labelKey: "nav.homework", icon: FileText },
    { key: "payments", labelKey: "nav.payments", icon: CreditCard },
    { key: "settings", labelKey: "nav.settings", icon: Settings },
  ],
};

// Sahifa sarlavhalari — tarjima kalitlari (src/i18n/translations.js).
// Matnni olish uchun: t(pageTitles[activePage])
export const pageTitles = {
  dashboard: "nav.dashboard",
  teachers: "nav.teachers",
  students: "nav.students",
  courses: "nav.courses",
  payments: "nav.payments",
  rating: "nav.rating",
  settings: "nav.settings",
  classes: "nav.classes",
  schedule: "nav.schedule",
  attendance: "nav.attendance",
  grades: "nav.grades",
  homework: "nav.homework",
};