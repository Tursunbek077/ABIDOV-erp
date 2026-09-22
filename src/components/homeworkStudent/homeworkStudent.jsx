// import React, { useState } from 'react';
// import { FileText, Clock, CheckCircle } from 'lucide-react';
// import styles from './homeworkStudent.module.css'; // CSS faylini import qilish

// const Homeworks = () => {
//   const [activeTab, setActiveTab] = useState('all');

//   const [homeworkList] = useState([
//     {
//       id: 1,
//       title: 'React Components',
//       subject: 'Frontend Development',
//       status: 'urgent',
//       deadline: 'Ertaga muddati',
//       isCompleted: false,
//     },
//     {
//       id: 2,
//       title: 'CSS Flexbox Layout',
//       subject: 'Frontend Development',
//       status: 'pending',
//       deadline: '18-avgustgacha',
//       isCompleted: false,
//     },
//     {
//       id: 3,
//       title: 'JavaScript Array Methods',
//       subject: 'Frontend Development',
//       status: 'completed',
//       deadline: null,
//       isCompleted: true,
//     },
//   ]);

//   const filteredHomeworks = homeworkList.filter((item) => {
//     if (activeTab === 'urgent') return item.status === 'urgent';
//     if (activeTab === 'pending') return item.status === 'pending';
//     if (activeTab === 'completed') return item.isCompleted;
//     return true;
//   });

//   const totalCount = homeworkList.length;
//   const urgentCount = homeworkList.filter((item) => item.status === 'urgent').length;
//   const completedCount = homeworkList.filter((item) => item.isCompleted).length;

//   return (
//     <div className={styles.homeworksContainer}>
//       {/* Sarlavha */}
//       <div className={styles.headerSection}>
//         <h1 className={styles.title}>Uy vazifalari</h1>
//         <p className={styles.subtitle}>
//           Barcha fanlar bo'yicha topshiriqlar va ularning holati
//         </p>
//       </div>

//       {/* Statistika kartochkalari */}
//       <div className={styles.statsGrid}>
//         <div className={styles.statCard}>
//           <div className={`${styles.iconWrapper} ${styles.iconBlue}`}>
//             <FileText size={24} />
//           </div>
//           <div>
//             <p className={styles.statLabel}>Jami vazifalar</p>
//             <h3 className={styles.statValue}>{totalCount}</h3>
//           </div>
//         </div>

//         <div className={styles.statCard}>
//           <div className={`${styles.iconWrapper} ${styles.iconYellow}`}>
//             <Clock size={24} />
//           </div>
//           <div>
//             <p className={styles.statLabel}>Muddati yaqinlashgan</p>
//             <h3 className={styles.statValue}>{urgentCount}</h3>
//           </div>
//         </div>

//         <div className={styles.statCard}>
//           <div className={`${styles.iconWrapper} ${styles.iconGreen}`}>
//             <CheckCircle size={24} />
//           </div>
//           <div>
//             <p className={styles.statLabel}>Topshirilgan</p>
//             <h3 className={styles.statValue}>{completedCount}</h3>
//           </div>
//         </div>
//       </div>

//       {/* Asosiy vazifalar ro'yxati */}
//       <div className={styles.contentCard}>
//         {/* Tablar */}
//         <div className={styles.tabsList}>
//           <button
//             onClick={() => setActiveTab('all')}
//             className={`${styles.tabButton} ${activeTab === 'all' ? styles.activeTab : ''}`}
//           >
//             Barchasi
//           </button>
//           <button
//             onClick={() => setActiveTab('urgent')}
//             className={`${styles.tabButton} ${activeTab === 'urgent' ? styles.activeTab : ''}`}
//           >
//             Muddati yaqin
//           </button>
//           <button
//             onClick={() => setActiveTab('pending')}
//             className={`${styles.tabButton} ${activeTab === 'pending' ? styles.activeTab : ''}`}
//           >
//             Kutilmoqda
//           </button>
//           <button
//             onClick={() => setActiveTab('completed')}
//             className={`${styles.tabButton} ${activeTab === 'completed' ? styles.activeTab : ''}`}
//           >
//             Topshirilgan
//           </button>
//         </div>

//         {/* Ro'yxat */}
//         <div className={styles.taskList}>
//           {filteredHomeworks.map((item) => (
//             <div key={item.id} className={styles.taskItem}>
//               <div className={styles.taskLeft}>
//                 <div
//                   className={`${styles.statusIcon} ${
//                     item.isCompleted
//                       ? styles.statusCompleted
//                       : item.status === 'urgent'
//                       ? styles.statusUrgent
//                       : styles.statusPending
//                   }`}
//                 >
//                   {item.isCompleted ? <CheckCircle size={20} /> : <Clock size={20} />}
//                 </div>
//                 <div>
//                   <h4 className={styles.taskTitle}>{item.title}</h4>
//                   <p className={styles.taskSubject}>{item.subject}</p>
//                 </div>
//               </div>

//               <div className={styles.taskRight}>
//                 {item.isCompleted ? (
//                   <span className={styles.textCompleted}>Topshirildi</span>
//                 ) : (
//                   <>
//                     <span
//                       className={`${styles.deadlineText} ${
//                         item.status === 'urgent' ? styles.textUrgent : styles.textPending
//                       }`}
//                     >
//                       {item.deadline}
//                     </span>
//                     <button className={styles.actionButton}>Topshirish</button>
//                   </>
//                 )}
//               </div>
//             </div>
//           ))}

//           {filteredHomeworks.length === 0 && (
//             <div className={styles.emptyState}>
//               Ushbu bo'limda hech qanday vazifa topilmadi.
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Homeworks;



import React, { useState } from 'react';
import { FileText, Clock, CheckCircle } from 'lucide-react';
import styles from './homeworkStudent.module.css';

const HomeworkStudent = () => {
  const [activeTab, setActiveTab] = useState('all');

  // Vazifalar ro'yxati (useState ichida saqlanadi)
  const [homeworkList, setHomeworkList] = useState([
    {
      id: 1,
      title: 'React Components',
      subject: 'Frontend Development',
      status: 'urgent',
      deadline: 'Ertaga muddati',
      isCompleted: false,
    },
    {
      id: 2,
      title: 'CSS Flexbox Layout',
      subject: 'Frontend Development',
      status: 'pending',
      deadline: '24-sentabrgacha',
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
        <h1 className={styles.title}>Uy vazifalari</h1>
        <p className={styles.subtitle}>
          Barcha fanlar bo'yicha topshiriqlar va ularning holati
        </p>
      </div>

      {/* Statistika kartochkalari */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={`${styles.iconWrapper} ${styles.iconBlue}`}>
            <FileText size={24} />
          </div>
          <div>
            <p className={styles.statLabel}>Jami vazifalar</p>
            <h3 className={styles.statValue}>{totalCount}</h3>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.iconWrapper} ${styles.iconYellow}`}>
            <Clock size={24} />
          </div>
          <div>
            <p className={styles.statLabel}>Muddati yaqinlashgan</p>
            <h3 className={styles.statValue}>{urgentCount}</h3>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.iconWrapper} ${styles.iconGreen}`}>
            <CheckCircle size={24} />
          </div>
          <div>
            <p className={styles.statLabel}>Topshirilgan</p>
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
            Barchasi
          </button>
          <button
            onClick={() => setActiveTab('urgent')}
            className={`${styles.tabButton} ${activeTab === 'urgent' ? styles.activeTab : ''}`}
          >
            Muddati yaqin
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`${styles.tabButton} ${activeTab === 'pending' ? styles.activeTab : ''}`}
          >
            Kutilmoqda
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`${styles.tabButton} ${activeTab === 'completed' ? styles.activeTab : ''}`}
          >
            Topshirilgan
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
                  <span className={styles.textCompleted}>Topshirildi</span>
                ) : (
                  <>
                    <span
                      className={`${styles.deadlineText} ${
                        item.status === 'urgent' ? styles.textUrgent : styles.textPending
                      }`}
                    >
                      {item.deadline}
                    </span>
                    {/* Topshirish tugmasiga onClick ulandi */}
                    <button
                      onClick={() => handleSubmitHomework(item.id)}
                      className={styles.actionButton}
                    >
                      Topshirish
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}

          {filteredHomeworks.length === 0 && (
            <div className={styles.emptyState}>
              Ushbu bo'limda hech qanday vazifa topilmadi.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeworkStudent;