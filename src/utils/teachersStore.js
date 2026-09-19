import { teachersSeed } from "../data/teachersData";

const STORAGE_KEY = "abidovs_teachers";

export function loadTeachers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore parse errors, fall back to seed
  }
  return teachersSeed;
}

export function saveTeachers(teachers) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(teachers));
}
