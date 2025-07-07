import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./student.module.css";

const characters = [
  {
    name: "Professor",
    imageUrl: "/images/characters/professor.png",
  },
  {
    name: "Luna",
    imageUrl: "/images/characters/luna.png",
  },
  {
    name: "Max",
    imageUrl: "/images/characters/max.png",
  },
  {
    name: "Sarah",
    imageUrl: "/images/characters/sarah.png",
  },
];

const planets = [
  { name: "Earth", color: "var(--theme-muted)" },
  { name: "Mars", color: "var(--accent)" },
  { name: "Venus", color: "var(--text-secondary)" },
  { name: "Jupiter", color: "var(--theme-foreground)" },
  { name: "Saturn", color: "var(--theme-muted-foreground)" },
  { name: "Neptune", color: "var(--primary-three)" },
  { name: "Mercury", color: "var(--secondary-hover)" },
  { name: "Uranus", color: "var(--primary-two)" },
  { name: "Pluto", color: "var(--secondary)" },
  { name: "Luna", color: "var(--text-muted)" },
];

export default function StudentPlatform() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSpinning, setIsSpinning] = useState(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % planets.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + planets.length) % planets.length);
  };

  // Calculate position for each planet
  const calculatePlanetStyle = (index: number) => {
    const angle = (360 / planets.length) * index;
    const radius = 300; // Adjust this value to change the circle size
    const zOffset = Math.cos((angle * Math.PI) / 180) * 100;

    return {
      "--planet-color": planets[index].color,
      transform: `
        rotate(${angle + (isSpinning ? currentSlide * 36 : 0)}deg)
        translateX(${radius}px)
        scale(${index === currentSlide ? 1.2 : 0.8})
        translateZ(${zOffset}px)
      `,
      zIndex: Math.round(zOffset),
    } as React.CSSProperties;
  };

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (isSpinning) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [isSpinning]);

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Our Student Portal</h1>
          <p>
            Our student portal offers a cutting-edge platform for you to learn
            English effectively. With interactive lessons, real-time feedback,
            and engaging activities, learning has never been more fun!
          </p>
          <button className={styles.primaryButton}>Get Started</button>
        </div>
        <div className={styles.heroImage}>
          <div className={styles.placeholder}></div>
        </div>
      </section>

      {/* Characters Section */}
      <section className={styles.characters}>
        <div className={styles.characterContent}>
          <div className={styles.characterGridContainer}>
            <p className={styles.characterText}>
              Help the gang unlock items by completing guided tasks. As you move
              ahead, they stay around to guide you on the ESL Explorer, and give
              rewards and English skills!
            </p>
            <div className={styles.characterGrid}>
              {characters.map((character, index) => (
                <div key={index} className={styles.characterCircle}>
                  <Image
                    src={character.imageUrl}
                    alt={character.name}
                    width={80}
                    height={80}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.featureText}>
            <p>
              With 3D lessons per planet, equipping learners with a solid
              foundation in English. Each lesson allows you to practice everyday
              English. That&apos;s the lessons already prepared for teachers,
              allowing them to focus on their main passion: teaching! Students
              can track their progress and become masters of the English
              language. Learning English has never been this easy!
            </p>
          </div>
        </div>
      </section>

      {/* Planets Section */}
      <section className={styles.planets}>
        <h2>Explore our planets</h2>
        <div className={styles.planetCarousel}>
          <button
            className={styles.carouselButton}
            onClick={prevSlide}
            aria-label="Previous planet"
          >
            &lt;
          </button>

          <div className={styles.planetCircles}>
            <div className={styles.windmill}>
              {planets.map((planet, index) => (
                <div
                  key={planet.name}
                  className={`${styles.planetCircle} ${
                    index === currentSlide ? styles.activePlanet : ""
                  }`}
                  style={calculatePlanetStyle(index)}
                  onClick={() => {
                    setCurrentSlide(index);
                    setIsSpinning(false);
                  }}
                />
              ))}
            </div>
          </div>

          <button
            className={styles.carouselButton}
            onClick={nextSlide}
            aria-label="Next planet"
          >
            &gt;
          </button>
        </div>
        <p className={styles.planetName}>{planets[currentSlide].name}</p>
        <button
          className={`${styles.spinButton} ${isSpinning ? styles.active : ""}`}
          onClick={() => setIsSpinning(!isSpinning)}
        >
          {isSpinning ? "Stop Rotation" : "Start Rotation"}
        </button>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>Register today to start your learning journey!</h2>
          <button className={styles.registerButton}>Register</button>
        </div>
      </section>
    </main>
  );
}
