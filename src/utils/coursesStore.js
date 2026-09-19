import { coursesSeed } from "../data/coursesData";

const STORAGE_KEY = "abidovs_courses";

export function loadCourses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore parse errors, fall back to seed
  }
  return coursesSeed;
}

export function saveCourses(courses) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
}
