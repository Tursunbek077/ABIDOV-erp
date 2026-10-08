// Ma'lumotlarda guruh nomi "108-guruh" ko'rinishida saqlangan.
// Ekranda tanlangan tilga qarab chiqaramiz: "108-guruh" / "Группа 108" / "Group 108".
export function groupName(name, t) {
  const match = /^(\d+)-guruh$/.exec(name || "");
  return match ? t("teacher.group", { n: match[1] }) : name;
}
