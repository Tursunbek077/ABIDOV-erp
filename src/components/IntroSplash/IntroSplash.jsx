// import { useEffect, useState } from "react";
// import styles from "./IntroSplash.module.css";

// const TOTAL_DURATION = 2600; // ms — umumiy animatsiya davomiyligi

// function IntroSplash({ onFinish }) {
//   const [leaving, setLeaving] = useState(false);

//   useEffect(() => {

//     const audio = new Audio("/sounds/intro-sound.wav");
//     audio.volume = 0.6;
//     audioRef.current = audio;
//     audio.play().catch(() => {});


//     const leaveTimer = setTimeout(() => setLeaving(true), TOTAL_DURATION - 500);
//     const endTimer = setTimeout(() => onFinish?.(), TOTAL_DURATION);
//     return () => {
//       clearTimeout(leaveTimer);
//       clearTimeout(endTimer);
//     };
//   }, [onFinish]);

//   const letters = "ABIDOV'S".split("");

//   return (
//     <div className={`${styles.overlay} ${leaving ? styles.leaving : ""}`}>
//       <div className={styles.glowRing} />
//       <h1 className={styles.logo}>
//         {letters.map((ch, i) => (
//           <span
//             key={i}
//             className={styles.letter}
//             style={{ animationDelay: `${0.35 + i * 0.045}s` }}
//           >
//             {ch}
//           </span>
//         ))}
//       </h1>
//       <div className={styles.tagline}>O&apos;QUV MARKAZI</div>
//     </div>
//   );
// }

// export default IntroSplash;



import { useEffect, useRef, useState } from "react";
import styles from "./IntroSplash.module.css";

const TOTAL_DURATION = 3400; // ms — umumiy animatsiya davomiyligi (harflar 2s davom etadi)

function IntroSplash({ onFinish }) {
  const [leaving, setLeaving] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Ovozni animatsiya bilan bir vaqtda ishga tushirish.
    // Ba'zi brauzerlar foydalanuvchi hali sahifa bilan
    // o'zaro aloqa qilmagan bo'lsa, avtomatik ovozni bloklaydi —
    // shu sabab xatoni jim yutib yuboramiz (animatsiya baribir davom etadi).
    const audio = new Audio("/sounds/intro-sound.wav");
    audio.volume = 0.6;
    audioRef.current = audio;
    audio.play().catch(() => {});

    const leaveTimer = setTimeout(() => setLeaving(true), TOTAL_DURATION - 600);
    const endTimer = setTimeout(() => onFinish?.(), TOTAL_DURATION);
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(endTimer);
      audio.pause();
    };
  }, [onFinish]);

  const letters = "ABIDOV'S".split("");

  return (
    <div className={`${styles.overlay} ${leaving ? styles.leaving : ""}`}>
      <div className={styles.glowRing} />
      <h1 className={styles.logo}>
        {letters.map((ch, i) => (
          <span
            key={i}
            className={styles.letter}
            style={{ animationDelay: `${0.35 + i * 0.045}s` }}
          >
            {ch}
          </span>
        ))}
      </h1>
      <div className={styles.tagline}>O&apos;QUV MARKAZI</div>
    </div>
  );
}

export default IntroSplash;
