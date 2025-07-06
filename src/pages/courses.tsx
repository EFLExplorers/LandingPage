import styles from "../styles/pages/Content.module.css";

export function CoursesPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our Courses</h1>
      <div className={styles.content}>
        <div className={styles.courseGrid}>{/* Add course cards */}</div>
      </div>
    </div>
  );
}

export default CoursesPage;
