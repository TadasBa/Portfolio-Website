import { Github, Linkedin, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import portraitImage from "../assets/media/profile/tadas-baltrunas.jpg";
import { SectionContainer } from "../components/layout/SectionContainer";
import { ContentCard } from "../components/ui/ContentCard";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { siteConfig, socialLinks } from "../content/site";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import styles from "./AboutPage.module.scss";

const linkIcons: Record<string, LucideIcon> = {
  Email: Mail,
  GitHub: Github,
  LinkedIn: Linkedin,
};

export function AboutPage() {
  useDocumentMeta({
    title: "About",
    description:
      "About Tadas Baltrunas, a developer focused on frontend, automation, and practical systems.",
  });

  return (
    <SectionContainer className={styles.page}>
      <div className={styles.intro}>
        <Reveal>
          <div>
            <SectionHeading
              eyebrow="About"
              title="I build web interfaces and practical internal tools."
              description={siteConfig.summary}
            />

            <div className={styles.copy}>
              <p>
                I study software engineering at Vilnius University and work as a
                developer in fintech. My work is mostly frontend, but I also
                deal with APIs, automation, deployment flows, and system
                maintenance when the task requires it.
              </p>
              <p>
                I prefer simple systems that are easy to understand, test, and
                maintain.
              </p>
            </div>

            <div className={styles.links} aria-label="Profile links">
              {socialLinks.map((link) => {
                const Icon = linkIcons[link.label] ?? Mail;

                return (
                  <a href={link.href} key={link.label}>
                    <Icon aria-hidden="true" />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <ContentCard className={styles.portraitCard}>
            <img
              alt="Portrait of me"
              className={styles.portrait}
              src={portraitImage}
            />
          </ContentCard>
        </Reveal>
      </div>
    </SectionContainer>
  );
}
