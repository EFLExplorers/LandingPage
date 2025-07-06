import TabSection from "../tab-section";
import styles from "./HowWeTeachSection.module.css";

export const HowWeTeachSection = () => {
  return (
    <section className={styles.howWeTeach}>
      <h2 className={styles.sectionTitle}>How We Teach</h2>
      <p className={styles.sectionDescription}>
        Our comprehensive approach to education combines various learning
        methods to ensure maximum engagement and retention.
      </p>

      <TabSection
        tabs={[
          {
            title: "Lessons",
            content:
              "Interactive lessons designed by experts to help you master new concepts quickly and effectively.",
          },
          {
            title: "Activities",
            content:
              "Hands-on activities that reinforce learning through practical application of concepts.",
          },
          {
            title: "Minigames",
            content:
              "Fun and engaging minigames that make learning enjoyable while testing your knowledge.",
          },
          {
            title: "Assessments",
            content:
              "Comprehensive assessments to track your progress and identify areas for improvement.",
          },
        ]}
      />
    </section>
  );
};

export default HowWeTeachSection;
