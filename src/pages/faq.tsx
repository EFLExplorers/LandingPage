import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import { PageLayout } from "../components/layout/PageLayout";
import { scrollToTop } from "../utils/scrollToTop";
import styles from "../styles/pages/FAQ.module.css";

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQPage: NextPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    scrollToTop();
  }, []);

  const faqs: FAQItem[] = [
    {
      question: "What is ESL Explorers?",
      answer: "ESL Explorers is an innovative English learning platform that combines interactive lessons, gamified learning experiences, and cutting-edge technology to make English learning engaging and effective for students of all levels."
    },
    {
      question: "How do I get started with ESL Explorers?",
      answer: "Getting started is easy! Simply click on 'Register Student' or 'Register Teacher' on our homepage, fill out the registration form, and you'll be ready to begin your learning journey."
    },
    {
      question: "What types of courses do you offer?",
      answer: "We offer a comprehensive range of English courses including General English, Business English, IELTS Preparation, TOEFL Preparation, and Conversational English. Our courses cater to all proficiency levels from beginner to advanced."
    },
    {
      question: "How are the lessons structured?",
      answer: "Each lesson is 60 minutes long and includes interactive activities, real-world examples, and practical exercises. Our curriculum follows a communicative approach with focus on speaking, listening, reading, and writing skills."
    },
    {
      question: "What resources do teachers use?",
      answer: "Our teachers use a combination of modern textbooks, multimedia materials, authentic content, and our proprietary digital learning platform. All materials are regularly updated to ensure relevance and effectiveness."
    },
    {
      question: "How many lessons can I take per week?",
      answer: "You can choose from flexible scheduling options ranging from 1 to 5 lessons per week. We recommend at least 2-3 lessons per week for optimal learning progress."
    },
    {
      question: "Do you offer exam preparation courses?",
      answer: "Yes, we specialize in preparation courses for IELTS, TOEFL, Cambridge exams, and other international English proficiency tests. Our teachers are experienced in exam strategies and techniques."
    },
    {
      question: "How can I access the course content?",
      answer: "All course materials are available through our online learning platform. You can access them 24/7 from any device with an internet connection. We also provide downloadable resources for offline study."
    },
    {
      question: "What makes ESL Explorers different from other platforms?",
      answer: "ESL Explorers stands out with our unique space-themed learning environment, interactive 3D lessons, personalized learning paths, and a comprehensive teacher support system. We combine entertainment with education to create an engaging learning experience."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes! We offer a free access tier that allows you to explore basic features and content to help you get started. You can upgrade to a paid plan anytime to unlock all features."
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <Head>
        <title>FAQ - ESL Explorers</title>
        <meta
          name="description"
          content="Frequently asked questions about ESL Explorers. Find answers about our English learning platform, courses, and services."
        />
        <meta
          name="keywords"
          content="ESL FAQ, English learning questions, language education help, ESL Explorers support"
        />
        <meta property="og:title" content="FAQ - ESL Explorers" />
        <meta
          property="og:description"
          content="Frequently asked questions about ESL Explorers. Find answers about our English learning platform, courses, and services."
        />
        <meta property="og:type" content="website" />
      </Head>
      <PageLayout>
        <div className={styles.faqContainer}>
          <div className={styles.faqHeader}>
            <h1 className={styles.faqTitle}>Frequently Asked Questions</h1>
            <p className={styles.faqSubtitle}>
              Find answers to the most common questions about ESL Explorers
            </p>
          </div>

          <div className={styles.faqList}>
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`${styles.faqItem} ${
                  activeIndex === index ? styles.active : ""
                }`}
              >
                <button
                  className={styles.faqQuestion}
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={activeIndex === index ? "true" : "false"}
                >
                  <span>{faq.question}</span>
                  <span className={styles.faqIcon}>
                    {activeIndex === index ? "−" : "+"}
                  </span>
                </button>
                {activeIndex === index && (
                  <div className={styles.faqAnswer}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.faqContact}>
            <h2>Still have questions?</h2>
            <p>
              Can't find what you're looking for? We're here to help!
            </p>
            <a href="/contact" className={styles.contactButton}>
              Contact Us
            </a>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default FAQPage; 