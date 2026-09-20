import WelcomeBanner from "../../components/WelcomeBanner/WelcomeBanner";
import StatsRow from "../../components/StatsRow/StatsRow";
import MyCourses from "../../components/MyCourses/MyCourses";
import UpcomingLessons from "../../components/UpcomingLessons/UpcomingLessons";
import RecentHomework from "../../components/RecentHomework/RecentHomework";
import ExamAnnouncement from "../../components/ExamAnnouncement/ExamAnnouncement";
import Placeholder from "../../components/Placeholder/Placeholder";
import Schedule from "../../components/Schedule/Schedule";
import { pageTitles } from "../../data/navConfig";
import styles from "./StudentDashboard.module.css";
import CoursesPage from "../../components/CoursesPage/CoursesPage";
import GradesPage from "../../components/GradesPage/GradesPage";

function StudentDashboard({ user, activePage }) {
  if (activePage === "schedule") {
    return <Schedule />;
  }

  if (activePage === "courses") {
    return <CoursesPage />;
  }

  if (activePage === "grades") {
    return <GradesPage />;
  }

  if (activePage !== "dashboard") {
    return <Placeholder title={pageTitles[activePage] || "Bo'lim"} />;
  }

  return (
    <div className={styles.page}>
      <WelcomeBanner name={user.firstName} />
      <StatsRow />

      <div className={styles.mainGrid}>
        <div className={styles.leftCol}>
          <MyCourses />
          <ExamAnnouncement />
        </div>

        <div className={styles.rightCol}>
          <UpcomingLessons />
          <RecentHomework />
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
