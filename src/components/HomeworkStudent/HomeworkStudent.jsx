import { useState } from 'react';
import { FileText, Clock, CheckCircle } from 'lucide-react';
import styles from './HomeworkStudent.module.css';
import { useLanguage } from "../../context/useLanguage";

const HomeworkStudent = () => {
  const { t, formatDate } = useLanguage();
  const [activeTab, setActiveTab] = useState('all');

  // Vazifalar ro'yxati (useState ichida saqlanadi)
  const [homeworkList, setHomeworkList] = useState([
    {
      id: 1,
      title: 'React Components',
      subject: 'Frontend Development',
      status: 'urgent',
      deadlineKey: 'student.hw.dueTomorrow',
      isCompleted: false,
    },
    {
      id: 2,
      title: 'CSS Flexbox Layout',
      subject: 'Frontend Development',
      status: 'pending',
      deadlineKey: 'hwStudent.until',
      due: '2026-09-24',
      isCompleted: false,
    },
    {
      id: 3,
      title: 'JavaScript Array Methods',
      subject: 'Frontend Development',
      status: 'completed',
      deadline: null,
      isCompleted: true,
    },
  ]);

  // Vazifani topshirish funksiyasi
  const handleSubmitHomework = (id) => {
    setHomeworkList((prevList) =>
      prevList.map((item) =>
        item.id === id
          ? { ...item, isCompleted: true, status: 'completed' }
          : item
      )
    );
  };

  // Tablar bo'yicha saralash
  const filteredHomeworks = homeworkList.filter((item) => {
    if (activeTab === 'urgent') return item.status === 'urgent' && !item.isCompleted;
    if (activeTab === 'pending') return item.status === 'pending' && !item.isCompleted;
    if (activeTab === 'completed') return item.isCompleted;
    return true;
  });

  // Statistikani av hisoblash
  const totalCount = homeworkList.length;
  const urgentCount = homeworkList.filter((item) => item.status === 'urgent' && !item.isCompleted).length;
  const completedCount = homeworkList.filter((item) => item.isCompleted).length;

  return (
    <div className={styles.homeworksContainer}>
      {/* Sarlavha */}
      <div className={styles.headerSection}>
        <h1 className={styles.title}>{t("nav.homework")}</h1>
        <p className={styles.subtitle}>
          {t("hwStudent.subtitle")}
        </p>
      </div>

      {/* Statistika kartochkalari */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={`${styles.iconWrapper} ${styles.iconBlue}`}>
            <FileText size={24} />
          </div>
          <div>
            <p className={styles.statLabel}>{t("hwStudent.total")}</p>
            <h3 className={styles.statValue}>{totalCount}</h3>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.iconWrapper} ${styles.iconYellow}`}>
            <Clock size={24} />
          </div>
          <div>
            <p className={styles.statLabel}>{t("hwStudent.urgent")}</p>
            <h3 className={styles.statValue}>{urgentCount}</h3>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.iconWrapper} ${styles.iconGreen}`}>
            <CheckCircle size={24} />
          </div>
          <div>
            <p className={styles.statLabel}>{t("hwStudent.done")}</p>
            <h3 className={styles.statValue}>{completedCount}</h3>
          </div>
        </div>
      </div>

      {/* Asosiy kontent */}
      <div className={styles.contentCard}>
        {/* Tab tugmalari */}
        <div className={styles.tabsList}>
          <button
            onClick={() => setActiveTab('all')}
            className={`${styles.tabButton} ${activeTab === 'all' ? styles.activeTab : ''}`}
          >
            {t("common.all")}
          </button>
          <button
            onClick={() => setActiveTab('urgent')}
            className={`${styles.tabButton} ${activeTab === 'urgent' ? styles.activeTab : ''}`}
          >
            {t("hwStudent.tabUrgent")}
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`${styles.tabButton} ${activeTab === 'pending' ? styles.activeTab : ''}`}
          >
            {t("hwStudent.tabPending")}
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`${styles.tabButton} ${activeTab === 'completed' ? styles.activeTab : ''}`}
          >
            {t("hwStudent.done")}
          </button>
        </div>

        {/* Vazifalar ro'yxati */}
        <div className={styles.taskList}>
          {filteredHomeworks.map((item) => (
            <div key={item.id} className={styles.taskItem}>
              <div className={styles.taskLeft}>
                <div
                  className={`${styles.statusIcon} ${
                    item.isCompleted
                      ? styles.statusCompleted
                      : item.status === 'urgent'
                      ? styles.statusUrgent
                      : styles.statusPending
                  }`}
                >
                  {item.isCompleted ? <CheckCircle size={20} /> : <Clock size={20} />}
                </div>
                <div>
                  <h4 className={styles.taskTitle}>{item.title}</h4>
                  <p className={styles.taskSubject}>{item.subject}</p>
                </div>
              </div>

              <div className={styles.taskRight}>
                {item.isCompleted ? (
                  <span className={styles.textCompleted}>{t("student.hw.submitted")}</span>
                ) : (
                  <>
                    <span
                      className={`${styles.deadlineText} ${
                        item.status === 'urgent' ? styles.textUrgent : styles.textPending
                      }`}
                    >
                      {t(item.deadlineKey, { date: formatDate(item.due, { day: "numeric", month: "long" }) })}
                    </span>
                    {/* Topshirish tugmasiga onClick ulandi */}
                    <button
                      onClick={() => handleSubmitHomework(item.id)}
                      className={styles.actionButton}
                    >
                      {t("hwStudent.submit")}
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}

          {filteredHomeworks.length === 0 && (
            <div className={styles.emptyState}>
              {t("hwStudent.empty")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeworkStudent;