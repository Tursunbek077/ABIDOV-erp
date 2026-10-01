import StatCard from "../StatCard/StatCard";
import { BookOpen, TrendingUp, Star, FileText } from "lucide-react";
import { stats } from "../../data/dummyData";
import styles from "./StatsRow.module.css";
import { useLanguage } from "../../context/useLanguage";

const iconMap = { book: BookOpen, trend: TrendingUp, star: Star, file: FileText };

function StatsRow() {
  const { t } = useLanguage();
  return (
    <div className={styles.row}>
      {stats.map((s) => (
        <StatCard key={s.id} icon={iconMap[s.icon]} label={t(s.labelKey)} value={s.value} sub={t(s.subKey)} color={s.color} />
      ))}
    </div>
  );
}

export default StatsRow;