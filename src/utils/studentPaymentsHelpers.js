// StudentPaymentsPage uchun yordamchi (hisob-kitob) funksiyalar.
// JSX komponentini qisqa saqlash uchun mantiq shu yerga chiqarilgan.

export function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("uz-UZ", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function daysUntil(iso) {
  if (!iso) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(iso);
  due.setHours(0, 0, 0, 0);
  return Math.round((due - today) / (24 * 60 * 60 * 1000));
}

// Hozircha studentsStore alohida "to'lovlar tarixi" massivini saqlamaydi —
// faqat oxirgi to'lov sanasi (lastPaymentDate) bor. Shu sanadan orqaga
// qarab, oylik to'lov ritmini ko'rsatish uchun tarixni shu yerda hisoblab
// chiqamiz. Backend ulanganda bu funksiya haqiqiy /payments ro'yxatiga
// almashtiriladi.
export function buildHistory(lastPaymentDate, amount, count = 4) {
  if (!lastPaymentDate) return [];
  const rows = [];
  for (let i = 0; i < count; i += 1) {
    const d = new Date(lastPaymentDate);
    d.setMonth(d.getMonth() - i);
    rows.push({ date: d.toISOString().slice(0, 10), amount });
  }
  return rows;
}

export function buildBannerText(statusType, nextDueDate, amount) {
  const due = formatDate(nextDueDate);
  const sum = amount.toLocaleString("uz-UZ");

  if (statusType === "muddati_otgan") {
    return `Kirish cheklanmasligi uchun ${due} sanasiga qadar ${sum} so'm to'lovni amalga oshiring.`;
  }
  if (statusType === "kutilmoqda") {
    return `Kirish bloklanib qolmasligi uchun ${due} sanagacha ${sum} so'm to'lovni amalga oshiring.`;
  }
  return `Barcha to'lovlaringiz joriy holatda. Keyingi to'lov sanasi: ${due}.`;
}