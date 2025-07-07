import { useState } from "react";
import styles from "./ContactFAQSection.module.css";

interface FAQ {
  question: string;
  answer: string;
}

export const ContactFAQSection = () => {
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: "What types of English courses do you offer?",
      answer:
        "We offer a wide range of English courses including General English, Business English, IELTS Preparation, TOEFL Preparation, and Conversational English. Our courses cater to all proficiency levels from beginner to advanced.",
    },
    {
      question: "How are the lessons structured?",
      answer:
        "Each lesson is 60 minutes long and includes interactive activities, real-world examples, and practical exercises. Our curriculum follows a communicative approach with focus on speaking, listening, reading, and writing skills.",
    },
    {
      question: "What resources do teachers use?",
      answer:
        "Our teachers use a combination of modern textbooks, multimedia materials, authentic content, and our proprietary digital learning platform. All materials are regularly updated to ensure relevance and effectiveness.",
    },
    {
      question: "How many lessons can I take per week?",
      answer:
        "You can choose from flexible scheduling options ranging from 1 to 5 lessons per week. We recommend at least 2-3 lessons per week for optimal learning progress.",
    },
    {
      question: "What types of activities are included?",
      answer:
        "Our lessons include role-plays, discussions, pronunciation practice, grammar exercises, vocabulary building, and cultural exchange activities. We also incorporate games and multimedia content to make learning engaging.",
    },
    {
      question: "Do you offer exam preparation courses?",
      answer:
        "Yes, we specialize in preparation courses for IELTS, TOEFL, Cambridge exams, and other international English proficiency tests. Our teachers are experienced in exam strategies and techniques.",
    },
    {
      question: "How can I access the course content?",
      answer:
        "All course materials are available through our online learning platform. You can access them 24/7 from any device with an internet connection. We also provide downloadable resources for offline study.",
    },
    {
      question: "How do I get started?",
      answer:
        "Simply fill out the contact form above or reach out to us through email or phone. We'll schedule a free consultation to assess your level and discuss your learning goals.",
    },
  ];

  const toggleQuestion = (index: number) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <p className={styles.subtitle}>
            Find answers to common questions about our English learning programs and services
          </p>
        </div>

        <div className={styles.faqGrid}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${
                activeQuestion === index ? styles.active : ""
              }`}
              onClick={() => toggleQuestion(index)}
            >
              <div className={styles.faqQuestion}>
                <span className={styles.questionText}>{faq.question}</span>
                <span className={styles.faqArrow}>
                  {activeQuestion === index ? "−" : "+"}
                </span>
              </div>
              {activeQuestion === index && (
                <div className={styles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 