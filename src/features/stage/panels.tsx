import { Link } from "react-router-dom";
import { blogPostsByDate } from "../../content/blog/posts";
import { siteConfig, socialLinks } from "../../content/site";
import { work } from "../../content/work";
import { WorkCard } from "../work/WorkCard";
import styles from "./panels.module.scss";

export function IntroPanel() {
  return (
    <>
      <p className={styles.kicker}>Software engineer / Vilnius, Lithuania</p>
      <h1 className={styles.title}>
        Software engineer, focused on the <em>frontend</em>
      </h1>
      <p className={styles.lede}>
        I&apos;m <b>Tadas</b> — based in Vilnius. I turn fuzzy ideas into fast,
        considered web interfaces, and I care about the details most people
        never notice.
      </p>
    </>
  );
}

export function WorkPanel() {
  return (
    <>
      <p className={styles.sectionLabel}>Selected work</p>
      <div className={styles.cards}>
        {work.map((item) => (
          <WorkCard item={item} key={item.slug} />
        ))}
      </div>
    </>
  );
}

export function BlogPanel() {
  return (
    <>
      <p className={styles.sectionLabel}>Blog</p>
      <div className={styles.notes}>
        {blogPostsByDate.map((post) => (
          <Link
            className={styles.note}
            key={post.slug}
            to={`/blog/${post.slug}`}
          >
            <span className={styles.noteMeta}>
              {post.dateLabel} / {post.readTime}
            </span>
            <h3>{post.title}</h3>
            <p>{post.summary}</p>
            <span className={styles.read}>Read →</span>
          </Link>
        ))}
      </div>
    </>
  );
}

export function AboutPanel() {
  return (
    <>
      <p className={styles.sectionLabel}>About</p>
      <div className={styles.about}>
        <div>
          <h2>I&apos;m Tadas — nice to meet you</h2>
          <p>
            A software engineer based in Vilnius, focused on the frontend. I
            studied software engineering at Vilnius University and spend most of
            my time building web interfaces — though I&apos;m happy further down
            the stack when a project needs it. I like clear code, honest work,
            and sweating the small details that make something feel finished.
          </p>
        </div>
        <div className={styles.kit}>
          React / TypeScript / JavaScript
          <br />
          <span>SCSS / Tailwind / HTML</span>
          <br />
          Node / REST APIs / SQL
          <br />
          <span>Git / CI/CD / Cloudflare</span>
        </div>
      </div>
    </>
  );
}

export function ContactPanel() {
  return (
    <>
      <p className={styles.sectionLabel}>Contact</p>
      <h2 className={styles.contactTitle}>
        Got something worth <em>building?</em>
      </h2>
      <p className={styles.contactLede}>
        Need a website? I&apos;ll build it. Working on something bigger and want
        a frontend-minded engineer on the team? Even better. Either way — say
        hi.
      </p>
      <a className={styles.mail} href={`mailto:${siteConfig.email}`}>
        {siteConfig.email}
      </a>
      <div className={styles.soc}>
        {socialLinks
          .filter((link) => link.label !== "Email")
          .map((link) => (
            <a href={link.href} key={link.label}>
              {link.value}
            </a>
          ))}
      </div>
    </>
  );
}
