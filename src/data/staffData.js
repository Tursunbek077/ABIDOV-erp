export const teacherStats = [
  { id: 1, labelKey: "teacher.stats.classes", value: "3", subKey: "teacher.stats.classesSub", color: "blue", icon: "users" },
  { id: 2, labelKey: "teacher.stats.students", value: "42", subKey: "teacher.stats.studentsSub", color: "green", icon: "graduation" },
  { id: 3, labelKey: "teacher.stats.today", value: "2", subKey: "teacher.stats.todaySub", color: "purple", icon: "clock" },
  { id: 4, labelKey: "teacher.stats.unchecked", value: "7", subKey: "teacher.stats.uncheckedSub", color: "orange", icon: "file" },
];

export const teacherClasses = [
  { id: 1, name: "Frontend Development", students: 18, days: [0, 2, 4], time: "17:00", progress: 78 },
  { id: 2, name: "JavaScript Fundamentals", students: 15, days: [1, 3], time: "19:00", progress: 45 },
  { id: 3, name: "HTML & CSS Basics", students: 9, days: [5], time: "11:00", progress: 64 },
];

export const teacherHomeworkQueue = [
  { id: 1, student: "Aziza Yusupova", task: "React Components", dayKey: "common.today", time: "14:20" },
  { id: 2, student: "Jasur Rahimov", task: "CSS Flexbox Layout", dayKey: "common.yesterday", time: "21:05" },
  { id: 3, student: "Nodira Saidova", task: "JS Array Methods", dayKey: "common.yesterday", time: "18:40" },
];

export const adminStats = [
  { id: 1, labelKey: "admin.stats.students", value: "312", subKey: "admin.stats.studentsSub", color: "blue", icon: "graduation" },
  { id: 2, labelKey: "admin.stats.teachers", value: "14", subKey: "admin.stats.teachersSub", color: "green", icon: "users" },
  { id: 3, labelKey: "admin.stats.courses", value: "9", subKey: "admin.stats.coursesSub", color: "purple", icon: "book" },
  { id: 4, labelKey: "admin.stats.revenue", value: "48.6M", subKey: "admin.stats.revenueSub", color: "orange", icon: "wallet" },
];

export const recentEnrollments = [
  { id: 1, name: "Diyor Nematov", course: "Frontend Development", date: "2026-09-07" },
  { id: 2, name: "Malika Tosheva", course: "JavaScript Fundamentals", date: "2026-09-06" },
  { id: 3, name: "Bekzod Alimov", course: "HTML & CSS Basics", date: "2026-09-05" },
  { id: 4, name: "Sevinch Qodirova", course: "Frontend Development", date: "2026-09-04" },
];

export const paymentStatus = [
  { id: 1, name: "Diyor Nematov", amount: "850,000 so'm", status: "To'landi", statusType: "done" },
  { id: 2, name: "Malika Tosheva", amount: "850,000 so'm", status: "Kutilmoqda", statusType: "pending" },
  { id: 3, name: "Bekzod Alimov", amount: "650,000 so'm", status: "Muddati o'tgan", statusType: "due" },
];
