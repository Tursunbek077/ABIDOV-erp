// export const stats = [
//   { id: 1, label: "Courses", value: "3", sub: "Active courses", color: "blue", icon: "book" },
//   { id: 2, label: "Attendance", value: "92%", sub: "This month", color: "green", icon: "trend" },
//   { id: 3, label: "Average Grade", value: "86%", sub: "All courses", color: "purple", icon: "star" },
//   { id: 4, label: "Homework", value: "4", sub: "Pending tasks", color: "orange", icon: "file" },
// ];

// export const courses = [
//   { id: 1, title: "Frontend Development", tags: "React • JavaScript • CSS", teacher: "Farrux.K", progress: 78, color: "blue", icon: "code" },
//   { id: 2, title: "HTML & CSS Basics", tags: "HTML • CSS • Layout", teacher: "Alem.X", progress: 64, color: "green", icon: "palette" },
//   { id: 3, title: "JavaScript Fundamentals", tags: "JavaScript • Basics • Practice", teacher: "Farrux.K", progress: 45, color: "orange", icon: "JS" },
// ];






// export const lessons = [
//   { id: 1, time: "17:00", title: "Assisent Teachar", subtitle: "Frontend ", room: "Room: MyTaxi" },
//   { id: 2, time: "19:00", title: "React", subtitle: "Frontend", room: "Room: MyTAxi" },
// ];

// export const homeworks = [
//   { id: 1, title: "React Components", status: "Due tomorrow", statusType: "due" },
//   { id: 2, title: "CSS Flexbox Layout", status: "Due 18 Aug", statusType: "pending" },
//   { id: 3, title: "JavaScript Array Methods", status: "Submitted", statusType: "done" },
// ];
//salom



export const stats = [
  { id: 1, labelKey: "student.stats.courses", value: "3", subKey: "student.stats.coursesSub", color: "blue", icon: "book" },
  { id: 2, labelKey: "student.stats.attendance", value: "92%", subKey: "student.stats.attendanceSub", color: "green", icon: "trend" },
  { id: 3, labelKey: "student.stats.avgGrade", value: "86%", subKey: "student.stats.avgGradeSub", color: "purple", icon: "star" },
  { id: 4, labelKey: "student.stats.homework", value: "4", subKey: "student.stats.homeworkSub", color: "orange", icon: "file" },
];

export const courses = [
  {
    id: 1,
    title: "Frontend Development",
    tags: "React • JavaScript • CSS",
    teacher: "Farrux.K",
    progress: 55,
    color: "blue",
    icon: "code",
    category: "Frontend",
    durationMonths: 6,
    currentMonth: 4,
    startDate: "2024-03-01",
    elapsedMonths: 3,
    elapsedDays: 10,
  }
];

export const lessons = [
  { id: 1, time: "17:00", title: "Assistant Teacher", subtitle: "Frontend", room: "MyTaxi" },
  { id: 2, time: "19:00", title: "React", subtitle: "Frontend", room: "MyTaxi" },
];

export const homeworks = [
  { id: 1, title: "React Components", statusKey: "student.hw.dueTomorrow", statusType: "due" },
  { id: 2, title: "CSS Flexbox Layout", statusKey: "student.hw.dueOn", due: "2026-08-18", statusType: "pending" },
  { id: 3, title: "JavaScript Array Methods", statusKey: "student.hw.submitted", statusType: "done" },
];