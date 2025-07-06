import styles from "./AboutUsSection.module.css";

export const AboutUsSection = () => {
  const teamMembers = [
    {
      name: "Shinade Groves",
      role: "Chief Executive Officer",
      title: "CEO & Founder",
      image: "/src/assets/images/characters/Emma.png",
      bio: "Passionate about revolutionizing ESL education through innovative technology and engaging content.",
      expertise: ["Leadership", "Education Strategy", "Product Vision"]
    },
    {
      name: "Bobby Brown",
      role: "Lead Developer",
      title: "Technical Lead",
      image: "/src/assets/images/characters/Luke.png",
      bio: "Full-stack developer dedicated to creating seamless learning experiences through cutting-edge technology.",
      expertise: ["Full-Stack Development", "UI/UX", "System Architecture"]
    },

    {
      name: "Nathan Van Der Watt",
      role: "Senior Designer",
      title: "Creative Lead",
      image: "/src/assets/images/characters/Riley.png",
      bio: "Creative visionary focused on designing beautiful, intuitive interfaces that enhance the learning experience.",
      expertise: ["Visual Design", "User Experience", "Brand Identity"]
    },
  ];

  const stats = [
    { number: "10K+", label: "Students Worldwide" },
    { number: "500+", label: "Expert Teachers" },
    { number: "95%", label: "Success Rate" },
    { number: "24/7", label: "Learning Support" }
  ];

  return (
    <section className={styles.aboutUs}>
      <div className={styles.container}>
        <div className={styles.heroSection}>
          <h1 className={styles.title}>About ESL Explorers</h1>
          <div className={styles.subtitle}>
            Pioneering the future of English language learning
          </div>
        </div>

        <div className={styles.description}>
          <p>
            We&apos;re a passionate team of educators, developers, and designers 
            committed to making English language learning an exciting adventure. 
            Our mission is to break down language barriers and create a world 
            where everyone can communicate confidently in English.
          </p>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.tagline}>
          <span className={styles.quoteMark}>"</span>
          Adventure awaits - learn English with ESL Explorers
          <span className={styles.quoteMark}>"</span>
        </div>

        <div className={styles.infoSections}>
          <div className={styles.mission}>
            <div className={styles.sectionHeader}>
              <div className={styles.iconContainer}>
                <span className={styles.icon}>🎯</span>
              </div>
              <h2>Our Mission</h2>
            </div>
            <p>
              At ESL Explorers, we believe learning English should be an exciting 
              journey, not a daunting task. Our mission is to transform language 
              education through innovative technology, engaging content, and 
              personalized learning experiences. We empower both teachers and 
              students with tools that make learning effective, enjoyable, and 
              accessible to everyone, regardless of their background or location.
            </p>
            <div className={styles.missionPoints}>
              <div className={styles.point}>✨ Interactive Learning Experiences</div>
              <div className={styles.point}>🌍 Global Community Building</div>
              <div className={styles.point}>📚 Comprehensive Curriculum</div>
            </div>
          </div>

          <div className={styles.vision}>
            <div className={styles.sectionHeader}>
              <div className={styles.iconContainer}>
                <span className={styles.icon}>🔮</span>
              </div>
              <h2>Our Vision</h2>
            </div>
            <p>
              We envision a world where language barriers dissolve and every 
              individual can confidently communicate in English. Our platform 
              will be the leading destination for ESL education, known for its 
              innovative approach, engaging content, and proven results. We see 
              a future where learning English is not just about grammar and 
              vocabulary, but about connecting cultures and building bridges 
              between people worldwide.
            </p>
            <div className={styles.visionGoals}>
              <div className={styles.goal}>🚀 Global Accessibility</div>
              <div className={styles.goal}>💡 Innovation Leadership</div>
              <div className={styles.goal}>🤝 Cultural Exchange</div>
            </div>
          </div>

          <div className={styles.team}>
            <div className={styles.sectionHeader}>
              <div className={styles.iconContainer}>
                <span className={styles.icon}>👥</span>
              </div>
              <h2>Meet Our Team</h2>
            </div>
            <p className={styles.teamIntro}>
              Our diverse team brings together expertise in education, technology, 
              design, and content creation to deliver an exceptional learning experience.
            </p>
            <div className={styles.teamGrid}>
              {teamMembers.map((member, index) => (
                <div key={member.name} className={styles.teamMember}>
                  <div className={styles.memberImage}>
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className={styles.memberPhoto}
                    />
                    <div className={styles.memberOverlay}>
                      <div className={styles.socialLinks}>
                        <span className={styles.socialIcon}>💼</span>
                        <span className={styles.socialIcon}>📧</span>
                        <span className={styles.socialIcon}>🔗</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.memberInfo}>
                    <h3>{member.name}</h3>
                    <p className={styles.memberRole}>{member.role}</p>
                    <p className={styles.memberTitle}>{member.title}</p>
                    <p className={styles.memberBio}>{member.bio}</p>
                    <div className={styles.expertise}>
                      {member.expertise.map((skill, skillIndex) => (
                        <span key={skillIndex} className={styles.skillTag}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.values}>
          <h2>Our Core Values</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.value}>
              <div className={styles.valueIcon}>🎓</div>
              <h3>Excellence</h3>
              <p>We strive for the highest quality in everything we create</p>
            </div>
            <div className={styles.value}>
              <div className={styles.valueIcon}>🤝</div>
              <h3>Community</h3>
              <p>Building connections and fostering a supportive learning environment</p>
            </div>
            <div className={styles.value}>
              <div className={styles.valueIcon}>💡</div>
              <h3>Innovation</h3>
              <p>Continuously evolving and improving our learning methods</p>
            </div>
            <div className={styles.value}>
              <div className={styles.valueIcon}>🌍</div>
              <h3>Accessibility</h3>
              <p>Making quality education available to everyone, everywhere</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
