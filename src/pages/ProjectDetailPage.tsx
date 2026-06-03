import { ArrowLeft, ExternalLink, FolderKanban } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { SectionContainer } from "../components/layout/SectionContainer";
import { ButtonLink } from "../components/ui/ButtonLink";
import { ContentCard } from "../components/ui/ContentCard";
import { EmptyState } from "../components/ui/EmptyState";
import { MediaLightbox } from "../components/ui/MediaLightbox";
import { Tag } from "../components/ui/Tag";
import { getProjectBySlug } from "../content/projects/projects";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { isProjectVideoMedia, type ProjectMedia } from "../types/content";
import styles from "./DetailPage.module.scss";

function ProjectGalleryPreview({ item }: { item: ProjectMedia }) {
  if (isProjectVideoMedia(item)) {
    return (
      <img
        alt={item.alt}
        className={styles.galleryImage}
        decoding="async"
        loading="lazy"
        src={item.poster}
      />
    );
  }

  return (
    <img
      alt={item.alt}
      className={styles.galleryImage}
      decoding="async"
      loading="lazy"
      src={item.src}
    />
  );
}

export function ProjectDetailPage() {
  const { slug } = useParams();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const [preview, setPreview] = useState<ProjectMedia | null>(null);

  useDocumentMeta({
    title: project?.title ?? "Project not found",
    description: project?.summary ?? "Requested project could not be found.",
  });

  if (!project) {
    return (
      <SectionContainer className={styles.page}>
        <EmptyState
          actionLabel="Back to projects"
          actionTo="/projects"
          description="The requested project entry does not exist or the slug has changed."
          icon={<FolderKanban />}
          title="Project not found"
        />
      </SectionContainer>
    );
  }

  return (
    <SectionContainer className={styles.page}>
      <ButtonLink className={styles.back} to="/projects" variant="secondary">
        <ArrowLeft />
        Back to projects
      </ButtonLink>

      <article className={styles.article}>
        <header className={styles.headerGrid}>
          <div>
            <p className={styles.kicker}>Project detail</p>
            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.summary}>{project.summary}</p>
            <div className={styles.tags}>
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>

          <ContentCard>
            <p className={styles.sideLabel}>Timeline</p>
            <p className={styles.sideValue}>{project.dateLabel}</p>

            <div className={styles.sideBlock}>
              <p className={styles.sideLabel}>Technologies</p>
              <div className={styles.tags}>
                {project.technologies.map((technology) => (
                  <Tag key={technology}>{technology}</Tag>
                ))}
              </div>
            </div>

            {project.links?.length ? (
              <div className={styles.buttonRow}>
                {project.links.map((link) => (
                  <ButtonLink
                    href={link.href}
                    key={link.href}
                    variant="secondary"
                  >
                    {link.label}
                    <ExternalLink />
                  </ButtonLink>
                ))}
              </div>
            ) : null}
          </ContentCard>
        </header>

        <div className={styles.detailGrid}>
          <ContentCard>
            <p className={styles.kicker}>Problem</p>
            <p className={styles.sectionText}>{project.problem}</p>
          </ContentCard>

          <ContentCard className={styles.wide}>
            <p className={styles.kicker}>Solution</p>
            <p className={styles.sectionText}>{project.solution}</p>
          </ContentCard>
        </div>

        <div className={styles.learningGrid}>
          <ContentCard>
            <p className={styles.kicker}>Outcome and learning</p>
            <p className={styles.sectionText}>{project.outcome}</p>
          </ContentCard>

          <ContentCard>
            <p className={styles.kicker}>Highlights</p>
            <div className={styles.highlights}>
              {project.highlights.map((highlight) => (
                <div className={styles.highlight} key={highlight}>
                  <p>{highlight}</p>
                </div>
              ))}
            </div>
          </ContentCard>
        </div>

        {project.gallery?.length ? (
          <div className={styles.gallery}>
            {project.gallery.map((item) => (
              <ContentCard className={styles.galleryCard} key={item.src}>
                <button
                  aria-label={`Open larger preview: ${item.caption}`}
                  className={styles.galleryButton}
                  onClick={() => setPreview(item)}
                  type="button"
                >
                  <ProjectGalleryPreview item={item} />
                </button>
                <p className={styles.caption}>{item.caption}</p>
              </ContentCard>
            ))}
          </div>
        ) : null}
      </article>

      {preview ? (
        <MediaLightbox media={preview} onClose={() => setPreview(null)} />
      ) : null}
    </SectionContainer>
  );
}
