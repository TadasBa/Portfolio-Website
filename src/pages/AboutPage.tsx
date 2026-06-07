import { ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import profileImage from "../assets/media/profile/tadas-baltrunas.jpg";
import { SectionContainer } from "../components/layout/SectionContainer";
import { SectionHeading } from "../components/ui/SectionHeading";
import { requireRouteMetadata } from "../content/routeMetadata";
import { socialLinks } from "../content/site";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import styles from "./AboutPage.module.scss";

const linkIcons: Record<string, LucideIcon> = {
  Email: Mail,
  GitHub: Github,
  LinkedIn: Linkedin,
};

export function AboutPage() {
  useDocumentMeta(requireRouteMetadata("/about"));

  return (
    <SectionContainer className={styles.page}>
      <div className={styles.top}>
        <div className={styles.copyArea}>
          <SectionHeading eyebrow="About" title="What I am up to" />

          <p className={styles.lead}>
            These days I spend most of my time working, studying, training, and
            building things that help me understand software a bit better.
            <br />
            <br />
            Outside of that, I read when my attention span cooperates, listen to
            podcasts, and usually end the day with some show that was supposed
            to be “just one episode”.
            <br />
            <br />
            This page shows the projects, but this section is closer to the
            person behind them.
          </p>
        </div>

        <figure className={styles.portraitFrame}>
          <img
            alt="Portrait of Tadas Baltrūnas"
            className={styles.portrait}
            src={profileImage}
          />
        </figure>
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
