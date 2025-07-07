import styles from "./HeroSection.module.css";
import Image from "next/image";

export const TeacherHeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>Our Teacher Portal</h1>
        <p>
          Empower your teaching with our comprehensive ESL platform. Access ready-made lesson plans, 
          track student progress, and deliver engaging interactive lessons that make learning English 
          an exciting adventure for your students.
        </p>
        <button className={styles.primaryButton}>Start Teaching</button>
      </div>
      <div className={styles.heroImage}>
        <div className={styles.placeholder}>
          <Image
            src="/assets/characters/Emma.png"
            alt="Teacher Character"
            width={400}
            height={300}
            className={styles.heroCharacter}
          />
        </div>
      </div>
    </section>
  );
}; 