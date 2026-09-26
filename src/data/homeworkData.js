const FIRST_NAMES = [
  "Aziza", "Diyor", "Malika", "Bekzod", "Sevinch", "Jasur", "Nodira", "Otabek",
  "Kamola", "Farrux", "Madina", "Sardor", "Dilnoza", "Ulug'bek", "Zilola",
  "Sherzod", "Gulnoza", "Anvar", "Nigora", "Islom", "Shahzod", "Feruza",
  "Bobur", "Munisa", "Alisher", "Umida", "Davron", "Nilufar", "Rustam", "Yulduz",
];

const LAST_NAMES = [
  "Yusupova", "Nematov", "Tosheva", "Alimov", "Qodirova", "Rahimov", "Saidova",
  "Yoldoshev", "Ergasheva", "Tursunov", "Xolova", "Nazarov", "Karimova",
  "Mirzayev", "Sobirova", "Qosimov", "Abdullayeva", "Xamidov", "Fayzullayeva",
  "Berdiyev", "Yusupov", "Rashidova", "Ismoilov", "Ochilova", "Sultonov",
  "Nabiyeva", "Yusupova", "Xolmatov", "Sattorova", "G'aniyev",
];

function addDays(dateStr, delta) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + delta);
  return d.toISOString().slice(0, 10);
}

// Har bir o'quvchi uchun: topshirdi (o'z vaqtida/kech), tekshirilmagan yoki topshirmadi.
function buildStudents(groupSeed, count, deadline) {
  const students = [];
  for (let i = 0; i < count; i++) {
    const firstName = FIRST_NAMES[(groupSeed + i) % FIRST_NAMES.length];
    const lastName = LAST_NAMES[(groupSeed * 3 + i * 5) % LAST_NAMES.length];
    const roll = (i + groupSeed) % 5;

    let status, submittedDate, grade;
    if (roll <= 2) {
      status = "tekshirildi";
      submittedDate = addDays(deadline, -((i % 3) + 1));
      grade = 65 + ((i * 7 + groupSeed * 11) % 36);
    } else if (roll === 3) {
      status = "tekshirilmagan";
      submittedDate = addDays(deadline, i % 2 === 0 ? -1 : 1);
      grade = null;
    } else {
      status = "topshirmadi";
      submittedDate = null;
      grade = null;
    }

    students.push({
      id: `hw-${groupSeed}-${i + 1}`,
      studentCode: `ST-${String(groupSeed)}${String(i + 1).padStart(3, "0")}`,
      firstName,
      lastName,
      status,
      submittedDate,
      grade,
    });
  }
  return students;
}

export const homeworkGroups = [
  {
    id: "hg-108",
    name: "108-guruh",
    subject: "Frontend Development",
    assignment: "Responsive Landing Page",
    deadline: "2026-10-05",
    students: buildStudents(1, 20, "2026-10-05"),
  },
  {
    id: "hg-115",
    name: "115-guruh",
    subject: "JavaScript Fundamentals",
    assignment: "Massivlar bilan ishlash",
    deadline: "2026-10-10",
    students: buildStudents(2, 28, "2026-10-10"),
  },
  {
    id: "hg-121",
    name: "121-guruh",
    subject: "HTML & CSS Basics",
    assignment: "Semantik HTML tuzilishi",
    deadline: "2026-09-30",
    students: buildStudents(3, 30, "2026-09-30"),
  },
];
