import type { WorkEntry } from "../../types/content";
import styles from "./WorkCard.module.scss";

export function WorkCard({ item }: { item: WorkEntry }) {
  return (
    <a
      className={styles.card}
      href={item.url}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className={styles.chrome}>
        <span aria-hidden="true" className={styles.lights}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.url}>{item.domain}</span>
      </div>
      <div className={styles.shot}>
        <img
          alt={`Screenshot of ${item.title}`}
          decoding="async"
          loading="lazy"
          src={item.shot}
        />
      </div>
      <div className={styles.body}>
        <span className={styles.tag}>
          {item.tag} / {item.year}
        </span>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.summary}>{item.summary}</p>
        <span className={styles.visit}>
          Visit live <span aria-hidden="true">↗</span>
        </span>
      </div>
    </a>
  );
}
