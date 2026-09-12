// Demo uchun boshlang'ich foydalanuvchilar.
// Haqiqiy backend ulanganda bu fayl kerak bo'lmaydi — AuthContext shu joyni almashtirish kifoya.
export const seedUsers = [
  {
    id: "u-admin-1",
    firstName: "Sardor",
    lastName: "Abidov",
    email: "admin@abidovs.uz",
    password: "admin123",
    role: "admin",
  },
  {
    id: "u-teacher-1",
    firstName: "Farrux",
    lastName: "Karimov",
    email: "teacher@abidovs.uz",
    password: "teacher123",
    role: "teacher",
  },
  {
    id: "u-student-1",
    firstName: "Aziza",
    lastName: "Yusupova",
    email: "student@abidovs.uz",
    password: "student123",
    role: "student",
  },
];
