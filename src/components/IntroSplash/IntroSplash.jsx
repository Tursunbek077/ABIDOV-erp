import { useEffect, useState } from "react";
import styles from "./IntroSplash.module.css";

const TOTAL_DURATION = 3400; // ms — umumiy animatsiya davomiyligi (harflar 2s davom etadi)

function playIntroChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    const freqs = [311.13, 466.16, 622.25, 783.99];
    freqs.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + index * 0.08);

      gain.gain.setValueAtTime(0, now + index * 0.08);
      gain.gain.linearRampToValueAtTime(0.06, now + index * 0.08 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 1.3);
    });
  } catch {
    // Autoplay policy or unsupported
  }
}

function IntroSplash({ onFinish }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    playIntroChime();

    const leaveTimer = setTimeout(() => setLeaving(true), TOTAL_DURATION - 600);
    const endTimer = setTimeout(() => onFinish?.(), TOTAL_DURATION);
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(endTimer);
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
