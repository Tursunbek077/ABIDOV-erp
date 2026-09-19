import { studentsSeed } from "../data/studentsData";

const STORAGE_KEY = "abidovs_students";

// Eski (to'lov maydonlari qo'shilishidan oldingi) localStorage keshida
// saqlangan o'quvchilarga lastPaymentDate / nextDueDate yetishmasa,
// shu joydan (id bo'yicha mos seed yozuvidan, topilmasa esa bugungi
// kundan +1 oy sifatida) to'ldirib qo'yamiz va qayta saqlaymiz.
function migratePaymentFields(students) {
  let changed = false;

  const migrated = students.map((s) => {
    if (s.nextDueDate) return s;

    changed = true;
    const seedMatch = studentsSeed.find((seed) => seed.id === s.id || seed.email === s.email);

    if (seedMatch) {
      return { ...s, lastPaymentDate: seedMatch.lastPaymentDate, nextDueDate: seedMatch.nextDueDate };
    }

    const fallbackDue = new Date();
    fallbackDue.setMonth(fallbackDue.getMonth() + 1);
    return {
      ...s,
      lastPaymentDate: new Date().toISOString().slice(0, 10),
      nextDueDate: fallbackDue.toISOString().slice(0, 10),
    };
  });

  if (changed) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
  }

  return migrated;
}

export function loadStudents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return migratePaymentFields(JSON.parse(raw));
  } catch {
    // ignore parse errors, fall back to seed
  }
  return studentsSeed;
}

export function saveStudents(students) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

export function nextStudentCode(students) {
  const n = students.length + 1;
  return `ST-${String(n).padStart(4, "0")}`;
}
