import {
  Briefcase,
  Code2,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionContainer } from "../components/layout/SectionContainer";
import { SectionHeading } from "../components/ui/SectionHeading";
import { socialLinks } from "../content/site";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import styles from "./AboutPage.module.scss";

const facts = [
  {
    icon: Briefcase,
    title: "Current work",
    text: "Developer in fintech.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    text: "Software Engineering MSc at Vilnius University.",
  },
  {
    icon: Code2,
    title: "Focus",
    text: "Frontend systems and workflow automation.",
  },
  {
    icon: Sparkles,
    title: "Working style",
    text: "Simple, maintainable solutions.",
  },
];

const linkIcons: Record<string, LucideIcon> = {
  Email: Mail,
  GitHub: Github,
  LinkedIn: Linkedin,
};

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
        <span className={styles.lineTiny} />
      </div>
      <div className={styles.coral} />
      <div className={styles.codeTile}>{"</>"}</div>
    </div>
  );
}

export function AboutPage() {
  useDocumentMeta({
    title: "About",
    description:
      "About Tadas Baltrunas, a developer focused on frontend, automation, and practical systems.",
  });

  return (
    <SectionContainer className={styles.page}>
      <div className={styles.top}>
        <div className={styles.copyArea}>
          <SectionHeading eyebrow="About" title="About" />

          <p className={styles.lead}>
            I’m a developer focused on frontend, automation, and practical
            systems. I enjoy building clean interfaces, streamlining workflows,
            and turning ideas into reliable products.
          </p>

          <div className={styles.facts}>
            {facts.map((fact) => {
              const Icon = fact.icon;

              return (
                <article className={styles.fact} key={fact.title}>
                  <div className={styles.factIcon}>
                    <Icon aria-hidden="true" />
                  </div>
                  <div>
                    <h2>{fact.title}</h2>
                    <p>{fact.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <AbstractObject />
      </div>

      <div className={styles.contactRow}>
        {socialLinks.map((link) => {
          const Icon = linkIcons[link.label] ?? Mail;

          return (
            <a href={link.href} key={link.label}>
              <span className={styles.contactIcon}>
                <Icon aria-hidden="true" />
              </span>
              <span>
                <strong>{link.label}</strong>
                <small>{link.value}</small>
              </span>
              <ExternalLink aria-hidden="true" className={styles.external} />
            </a>
          );
        })}
      </div>
    </SectionContainer>
  );
}
