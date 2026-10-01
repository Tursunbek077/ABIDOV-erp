import { useMemo, useState } from "react";
import { Search, ChevronDown, Trophy, Crown, Medal, TrendingUp, CalendarCheck, ClipboardCheck } from "lucide-react";
import StatCard from "../StatCard/StatCard";
import { ratingSeed } from "../../data/ratingData";
import { loadStudents } from "../../utils/studentsStore";
import styles from "./RatingPage.module.css";

const AVATAR_COLORS = ["#2F6FED", "#22B573", "#F5A623", "#8B5CF6", "#EC4899", "#14B8A6", "#F97316"];

function initials(firstName, lastName) {
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
}

function avatarColor(name) {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) % 997;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

// Umumiy ball: baho 60%, davomat 20%, uy vazifasi 20%
function totalPoints(r) {
  return Math.round(r.score * 0.6 + r.attendance * 0.2 + r.homework * 0.2);
}

// Standart ro'yxat + admin keyin qo'shgan o'quvchilar (ular uchun barqaror demo ko'rsatkich)
function buildRating() {
  const list = [...ratingSeed];
  const known = new Set(list.map((r) => `${r.firstName} ${r.lastName}`.toLowerCase()));

  loadStudents().forEach((s) => {
    const key = `${s.firstName} ${s.lastName}`.toLowerCase();
    if (known.has(key)) return;
    let seed = 0;
    for (const ch of key) seed = (seed * 31 + ch.charCodeAt(0)) % 1000;
    list.push({
      id: `r-${s.id}`,
      firstName: s.firstName,
      lastName: s.lastName,
      course: s.course,
      score: 60 + (seed % 36),
      attendance: 70 + (seed % 29),
      homework: 55 + (seed % 42),
    });
  });

  return list
    .map((r) => ({ ...r, points: totalPoints(r) }))
    .sort((a, b) => b.points - a.points || b.score - a.score)
    .map((r, i) => ({ ...r, rank: i + 1 }));
}

function PodiumCard({ item, place }) {
  const icons = { 1: Crown, 2: Medal, 3: Medal };
  const Icon = icons[place];
  return (
    <div className={`${styles.podium} ${styles[`place${place}`]}`}>
      <div className={styles.podiumIcon}>
        <Icon size={place === 1 ? 26 : 20} />
      </div>
      <div className={styles.podiumAvatar} style={{ background: avatarColor(item.firstName + item.lastName) }}>
        {initials(item.firstName, item.lastName)}
      </div>
      <p className={styles.podiumName}>
        {item.firstName} {item.lastName}
      </p>
      <p className={styles.podiumCourse}>{item.course}</p>
      <div className={styles.podiumPoints}>{item.points} ball</div>
      <div className={styles.podiumBase}>{place}</div>
    </div>
  );
}

function RatingPage() {
  const rating = useMemo(buildRating, []);
  const [query, setQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("Barcha kurslar");

  const courses = useMemo(() => [...new Set(rating.map((r) => r.course))], [rating]);

  const stats = useMemo(() => {
    const n = rating.length || 1;
    const avg = (key) => Math.round(rating.reduce((sum, r) => sum + r[key], 0) / n);
    return { avgScore: avg("score"), avgAttendance: avg("attendance"), avgHomework: avg("homework") };
  }, [rating]);

  const filtered = rating.filter((r) => {
    const name = `${r.firstName} ${r.lastName}`.toLowerCase();
    return (
      name.includes(query.toLowerCase()) &&
      (courseFilter === "Barcha kurslar" || r.course === courseFilter)
    );
  });

  const showPodium = query === "" && courseFilter === "Barcha kurslar";
  const top3 = rating.slice(0, 3);
  const listItems = showPodium ? filtered.slice(3) : filtered;

  return (
    <div className={styles.page}>
      <div className={styles.statsRow}>
        <StatCard icon={Trophy} label="Reytingdagilar" value={rating.length} sub="Jami o'quvchilar" color="orange" />
        <StatCard icon={TrendingUp} label="O'rtacha baho" value={stats.avgScore} sub="100 ballik tizimda" color="blue" />
        <StatCard icon={CalendarCheck} label="O'rtacha davomat" value={`${stats.avgAttendance}%`} sub="Barcha o'quvchilar" color="green" />
        <StatCard icon={ClipboardCheck} label="Uy vazifalari" value={`${stats.avgHomework}%`} sub="Bajarilish darajasi" color="purple" />
      </div>

      {showPodium && (
        <section className={styles.podiumCard}>
          <div className={styles.podiumHeader}>
            <Trophy size={20} />
            <h3>Eng yaxshi uchtalik</h3>
          </div>
          <div className={styles.podiumRow}>
            <PodiumCard item={top3[1]} place={2} />
            <PodiumCard item={top3[0]} place={1} />
            <PodiumCard item={top3[2]} place={3} />
          </div>
        </section>
      )}

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={18} style={{ color: "var(--c-8a93a6)" }} />
          <input
            placeholder="Ism yoki familiya bo'yicha qidirish..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className={styles.filterBox}>
          <select value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
            <option>Barcha kurslar</option>
            {courses.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <ChevronDown size={16} style={{ color: "var(--c-8a93a6)" }} />
        </div>
      </div>

      <section className={styles.listCard}>
        <div className={styles.listHead}>
          <span className={styles.colRank}>O'rin</span>
          <span className={styles.colName}>O'quvchi</span>
          <span className={styles.colMetric}>Baho</span>
          <span className={styles.colMetric}>Davomat</span>
          <span className={styles.colMetric}>Vazifa</span>
          <span className={styles.colPoints}>Umumiy ball</span>
        </div>

        {listItems.length === 0 && <p className={styles.empty}>Hech narsa topilmadi.</p>}

        {listItems.map((r) => (
          <div key={r.id} className={styles.listRow}>
            <span className={styles.colRank}>
              <span className={styles.rankBadge}>{r.rank}</span>
            </span>
            <span className={styles.colName}>
              <span className={styles.avatar} style={{ background: avatarColor(r.firstName + r.lastName) }}>
                {initials(r.firstName, r.lastName)}
              </span>
              <span>
                <span className={styles.name}>
                  {r.firstName} {r.lastName}
                </span>
                <span className={styles.course}>{r.course}</span>
              </span>
            </span>
            <span className={styles.colMetric}>{r.score}</span>
            <span className={styles.colMetric}>{r.attendance}%</span>
            <span className={styles.colMetric}>{r.homework}%</span>
            <span className={styles.colPoints}>
              <span className={styles.bar}>
                <span className={styles.barFill} style={{ width: `${r.points}%` }} />
              </span>
              <strong>{r.points}</strong>
            </span>
          </div>
        ))}
      </section>
    </div>
  );
}

export default RatingPage;
