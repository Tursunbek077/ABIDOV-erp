import StatCard from "../StatCard/StatCard";
import { BookOpen, TrendingUp, Star, FileText } from "lucide-react";
import { stats } from "../../data/dummyData";
import styles from "./StatsRow.module.css";

const iconMap = { book: BookOpen, trend: TrendingUp, star: Star, file: FileText };

function StatsRow() {
  return (
    <div className={styles.row}>
      {stats.map((s) => (
        <StatCard key={s.id} icon={iconMap[s.icon]} label={s.label} value={s.value} sub={s.sub} color={s.color} />
      ))}
    </div>
  );
}

export default StatsRow;