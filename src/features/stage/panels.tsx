import { Link } from "react-router-dom";
import { featuredBlogPosts } from "../../content/blog/posts";
import { siteConfig, socialLinks } from "../../content/site";
import { work } from "../../content/work";
import { WorkCard } from "../work/WorkCard";
import styles from "./panels.module.scss";

export function IntroPanel() {
  return (
    <>
      <p className={styles.kicker}>Vilnius, Lithuania</p>
      <h1 className={styles.title}>
        Software engineer, focused on the <em>frontend</em>
      </h1>
      <p className={styles.lede}>
        I&apos;m <b>Tadas</b>, a developer from Vilnius. I design, build and ship web interfaces.
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
        {featuredBlogPosts.map((post) => (
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
      <Link className={styles.blogAll} to="/blog">
        <span>All posts</span>
        <span aria-hidden="true" className={styles.blogAllArrow}>
          →
        </span>
      </Link>
    </>
  );
}

export function AboutPanel() {
  return (
    <>
      <p className={styles.sectionLabel}>About</p>
      <div className={styles.about}>
        <h2>I&apos;m Tadas</h2>
        <div>
          <p>
            A developer in Vilnius. I work mostly on the frontend, and go
            further down the stack when a project needs it.
          </p>
          <p>
            Away from that, I build small automations to take repetitive work
            off my plate.
          </p>
        </div>
        <div className={styles.kit}>
          React / TypeScript / JavaScript
          <br />
          <span>SCSS / Tailwind / HTML</span>
          <br />
          Node / REST APIs / SQL
          <br />
          <span>Git / CI/CD / n8n / Cloudflare</span>
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
        If you&apos;re building something and want a hand with the frontend, or
        just want to talk, my inbox is open.
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
