import { BookOpen, Box, Code2, MoveRight, Zap } from "lucide-react";
import { ButtonLink } from "../components/ui/ButtonLink";
import { Reveal } from "../components/ui/Reveal";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import styles from "./HomePage.module.scss";

const features = [
  {
    icon: Code2,
    title: "Frontend",
    text: "Clean UI, structure, performance.",
  },
  {
    icon: Zap,
    title: "Automation",
    text: "Workflows, scripts, and integrations.",
  },
  {
    icon: Box,
    title: "Systems",
    text: "Tools and processes that scale.",
  },
  {
    icon: BookOpen,
    title: "Blog",
    text: "Notes on building and shipping software.",
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
      "Portfolio of Tadas Baltrunas, a developer focused on frontend, automation, and practical systems.",
  });

  return (
    <section className={styles.home} id="home">
      <div className={styles.hero}>
        <Reveal className={styles.copy}>
          <p className={styles.eyebrow}>Hello, I’m</p>
          <h1 className={styles.name}>Tadas Baltrūnas</h1>
          <span className={styles.rule} />
          <p className={styles.mainLine}>
            Developer focused on frontend, automation, and practical systems.
          </p>
          <p className={styles.shortText}>
            I build clean interfaces, automate the repetitive, and design
            systems that stay practical over time.
          </p>
          <div className={styles.actions}>
            <ButtonLink to="/projects">
              View Projects
              <MoveRight />
            </ButtonLink>
            <ButtonLink to="/blog" variant="secondary">
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
