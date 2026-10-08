// To'lovlar bilan bog'liq umumiy mantiq.
// Alohida "to'lovlar" ma'lumotlar bazasi yaratilmagan — har bir o'quvchi
// (studentsStore) o'zining lastPaymentDate / nextDueDate maydonlariga ega,
// bu yerda esa o'sha maydonlar asosida holat hisoblanadi va yangilanadi.

import { loadStudents, saveStudents } from "./studentsStore";
import { loadCourses } from "./coursesStore";

const DAY_MS = 24 * 60 * 60 * 1000;
const DUE_SOON_WINDOW_DAYS = 5;

export const PAYMENT_STATUS = {
  PAID: "faol",
  DUE_SOON: "kutilmoqda",
  OVERDUE: "muddati_otgan",
};

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

// O'quvchining joriy to'lov holatini aniqlaydi: faol / kutilmoqda / muddati_otgan
export function getPaymentStatusType(student) {
  if (!student?.nextDueDate) return PAYMENT_STATUS.PAID;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(student.nextDueDate);
  due.setHours(0, 0, 0, 0);

  const diffDays = Math.round((due - today) / DAY_MS);

  if (diffDays < 0) return PAYMENT_STATUS.OVERDUE;
  if (diffDays <= DUE_SOON_WINDOW_DAYS) return PAYMENT_STATUS.DUE_SOON;
  return PAYMENT_STATUS.PAID;
}

// O'quvchi qaysi kursda bo'lsa, o'sha kursning oylik narxini qaytaradi.
export function getStudentPaymentAmount(student) {
  const course = loadCourses().find((c) => c.title === student.course);
  return course ? course.price : 0;
}

export function findStudentByEmail(email) {
  if (!email) return null;
  return (
    loadStudents().find((s) => s.email.toLowerCase() === email.trim().toLowerCase()) || null
  );
}

// Talaba ERPga kira olmasligi kerakmi (to'lov muddati o'tganmi)?
export function getStudentAccessInfo(email) {
  const student = findStudentByEmail(email);
  if (!student) return { blocked: false, student: null, statusType: PAYMENT_STATUS.PAID };

  const statusType = getPaymentStatusType(student);
  return {
    blocked: statusType === PAYMENT_STATUS.OVERDUE,
    student,
    statusType,
    amount: getStudentPaymentAmount(student),
  };
}

// Admin "To'landi" tugmasini bosganda chaqiriladi: to'lov sanasini bugungi
// kunga, keyingi muddatni esa +1 oyga suradi — shu bilan o'quvchi yana
// ERPga kira oladigan bo'ladi.
export function markStudentPaid(studentId) {
  const students = loadStudents();
  const today = new Date();
  const nextDue = new Date(today);
  nextDue.setMonth(nextDue.getMonth() + 1);

  const updated = students.map((s) => {
    if (s.id !== studentId) return s;
    return {
      ...s,
      lastPaymentDate: todayISO(),
      nextDueDate: nextDue.toISOString().slice(0, 10),
    };
  });

  saveStudents(updated);
  return updated;
}
