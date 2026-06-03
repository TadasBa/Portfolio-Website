import { ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import profileImage from "../assets/media/profile/tadas-baltrunas.jpg";
import { SectionContainer } from "../components/layout/SectionContainer";
import { SectionHeading } from "../components/ui/SectionHeading";
import { socialLinks } from "../content/site";
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
      <div className={styles.top}>
        <div className={styles.copyArea}>
          <SectionHeading eyebrow="About" title="What I am up to" />

          <p className={styles.lead}>
            My life is fairly quiet these days. I work, study, go to the gym,
            read when my attention span behaves and usually end the evening with
            a show or some podcast.
            <br />
            <br />
            I spend a lot of time in my own head, which is useful until it is
            not. I am learning to be more present, more open and a little better
            at not letting small habits decide the whole day for me.
            <br />
            <br />
            This page mostly shows the built things but this is closer to the
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
