import { BookOpen, Box, Code2, MoveRight, Zap } from "lucide-react";
import { ButtonLink } from "../components/ui/ButtonLink";
import { Reveal } from "../components/ui/Reveal";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import styles from "./HomePage.module.scss";

const features = [
  {
    icon: Code2,
    title: "Build",
    text: "Websites, landing pages and portfolio sites",
  },
  {
    icon: BookOpen,
    title: "Improve",
    text: "Frontend fixes, responsive layouts and UI cleanup",
  },
  {
    icon: Zap,
    title: "Integrate",
    text: "APIs, forms and automations",
  },
  {
    icon: Box,
    title: "Ship",
    text: "Deployment setup, CI/CD and release support",
  },
];

function AbstractObject() {
  return (
    <div aria-hidden="true" className={styles.object}>
      <div className={styles.outline} />
      <div className={styles.backPanel} />
      <div className={styles.dotGrid} />
      <div className={styles.window}>
        <div className={styles.windowDots}>
          <span />
          <span />
          <span />
        </div>
        <span className={styles.lineWide} />
        <span className={styles.lineShort} />
        <span className={styles.lineMedium} />
        <span className={styles.lineFaint} />
      </div>
      <div className={styles.coral} />
      <div className={styles.codeTile}>{"</>"}</div>
    </div>
  );
}

export function HomePage() {
  useDocumentMeta({
    title: "Home",
    description:
      "Portfolio of Tadas Baltrunas, a developer focused on frontend and practical systems.",
  });

  return (
    <section className={styles.home} id="home">
      <div className={styles.hero}>
        <Reveal className={styles.copy}>
          <p className={styles.eyebrow}>Hello, I’m</p>
          <h1 className={styles.name}>Tadas Baltrūnas</h1>
          <span className={styles.rule} />
          <p className={styles.mainLine}>
            Web developer
          </p>
          <p className={styles.shortText}>
            I work on practical web projects — from clean frontend pages and responsive layouts to API-connected features, deployment setup and automations that make work easier
          </p>
          <div className={styles.actions}>
            <ButtonLink to="/projects">
              View Projects
              <MoveRight />
            </ButtonLink>
            <ButtonLink to="/blog" variant="blog">
              Read Blog
              <MoveRight />
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal className={styles.visual} delay={0.08}>
          <AbstractObject />
        </Reveal>
      </div>

      <Reveal delay={0.14}>
        <div className={styles.featureRow}>
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div className={styles.feature} key={feature.title}>
                <div className={styles.featureIcon}>
                  <Icon aria-hidden="true" />
                </div>
                <div>
                  <h2>{feature.title}</h2>
                  <p>{feature.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
